import { useEffect, useRef } from 'react';

const EFFECT = {
  SCATTER_RANGE: 0.45,
  CELL_SIZE: 3,
  MOBILE_CELL_SIZE: 4,
  DOT_RADIUS_MIN: 0.5,
  DOT_RADIUS_MAX: 1.1,
  MAX_DISTANCE: 320,
  WIND_ANGLE: -20,
  SWEEP: 0.35,
  PHOTO_FADE_END: 0.35,
  PARTICLE_FADE_IN: 0.12,
  PARTICLE_EMPTY_AT: 0.85,
  LERP: 0.12,
  MAX_DPR: 2,
  SHADOW_GAMMA: 0.75,
  SHADOW_LIFT: 34,
};

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const smoothstep = (start, end, value) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};
const random = (seed) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export default function SandPortrait({ src, alt, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    const image = new Image();
    image.src = src;
    let particles;
    let frame = 0;
    let resizeTimeout;
    let visible = false;
    let currentProgress = 0;
    let targetProgress = 0;
    let motionEnabled = true;
    let dead = false;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      motionEnabled = document.documentElement.dataset.motion !== 'off' && !prefersReducedMotion.matches;
      if (!motionEnabled) {
        targetProgress = 0;
        currentProgress = 0;
      }
      requestDraw();
    };

    const rebuild = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height || !image.complete || !image.naturalWidth) return;
      dpr = Math.min(window.devicePixelRatio || 1, EFFECT.MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
      const cssDrawWidth = Math.round(image.naturalWidth * scale);
      const cssDrawHeight = Math.round(image.naturalHeight * scale);
      const drawWidth = Math.round(cssDrawWidth * dpr);
      const drawHeight = Math.round(cssDrawHeight * dpr);
      const offsetX = (width - cssDrawWidth) / 2;
      const offsetY = (height - cssDrawHeight) / 2;
      const source = document.createElement('canvas');
      source.width = drawWidth;
      source.height = drawHeight;
      const sourceContext = source.getContext('2d', { willReadFrequently: true });
      if (!sourceContext) return;
      sourceContext.drawImage(image, 0, 0, drawWidth, drawHeight);
      const pixels = sourceContext.getImageData(0, 0, drawWidth, drawHeight).data;
      const cell = width < 600 ? EFFECT.MOBILE_CELL_SIZE : EFFECT.CELL_SIZE;
      const step = Math.max(1, Math.round(cell * dpr));
      const capacity = Math.ceil(drawWidth / step) * Math.ceil(drawHeight / step);
      const x = new Float32Array(capacity), y = new Float32Array(capacity);
      const radius = new Float32Array(capacity), alpha = new Float32Array(capacity);
      const red = new Uint8Array(capacity), green = new Uint8Array(capacity), blue = new Uint8Array(capacity);
      const directionX = new Float32Array(capacity), directionY = new Float32Array(capacity);
      const speed = new Float32Array(capacity), seed = new Float32Array(capacity);
      let total = 0;

      for (let py = step / 2; py < drawHeight; py += step) {
        for (let px = step / 2; px < drawWidth; px += step) {
          const sourceIndex = (Math.floor(py) * drawWidth + Math.floor(px)) * 4;
          const pixelAlpha = pixels[sourceIndex + 3] / 255;
          if (pixelAlpha <= 0.5) continue;
          const luminance = (pixels[sourceIndex] * 0.2126 + pixels[sourceIndex + 1] * 0.7152 + pixels[sourceIndex + 2] * 0.0722) / 255;
          const seedValue = random(sourceIndex + 3);
          const angle = (EFFECT.WIND_ANGLE + (random(sourceIndex + 8) * 70 - 35)) * Math.PI / 180;
          const cssX = offsetX + px / dpr;
          const cssY = offsetY + py / dpr;
          const liftChannel = (channel) => clamp(Math.pow(channel / 255, EFFECT.SHADOW_GAMMA) * 255 + EFFECT.SHADOW_LIFT, 0, 255);
          const lifted = clamp(Math.pow(luminance, EFFECT.SHADOW_GAMMA) * 0.78 + EFFECT.SHADOW_LIFT / 255, 0, 1);
          const sparkle = random(sourceIndex + 10);
          const whiteMix = sparkle < 0.13 ? 0.28 : 0;
          const accentMix = sparkle > 0.975 ? 0.35 : 0;
          x[total] = cssX;
          y[total] = cssY;
          radius[total] = EFFECT.DOT_RADIUS_MIN + (EFFECT.DOT_RADIUS_MAX - EFFECT.DOT_RADIUS_MIN) * clamp(lifted);
          alpha[total] = pixelAlpha;
          red[total] = Math.round((liftChannel(pixels[sourceIndex]) * (1-whiteMix-accentMix)) + (239 * whiteMix) + (240 * accentMix));
          green[total] = Math.round((liftChannel(pixels[sourceIndex+1]) * (1-whiteMix-accentMix)) + (233 * whiteMix) + (135 * accentMix));
          blue[total] = Math.round((liftChannel(pixels[sourceIndex+2]) * (1-whiteMix-accentMix)) + (224 * whiteMix) + (90 * accentMix));
          directionX[total] = Math.cos(angle);
          directionY[total] = Math.sin(angle);
          speed[total] = 0.3 + seedValue * 0.7;
          seed[total] = seedValue;
          total++;
        }
      }

      particles = { x:x.slice(0,total), y:y.slice(0,total), radius:radius.slice(0,total), alpha:alpha.slice(0,total), red:red.slice(0,total), green:green.slice(0,total), blue:blue.slice(0,total), dx:directionX.slice(0,total), dy:directionY.slice(0,total), speed:speed.slice(0,total), seed:seed.slice(0,total) };
      context.clearRect(0, 0, width, height);
    };

    const render = () => {
      frame = 0;
      if (dead || !visible || document.hidden || !particles) return;
      if (motionEnabled) {
        currentProgress += (targetProgress - currentProgress) * EFFECT.LERP;
        if (Math.abs(targetProgress - currentProgress) < 0.002) currentProgress = targetProgress;
      } else currentProgress = 0;
      const progress = clamp(currentProgress);
      const fadedPhoto = 1 - smoothstep(0.02, EFFECT.PHOTO_FADE_END, progress);
      const wrapper = canvas.closest('.hero-img-wrap');
      wrapper?.style.setProperty('--photo-opacity', String(fadedPhoto));
      wrapper?.style.setProperty('--photo-blur', `${smoothstep(0.02, EFFECT.PHOTO_FADE_END, progress) * 2}px`);
      wrapper?.style.setProperty('--photo-brightness', String(1 - smoothstep(0.02, EFFECT.PHOTO_FADE_END, progress) * 0.4));
      wrapper?.style.setProperty('--sand-progress', String(progress));
      wrapper?.style.setProperty('--sand-lift', `${progress * -18}px`);
      context.clearRect(0, 0, width, height);

      if (!motionEnabled || progress <= 0 || progress >= EFFECT.PARTICLE_EMPTY_AT) {
        if (Math.abs(targetProgress - currentProgress) > 0.002) requestDraw();
        return;
      }
      const particleFade = smoothstep(0, EFFECT.PARTICLE_FADE_IN, progress);
      const eased = smoothstep(0, 1, progress / EFFECT.PARTICLE_EMPTY_AT);
      const time = performance.now() / 1000;
      for (let i = 0; i < particles.x.length; i++) {
        const delay = clamp((1 - particles.x[i] / width) * EFFECT.SWEEP + particles.seed[i] * 0.15, 0, 0.5);
        const amount = smoothstep(delay, EFFECT.PARTICLE_EMPTY_AT, progress);
        const scatter = eased * particles.speed[i] * EFFECT.MAX_DISTANCE;
        const opacity = particles.alpha[i] * particleFade * (1 - amount);
        if (opacity < 0.012) continue;
        const turbulence = Math.sin(time * 2 + particles.seed[i] * 90) * amount * 3;
        const px = particles.x[i] + particles.dx[i] * scatter + turbulence;
        const py = particles.y[i] + particles.dy[i] * scatter + turbulence;
        context.globalAlpha = opacity;
        context.fillStyle = `rgb(${particles.red[i]},${particles.green[i]},${particles.blue[i]})`;
        const radius = particles.radius[i] * (1 - amount * 0.4);
        context.fillRect(px - radius / 2, py - radius / 2, radius, radius);
      }
      context.globalAlpha = 1;
      if (Math.abs(targetProgress - currentProgress) > 0.002) requestDraw();
    };

    function requestDraw() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(render);
    }
    const onScroll = () => {
      targetProgress = motionEnabled ? clamp(window.scrollY / (window.innerHeight * EFFECT.SCATTER_RANGE)) : 0;
      requestDraw();
    };
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => { rebuild(); onScroll(); }, 100);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { onScroll(); requestDraw(); }
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(canvas);
    const onVisibility = () => document.hidden ? (cancelAnimationFrame(frame), frame = 0) : requestDraw();
    const motionObserver = new MutationObserver(syncMotion);
    motionObserver.observe(document.documentElement, { attributes:true, attributeFilter:['data-motion'] });
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    prefersReducedMotion.addEventListener?.('change', syncMotion);
    image.onload = () => { rebuild(); onScroll(); requestDraw(); };
    if (image.complete && image.naturalWidth) { rebuild(); onScroll(); }
    syncMotion();

    return () => {
      dead = true;
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(frame);
      observer.disconnect();
      motionObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      prefersReducedMotion.removeEventListener?.('change', syncMotion);
      image.onload = null;
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} role="img" aria-label={alt} />;
}
