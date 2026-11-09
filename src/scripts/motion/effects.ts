// Efek standar: label scramble, split baris, reveal, stagger, clip, parallax, count, process, marquee,
// pratinjau kursor, wipe CTA, footer, progres baca, next project, kursor & magnetik, header, mood.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MOTION, $, $$, finePointer } from './tokens';

export const introTweens: gsap.core.Tween[] = [];
export const padMasks = (s: SplitText) => (s.masks ?? []).forEach((m) => { (m as HTMLElement).style.paddingBottom = '0.14em'; (m as HTMLElement).style.marginBottom = '-0.14em'; });

export function initEffects() {
  $$('[data-scramble]').forEach((el) => { const t = el.textContent ?? ''; gsap.to(el, { duration: 0.9, scrambleText: { text: t, chars: 'upperCase', speed: 0.5 }, scrollTrigger: { trigger: el, start: 'top 88%' } }); });
  $$('[data-split]').forEach((el) => {
    const s = new SplitText(el, { type: 'lines', mask: 'lines', aria: /^H\d$/.test(el.tagName) ? 'auto' : 'none' }); padMasks(s); const intro = !!el.closest('.page-head');
    const tw = gsap.from(s.lines, { yPercent: 105, duration: MOTION.slow, ease: MOTION.ease, stagger: 0.08, paused: intro, scrollTrigger: intro ? undefined : { trigger: el, start: 'top 85%' } });
    if (intro) introTweens.push(tw);
  });
  $$('.page-head [data-intro]').forEach((el) => introTweens.push(gsap.from(el, { y: 30, opacity: 0, duration: MOTION.base * 1.4, ease: MOTION.ease, delay: 0.25, paused: true })));
  $$('[data-reveal]').forEach((el) => gsap.from(el, { y: 40, opacity: 0, duration: MOTION.base * 1.4, ease: MOTION.ease, scrollTrigger: { trigger: el, start: 'top 92%' } }));
  $$('[data-stagger]').forEach((el) => gsap.from(el.children, { y: 48, opacity: 0, duration: MOTION.base * 1.4, ease: MOTION.ease, stagger: 0.07, scrollTrigger: { trigger: el, start: 'top 85%' } }));
  $$('[data-clip]').forEach((el) => { const img = $('img', el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%' } })
      .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: MOTION.slow, ease: MOTION.c2 });
    if (img && !img.hasAttribute('data-parallax')) tl.from(img, { scale: 1.15, duration: MOTION.slow * 1.3, ease: MOTION.ease }, 0); });
  $$('[data-parallax]').forEach((el) => { const v = Math.abs(Number(el.dataset.parallax));
    gsap.fromTo(el, { yPercent: 0 }, { yPercent: -v, ease: 'none', scrollTrigger: { trigger: el.parentElement!, start: 'top bottom', end: 'bottom top', scrub: true } }); });
  $$<HTMLImageElement>('main img:not(.preview img):not([data-parallax]):not(.e-hero-img img):not(.e-wk-item img)').forEach((img) => {
    const frame = img.parentElement;
    if (!frame) return;
    const { width, height } = frame.getBoundingClientRect();
    if (width < 160 || height < 120) return;
    const travel = Math.min(24, Math.max(3, height * 0.03));
    gsap.fromTo(img, { translate: '0px 0px' }, {
      translate: `0px -${travel}px`,
      ease: 'none',
      scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    img.style.setProperty('scale', '1.12', 'important');
  });
  $$<HTMLElement>('[data-preview]').forEach((zone) => {
    const preview = $(zone.dataset.preview ?? '');
    const img = preview?.querySelector<HTMLImageElement>('img');
    if (!preview || !img) return;
    const { width, height } = preview.getBoundingClientRect();
    if (width < 160 || height < 120) return;
    gsap.fromTo(img, { y: 0, scale: 1.16 }, {
      y: -8,
      scale: 1.16,
      ease: 'none',
      scrollTrigger: { trigger: zone, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
  $$('[data-count]').forEach((el) => { const to = Number(el.dataset.count), suf = el.dataset.suffix ?? ''; const o = { v: 0 }; el.textContent = '0' + suf;
    gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' }, onUpdate: () => { el.textContent = Math.round(o.v) + suf; } }); });
  $$('[data-rise]').forEach((el) => {
    gsap.from(el.children, { y: 120, opacity: 0, duration: MOTION.slow, ease: MOTION.ease, stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 80%' } });
    gsap.from($$('.chip', el), { scale: 0.6, opacity: 0, duration: MOTION.base, ease: 'back.out(2)', stagger: 0.03, delay: 0.4, scrollTrigger: { trigger: el, start: 'top 80%' } }); });
  $$('.marq').forEach((m) => { const tr = $('.marq-track', m)!; tr.innerHTML += tr.innerHTML;
    const tw = gsap.to(tr, { xPercent: -50, duration: Number(m.dataset.speed) || 30, ease: 'none', repeat: -1 });
    m.addEventListener('pointerenter', () => gsap.to(tw, { timeScale: 0.25, duration: 0.6 }));
    m.addEventListener('pointerleave', () => gsap.to(tw, { timeScale: 1, duration: 0.6 }));
    ScrollTrigger.create({ trigger: m, onUpdate: (s) => gsap.to(tw, { timeScale: s.direction * (1 + Math.min(Math.abs(s.getVelocity()) / 800, 3)), duration: 0.3, overwrite: true,
      onComplete: () => { gsap.to(tw, { timeScale: Math.sign(tw.timeScale()) || 1, duration: 0.8 }); } }) }); });
  if (finePointer()) $$('[data-preview]').forEach((zone) => {
    const pv = $(zone.dataset.preview!);
    if (!pv) return;
    const img = $<HTMLImageElement>('img', pv);
    if (!img) return;
    const xTo = gsap.quickTo(pv, 'x', { duration: MOTION.fast * 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(pv, 'y', { duration: MOTION.fast * 0.5, ease: 'power3' });
    let activeItem: HTMLElement | null = null;
    const hide = () => {
      activeItem = null;
      gsap.killTweensOf(pv);
      gsap.to(pv, { autoAlpha: 0, scale: 0.6, duration: MOTION.fast, overwrite: true });
    };
    const move = (e: PointerEvent) => {
      if (!activeItem || !zone.matches(':hover')) return;
      xTo(e.clientX + 24);
      yTo(e.clientY - 110);
    };
    document.addEventListener('pointermove', move, { passive: true });
    $$<HTMLElement>('[data-img]', zone).forEach((it) => {
      it.addEventListener('pointerenter', (e) => {
        activeItem = it;
        if (img.getAttribute('src') !== it.dataset.img) {
          img.src = it.dataset.img!;
          gsap.killTweensOf(img);
          gsap.fromTo(img, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: MOTION.base, ease: MOTION.c2, overwrite: true });
        }
        gsap.killTweensOf(pv);
        gsap.set(pv, { x: e.clientX + 24, y: e.clientY - 110 });
        gsap.to(pv, { autoAlpha: 1, scale: 1, duration: MOTION.base, ease: MOTION.ease, overwrite: true });
      });
      it.addEventListener('pointerleave', (e) => {
        const nextItem = e.relatedTarget instanceof Element ? e.relatedTarget.closest<HTMLElement>('[data-img]') : null;
        if (nextItem && zone.contains(nextItem)) return;
        if (activeItem === it) hide();
      });
    });
    zone.addEventListener('pointerleave', hide);
    zone.addEventListener('preview:hide', hide);
    window.addEventListener('blur', hide);
    document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
    document.addEventListener('pointerout', (e) => {
      if (e.relatedTarget === null) hide();
    });
  });
  $$('[data-wipe]').forEach((el) => gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 48px 48px 0 0)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 30%', scrub: true } }));
  if ($('.wm')) gsap.from($$('.wm span'), { yPercent: 105, duration: MOTION.slow, ease: MOTION.ease, stagger: 0.04, scrollTrigger: { trigger: '.wm', start: 'top 98%' } });
  const rb = $('.readbar'); if (rb) gsap.to(rb, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.prose', start: 'top 60%', end: 'bottom bottom', scrub: true } });
  const nx = $('.next'); if (nx) gsap.fromTo($('img', nx), { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: nx, start: 'top bottom', end: 'bottom bottom', scrub: true } });
}

export function initPointer() {
  $$('.btn').forEach((b) => b.addEventListener('pointerenter', (e) => { const r = b.getBoundingClientRect(); b.style.setProperty('--x', `${e.clientX - r.left}px`); b.style.setProperty('--y', `${e.clientY - r.top}px`); }));
  if (!finePointer()) return;
  const c = $('.cursor')!, label = $('span', c)!;
  const xTo = gsap.quickTo(c, 'x', { duration: 0.4, ease: 'power3' }), yTo = gsap.quickTo(c, 'y', { duration: 0.4, ease: 'power3' });
  addEventListener('pointermove', (e) => { c.classList.add('on'); xTo(e.clientX); yTo(e.clientY); });
  document.addEventListener('pointerover', (e) => { const v = (e.target as Element).closest<HTMLElement>('[data-cursor]'); c.classList.toggle('big', !!v); if (v) label.textContent = v.dataset.cursor ?? ''; });
  $$('[data-magnetic]').forEach((el) => { const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' }), y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
    el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * 0.25); y((e.clientY - r.top - r.height / 2) * 0.35); });
    el.addEventListener('pointerleave', () => { x(0); y(0); }); });
}

export function initHeaderAndMood() {
  const header = $('.site-header')!;
  ScrollTrigger.create({ start: 120, end: 'max', onUpdate: (s) => gsap.to(header, { yPercent: s.direction === 1 ? -110 : 0, duration: MOTION.fast, ease: 'power2.out', overwrite: true }) });
  // Bar putih di belakang logo dan menu begitu halaman di-scroll (header tidak lagi memakai mix-blend).
  ScrollTrigger.create({ start: 10, end: 'max', onToggle: (s) => header.classList.toggle('is-solid', s.isActive) });
  // Dibuat setelah semua pin agar posisi pemicu benar
  $$('main > [data-mood]:not([data-mood-static])').forEach((sec) => ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%',
    onToggle: (s) => { if (s.isActive) document.body.dataset.mood = sec.dataset.mood; } }));
}
