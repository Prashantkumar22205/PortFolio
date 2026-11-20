export const HERO_TIMELINE = {
  TAU: 0.1,
  HOLD_END: 0.1,
  CHROME_START: 0.06,
  CHROME_END: 0.3,
  PHOTO_START: 0.1,
  PHOTO_END: 0.45,
  PARTICLE_START: 0.08,
  PARTICLE_END: 0.3,
  DISPERSE_START: 0.2,
  DISPERSE_END: 0.92,
  CANVAS_END: 0.97,
  TEXT_START: 0.3,
  TEXT_END: 1,
};

const listeners = new Set();
export const scrollState = { scrollY: 0, heroProgress: 0, smoothProgress: 0, dt: 0, time: 0, heroVisible: false };
let scrollMotionEnabled = true;
let heroTop = 0;
let heroHeight = 1;
let viewportHeight = window.innerHeight || 1;
let lenisInstance = null;
let heroStage = null;

export const subscribeScroll = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const setHeroMetrics = (top, height, viewport = window.innerHeight || 1, stage = null) => {
  heroTop = top;
  heroHeight = Math.max(height, 1);
  viewportHeight = Math.max(viewport, 1);
  heroStage = stage;
};

export const setHeroVisible = (visible) => { scrollState.heroVisible = visible; };
export const setScrollMotionEnabled = (enabled) => { scrollMotionEnabled = enabled; };
export const setLenis = (instance) => { lenisInstance = instance; };
export const getLenis = () => lenisInstance;

export const easeInOutCubic = (value) => value < 0.5
  ? 4 * value * value * value
  : 1 - Math.pow(-2 * value + 2, 3) / 2;
export const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
export const clamp01 = (value) => Math.max(0, Math.min(1, value));
export const phase = (value, start, end) => clamp01((value - start) / (end - start));

export function publishFrame(scrollY, dt, time) {
  const progress = clamp01((scrollY - heroTop) / Math.max(1, heroHeight - viewportHeight));
  scrollState.scrollY = scrollY;
  scrollState.heroProgress = progress;
  scrollState.dt = dt;
  scrollState.time = time;
  const alpha = 1 - Math.exp(-dt / HERO_TIMELINE.TAU);
  if (scrollMotionEnabled) {
    scrollState.smoothProgress += (progress - scrollState.smoothProgress) * alpha;
    if (Math.abs(progress - scrollState.smoothProgress) < 0.0005) scrollState.smoothProgress = progress;
  } else scrollState.smoothProgress = 0;

  const p = scrollMotionEnabled ? scrollState.smoothProgress : 0;
  const chromeOut = easeOutCubic(phase(p, HERO_TIMELINE.CHROME_START, HERO_TIMELINE.CHROME_END));
  const photoOut = easeInOutCubic(phase(p, HERO_TIMELINE.PHOTO_START, HERO_TIMELINE.PHOTO_END));
  const particlesIn = easeInOutCubic(phase(p, HERO_TIMELINE.PARTICLE_START, HERO_TIMELINE.PARTICLE_END));
  const travel = easeInOutCubic(phase(p, HERO_TIMELINE.DISPERSE_START, HERO_TIMELINE.DISPERSE_END));
  const text = phase(p, HERO_TIMELINE.TEXT_START, HERO_TIMELINE.TEXT_END);
  if (heroStage) {
    heroStage.style.setProperty('--hero-p', String(p));
    heroStage.style.setProperty('--hero-photo-opacity', String(1 - photoOut));
    heroStage.style.setProperty('--hero-particle-alpha', String(particlesIn));
    heroStage.style.setProperty('--hero-travel', String(travel));
    heroStage.style.setProperty('--hero-chrome-opacity', String(1 - chromeOut));
    heroStage.style.setProperty('--hero-chrome-lift', `${chromeOut * -24}px`);
    heroStage.style.setProperty('--hero-text-y', `${text * -4}vh`);
    heroStage.style.setProperty('--hero-text-opacity', String(1 - text * 0.15));
  }
  for (const listener of listeners) listener(scrollState);
}

export function scrollToTarget(target, navHeight = 0) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return false;
  if (lenisInstance) {
    lenisInstance.scrollTo(element, { offset: -navHeight, duration: 1.2 });
  } else {
    const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'auto' });
  }
  return true;
}
