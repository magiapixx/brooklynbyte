import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { initLenis } from './lenis';
import { C2_EASE, motionOn, $ } from './motion/tokens';
import { initMenu, initAccordions, initFilters, initVideo } from './motion/ui';
import { initPageTransition, pageIn } from './motion/page-transition';
import { initEffects, initPointer, initHeaderAndMood } from './motion/effects';
import { heroIn } from './motion/hero';
import { runLoader } from './motion/loader';

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, Flip, ScrambleTextPlugin);
CustomEase.create('customEase', C2_EASE);
const root = document.documentElement;
root.classList.add('js');

// Jam studio Brooklyn
const clk = $('[data-clock]');
if (clk) { const tick = () => { clk.textContent = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' }).format(new Date()); }; tick(); setInterval(tick, 30000); }

initMenu(); initAccordions(); initFilters(); initVideo();

if (!motionOn()) {
  root.classList.remove('is-loading', 'pt-cover');
} else {
  root.classList.add('js-anim', 'js-mood');
  initLenis();
  initPageTransition();
  initPointer();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    initEffects(); initHeaderAndMood();
    ScrollTrigger.refresh();
    if (root.classList.contains('is-loading')) runLoader(heroIn); else pageIn(heroIn);
    addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  });
}
