import { useEffect } from 'react';
import Lenis from 'lenis';
import { publishFrame, setHeroMetrics, setHeroVisible, setLenis, setScrollMotionEnabled, scrollToTarget } from '../lib/scrollStore';

export default function useSmoothScroll({ active, progressRef, cursorRef }) {
  useEffect(() => {
    if (!active) return undefined;
    let frame = 0;
    let lastTime = performance.now();
    let lastY = window.scrollY;
    let hero, nav, resizeObserver, intersectionObserver;
    let pointerX = -100, pointerY = -100, smoothX = -100, smoothY = -100, hot = false;
    let navHidden = false;
    let lenis = null;
    let hidden = document.hidden;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const allowed = () => document.documentElement.dataset.motion !== 'off' && !reducedMotion.matches;
    const updateNavHeight = () => {
      nav = document.querySelector('.navbar');
      if (nav) document.documentElement.style.setProperty('--nav-h', `${nav.getBoundingClientRect().height}px`);
    };
    const measure = () => {
      hero = document.querySelector('.hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setHeroMetrics(rect.top + window.scrollY, window.innerHeight, hero.querySelector('.hero-stage'));
      }
      updateNavHeight();
    };
    const updateLenis = () => {
      setScrollMotionEnabled(allowed());
      if (lenis) { lenis.destroy(); lenis = null; setLenis(null); }
      if (allowed()) {
        lenis = new Lenis({ lerp:0.085, wheelMultiplier:0.9, smoothWheel:true, syncTouch:false, autoRaf:false });
        setLenis(lenis);
      }
    };
    const onPointerMove = (event) => {
      if (!cursorRef.current || matchMedia('(pointer: coarse)').matches || !allowed()) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      const nextHot = Boolean(event.target.closest('a,button,.project-card'));
      if (nextHot !== hot) { hot = nextHot; cursorRef.current.classList.toggle('is-active', hot); }
    };
    const onAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
      scrollToTarget(target, navHeight);
    };
    const onVisibility = () => {
      hidden = document.hidden;
      if (!hidden && !frame) frame = requestAnimationFrame(tick);
      else if (hidden) { cancelAnimationFrame(frame); frame = 0; }
    };
    const onResize = () => measure();
    const onMotionChange = () => updateLenis();

    function tick(now) {
      frame = 0;
      if (hidden) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (lenis) lenis.raf(now);
      const y = lenis ? lenis.animatedScroll : window.scrollY;
      publishFrame(y, dt, now / 1000);
      if (progressRef.current) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
        progressRef.current.style.transform = `scaleX(${Math.max(0, Math.min(1, y / maxScroll))})`;
      }
      if (cursorRef.current) {
        const cursorLerp = 1 - Math.exp(-dt / 0.045);
        smoothX += (pointerX - smoothX) * cursorLerp;
        smoothY += (pointerY - smoothY) * cursorLerp;
        cursorRef.current.style.transform = `translate3d(${smoothX}px,${smoothY}px,0) translate(-50%,-50%)`;
      }
      const down = y > lastY + 0.5;
      const nextHidden = y > 150 && down;
      if (nav && nextHidden !== navHidden) {
        nav.classList.toggle('nav-hidden', nextHidden);
        navHidden = nextHidden;
      }
      lastY = y;
      frame = requestAnimationFrame(tick);
    }

    measure();
    resizeObserver = new ResizeObserver(measure);
    if (hero) resizeObserver.observe(hero);
    if (nav) resizeObserver.observe(nav);
    intersectionObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    if (hero) intersectionObserver.observe(hero);
    updateLenis();
    document.addEventListener('click', onAnchorClick);
    window.addEventListener('pointermove', onPointerMove, { passive:true });
    window.addEventListener('resize', onResize, { passive:true });
    document.addEventListener('visibilitychange', onVisibility);
    document.documentElement.addEventListener('motionchange', onMotionChange);
    const motionObserver = new MutationObserver(onMotionChange);
    motionObserver.observe(document.documentElement, { attributes:true, attributeFilter:['data-motion'] });
    reducedMotion.addEventListener?.('change', onMotionChange);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      setLenis(null);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      motionObserver.disconnect();
      reducedMotion.removeEventListener?.('change', onMotionChange);
      document.removeEventListener('click', onAnchorClick);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      document.documentElement.removeEventListener('motionchange', onMotionChange);
    };
  }, [active, progressRef, cursorRef]);
}
