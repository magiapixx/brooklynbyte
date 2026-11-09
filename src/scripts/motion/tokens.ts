// Sama dengan docs/design-direction.md §6 dan --ease-brand/--duration-* di global.css
export const MOTION = { ease: 'expo.out', c2: 'customEase', fast: 0.35, base: 0.64, slow: 1.2, stagger: 0.05 } as const;
export const C2_EASE = 'M0,0 C0.86,0 0.07,1 1,1'; // = cubic-bezier(0.86, 0, 0.07, 1)
export const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s);
export const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => [...c.querySelectorAll<T>(s)];
export const store = {
  get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* storage blocked */ } },
  del: (k: string) => { try { sessionStorage.removeItem(k); } catch { /* storage blocked */ } },
};
export const motionOn = () => !document.documentElement.classList.contains('no-motion');
export const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
