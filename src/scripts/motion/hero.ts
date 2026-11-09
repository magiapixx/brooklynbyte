import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MOTION, $ } from './tokens';
import { introTweens, padMasks } from './effects';

export function heroIn() {
  introTweens.forEach((t) => t.play());
  const h1 = $('.hero h1'); if (!h1) return;
  const s = new SplitText(h1, { type: 'lines', mask: 'lines' }); padMasks(s);
  gsap.timeline({ defaults: { ease: MOTION.ease } })
    .from('.hero .frame', { y: 60, opacity: 0, duration: MOTION.slow * 1.2, ease: MOTION.c2 })
    .from('.hero .frame video', { scale: 1.25, duration: MOTION.slow * 1.6 }, 0)
    .from(s.lines, { yPercent: 105, duration: MOTION.slow, stagger: 0.09 }, 0.15)
    .from('.hero-side > *', { y: 30, opacity: 0, duration: MOTION.base * 1.4, stagger: 0.08 }, 0.4)
    .from('.hero .frame-meta > *', { y: 20, opacity: 0, duration: MOTION.base, stagger: 0.06 }, 0.8);
  // Video melebar ke layar penuh mengikuti scroll: bingkai sebenarnya selebar layar x 100svh,
  // clip-path awal meniru kotak lama (selebar konten, rasio 16:8 / 4:5), lalu dibuka ke inset 0.
  const media = $('.hero-media'), frame = $('.hero-media .frame');
  if (media && frame) {
    media.classList.add('is-x');
    const start = () => {
      const w = media.clientWidth, h = media.clientHeight;
      const g = parseFloat(getComputedStyle($('.hero .wrap')!).paddingLeft) || 16;
      const side = Math.max(g, (w - 1600) / 2 + g);
      const boxH = Math.min(h, (w - 2 * side) * (innerWidth >= 768 ? 0.5 : 1.25));
      return `inset(0px ${side}px ${h - boxH}px ${side}px round 32px)`;
    };
    gsap.fromTo(frame, { clipPath: start }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', ease: 'none', immediateRender: true,
      scrollTrigger: { trigger: media, start: 'top 75%', end: 'top top', scrub: true, invalidateOnRefresh: true } });
  }
}
