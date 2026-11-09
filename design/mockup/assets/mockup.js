/* Brooklynbyte · prototype gerak mockup v1 · ui-ux-designer · BUKAN kode produksi.
   Adaptasi pola dari (MIT):
   - C1 Daniel Hult, https://codepen.io/daniel-hult/pen/yLpwqgR  (image scale, di sini DIBALIK)
   - C2 Filip Zrnzevic, https://codepen.io/filipz/pen/zxGPYMP     (loader + full screen scroll slideshow) */
(() => {
  const MOTION = { ease: 'expo.out', c2: 'customEase', fast: 0.35, base: 0.64, slow: 1.2, stagger: 0.05 };
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const store = { get: (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
                  set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} },
                  del: (k) => { try { sessionStorage.removeItem(k); } catch (e) {} } };
  root.classList.add('js');
  const motionOn = !root.classList.contains('no-motion');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Data proyek (detail memakai ?p=) ---------- */
  const P = window.BB_PROJECTS || [];

  /* ---------- Panel mockup ---------- */
  const mk = $('#mk');
  if (mk) {
    const minBtn = $('#mk-min');
    const setMin = (m) => { mk.classList.toggle('min', m); minBtn.textContent = m ? '+' : '–'; minBtn.setAttribute('aria-expanded', String(!m)); try { localStorage.setItem('bb-mk-min', m ? '1' : '0'); } catch (e) {} };
    let m0 = innerWidth < 768; try { const v = localStorage.getItem('bb-mk-min'); if (v) m0 = v === '1'; } catch (e) {}
    setMin(m0); minBtn.addEventListener('click', () => setMin(!mk.classList.contains('min')));
    const mb = $('#mk-motion'); mb.textContent = 'Gerak: ' + (motionOn ? 'nyala' : 'mati'); mb.setAttribute('aria-pressed', String(motionOn));
    mb.addEventListener('click', () => { try { localStorage.setItem('bb-motion', motionOn ? 'off' : 'on'); } catch (e) {} location.reload(); });
    $('#mk-loader').addEventListener('click', () => { store.del('bb-loaded'); location.href = 'index.html'; });
    const notes = $('#notes');
    $('#mk-notes').addEventListener('click', () => { notes.classList.add('open'); $('#notes-close').focus(); });
    $('#notes-close').addEventListener('click', () => notes.classList.remove('open'));
    notes.addEventListener('click', (e) => { if (e.target === notes) notes.classList.remove('open'); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') { notes.classList.remove('open'); closeMenu(); } });
    if (/[?&]shot/.test(location.search)) mk.hidden = true;
  }

  /* ---------- Detail proyek dari ?p= ---------- */
  const pd = $('[data-project-detail]');
  if (pd && P.length) {
    const slug = new URLSearchParams(location.search).get('p') || pd.dataset.projectDetail;
    const i = Math.max(0, P.findIndex((p) => p.slug === slug)); const p = P[i]; const n = P[(i + 1) % P.length];
    $$('[data-pd]').forEach((el) => { const k = el.dataset.pd; if (k === 'img') el.src = `img/p-${p.slug}.webp`; else if (p[k]) el.textContent = p[k]; });
    $$('[data-next]').forEach((el) => { const k = el.dataset.next; if (k === 'img') el.src = `img/p-${n.slug}.webp`; else if (k === 'href') el.href = `project.html?p=${n.slug}`; else el.textContent = n[k]; });
    document.title = `${p.name} · Brooklynbyte mockup`;
  }

  /* ---------- Menu ---------- */
  const menu = $('#menu'); let menuTl = null;
  function openMenu() {
    if (!menu) return; menu.classList.add('open'); menu.setAttribute('aria-hidden', 'false'); $('.menu-btn').setAttribute('aria-expanded', 'true');
    if (window.lenis) lenis.stop();
    if (motionOn && window.gsap) {
      menuTl = gsap.timeline();
      menuTl.fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: MOTION.base, ease: 'customEase' })
        .fromTo($$('.menu-list a', menu), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: MOTION.base, ease: MOTION.ease, stagger: 0.06, clearProps: 'opacity,transform' }, '-=0.25')
        .fromTo($$('.menu-info > *', menu), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: MOTION.base, ease: MOTION.ease, stagger: 0.05, clearProps: 'opacity,transform' }, '<');
    }
    setTimeout(() => $('.menu-close', menu).focus(), 50);
  }
  function closeMenu() {
    if (!menu || !menu.classList.contains('open')) return;
    const done = () => { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); $('.menu-btn').setAttribute('aria-expanded', 'false'); if (window.lenis) lenis.start(); $('.menu-btn').focus(); };
    if (motionOn && window.gsap) gsap.to(menu, { clipPath: 'inset(0% 0% 100% 0%)', duration: MOTION.base * 0.8, ease: 'customEase', onComplete: () => { gsap.set(menu, { clearProps: 'clipPath' }); done(); } });
    else done();
  }
  $('.menu-btn') && $('.menu-btn').addEventListener('click', openMenu);
  menu && $('.menu-close', menu).addEventListener('click', closeMenu);

  /* ---------- Video ---------- */
  $$('[data-video-toggle]').forEach((b) => { const v = b.closest('.frame').querySelector('video');
    const set = (play) => { if (play) v.play().catch(() => {}); else v.pause(); b.textContent = play ? 'Pause video' : 'Play video'; b.setAttribute('aria-pressed', String(!play)); };
    b.addEventListener('click', () => set(v.paused)); set(motionOn); });

  /* ---------- Jam studio (Brooklyn) ---------- */
  const clk = $('[data-clock]');
  if (clk) { const tick = () => { try { clk.textContent = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' }).format(new Date()); } catch (e) {} }; tick(); setInterval(tick, 30000); }

  /* ---------- Akordeon (juga tanpa gerak) ---------- */
  $$('.acc-item').forEach((it) => { const btn = $('.acc-btn', it), panel = $('.acc-panel', it);
    btn.addEventListener('click', () => { const open = !it.classList.contains('open');
      $$('.acc-item.open', it.parentElement).forEach((o) => { if (o !== it) { o.classList.remove('open'); $('.acc-btn', o).setAttribute('aria-expanded', 'false'); if (motionOn && window.gsap) gsap.to($('.acc-panel', o), { height: 0, duration: MOTION.base, ease: MOTION.ease }); } });
      it.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open));
      if (motionOn && window.gsap) gsap.fromTo(panel, { height: open ? 0 : panel.offsetHeight }, { height: open ? 'auto' : 0, clearProps: 'height', duration: MOTION.base, ease: MOTION.ease, onComplete: () => window.ScrollTrigger && ScrollTrigger.refresh() });
    }); });

  /* ---------- Filter (Flip) ---------- */
  $$('[data-filter]').forEach((bar) => { const list = $(bar.dataset.filter);
    $$('button', bar).forEach((b) => b.addEventListener('click', () => {
      $$('button', bar).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const f = b.dataset.f; const items = $$('[data-cat]', list);
      const state = motionOn && window.Flip ? Flip.getState(items) : null;
      items.forEach((it) => { it.hidden = !(f === 'all' || it.dataset.cat.split(' ').includes(f)); });
      if (state) Flip.from(state, { duration: MOTION.base, ease: MOTION.ease, absolute: true, onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: MOTION.base }), onLeave: (els) => gsap.to(els, { opacity: 0, duration: MOTION.fast }) });
      window.ScrollTrigger && setTimeout(() => ScrollTrigger.refresh(), MOTION.base * 1000 + 50);
    })); });

  if (!motionOn || !window.gsap) { root.classList.remove('is-loading', 'pt-cover'); return; }

  /* ================= GERAK ================= */
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, Flip, ScrambleTextPlugin);
  CustomEase.create('customEase', 'M0,0 C0.86,0 0.07,1 1,1');
  root.classList.add('js-anim', 'js-mood');

  const lenis = new Lenis({ autoRaf: false, anchors: true }); window.lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);

  /* ---------- Page transition ---------- */
  const pt = $('.pt'), ptLabel = $('.pt span');
  gsap.set(pt, { yPercent: root.classList.contains('pt-cover') ? 0 : 100 });
  const label = (href) => { const f = href.split('/').pop().split('?')[0];
    return ({ 'index.html': 'Home', 'projects.html': 'Projects', 'about.html': 'About us', 'blog.html': 'Blog', 'post.html': 'Journal' })[f] || (f === 'project.html' ? ((P.find((p) => href.includes('p=' + p.slug)) || {}).name || 'Project') : 'Brooklynbyte'); };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]'); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const href = a.getAttribute('href'); if (!/\.html(\?|$)/.test(href)) return;
    e.preventDefault(); const go = () => { store.set('bb-pt', label(href)); location.href = href; };
    ptLabel.textContent = '';
    pt.style.visibility = 'visible';
    gsap.timeline({ onComplete: go })
      .fromTo(pt, { yPercent: 100 }, { yPercent: 0, duration: MOTION.base, ease: 'customEase' })
      .to(ptLabel, { duration: 0.5, scrambleText: { text: label(href), chars: 'lowerCase', speed: 0.6 } }, '-=0.2');
  });
  function pageIn(after) {
    const l = store.get('bb-pt'); store.del('bb-pt');
    if (!l) { after(); return; }
    ptLabel.textContent = l; gsap.set(pt, { yPercent: 0 }); root.classList.remove('pt-cover');
    pt.style.visibility = 'visible';
    gsap.to(pt, { yPercent: -100, duration: MOTION.slow * 0.8, ease: 'customEase', delay: 0.15, onComplete: () => { gsap.set(pt, { yPercent: 100 }); pt.style.visibility = ''; } });
    gsap.delayedCall(0.35, after);
    const h1 = $('h1'); if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  }
  addEventListener('pageshow', (e) => { if (e.persisted) { gsap.set(pt, { yPercent: 100 }); root.classList.remove('pt-cover'); } });

  /* ---------- Kursor + magnetik + tombol ---------- */
  if (fine) {
    const c = $('.cursor'); const xTo = gsap.quickTo(c, 'x', { duration: 0.4, ease: 'power3' }), yTo = gsap.quickTo(c, 'y', { duration: 0.4, ease: 'power3' });
    addEventListener('pointermove', (e) => { c.classList.add('on'); xTo(e.clientX); yTo(e.clientY); });
    document.addEventListener('pointerover', (e) => { const v = e.target.closest('[data-cursor]'); c.classList.toggle('big', !!v); if (v) $('span', c).textContent = v.dataset.cursor; });
    $$('[data-magnetic]').forEach((el) => { const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' }), y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * 0.25); y((e.clientY - r.top - r.height / 2) * 0.35); });
      el.addEventListener('pointerleave', () => { x(0); y(0); }); });
  }
  $$('.btn').forEach((b) => b.addEventListener('pointerenter', (e) => { const r = b.getBoundingClientRect(); b.style.setProperty('--x', `${e.clientX - r.left}px`); b.style.setProperty('--y', `${e.clientY - r.top}px`); }));

  /* ---------- Header hide ---------- */
  const header = $('.site-header');
  ScrollTrigger.create({ start: 120, end: 'max', onUpdate: (s) => gsap.to(header, { yPercent: s.direction === 1 ? -110 : 0, duration: MOTION.fast, ease: 'power2.out', overwrite: true }) });

  /* ---------- Mood body ---------- */
  const moods = () => $$('main > [data-mood]:not([data-mood-static])').forEach((sec) => ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: (s) => { if (s.isActive) document.body.dataset.mood = sec.dataset.mood; } }));

  /* ---------- Efek umum ---------- */
  const introTweens = [];
  const padMasks = (s) => (s.masks || []).forEach((m) => { m.style.paddingBottom = '0.14em'; m.style.marginBottom = '-0.14em'; });
  function generic() {
    $$('[data-scramble]').forEach((el) => { const t = el.textContent; gsap.to(el, { duration: 0.9, scrambleText: { text: t, chars: 'upperCase', speed: 0.5 }, scrollTrigger: { trigger: el, start: 'top 88%' } }); });
    $$('[data-split]').forEach((el) => { const s = new SplitText(el, { type: 'lines', mask: 'lines' }); padMasks(s); const intro = !!el.closest('.page-head');
      const tw = gsap.from(s.lines, { yPercent: 105, duration: MOTION.slow, ease: MOTION.ease, stagger: 0.08, paused: intro, scrollTrigger: intro ? null : { trigger: el, start: 'top 85%' } });
      if (intro) introTweens.push(tw); });
    $$('.page-head [data-intro]').forEach((el) => introTweens.push(gsap.from(el, { y: 30, opacity: 0, duration: MOTION.base * 1.4, ease: MOTION.ease, delay: 0.25, paused: true })));
    $$('[data-reveal]').forEach((el) => gsap.from(el, { y: 40, opacity: 0, duration: MOTION.base * 1.4, ease: MOTION.ease, scrollTrigger: { trigger: el, start: 'top 86%' } }));
    $$('[data-stagger]').forEach((el) => gsap.from(el.children, { y: 48, opacity: 0, duration: MOTION.base * 1.4, ease: MOTION.ease, stagger: 0.07, scrollTrigger: { trigger: el, start: 'top 85%' } }));
    $$('[data-clip]').forEach((el) => { const img = $('img', el);
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%' } }).fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: MOTION.slow, ease: 'customEase' }).from(img, { scale: 1.15, duration: MOTION.slow * 1.3, ease: MOTION.ease }, 0); });
    $$('[data-parallax]').forEach((el) => gsap.fromTo(el, { yPercent: -(+el.dataset.parallax) }, { yPercent: +el.dataset.parallax, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
    $$('[data-count]').forEach((el) => { const to = +el.dataset.count, suf = el.dataset.suffix || ''; const o = { v: 0 };
      gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' }, onUpdate: () => { el.textContent = Math.round(o.v) + suf; } }); el.textContent = '0' + suf; });
    $$('[data-rise]').forEach((el) => { gsap.from(el.children, { y: 120, opacity: 0, duration: MOTION.slow, ease: MOTION.ease, stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 80%' } });
      gsap.from($$('.chip', el), { scale: 0.6, opacity: 0, duration: MOTION.base, ease: 'back.out(2)', stagger: 0.03, delay: 0.4, scrollTrigger: { trigger: el, start: 'top 80%' } }); });
    $$('.marq').forEach((m) => { const tr = $('.marq-track', m); tr.innerHTML += tr.innerHTML; const tw = gsap.to(tr, { xPercent: -50, duration: +m.dataset.speed || 30, ease: 'none', repeat: -1 });
      m.addEventListener('pointerenter', () => gsap.to(tw, { timeScale: 0.25, duration: 0.6 })); m.addEventListener('pointerleave', () => gsap.to(tw, { timeScale: 1, duration: 0.6 }));
      ScrollTrigger.create({ trigger: m, onUpdate: (s) => gsap.to(tw, { timeScale: s.direction * (1 + Math.min(Math.abs(s.getVelocity()) / 800, 3)), duration: 0.3, overwrite: true, onComplete: () => gsap.to(tw, { timeScale: Math.sign(tw.timeScale()) || 1, duration: 0.8 }) }) }); });
    // Pratinjau kursor (Services, Projects)
    $$('[data-preview]').forEach((zone) => { if (!fine) return; const pv = $(zone.dataset.preview); if (!pv) return; const img = $('img', pv);
      const xTo = gsap.quickTo(pv, 'x', { duration: 0.5, ease: 'power3' }), yTo = gsap.quickTo(pv, 'y', { duration: 0.5, ease: 'power3' });
      zone.addEventListener('pointermove', (e) => { xTo(e.clientX + 24); yTo(e.clientY - 110); });
      $$('[data-img]', zone).forEach((it) => it.addEventListener('pointerenter', () => { if (img.getAttribute('src') !== it.dataset.img) { img.src = it.dataset.img; gsap.fromTo(img, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: MOTION.base, ease: 'customEase' }); } }));
      zone.addEventListener('pointerenter', () => gsap.to(pv, { autoAlpha: 1, scale: 1, duration: MOTION.base, ease: MOTION.ease }));
      zone.addEventListener('pointerleave', () => gsap.to(pv, { autoAlpha: 0, scale: 0.6, duration: MOTION.fast })); });
    // Wipe CTA
    $$('[data-wipe]').forEach((el) => gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 48px 48px 0 0)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 30%', scrub: true } }));
    // Footer v3: huruf wordmark naik per huruf
    if ($('.wm')) gsap.from($$('.wm span'), { yPercent: 105, duration: MOTION.slow, ease: MOTION.ease, stagger: 0.04, scrollTrigger: { trigger: '.wm', start: 'top 98%' } });
    // Progres baca
    const rb = $('.readbar'); if (rb) gsap.to(rb, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.prose', start: 'top 60%', end: 'bottom bottom', scrub: true } });
    // Next project
    const nx = $('.next'); if (nx) gsap.fromTo($('img', nx), { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: nx, start: 'top bottom', end: 'bottom bottom', scrub: true } });
  }

  /* ---------- Hero ---------- */
  function heroIn() {
    introTweens.forEach((t) => t.play());
    const hero = $('.hero'); if (!hero) return;
    const s = new SplitText($('.hero h1'), { type: 'lines', mask: 'lines' }); padMasks(s);
    const tl = gsap.timeline({ defaults: { ease: MOTION.ease } });
    tl.fromTo('.hero .frame', { clipPath: 'inset(14% 10% 0% 10% round 32px)' }, { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: MOTION.slow * 1.2, ease: 'customEase' })
      .from('.hero .frame video', { scale: 1.25, duration: MOTION.slow * 1.6 }, 0)
      .from(s.lines, { yPercent: 105, duration: MOTION.slow, stagger: 0.09 }, 0.15)
      .from('.hero-side > *', { y: 30, opacity: 0, duration: MOTION.base * 1.4, stagger: 0.08 }, 0.4)
      .from('.hero .frame-meta > *', { y: 20, opacity: 0, duration: MOTION.base, stagger: 0.06 }, 0.8);
    // Hero → About: bingkai mengecil
    gsap.to('.hero .frame', { scale: 0.92, borderRadius: 64, ease: 'none', scrollTrigger: { trigger: '.hero .frame', start: 'top 20%', end: 'bottom top', scrub: true } });
  }

  /* ---------- C1 dibalik: foto kecil → layar penuh ---------- */
  function imageScale() {
    $$('.iscale').forEach((sec) => {
      const img = $('.iscale-right img', sec), wrap = $('.iscale-right', sec), h2 = $('h2', sec), num = $('.num', sec), to = +num.dataset.to;
      // Timeline asli C1 (foto penuh → kecil), dimainkan TERBALIK oleh scroll
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      tl.to(wrap, { xPercent: 50, duration: 20 }, 0).to(img, { xPercent: -40, duration: 20 }, 0)
        .to(img, { transformOrigin: 'bottom center', scale: 0.9, duration: 70 }, 30)
        .to($('.box--one', sec), { scaleY: 1, duration: 10 }, 30).to($('.box--two', sec), { scaleX: 1, duration: 10 }, 40)
        .to($('.box--three', sec), { scaleY: 0.7, duration: 10 }, 50).to($('.box--four', sec), { scaleX: 1, duration: 10 }, 60);
      if (innerWidth < 768) tl.to(wrap, { yPercent: 60, xPercent: 0, duration: 20 }, 0).to(img, { yPercent: -30, xPercent: 0, duration: 20 }, 0);
      gsap.set($$('.box', sec), { scale: 0 }); gsap.set($$('.box--one,.box--three', sec), { scaleX: 1 }); gsap.set($$('.box--two,.box--four', sec), { scaleY: 1 });
      tl.progress(1);
      const o = { v: 0 };
      ScrollTrigger.create({ trigger: sec, start: 'top top', end: '+=1600', pin: true, scrub: true,
        onUpdate: (s) => { const p = s.progress;
          tl.progress(1 - gsap.utils.clamp(0, 1, (p - 0.25) / 0.75));             // foto membesar setelah angka mulai naik
          o.v = to * gsap.utils.clamp(0, 1, p / 0.6); num.textContent = Math.round(o.v);
          h2.style.color = p > 0.45 ? 'var(--color-accent)' : '';
          img.style.filter = `brightness(${1 - 0.28 * gsap.utils.clamp(0, 1, (p - 0.7) / 0.3)})`;
          gsap.set($('.iscale-cap', sec), { opacity: gsap.utils.clamp(0, 1, (p - 0.85) / 0.15) }); } });
    });
  }

  /* ---------- C2 showcase ---------- */
  function showcase() {
    const sec = $('.showcase'); if (!sec) return;
    const bgs = $$('.sc-bg img', sec), L = $$('.sc-col.l a', sec), R = $$('.sc-col.r span', sec), F = $$('.sc-feat a', sec), N = bgs.length;
    const cur = $('.sc-prog .a', sec), fill = $('.sc-prog i', sec), dur = MOTION.base;
    const words = F.map((a) => { const s = new SplitText($('b', a), { type: 'words', wordsClass: 'sw' }); s.words.forEach((w) => { const m = document.createElement('span'); m.className = 'w'; w.parentNode.insertBefore(m, w); m.appendChild(w); }); return s.words; });
    words.forEach((w, i) => gsap.set(w, { yPercent: i ? 100 : 0, opacity: i ? 0 : 1 }));
    let current = 0, animating = false, snapping = false;
    const stepVH = 0.8, steps = () => innerHeight * stepVH * N, top = () => sec.getBoundingClientRect().top + scrollY;
    const posOf = (i) => top() + innerHeight * stepVH * i + 2;
    function change(n) {
      if (n === current || animating) return; animating = true; const down = n > current, prev = current; current = n;
      cur.textContent = String(n + 1).padStart(2, '0'); fill.style.width = `${(n / (N - 1)) * 100}%`;
      gsap.to(words[prev], { yPercent: down ? -100 : 100, opacity: 0, duration: dur * 0.6, stagger: down ? 0.03 : -0.03, ease: 'customEase', onComplete: () => F[prev].classList.remove('active') });
      F[n].classList.add('active'); gsap.fromTo(words[n], { yPercent: down ? 100 : -100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur, stagger: down ? 0.05 : -0.05, ease: 'customEase' });
      bgs.forEach((bg, i) => { bg.classList.remove('previous', 'active');
        if (i === n) { gsap.set(bg, { opacity: 1, y: 0, clipPath: down ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)' }); gsap.to(bg, { clipPath: 'inset(0% 0 0% 0)', duration: dur, ease: 'customEase' }); bg.classList.add('active'); }
        else if (i === prev) { bg.classList.add('previous'); gsap.to(bg, { y: down ? '5%' : '-5%', duration: dur, ease: 'customEase' });
          gsap.to(bg, { opacity: 0, delay: dur * 0.5, duration: dur * 0.5, ease: 'customEase', onComplete: () => { bg.classList.remove('previous'); gsap.set(bg, { y: 0 }); animating = false; } }); }
        else gsap.to(bg, { opacity: 0, duration: dur * 0.3 }); });
      [L, R].forEach((list) => list.forEach((el, i) => el.classList.toggle('active', i === n)));
    }
    function go(i, d = 0.6) { if (i < 0 || i >= N || i === current || animating || snapping) return; snapping = true; change(i);
      lenis.scrollTo(posOf(i), { duration: d, easing: (t) => 1 - Math.pow(1 - t, 3), lock: true, onComplete: () => { snapping = false; } }); }
    ScrollTrigger.create({ trigger: sec, start: 'top top', end: () => `+=${steps()}`,
      onUpdate: (s) => { if (snapping) return; const t = Math.min(N - 1, Math.floor(s.progress * N)); if (t !== current && !animating) go(current + (t > current ? 1 : -1)); } });
    // Kolom muncul berurutan (C2 animateColumns)
    ScrollTrigger.create({ trigger: sec, start: 'top 60%', once: true, onEnter: () => { gsap.from(L, { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', clearProps: 'all' }); gsap.from(R, { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.06, delay: 0.2, ease: 'power2.out', clearProps: 'all' }); } });
    L.forEach((a, i) => a.addEventListener('click', (e) => { if (i !== current) { e.preventDefault(); go(i, 0.8); } }));
    // Keluar: kontainer menyusut + blur (C2 end-section)
    const pin = $('.sc-pin', sec), blurEls = $$('.sc-foot, .sc-col, .sc-feat', sec);
    ScrollTrigger.create({ trigger: sec, start: () => `top+=${steps()} top`, end: 'bottom bottom', scrub: true,
      onUpdate: (s) => { blurEls.forEach((el) => el.classList.toggle('sc-blur', s.progress > 0.1)); const p = gsap.utils.clamp(0, 1, (s.progress - 0.1) / 0.9);
        gsap.to(pin, { clipPath: `inset(0% 0% ${p * 100}% 0%)`, duration: 0.1 }); gsap.to($('.sc-title.t', sec), { y: -p * 300, duration: 0.1 }); gsap.to($('.sc-mid', sec), { y: -p * 200, duration: 0.1 }); gsap.to($('.sc-foot', sec), { y: -p * 100, duration: 0.1 }); } });
  }

  /* ---------- Loader → hero ---------- */
  function loader(after) {
    const el = $('.loader'); if (!el || !root.classList.contains('is-loading')) { after(); return; }
    const ctr = $('.ctr', el); let c = 0;
    const iv = setInterval(() => { c += Math.random() * 3 + 1; if (c >= 100) { c = 100; clearInterval(iv);
        gsap.timeline({ delay: 0.2 }).to($$('.loader > *'), { y: -20, opacity: 0, duration: 0.6, ease: 'power2.inOut', stagger: 0.05 })
          .to(el, { yPercent: -100, duration: MOTION.slow, ease: 'power3.inOut', onStart: () => { gsap.delayedCall(0.45, after); } }, '+=0.1')
          .add(() => { root.classList.remove('is-loading'); gsap.set(el, { clearProps: 'all' }); store.set('bb-loaded', '1'); ScrollTrigger.refresh(); }); }
      ctr.textContent = `[${String(Math.round(c)).padStart(2, '0')}]`; }, 30);
  }

  /* ---------- Mulai ---------- */
  const start = () => { imageScale(); showcase(); generic(); moods(); ScrollTrigger.refresh(); };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    start();
    if (root.classList.contains('is-loading')) loader(heroIn); else pageIn(heroIn);
    addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  });
})();
