#!/usr/bin/env python3
"""Merakit 6 halaman mockup Brooklynbyte dari partial yang sama.
Jalankan: python3 design/mockup/src/build.py  -> design/mockup/*.html
Copy = DRAF (fiktif). Pemilik: ui-ux-designer."""
import json, html, pathlib
OUT = pathlib.Path(__file__).resolve().parent.parent
WA = "https://wa.me/6281200000000?text=Hi%20Brooklynbyte%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z"/></svg>'
ARR = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>'

PROJECTS = [
 dict(slug="halcyon",  name="Halcyon Bank",     cat="product",  catLabel="Product",  year="2026", client="Halcyon Bank",        role="Product design, iOS & Android", result="Daily active users up 41%",      challenge="A legacy banking app with a 2.1-star rating and a support queue that never emptied.", approach="We rebuilt onboarding, payments and cards around five core jobs, then shipped weekly behind feature flags.", r=["41%","DAU growth"],r2=["4.7","App Store rating"],r3=["-38%","Support tickets"]),
 dict(slug="northwind",name="Northwind Coffee", cat="branding", catLabel="Branding", year="2026", client="Northwind Coffee Co.", role="Brand identity, packaging", result="Shelf sales up 2.3×",              challenge="A loved local roaster with packaging nobody could find on a supermarket shelf.", approach="A single bold mark, a color per origin, and a modular label system that prints on any bag.", r=["2.3×","Shelf sales"],r2=["18","Retail partners"],r3=["6 wk","Brand to shelf"]),
 dict(slug="atlas",    name="Atlas Freight",    cat="web",      catLabel="Web",      year="2025", client="Atlas Freight",        role="Website, design system", result="Qualified leads up 3.1×",        challenge="Enterprise buyers bounced from a site that explained trucks instead of outcomes.", approach="Route-level case stories, an instant quote flow and a component library for their team.", r=["3.1×","Qualified leads"],r2=["0.9s","LCP on mobile"],r3=["120+","Components"]),
 dict(slug="meridian", name="Meridian Health",  cat="product",  catLabel="Product",  year="2025", client="Meridian Health",      role="Patient app, research", result="No-shows down 27%",               challenge="Patients missed appointments because reminders lived in four different places.", approach="One calm timeline for every visit, with reminders, prep notes and rescheduling in two taps.", r=["-27%","No-shows"],r2=["92%","Task success"],r3=["3","Clinics live"]),
 dict(slug="kinfolk",  name="Kinfolk Market",   cat="web",      catLabel="E-commerce", year="2025", client="Kinfolk Market",     role="E-commerce, Shopify", result="Conversion up 64%",                challenge="A farm-to-door grocer whose checkout took eleven steps on a phone.", approach="A three-step checkout, saved baskets and a weekly box builder that remembers your family.", r=["64%","Conversion"],r2=["3","Checkout steps"],r3=["+22%","Basket size"]),
 dict(slug="pulse",    name="Pulse Festival",   cat="campaign", catLabel="Campaign", year="2024", client="Pulse Festival",       role="Campaign, motion, social", result="Sold out in 9 days",           challenge="A new festival competing with three established names on the same weekend.", approach="A sound-reactive identity, artist-led teasers and a countdown site that turned fans into promoters.", r=["9 days","To sell out"],r2=["38k","Tickets"],r3=["12M","Views"]),
 dict(slug="verde",    name="Verde Homes",      cat="web",      catLabel="Web",      year="2024", client="Verde Homes",          role="Website, 3D tours", result="Viewings booked up 2.8×",        challenge="Buyers could not picture a building that did not exist yet.", approach="Floor-by-floor tours, real light studies and a booking flow that sits beside every unit.", r=["2.8×","Viewings booked"],r2=["74%","Units pre-sold"],r3=["4 min","Avg. visit"]),
 dict(slug="orbit",    name="Orbit Labs",       cat="branding", catLabel="Branding", year="2024", client="Orbit Labs",           role="Naming, identity, website", result="Series A closed in 6 weeks",  challenge="A deep-tech team with a brilliant product and a name nobody could spell.", approach="A new name, an identity built from orbital paths and a launch site written for investors.", r=["6 wk","To Series A"],r2=["$14M","Raised"],r3=["1","Name, finally"]),
 dict(slug="loom",     name="Loom & Thread",    cat="web",      catLabel="E-commerce", year="2023", client="Loom & Thread",      role="E-commerce, photography direction", result="Repeat orders up 52%", challenge="A knitwear label selling slow fashion on a site that felt fast and cheap.", approach="Editorial product pages, care guides and a repair program that brings customers back.", r=["52%","Repeat orders"],r2=["2.4×","Time on page"],r3=["1.2k","Repairs booked"]),
 dict(slug="signal",   name="Signal FM",        cat="campaign", catLabel="Campaign", year="2023", client="Signal FM",            role="Rebrand campaign, audio identity", result="Listeners up 33%",      challenge="A 30-year-old radio station that younger listeners had never heard of.", approach="A waveform identity, a city-wide poster takeover and short clips built for phones.", r=["33%","New listeners"],r2=["5.6M","Impressions"],r3=["#1","Morning slot"]),
]
POSTS = [
 dict(n=1, title="Why your portfolio site should load in under one second", tag="Engineering", date="Oct 28, 2026", read="6 min"),
 dict(n=2, title="Naming a company without losing your mind", tag="Branding", date="Oct 14, 2026", read="8 min"),
 dict(n=3, title="Motion that helps, not motion that shows off", tag="Design", date="Sep 30, 2026", read="5 min"),
 dict(n=4, title="The three-step checkout: a field guide", tag="Product", date="Sep 12, 2026", read="7 min"),
 dict(n=5, title="What we learned shipping weekly for a bank", tag="Product", date="Aug 26, 2026", read="9 min"),
 dict(n=6, title="Design systems for teams of five", tag="Design", date="Aug 8, 2026", read="6 min"),
]
SERVICES = [
 ("Brand strategy & identity","Positioning, naming, logo and a visual system that works from a pitch deck to a billboard.","p-northwind"),
 ("Websites & e-commerce","Fast, accessible sites on Astro or Shopify that your team can update without calling us.","p-atlas"),
 ("Product design","Research, flows and interfaces for web and mobile apps, tested with real users every sprint.","p-halcyon"),
 ("Engineering","Frontend, mobile and APIs built to last, with tests, docs and a clean handover.","p-meridian"),
 ("Motion & campaigns","Launch films, social motion and interactive moments people remember and share.","p-pulse"),
 ("Growth & analytics","Measurement, experiments and monthly reports that tie design to revenue.","p-kinfolk"),
]
CLIENTS = ["Halcyon Bank","Northwind","Atlas Freight","Meridian","Kinfolk","Pulse","Verde Homes","Orbit Labs","Loom & Thread","Signal FM"]
TEAM = [("Maya Okafor","Founder, Creative Director"),("Daniel Reyes","Technical Director"),("Sora Kim","Design Lead"),("Leo Brandt","Engineering Lead"),
        ("Amara Singh","Product Designer"),("Theo Laurent","Motion Designer"),("Nina Petrova","Frontend Engineer"),("Jonah Wells","Strategist")]

e = html.escape
def page(name, title, body, mood="night", extra_head=""):
    nav = [("index.html","Home"),("projects.html","Projects"),("about.html","About"),("blog.html","Blog"),("project.html?p=northwind","Detail"),("post.html","Post")]
    mk_links = "".join(f'<a href="{h}"{" aria-current=\"page\"" if h.split("?")[0]==name else ""}>{l}</a>' for h,l in nav)
    return f"""<!doctype html>
<!-- Brooklynbyte · mockup v1 · {name} · ui-ux-designer · BUKAN kode produksi · copy draf & fiktif -->
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)} · Brooklynbyte mockup</title>
<link rel="icon" href="data:,">
<script>(function(){{var r=document.documentElement,m='on';try{{m=localStorage.getItem('bb-motion')||(matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on')}}catch(e){{}}
if(m==='off'){{r.classList.add('no-motion');return}}
try{{if(sessionStorage.getItem('bb-pt'))r.classList.add('pt-cover');if({'true' if name=='index.html' else 'false'}&&!sessionStorage.getItem('bb-loaded'))r.classList.add('is-loading')}}catch(e){{}}}})();</script>
<link rel="stylesheet" href="assets/mockup.css">
{extra_head}
</head>
<body data-mood="{mood}">
<a class="sr-only" href="#main">Skip to content</a>
{'<div class="loader" aria-hidden="true"><b>brooklynbyte</b><span class="ctr">[00]</span></div>' if name=='index.html' else ''}
<div class="pt" aria-hidden="true"><span></span></div>
<header class="site-header">
  <div class="wrap">
    <a class="logo" href="index.html" aria-label="Brooklynbyte home">brooklynbyte<sup>®</sup></a>
    <div class="h-right">
      <a class="h-wa ulink type-small" href="{WA}" target="_blank" rel="noopener">Chat on WhatsApp</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span>Menu</span><i aria-hidden="true"></i></button>
    </div>
  </div>
</header>
<div class="menu" id="menu" data-mood="night" aria-hidden="true" role="dialog" aria-label="Menu">
  <button class="menu-close" type="button">Close ✕</button>
  <div class="menu-in">
    <div class="menu-info">
      <p class="type-label muted">Brooklynbyte studio</p>
      <address class="type-lead" style="font-style:normal">214 Wythe Ave<br>Brooklyn, NY 11249</address>
      <p><a class="ulink type-lead" href="mailto:hello@brooklynbyte.studio">hello@brooklynbyte.studio</a></p>
      <p><a class="btn" href="{WA}" target="_blank" rel="noopener" data-magnetic>{WA_SVG[:4]} width="18" height="18"{WA_SVG[4:]}<span class="roll"><span data-t="Chat on WhatsApp">Chat on WhatsApp</span></span></a></p>
    </div>
    <nav class="menu-list" aria-label="Main">
      <a href="index.html"><span class="arr">→</span>Home<sup>01</sup></a>
      <a href="projects.html"><span class="arr">→</span>Projects<sup>02</sup></a>
      <a href="about.html"><span class="arr">→</span>About us<sup>03</sup></a>
      <a href="blog.html"><span class="arr">→</span>Blog<sup>04</sup></a>
    </nav>
  </div>
  <div class="menu-foot type-small muted"><a class="ulink" href="#">Instagram</a><a class="ulink" href="#">LinkedIn</a><a class="ulink" href="#">Dribbble</a></div>
</div>

<main id="main">
{body}
</main>

{footer()}
<a class="wa" href="{WA}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" data-magnetic>{WA_SVG}<span class="lbl">Chat on WhatsApp</span></a>
<div class="cursor" aria-hidden="true"><span>View</span></div>
{panel(mk_links)}
<script>window.BB_PROJECTS={json.dumps([{k:p[k] for k in ('slug','name','catLabel','year','client','role','result','challenge','approach')} | {'r1v':p['r'][0],'r1l':p['r'][1],'r2v':p['r2'][0],'r2l':p['r2'][1],'r3v':p['r3'][0],'r3l':p['r3'][1]} for p in PROJECTS])};</script>
<script src="vendor/gsap.min.js"></script><script src="vendor/ScrollTrigger.min.js"></script><script src="vendor/CustomEase.min.js"></script>
<script src="vendor/SplitText.min.js"></script><script src="vendor/Flip.min.js"></script><script src="vendor/ScrambleTextPlugin.min.js"></script><script src="vendor/lenis.min.js"></script>
<script src="assets/mockup.js"></script>
</body>
</html>
"""

def footer():
    return f"""<footer class="site-footer" data-mood="paper">
  <div class="fgrid">
    <div class="fcell" data-reveal>
      <p class="type-label muted lbl-dot">Contact</p>
      <a class="flink type-h3" href="mailto:hello@brooklynbyte.studio">hello@brooklynbyte.studio</a>
      <a class="flink" href="{WA}" target="_blank" rel="noopener">Chat on WhatsApp <span class="fa" aria-hidden="true">↗</span></a>
    </div>
    <div class="fcell" data-reveal>
      <p class="type-label muted lbl-dot">Menu</p>
      <nav class="frow" aria-label="Footer"><a class="flink" href="index.html">Home</a><a class="flink" href="projects.html">Projects</a><a class="flink" href="about.html">About us</a><a class="flink" href="blog.html">Blog</a></nav>
      <p class="frow"><a class="flink muted" href="#">Instagram</a><a class="flink muted" href="#">LinkedIn</a><a class="flink muted" href="#">Dribbble</a></p>
    </div>
  </div>
  <div class="flegal type-small muted"><p>© 2026 Brooklynbyte · Fictional company</p><a class="totop" href="#main">Back to top <span class="a" aria-hidden="true">↑</span></a></div>
  <div class="wm" aria-hidden="true"><p>{''.join(f'<span>{c}</span>' for c in 'brooklynbyte')}</p></div>
</footer>"""

def panel(links):
    return f"""<aside class="mk" id="mk" aria-label="Mockup controls">
  <header><strong>MOCKUP v1.4 · draf</strong><button type="button" id="mk-min" aria-expanded="true">–</button></header>
  <div class="row">{links}</div>
  <div class="row"><button type="button" id="mk-motion">Gerak: nyala</button><button type="button" id="mk-loader">Putar ulang loader</button><button type="button" id="mk-notes">Catatan gerak</button></div>
</aside>
<div class="notes" id="notes" role="dialog" aria-modal="true" aria-label="Catatan gerak"><div>
  <h2>Catatan gerak · ease expo.out · transisi customEase (0.86,0,0.07,1) · fast .35 · base .64 · slow 1.2</h2>
  <table>
   <tr><th>Bagian</th><th>Efek</th><th>Pemicu</th></tr>
   <tr><td>Loader</td><td>counter [00]→[100], teks naik, panel naik 1.2s, hero terbuka</td><td>kunjungan pertama</td></tr>
   <tr><td>Page transition</td><td>panel oranye naik + nama halaman (scramble) → halaman baru, panel keluar ke atas</td><td>klik tautan</td></tr>
   <tr><td>Hero</td><td>bingkai clip terbuka, video 1.25→1, baris judul dari mask; lalu bingkai mengecil saat scroll</td><td>load / scrub</td></tr>
   <tr><td>About (C1 dibalik)</td><td>pin 1600px: angka 0→140, kotak 4→1 menyusut, foto membesar ke layar penuh</td><td>scrub</td></tr>
   <tr><td>Showcase (C2)</td><td>10 langkah snap: foto clip dari bawah/atas, judul per kata, titik aktif, progress; keluar menyusut + blur</td><td>scroll / klik daftar</td></tr>
   <tr><td>Services</td><td>akordeon tinggi 0→auto; pratinjau gambar ikut kursor</td><td>klik / hover</td></tr>
   <tr><td>Stats</td><td>angka naik 1.6s</td><td>top 85%</td></tr>
   <tr><td>Process</td><td>kartu bertingkat naik, chip pop</td><td>top 80%</td></tr>
   <tr><td>Testimonials · Clients</td><td>mood night→paper; kartu stagger; marquee mengikuti arah & kecepatan scroll</td><td>scroll</td></tr>
   <tr><td>Journal · CTA</td><td>gambar clip; blok oranye wipe-up (scrub); marquee</td><td>scroll</td></tr>
   <tr><td>Footer</td><td>tirai (≥1024px), kolom stagger, huruf wordmark naik</td><td>scroll</td></tr>
   <tr><td>Label</td><td>teks diacak lalu tersusun</td><td>top 88%</td></tr>
  </table>
  <h2>Interaksi</h2>
  <table><tr><td>Tombol pill</td><td>isi oranye tumbuh dari titik kursor, teks roll, active scale .97</td></tr>
  <tr><td>Magnetik</td><td>CTA & WhatsApp tertarik ke kursor</td></tr><tr><td>Kursor</td><td>membesar "View" di kartu/baris proyek</td></tr>
  <tr><td>Menu</td><td>item lain redup, panah masuk</td></tr><tr><td>Filter</td><td>Flip saat menyaring proyek/artikel</td></tr>
  <tr><td>Kartu</td><td>gambar scale 1.05</td></tr><tr><td>Tim</td><td>abu → berwarna</td></tr></table>
  <p>Placeholder: 6 gambar proyek, sampul blog, foto tim = grafis sementara; final dari foto stok ber-grade hangat. Gerak: mati = simulasi reduced-motion (reload).</p>
  <button type="button" id="notes-close" style="padding:8px 16px;border-radius:999px;border:0;background:#111;color:#fff;cursor:pointer">Tutup</button>
</div></div>"""

def cta():
    return f"""<section class="cta" data-mood="ember" data-mood-static data-wipe>
  <div class="wrap">
    <p class="type-label" style="text-align:center;margin-bottom:24px" data-scramble>Start a project</p>
    <h2 class="type-hero" data-split>Got a project in mind?<br>Let's talk.</h2>
    <div class="btn-wrap"><a class="btn" href="{WA}" target="_blank" rel="noopener" data-magnetic>{WA_SVG[:4]} width="22" height="22"{WA_SVG[4:]}<span class="roll"><span data-t="Chat on WhatsApp">Chat on WhatsApp</span></span></a></div>
  </div>
  <div class="marq" data-speed="26" aria-hidden="true"><div class="marq-track"><span>Brand</span><span>Websites</span><span>Products</span><span>Motion</span><span>Engineering</span><span>Growth</span></div></div>
</section>"""

def pcard_img(p): return f"img/p-{p['slug']}.webp"

def stats():
    return """<section class="sec" data-mood="night"><div class="wrap">
  <div class="sec-head"><p class="type-label muted lbl-dot" data-scramble>In numbers</p><h2 class="type-h2" data-split>Ten years of shipping work people use.</h2></div>
  <dl class="stats" data-stagger>
    <div><dt class="type-label muted">Projects shipped</dt><dd class="type-stat" data-count="140" data-suffix="+">140+</dd></div>
    <div><dt class="type-label muted">Countries</dt><dd class="type-stat" data-count="18">18</dd></div>
    <div><dt class="type-label muted">Awards</dt><dd class="type-stat" data-count="32">32</dd></div>
    <div><dt class="type-label muted">Client retention</dt><dd class="type-stat" data-count="91" data-suffix="%">91%</dd></div>
  </dl></div></section>"""

def process():
    steps=[("Discover","1 week",["Interviews","Audit","Analytics","Goals"]),("Define","2 weeks",["Strategy","User flows","Wireframes"]),("Design","3–4 weeks",["Identity","UI design","Prototype","Testing"]),("Build","4–8 weeks",["Engineering","QA","Launch","Handover","Growth"])]
    cards="".join(f'<article class="pcard"><header><h3 class="type-h3">{n}</h3><span class="type-small">{d}</span></header><ul>{"".join(f"<li class=\"chip chip-sm\">{c}</li>" for c in cs)}</ul></article>' for n,d,cs in steps)
    return f"""<section class="sec" data-mood="night"><div class="wrap">
  <div class="sec-head"><p class="type-label muted lbl-dot" data-scramble>Process</p><h2 class="type-h2" data-split>Every step is built to cut risk, not corners.</h2></div>
  <div class="proc" data-rise>{cards}</div></div></section>"""

def clients():
    return f"""<section class="sec clients" data-mood="paper" style="padding-top:0"><div class="wrap"><p class="type-label muted" style="margin-bottom:28px" data-scramble>Trusted by</p></div>
  <div class="marq" data-speed="34"><div class="marq-track">{''.join(f'<span>{c}</span>' for c in CLIENTS)}</div></div></section>"""

def testimonials():
    t=[("They shipped our app redesign in ten weeks and our ratings doubled. The team felt like ours.","Priya Nair","Head of Product, Halcyon Bank",1),
       ("The best naming process we've ever been through. Calm, fast and backed by research.","Marcus Hale","CEO, Orbit Labs",2),
       ("Our checkout went from eleven steps to three. Revenue followed in the first month.","Elena Rossi","Founder, Kinfolk Market",3)]
    cards="".join(f'<figure class="tcard"{" data-parallax=\"-6\"" if i==2 else ""}><blockquote class="type-h4" style="font-weight:500">“{q}”</blockquote><figcaption><img src="img/t-{i+3}.webp" alt="" width="48" height="48"><span><b class="type-small" style="display:block">{n}</b><span class="type-caption">{r}</span></span></figcaption></figure>' for q,n,r,i in t)
    return f"""<section class="sec" data-mood="paper"><div class="wrap">
  <div class="sec-head"><p class="type-label muted lbl-dot" data-scramble>Kind words</p><h2 class="type-h2" data-split>Clients stay for the work and the way we work.</h2></div>
  <div class="tgrid" data-stagger>{cards}</div></div></section>"""

def acards(posts):
    return "".join(f'<a class="acard" href="post.html" data-cat="{p["tag"].lower()}"><div class="img" data-clip><img src="img/b-{p["n"]}.webp" alt="" width="1200" height="750" loading="lazy"></div><div class="meta type-small muted"><span class="chip chip-sm">{p["tag"]}</span><span>{p["date"]}</span><span>· {p["read"]}</span></div><h3 class="type-h3">{p["title"]}</h3></a>' for p in posts)

# ---------------- HOME ----------------
def home():
    sc_bg="".join(f'<img src="{pcard_img(p)}" alt="" class="{"active" if i==0 else ""}" width="1600" height="1000">' for i,p in enumerate(PROJECTS))
    sc_l="".join(f'<a href="project.html?p={p["slug"]}" class="{"active" if i==0 else ""}" data-cursor="View">{p["name"]}</a>' for i,p in enumerate(PROJECTS))
    sc_r="".join(f'<span class="{"active" if i==0 else ""}">{p["catLabel"]} · {p["year"]}</span>' for i,p in enumerate(PROJECTS))
    sc_f="".join(f'<a href="project.html?p={p["slug"]}" class="{"active" if i==0 else ""}" data-cursor="View"><b>{p["result"]}</b></a>' for i,p in enumerate(PROJECTS))
    acc="".join(f'''<div class="acc-item{" open" if i==0 else ""}" data-img="img/{img}.webp"><button class="acc-btn" type="button" aria-expanded="{"true" if i==0 else "false"}"><span class="type-small muted">0{i+1}</span><span class="type-h3" style="font-weight:500">{n}</span><span class="arr" aria-hidden="true">→</span></button>
      <div class="acc-panel"><div class="acc-body"><p class="muted">{d}</p><img src="img/{img}.webp" alt="" width="1600" height="1000" loading="lazy"></div></div></div>''' for i,(n,d,img) in enumerate(SERVICES))
    return f"""
<section class="hero" data-mood="night">
  <div class="wrap">
    <div class="hero-top">
      <h1 class="type-hero">We build brands<br>people scroll for.</h1>
      <div class="hero-side">
        <p class="type-lead muted">Brooklynbyte is a design and engineering studio for startups and growing companies. Strategy, brand, websites and products, under one roof.</p>
        <div class="hero-btns"><a class="btn btn-solid" href="projects.html" data-magnetic><span class="roll"><span data-t="See our work">See our work</span></span></a><a class="btn" href="{WA}" target="_blank" rel="noopener" data-magnetic><span class="roll"><span data-t="Chat on WhatsApp">Chat on WhatsApp</span></span></a></div>
      </div>
    </div>
    <div class="frame">
      <video muted loop playsinline preload="metadata" poster="img/hero-poster.jpg" aria-hidden="true"><source src="img/hero.mp4" type="video/mp4"></video>
      <div class="frame-meta"><span class="type-label">Brooklyn, NY · Est. 2016</span><span class="type-label">Scroll ↓</span><button type="button" class="vbtn" data-video-toggle aria-pressed="false">Pause video</button></div>
    </div>
  </div>
</section>

<section class="iscale" data-mood="paper" data-mood-static aria-labelledby="about-title">
  <div class="divider" aria-hidden="true"></div><div class="hline" aria-hidden="true"></div>
  <div class="box box--one" aria-hidden="true"></div><div class="box box--two" aria-hidden="true"></div><div class="box box--three" aria-hidden="true"></div><div class="box box--four" aria-hidden="true"></div>
  <div class="wrap">
    <div class="iscale-left">
      <p class="type-label muted lbl-dot">About us</p>
      <span class="type-lead">Since 2016 we've shipped</span>
      <h2 id="about-title" class="type-hero"><span class="num" data-to="140">140</span>+<br>products</h2>
      <p class="muted" style="max-width:44ch">for banks, roasters, festivals and freight companies. One small senior team, from first workshop to launch day, and the months after.</p>
      <p><a class="ulink type-small" href="about.html">More about us →</a></p>
    </div>
  </div>
  <div class="iscale-right"><img src="img/p-halcyon.webp" alt="Phone showing the Halcyon Bank app on a desk" width="1600" height="1000"></div>
  <p class="iscale-cap type-label">Selected work ↓</p>
</section>

<section class="showcase" data-mood="night" data-mood-static aria-label="Selected projects">
  <div class="sc-pin">
    <div class="sc-bg" aria-hidden="true">{sc_bg}</div>
    <div class="sc-grid">
      <h2 class="sc-title t">Selected<br>work</h2>
      <div class="sc-mid">
        <nav class="sc-col l" aria-label="Projects">{sc_l}</nav>
        <div class="sc-feat">{sc_f}</div>
        <div class="sc-col r" aria-hidden="true">{sc_r}</div>
      </div>
      <div class="sc-foot"><p class="sc-title" aria-hidden="true">2016—<br>2026</p>
        <div class="sc-prog" aria-hidden="true"><span class="a">01</span><i></i><span class="b">10</span></div></div>
    </div>
  </div>
</section>

<section class="sec" data-mood="night" data-preview="#svc-preview">
  <div class="wrap">
    <div class="card-dark">
      <div class="sec-head"><p class="type-label muted lbl-dot" data-scramble>Services</p><h2 class="type-h2" data-split>What we can do for you.</h2></div>
      <div class="acc">{acc}</div>
    </div>
  </div>
  <div class="preview" id="svc-preview" aria-hidden="true"><img src="img/p-northwind.webp" alt=""></div>
</section>
{stats()}
{process()}
{testimonials()}
{clients()}
<section class="sec" data-mood="night"><div class="wrap">
  <div class="sec-head"><p class="type-label muted lbl-dot" data-scramble>Journal</p><div style="display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap"><h2 class="type-h2" data-split>Notes from the studio.</h2><a class="btn" href="blog.html"><span class="roll"><span data-t="All articles">All articles</span></span></a></div></div>
  <div class="cards3">{acards(POSTS[:3])}</div></div></section>
{cta()}
"""

# ---------------- PROJECTS ----------------
def projects():
    rows="".join(f'<a class="prow" href="project.html?p={p["slug"]}" data-cat="{p["cat"]}" data-img="{pcard_img(p)}" data-cursor="View"><span class="n type-small muted">{i+1:02d}</span><span class="nm">{p["name"]}</span><span class="cat type-small muted">{p["catLabel"]}</span><span class="type-small muted" style="text-align:right">{p["year"]}</span></a>' for i,p in enumerate(PROJECTS))
    f=[("all","All"),("branding","Branding"),("web","Web"),("product","Product"),("campaign","Campaign")]
    chips="".join(f'<button class="chip" type="button" data-f="{k}" aria-pressed="{"true" if k=="all" else "false"}">{l}</button>' for k,l in f)
    return f"""
<section class="page-head" data-mood="night"><div class="wrap">
  <p class="type-label muted lbl-dot" data-intro>Projects · 10</p>
  <h1 class="type-hero" data-split>Work that moved<br>the numbers.</h1>
  <div class="row"><p class="type-lead muted" style="max-width:46ch" data-intro>A selection of brands, websites and products we designed and built between 2023 and 2026.</p>
    <div class="filters" data-filter="#plist" data-intro role="group" aria-label="Filter projects">{chips}</div></div>
</div></section>
<section class="sec" data-mood="night" style="padding-top:0" data-preview="#pj-preview"><div class="wrap"><div class="plist" id="plist" data-stagger>{rows}</div></div>
  <div class="preview" id="pj-preview" aria-hidden="true"><img src="img/p-halcyon.webp" alt=""></div></section>
{cta()}
"""

# ---------------- PROJECT DETAIL ----------------
def project():
    p=PROJECTS[1]; n=PROJECTS[2]
    return f"""
<section class="page-head" data-mood="night" data-project-detail="northwind"><div class="wrap">
  <p class="type-label muted lbl-dot" data-intro><a class="ulink" href="projects.html">Projects</a> / <span data-pd="catLabel">{p['catLabel']}</span></p>
  <h1 class="type-hero" data-split data-pd="name">{p['name']}</h1>
  <p class="type-lead muted" style="margin-top:20px" data-intro data-pd="result">{p['result']}</p>
  <dl class="pd-meta" style="margin-top:48px" data-intro>
    <div><dt class="type-label muted">Client</dt><dd data-pd="client">{p['client']}</dd></div>
    <div><dt class="type-label muted">Category</dt><dd data-pd="catLabel">{p['catLabel']}</dd></div>
    <div><dt class="type-label muted">Year</dt><dd data-pd="year">{p['year']}</dd></div>
    <div><dt class="type-label muted">Our role</dt><dd data-pd="role">{p['role']}</dd></div>
  </dl>
  <div class="pd-hero" data-clip><img data-pd="img" data-parallax="6" src="{pcard_img(p)}" alt="Key visual for the project" width="1600" height="1000"></div>
</div></section>
<section class="sec" data-mood="night" style="padding-top:0"><div class="wrap">
  <div class="pd-sum" data-stagger>
    <div><p class="type-label muted lbl-dot">Challenge</p><p class="type-lead" style="margin-top:16px" data-pd="challenge">{p['challenge']}</p></div>
    <div><p class="type-label muted lbl-dot">Approach</p><p class="type-lead" style="margin-top:16px" data-pd="approach">{p['approach']}</p></div>
    <div><p class="type-label muted lbl-dot">Result</p><p class="type-lead" style="margin-top:16px" data-pd="result">{p['result']}</p></div>
  </div>
  <dl class="pd-res" data-stagger>
    <div><dd class="type-stat" data-pd="r1v">{p['r'][0]}</dd><dt class="type-small muted" data-pd="r1l">{p['r'][1]}</dt></div>
    <div><dd class="type-stat" data-pd="r2v">{p['r2'][0]}</dd><dt class="type-small muted" data-pd="r2l">{p['r2'][1]}</dt></div>
    <div><dd class="type-stat" data-pd="r3v">{p['r3'][0]}</dd><dt class="type-small muted" data-pd="r3l">{p['r3'][1]}</dt></div>
  </dl>
</div></section>
<section class="sec" data-mood="paper"><div class="wrap">
  <div class="gal">
    <figure class="full" data-clip><img src="img/studio-a.webp" alt="" loading="lazy"></figure>
    <figure data-clip><img src="img/b-2.webp" alt="" loading="lazy"></figure>
    <figure data-clip><img src="img/b-5.webp" alt="" loading="lazy"></figure>
    <figure class="full" data-clip><img src="img/studio-b.webp" alt="" loading="lazy"></figure>
  </div>
  <blockquote class="type-quote" style="max-width:28ch;margin:clamp(64px,8vw,120px) auto 0;text-align:center" data-split>“They understood the brand better than we did, and made it simpler.”</blockquote>
</div></section>
<section class="sec" data-mood="night"><div class="wrap">
  <p class="type-label muted lbl-dot" style="margin-bottom:20px">Next project</p>
  <a class="next" href="project.html?p={n['slug']}" data-next="href" data-cursor="Next"><img data-next="img" src="{pcard_img(n)}" alt="" width="1600" height="1000">
    <div class="in"><span class="type-label" data-next="catLabel">{n['catLabel']}</span><span class="type-hero" data-next="name">{n['name']}</span></div></a>
</div></section>
{cta()}
"""

# ---------------- ABOUT ----------------
def about():
    pr=[("Small senior teams","Every project is led by the people you meet in the pitch. No hand-offs to juniors."),("Ship weekly","You see real progress every week, not a big reveal after three months."),("Measure everything","We agree on numbers before we start, and report on them after launch."),("Leave you stronger","Clean code, documented systems and training, so you never depend on us.")]
    acc="".join(f'<div class="acc-item"><button class="acc-btn" type="button" aria-expanded="false"><span class="type-small muted">0{i+1}</span><span class="type-h3" style="font-weight:500">{n}</span><span class="arr" aria-hidden="true">→</span></button><div class="acc-panel"><div class="acc-body" style="grid-template-columns:1fr"><p class="muted" style="max-width:56ch">{d}</p></div></div></div>' for i,(n,d) in enumerate(pr))
    team="".join(f'<figure><div class="img"><img src="img/t-{i+1}.webp" alt="Portrait of {n}" width="800" height="1000" loading="lazy"></div><figcaption><b class="type-small" style="display:block">{n}</b><span class="type-caption">{r}</span></figcaption></figure>' for i,(n,r) in enumerate(TEAM))
    return f"""
<section class="page-head" data-mood="night"><div class="wrap">
  <p class="type-label muted lbl-dot" data-intro>About us</p>
  <h1 class="type-hero" data-split>A small studio<br>with a big<br>shipping habit.</h1>
</div></section>
<section class="iscale" data-mood="paper" data-mood-static aria-labelledby="about-title">
  <div class="divider" aria-hidden="true"></div><div class="hline" aria-hidden="true"></div>
  <div class="box box--one" aria-hidden="true"></div><div class="box box--two" aria-hidden="true"></div><div class="box box--three" aria-hidden="true"></div><div class="box box--four" aria-hidden="true"></div>
  <div class="wrap"><div class="iscale-left">
    <span class="type-lead">Our clients see</span>
    <h2 id="about-title" class="type-hero"><span class="num" data-to="91">91</span>%<br>come back</h2>
    <p class="muted" style="max-width:44ch">Brooklynbyte started in a Williamsburg loft in 2016 with three people and one bank. Today we're 24 designers, engineers and strategists, still in Brooklyn, still shipping every week.</p>
  </div></div>
  <div class="iscale-right"><img src="img/studio-a.webp" alt="Our open-plan studio on two floors" width="1600" height="1000"></div>
</section>
<section class="sec principles" data-mood="night"><div class="wrap">
  <div class="sec-head"><p class="type-label muted lbl-dot" data-scramble>How we work</p><h2 class="type-h2" data-split>Four promises we keep.</h2></div>
  <div class="acc">{acc}</div></div></section>
<section class="sec" data-mood="paper"><div class="wrap">
  <div class="sec-head"><p class="type-label muted lbl-dot" data-scramble>Team</p><h2 class="type-h2" data-split>The people you'll work with.</h2></div>
  <div class="team" data-stagger>{team}</div></div></section>
{process()}
{stats()}
{clients()}
{cta()}
"""

# ---------------- BLOG ----------------
def blog():
    f=POSTS[0]
    tags=[("all","All"),("engineering","Engineering"),("branding","Branding"),("design","Design"),("product","Product")]
    chips="".join(f'<button class="chip" type="button" data-f="{k}" aria-pressed="{"true" if k=="all" else "false"}">{l}</button>' for k,l in tags)
    return f"""
<section class="page-head" data-mood="night"><div class="wrap">
  <p class="type-label muted lbl-dot" data-intro>Journal · 6 articles</p>
  <h1 class="type-hero" data-split>Notes from<br>the studio.</h1>
  <div class="row"><p class="type-lead muted" style="max-width:46ch" data-intro>Essays on design, engineering and running a small studio.</p>
    <div class="filters" data-filter="#blist" data-intro role="group" aria-label="Filter articles">{chips}</div></div>
</div></section>
<section class="sec" data-mood="night" style="padding-top:0"><div class="wrap">
  <a class="feat" href="post.html" data-cursor="Read"><div class="img" data-clip><img src="img/b-{f['n']}.webp" alt="" width="1200" height="750"></div>
    <div><div class="type-small muted" style="display:flex;gap:12px;align-items:center"><span class="chip chip-sm">{f['tag']}</span>{f['date']} · {f['read']}</div><h2 class="type-h2" style="margin-top:16px">{f['title']}</h2><p class="muted" style="margin-top:16px;max-width:46ch">Speed is a design decision. Here's the budget we use for every portfolio we build.</p></div></a>
  <div class="cards3" id="blist">{acards(POSTS[1:])}</div>
</div></section>
{cta()}
"""

# ---------------- POST ----------------
def post():
    p=POSTS[2]
    return f"""
<div class="readbar" aria-hidden="true"></div>
<section class="page-head" data-mood="night" style="padding-bottom:0"><div class="wrap">
  <div class="post-head">
    <p class="type-small muted" data-intro style="display:flex;gap:12px;align-items:center"><a class="ulink" href="blog.html">Journal</a> / <span class="chip chip-sm">{p['tag']}</span></p>
    <h1 class="type-h1" style="margin-top:24px" data-split>{p['title']}</h1>
    <p class="type-small muted" style="margin-top:24px" data-intro>By Theo Laurent · {p['date']} · {p['read']} read</p>
  </div>
  <div class="post-img" data-clip><img src="img/b-{p['n']}.webp" alt="" width="1200" height="750"></div>
</div></section>
<section class="sec" data-mood="night" style="padding-top:0"><div class="wrap">
  <article class="prose">
    <p class="type-lead">Every animation on a website costs something: attention, battery and time. The good ones pay that back by explaining what just happened.</p>
    <p>We use one test before any motion goes into a project: if we removed it, would a visitor lose information? A menu that slides in from where you tapped teaches you where it lives. A logo that spins for three seconds teaches you nothing.</p>
    <h2>Three jobs motion can do</h2>
    <ul><li>Show where something came from and where it went.</li><li>Confirm that an action worked.</li><li>Set a pace, so long pages feel like chapters.</li></ul>
    <blockquote>If you can't say what an animation is for in one sentence, it's decoration.</blockquote>
    <p>Decoration isn't banned. It just has a budget, and the budget is small: one signature moment per page, and everything else quiet.</p>
    <figure><img src="img/b-1.webp" alt="" loading="lazy"><figcaption class="type-caption" style="margin-top:8px">Our motion budget sheet, filled in for a recent launch.</figcaption></figure>
    <h2>Respect the people who turn it off</h2>
    <p>Around one in four of our visitors on some projects have reduced motion turned on. For them the page should be complete and calm, not broken.</p>
    <pre><code>@media (prefers-reduced-motion: reduce) {{
  * {{ animation: none !important; }}
}}</code></pre>
    <p>That's a blunt start. In practice we design the reduced version first, then add motion on top.</p>
  </article>
</div></section>
<section class="sec" data-mood="paper"><div class="wrap">
  <div class="sec-head"><p class="type-label muted lbl-dot" data-scramble>Keep reading</p><h2 class="type-h2" data-split>Related articles.</h2></div>
  <div class="cards3">{acards([POSTS[0],POSTS[4],POSTS[5]])}</div></div></section>
{cta()}
"""

pages = [("index.html","Home",home()),("projects.html","Projects",projects()),("project.html","Northwind Coffee",project()),
         ("about.html","About us",about()),("blog.html","Journal",blog()),("post.html","Motion that helps",post())]
for fn,t,b in pages:
    (OUT/fn).write_text(page(fn,t,b))
print("built", [p[0] for p in pages])
