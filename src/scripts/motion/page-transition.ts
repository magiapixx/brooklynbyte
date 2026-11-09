// Panel oranye + nama halaman tujuan (scramble). Full page load (MPA), back/forward aman.
import { gsap } from 'gsap';
import { MOTION, $, store } from './tokens';

const NAMES: Record<string, string> = { '/': 'Home', '/projects/': 'Projects', '/about/': 'About us', '/blog/': 'Journal' };
const label = (a: HTMLAnchorElement) => NAMES[new URL(a.href).pathname] ?? (a.textContent?.trim().split('\n')[0].slice(0, 28) || 'Brooklynbyte');

export function initPageTransition() {
  const pt = $('.pt')!, txt = $('.pt span')!;
  gsap.set(pt, { yPercent: document.documentElement.classList.contains('pt-cover') ? 0 : 100 });
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target === '_blank') return;
    const url = new URL(a.href); if (url.origin !== location.origin || url.hash && url.pathname === location.pathname) return;
    if (/\.(xml|png|jpg|pdf)$/.test(url.pathname)) return;
    e.preventDefault(); const name = a.matches('.prow,.next') ? (a.querySelector('.nm,.type-hero')?.textContent ?? a.textContent ?? '').trim() : label(a);
    txt.textContent = ''; pt.style.visibility = 'visible';
    gsap.timeline({ onComplete: () => { store.set('bb-pt', name); location.href = a.href; } })
      .fromTo(pt, { yPercent: 100 }, { yPercent: 0, duration: MOTION.base, ease: MOTION.c2 })
      .to(txt, { duration: 0.5, scrambleText: { text: name, chars: 'lowerCase', speed: 0.6 } }, '-=0.2');
  });
  addEventListener('pageshow', (e) => { if (e.persisted) { gsap.set(pt, { yPercent: 100 }); pt.style.visibility = ''; document.documentElement.classList.remove('pt-cover'); } });
}

export function pageIn(after: () => void) {
  const pt = $('.pt')!, txt = $('.pt span')!, name = store.get('bb-pt'); store.del('bb-pt');
  if (!name) { after(); return; }
  txt.textContent = name; gsap.set(pt, { yPercent: 0 }); pt.style.visibility = 'visible'; document.documentElement.classList.remove('pt-cover');
  gsap.to(pt, { yPercent: -100, duration: MOTION.slow * 0.8, ease: MOTION.c2, delay: 0.15, onComplete: () => { gsap.set(pt, { yPercent: 100 }); pt.style.visibility = ''; } });
  gsap.delayedCall(0.35, after);
  const h1 = $('h1'); if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
}
