import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

/**
 * Shared hook — listens for the hidden triple-G antigravity Easter egg
 * and returns framer-motion animation controls.
 */
export function useAntigravity() {
  const controls = useAnimation();

  useEffect(() => {
    const handleToggle = (e) => {
      if (e.detail.isAntigravity) {
        controls.start({
          y: window.innerHeight + 200,
          rotate: Math.random() * 360 - 180,
          transition: { duration: 2 + Math.random() * 2, ease: 'easeIn' },
        });
      } else {
        controls.start({ y: 0, rotate: 0, transition: { duration: 1, ease: 'easeOut' } });
      }
    };
    window.addEventListener('antigravity_toggle', handleToggle);
    return () => window.removeEventListener('antigravity_toggle', handleToggle);
  }, [controls]);

  return controls;
}
