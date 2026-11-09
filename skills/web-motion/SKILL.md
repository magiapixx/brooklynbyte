---
name: web-motion
description: Animasi website level Awwwards dengan GSAP, ScrollTrigger, dan Lenis: transisi antar section, antar komponen, antar halaman, dan micro-interaction yang ringan tanpa video.
---

# Web Motion — Ahli Animasi

Skill ini mengatur GERAKAN: animasi saat load, transisi antar section, interaksi antar komponen, transisi antar halaman, dan micro-interaction. Stack: **Astro + GSAP (termasuk ScrollTrigger, SplitText, Flip) + Lenis**. Tanpa video.

## Prinsip

1. **Satu momen besar per layar**, sisanya tenang. Animasi di mana-mana terlihat murahan. "Tenang" bukan berarti diam: elemen lain tetap punya gerak masuk halus dan state interaksi.
2. **Gerakan punya arti**: menunjukkan urutan, hubungan, atau perubahan keadaan.
3. **Hanya animasikan `transform` dan `opacity`** (plus `clip-path` bila perlu). Jangan animasikan `width`, `height`, `top`, `left`.
4. **Konten terlihat tanpa JS**. Set keadaan awal animasi lewat JS (`gsap.from` / `gsap.set`), bukan CSS `opacity:0`.
5. **Hormati `prefers-reduced-motion`**: matikan scrub, parallax, dan smooth scroll; sisakan fade singkat.

## Tingkat animasi (cakupan minimum)

Tingkat animasi di spec menentukan **jenis dan intensitas** gerak, bukan jumlah section yang boleh bergerak.

| Tingkat | Gerak masuk section | Transisi antar section | Interaksi komponen | Momen signature |
|---|---|---|---|---|
| tanpa | tidak ada (konten langsung tampil) | tidak ada | state hover/focus/active statis (warna, garis) tanpa gerak | tidak ada |
| terbatas | setiap section, halus (fade, naik ≤ 24px, mask baris), satu timeline per section | minimal sepertiga pasangan section memakai teknik selain fade (mood, clip-path, overlap, pin ringan) | setiap komponen interaktif: hover + focus-visible + active dengan transisi `fast`/`base` | 0–1 per halaman |
| kaya | setiap section, termasuk koreografi antar komponen | sebagian besar pasangan section | seperti terbatas + micro-interaction (magnetik, kursor, Flip) | 1–2 per halaman |

Untuk semua tingkat: header dan footer termasuk section; tombol, tautan, kartu, foto, dan item daftar wajib punya state hover, focus-visible, dan active. State interaksi CSS (`transition` warna, garis bawah `scaleX`, zoom gambar) dibuat oleh design-system/frontend; interaksi yang butuh JS (Flip, kursor, magnetik) dibuat oleh motion-developer.

## Bahasa gerak (easing & durasi)

Ease, durasi, dan gerakan khas tiap gaya ada di skill **`web-styles`** (bagian "Gerak" di pack yang dipilih). Nilai akhirnya ditetapkan sekali di `docs/design-direction.md`. Stagger antar item umumnya 0.04–0.08s. Satu proyek = satu set ease; simpan sebagai konstanta.

## Setup dasar (Astro)

```ts
// src/scripts/motion.ts
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(ScrollTrigger, SplitText);

let lenis: Lenis | null = null;

export function initMotion() {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis!.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    initSections();
    return () => { lenis?.destroy(); lenis = null; };
  });
  return mm; // panggil mm.revert() saat pindah halaman
}
```
Dengan Astro View Transitions: jalankan `initMotion()` di event `astro:page-load`, dan `mm.revert()` + `ScrollTrigger.killAll()` di `astro:before-swap`.

## Animasi antar SECTION

| Teknik | Cara | Cocok untuk |
|---|---|---|
| Reveal clip-path | Section berikut muncul dari `clip-path: inset(100% 0 0 0)` ke `inset(0)` dengan scrub | Perpindahan dramatis |
| Pin + ganti konten | `pin: true`, timeline dengan beberapa langkah, `scrub: 1` | Proses / langkah kerja |
| Kartu bertumpuk | Tiap kartu `position: sticky`, kartu sebelumnya `scale` 0.9 + gelap saat ditimpa | Layanan |
| Scroll horizontal | Pin wrapper, `x: -(lebar - viewport)`, `scrub: 1` | Portofolio |
| Ganti warna latar | ScrollTrigger mengganti atribut `data-mood` di `<body>`; transisi warna diatur CSS | Mood berbeda per section yang tinggi (≥ ±80% layar). Section pendek di akhir halaman (kontak, footer) memakai warna sendiri secara statis; uji di posisi scroll paling bawah |
| Parallax berlapis | Elemen berbeda kecepatan `yPercent` dengan scrub | Kedalaman tanpa 3D |
| Zoom keluar/masuk | Gambar `scale: 1.4 → 1` saat masuk viewport | Hero ke section kedua |

Contoh ganti warna latar (warna tiap mood didefinisikan di CSS untuk light dan dark, JS hanya mengganti atribut):
```ts
document.querySelectorAll<HTMLElement>('[data-mood]').forEach((s) => {
  ScrollTrigger.create({
    trigger: s, start: 'top 50%', end: 'bottom 50%',
    onToggle: (self) => {
      if (self.isActive) document.body.dataset.mood = s.dataset.mood;
    },
  });
});
```

## Animasi antar KOMPONEN

- **Flip**: saat filter/kategori berubah, kartu berpindah posisi dengan mulus (`Flip.getState` → ubah DOM → `Flip.from`).
- **Shared element**: gambar thumbnail membesar menjadi hero di halaman detail (Astro `transition:name`).
- **Hover list → gambar**: gambar mengikuti kursor dengan `gsap.quickTo` saat item daftar di-hover.
- **Tab/accordion**: tinggi dianimasikan dengan Flip, bukan `height`.
- **Koreografi**: komponen dalam satu section masuk berurutan lewat satu timeline, bukan trigger terpisah.

## Transisi antar HALAMAN

Pakai Astro View Transitions. Pola: overlay warna aksen menutup layar (`yPercent: 100 → 0`), ganti halaman, overlay membuka (`0 → -100`). Durasi total ≤ 0.9s.

## Tipografi bergerak

- `SplitText` per kata/baris dengan `mask: 'lines'`, animasi `yPercent: 100 → 0`.
- Marquee: duplikasi konten, `xPercent: -50` repeat -1, arah berbalik mengikuti arah scroll (`lenis.direction`).
- Variable font: animasikan `font-variation-settings` (wght/wdth) saat hover atau scroll.

## Micro-interaction

- Kursor custom (lingkaran yang membesar di atas tautan) dengan `gsap.quickTo`. Matikan di perangkat sentuh.
- Tombol magnetik: tombol bergeser ±10px ke arah kursor.
- Tautan: garis bawah tumbuh dari kiri dengan `scaleX`.

## Efek "wow" tanpa video

- Shader gradien/noise di hero (Three.js atau OGL, satu plane fullscreen, < 50 KB).
- Objek 3D low-poly (.glb terkompresi Draco/Meshopt < 1 MB) yang berputar mengikuti scroll.
- SVG path tergambar (`strokeDashoffset`) mengikuti scroll.

## Prototype gerak di mockup

Mockup di `design/mockup/<halaman>.html` (dibuat ui-ux-designer sebelum coding) memutar gerak sungguhan agar owner bisa menyetujuinya. Ini file sekali pakai untuk review, bukan kode produksi.

- Library dimuat dari CDN **khusus mockup**, dengan versi persis sama dengan `package.json` proyek (atau versi stabil terbaru bila proyek belum ada). Bila CDN tidak boleh, salin file `dist/*.min.js` ke `design/mockup/vendor/`.
  ```html
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js"></script>
  ```
- Satu objek nilai di atas script, sama dengan design-direction:
  ```js
  const MOTION = { ease: 'power2.out', fast: 0.3, base: 0.6, slow: 0.9, stagger: 0.05 };
  ```
- Elemen memakai nama `data-motion` yang sama dengan rencana gerak, agar mudah dicocokkan dengan produksi.
- Panel kontrol: Tema, Gerak nyala/mati (simulasi reduced-motion: `ScrollTrigger.getAll().forEach(t => t.kill())`, `gsap.set` ke keadaan akhir, Lenis dihentikan), Putar ulang hero.
- Momen signature boleh versi sederhana (misalnya gradien CSS bergerak sebagai pengganti shader); beri label di panel.
- Uji sendiri sebelum menyerahkan: scroll dari atas ke bawah di 1440px dan 390px, tidak ada error di console, tidak ada scroll horizontal.

## Performa

- Selalu `ScrollTrigger.refresh()` setelah font dan gambar selesai dimuat.
- `will-change: transform` hanya saat animasi berjalan.
- Matikan efek berat (shader, kursor, parallax berlapis) di layar < 768px bila FPS turun.
- Bersihkan semua trigger saat pindah halaman (lihat setup).

## Checklist

- [ ] Halaman terbaca jika JS mati
- [ ] Cakupan sesuai tabel "Tingkat animasi" (setiap section, transisi, state komponen)
- [ ] Warna section pendek di akhir halaman tetap benar saat scroll paling bawah
- [ ] Reduced motion dihormati
- [ ] Satu set ease konsisten
- [ ] Tidak ada layout shift saat animasi
- [ ] 60 FPS di HP kelas menengah
- [ ] Transisi antar halaman membersihkan trigger lama
