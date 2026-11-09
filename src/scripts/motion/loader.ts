// Loader (pola C2, Filip Zrnzevic, MIT): counter [00]→[100], teks naik, panel naik → hero
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION, $, $$, store } from './tokens';

export function runLoader(after: () => void) {
  const root = document.documentElement, el = $('.loader');
  if (!el || !root.classList.contains('is-loading')) { after(); return; }
  const ctr = $('.ctr', el)!; let c = 0;
  const iv = setInterval(() => {
    c += Math.random() * 6 + 3; // ±0.6 s sampai 100 (dipercepat untuk LCP)
    if (c >= 100) { c = 100; clearInterval(iv);
      gsap.timeline({ delay: 0.1 })
        .to($$('.loader > *'), { y: -20, opacity: 0, duration: 0.45, ease: 'power2.inOut', stagger: 0.05 })
        .to(el, { yPercent: -100, duration: MOTION.slow * 0.8, ease: 'power3.inOut', onStart: () => { gsap.delayedCall(0.45, after); } }, '+=0.1')
        .add(() => { root.classList.remove('is-loading'); gsap.set(el, { clearProps: 'all' }); store.set('bb-loaded', '1'); ScrollTrigger.refresh(); }); }
    ctr.textContent = `[${String(Math.round(c)).padStart(2, '0')}]`;
  }, 30);
}
