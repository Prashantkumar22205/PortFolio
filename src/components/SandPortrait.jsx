import { useEffect, useRef } from 'react';
import { HERO_TIMELINE, easeInOutCubic, easeOutCubic, phase, scrollState, subscribeScroll } from '../lib/scrollStore';

const SAND_CONFIG = {
  CELL_SIZE: 3,
  MOBILE_CELL_SIZE: 4,
  SMALL_SCREEN_CELL_SIZE: 5,
  DOT_MIN: 0.5,
  DOT_MAX: 1.1,
  MAX_DPR: 1.5,
  SHADOW_GAMMA: 0.75,
  SHADOW_LIFT: 34,
  WIND_ANGLE: -20,
  ANGLE_NOISE: 35,
  MAX_DISTANCE: 320,
  SWEEP: 0.35,
  RANDOM_DELAY: 0.15,
  TURBULENCE: 2.4,
  ADAPT_FRAMES: 30,
  SLOW_FRAME_MS: 20,
  RECOVER_FRAME_MS: 17,
  PHOTO_COLOR_BUCKETS: [3, 3, 3],
  ALPHA_STEPS: 6,
};

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const smoothstep = (value) => value * value * (3 - 2 * value);
const rand = (seed) => {
  const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return n - Math.floor(n);
};
const liftedChannel = (value) => clamp01(Math.pow(value / 255, SAND_CONFIG.SHADOW_GAMMA) + SAND_CONFIG.SHADOW_LIFT / 255) * 255;

function buildPalette() {
  const palette = [];
  const [rLevels, gLevels, bLevels] = SAND_CONFIG.PHOTO_COLOR_BUCKETS;
  for (let r = 0; r < rLevels; r++) for (let g = 0; g < gLevels; g++) for (let b = 0; b < bLevels; b++) {
    palette.push(`rgb(${Math.round(r * 255 / (rLevels - 1))},${Math.round(g * 255 / (gLevels - 1))},${Math.round(b * 255 / (bLevels - 1))})`);
  }
  return palette;
}
const PALETTE = buildPalette();

export default function SandPortrait({ src, alt, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha:true });
    if (!canvas || !ctx) return undefined;

    const image = new Image();
    image.src = src;
    let particles = null;
    let visible = false;
    let resizeObserver;
    let resizeTimer;
    let sampleTotal = 0;
    let averageFrame = 0;
    let drawStride = 1;
    let lastPaintedProgress = -1;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let motionEnabled = document.documentElement.dataset.motion !== 'off' && !reducedMotion.matches;

    const buildParticles = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height || !image.complete || !image.naturalWidth) return;
      const dpr = Math.min(window.devicePixelRatio || 1, SAND_CONFIG.MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = Math.max(1, Math.round(image.naturalWidth * scale * dpr));
      const drawHeight = Math.max(1, Math.round(image.naturalHeight * scale * dpr));
      const offsetX = (width * dpr - drawWidth) / 2;
      const offsetY = (height * dpr - drawHeight) / 2;
      const source = document.createElement('canvas');
      source.width = drawWidth;
      source.height = drawHeight;
      const sourceCtx = source.getContext('2d', { willReadFrequently:true });
      if (!sourceCtx) return;
      sourceCtx.drawImage(image, 0, 0, drawWidth, drawHeight);
      const data = sourceCtx.getImageData(0, 0, drawWidth, drawHeight).data;
      const cellCss = width < 430 ? SAND_CONFIG.SMALL_SCREEN_CELL_SIZE : width < 900 ? SAND_CONFIG.MOBILE_CELL_SIZE : SAND_CONFIG.CELL_SIZE;
      const cell = Math.max(1, Math.round(cellCss * dpr));
      const capacity = Math.ceil(drawWidth / cell) * Math.ceil(drawHeight / cell);
      const homeX = new Float32Array(capacity), homeY = new Float32Array(capacity);
      const radius = new Float32Array(capacity), delay = new Float32Array(capacity);
      const directionX = new Float32Array(capacity), directionY = new Float32Array(capacity);
      const speed = new Float32Array(capacity), seed = new Float32Array(capacity);
      const group = new Uint8Array(capacity);
      const groupCounts = new Uint32Array(PALETTE.length * SAND_CONFIG.ALPHA_STEPS);
      const [rLevels,gLevels,bLevels] = SAND_CONFIG.PHOTO_COLOR_BUCKETS;
      let count = 0;

      for (let py = cell / 2; py < drawHeight; py += cell) for (let px = cell / 2; px < drawWidth; px += cell) {
        const pi = (Math.floor(py) * drawWidth + Math.floor(px)) * 4;
        const alpha = data[pi + 3] / 255;
        if (alpha <= 0.5) continue;
        const r = liftedChannel(data[pi]);
        const g = liftedChannel(data[pi + 1]);
        const b = liftedChannel(data[pi + 2]);
        const lum = (r * .2126 + g * .7152 + b * .0722) / 255;
        const rn = Math.round(r / 255 * (rLevels - 1));
        const gn = Math.round(g / 255 * (gLevels - 1));
        const bn = Math.round(b / 255 * (bLevels - 1));
        const bucket = rn * gLevels * bLevels + gn * bLevels + bn;
        const alphaStep = Math.min(SAND_CONFIG.ALPHA_STEPS - 1, Math.floor(alpha * SAND_CONFIG.ALPHA_STEPS));
        const groupId = bucket * SAND_CONFIG.ALPHA_STEPS + alphaStep;
        const localX = (offsetX + px) / dpr;
        const localY = (offsetY + py) / dpr;
        const seedValue = rand(pi + 3);
        const angle = (SAND_CONFIG.WIND_ANGLE + (rand(pi + 8) * 2 - 1) * SAND_CONFIG.ANGLE_NOISE) * Math.PI / 180;
        homeX[count] = localX;
        homeY[count] = localY;
        radius[count] = SAND_CONFIG.DOT_MIN + (SAND_CONFIG.DOT_MAX - SAND_CONFIG.DOT_MIN) * lum;
        delay[count] = (1 - localX / width) * SAND_CONFIG.SWEEP + seedValue * SAND_CONFIG.RANDOM_DELAY;
        directionX[count] = Math.cos(angle);
        directionY[count] = Math.sin(angle);
        speed[count] = 0.3 + rand(pi + 10) * 0.7;
        seed[count] = seedValue;
        group[count] = groupId;
        groupCounts[groupId]++;
        count++;
      }

      const offsets = new Uint32Array(groupCounts.length + 1);
      for (let i = 0; i < groupCounts.length; i++) offsets[i + 1] = offsets[i] + groupCounts[i];
      const cursors = offsets.slice(0, groupCounts.length);
      const indices = new Uint32Array(count);
      for (let i = 0; i < count; i++) indices[cursors[group[i]]++] = i;
      particles = { count, homeX, homeY, radius, delay, directionX, directionY, speed, seed, groupCounts, offsets, indices };
      ctx.clearRect(0, 0, width, height);
    };

    const draw = (state) => {
      if (!visible || !state.heroVisible) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!particles || !width || !height) return;
      if (state.smoothProgress === lastPaintedProgress) return;
      lastPaintedProgress = state.smoothProgress;
      if (!motionEnabled || state.smoothProgress <= 0 || state.smoothProgress >= HERO_TIMELINE.CANVAS_END) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      const p = state.smoothProgress;
      const particleStart = Math.max(HERO_TIMELINE.HOLD_END, HERO_TIMELINE.PARTICLE_START);
      const particleIn = smoothstep(phase(p, particleStart, HERO_TIMELINE.PARTICLE_END));
      const travelProgress = easeInOutCubic(phase(p, HERO_TIMELINE.DISPERSE_START, HERO_TIMELINE.DISPERSE_END));
      const dustFade = 1 - phase(p, HERO_TIMELINE.DISPERSE_END, HERO_TIMELINE.CANVAS_END);
      ctx.clearRect(0, 0, width, height);
      const alphaQuant = particleIn * dustFade;
      const turbulenceTime = state.time * 2;
      if (alphaQuant < 0.02) return;

      for (let groupId = 0; groupId < particles.groupCounts.length; groupId++) {
        const start = particles.offsets[groupId], end = particles.offsets[groupId + 1];
        if (start === end) continue;
        const alphaStep = groupId % SAND_CONFIG.ALPHA_STEPS;
        ctx.globalAlpha = alphaQuant * ((alphaStep + 0.5) / SAND_CONFIG.ALPHA_STEPS);
        ctx.fillStyle = PALETTE[Math.floor(groupId / SAND_CONFIG.ALPHA_STEPS)];
        for (let n = start; n < end; n += drawStride) {
          const i = particles.indices[n];
          if (alphaQuant < 0.02) continue;
          const localTravel = clamp01((travelProgress - particles.delay[i]) / (1 - particles.delay[i]));
          const travel = easeOutCubic(localTravel) * SAND_CONFIG.MAX_DISTANCE * particles.speed[i];
          const turbulence = Math.sin(turbulenceTime + particles.seed[i] * 90) * localTravel * SAND_CONFIG.TURBULENCE;
          const x = particles.homeX[i] + particles.directionX[i] * travel + turbulence;
          const y = particles.homeY[i] + particles.directionY[i] * travel + turbulence;
          const dot = particles.radius[i] * (1 - localTravel * 0.4) + (drawStride === 2 ? 0.15 : 0);
          ctx.fillRect(x - dot / 2, y - dot / 2, dot, dot);
        }
      }
      ctx.globalAlpha = 1;
    };

    const unsubscribe = subscribeScroll((state) => {
      if (!visible || !state.heroVisible) return;
      if (state.dt > 0) {
        averageFrame = averageFrame === 0 ? state.dt * 1000 : averageFrame * .95 + state.dt * 50;
        sampleTotal++;
        if (sampleTotal >= SAND_CONFIG.ADAPT_FRAMES) {
          drawStride = averageFrame > SAND_CONFIG.SLOW_FRAME_MS ? 2 : 1;
          if (averageFrame < SAND_CONFIG.RECOVER_FRAME_MS) drawStride = 1;
          sampleTotal = 0;
        }
      }
      draw(state);
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      else { lastPaintedProgress = -1; draw(scrollState); }
    });
    observer.observe(canvas);
    const motionObserver = new MutationObserver(() => {
      motionEnabled = document.documentElement.dataset.motion !== 'off' && !reducedMotion.matches;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      lastPaintedProgress = -1;
    });
    motionObserver.observe(document.documentElement, { attributes:true, attributeFilter:['data-motion'] });
    const onReducedMotion = () => { motionEnabled = !reducedMotion.matches && document.documentElement.dataset.motion !== 'off'; ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight); };
    reducedMotion.addEventListener?.('change', onReducedMotion);
    resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildParticles, 100);
    });
    resizeObserver.observe(canvas);
    image.onload = buildParticles;
    if (image.complete && image.naturalWidth) buildParticles();

    return () => {
      unsubscribe();
      observer.disconnect();
      resizeObserver?.disconnect();
      motionObserver.disconnect();
      reducedMotion.removeEventListener?.('change', onReducedMotion);
      clearTimeout(resizeTimer);
      image.onload = null;
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} role="img" aria-label={alt} />;
}
