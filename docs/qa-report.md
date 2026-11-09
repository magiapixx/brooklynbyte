# QA report — Brooklynbyte rilis desain Editorial (2026-11-08)

```
STATUS: LOLOS (dengan catatan)
BLOCKER: —
MINOR: angka contoh belum dikonfirmasi klien (24 orang, 91–92% klien kembali, 3 → 24, "Weekly"); semua klien/testimoni fiktif
TIDAK TERVERIFIKASI: kursor kustom, tombol magnetik, pratinjau gambar ikut kursor (headless); `astro check` (pakai tsc --noEmit)
```

## Perintah
- `npx tsc --noEmit` → tanpa error.
- `pnpm build` → 21 halaman statis, tanpa error.
- `pnpm audit --prod` → No known vulnerabilities found.
- Lighthouse 12.8.2 (mobile, server gzip):

| Halaman | Perf | A11y | BP | SEO | LCP |
|---|---|---|---|---|---|
| `/` | 93 | 100 | 100 | 100 | 2.9 s (loader kunjungan pertama) |
| `/projects/` | 99 | 100 | 100 | 100 | 1.9 s |
| `/projects/northwind/` | 99 | 100 | 100 | 100 | 2.1 s |
| `/about/` | 100 | 100 | 100 | 100 | 1.5 s |
| `/blog/` | 99 | 100 | 100 | 100 | 2.0 s |
| `/blog/motion-that-helps/` | 98 | 100 | 100 | 100 | 2.3 s |

## Cek lain
- 496 tautan internal di `dist/`: 0 rusak. Satu `<h1>` per halaman. Gambar dekoratif ber-`alt=""`.
- 360, 768, 1280, 1920px: tanpa scroll horizontal di 6 halaman utama.
- Reduced-motion dan tanpa JS: semua judul, teks, dan foto terlihat (yang tersembunyi hanya gambar pratinjau kursor, sesuai desain).
- Semua section dan footer berlatar putih kecuali CTA oranye; loader putih.
- Sitemap: 20 URL, tanpa halaman opsi lama; 404 `noindex` dan tidak masuk sitemap; robots.txt dan RSS (6 artikel) ada.
- Keamanan: tanpa secret di `src/`, `public/`, config; header CSP/nosniff/referrer/permissions/frame tetap di `public/_headers`.

## Perbaikan selama QA
- SplitText menambah `aria-label` pada `<p>` (aria-prohibited-attr): pakai `aria: 'none'`.
- Kata redup manifesto 0.16 → 0.5 (kontras ≥ 3:1 untuk teks besar).
- Teks hasil proyek di galeri: oranye digelapkan (oklch .52 .17 40) agar kontras ≥ 4.5:1 di latar putih.
- Foto "Our story" di About meluap 9–22px di 360/768 (zoom data-clip): dibungkus elemen `overflow: hidden`.
- Halaman 404: `noindex` (prop baru `noindex` di BaseLayout/SEO).
- OG image dibuat ulang berlatar putih sesuai desain Editorial.

## Beda dari acceptance criteria spec (disetujui owner, lihat decisions.md)
- Home tidak lagi memakai About C1 dan showcase C2; diganti manifesto dan galeri film (approve desain Editorial 2026-11-08). Kredit MIT C1/C2 di `docs/assets.md` tidak lagi relevan untuk build ini.

---

# QA report — Brooklynbyte (build produksi, 2026-11-06)

```
STATUS: LOLOS (dengan catatan)
BLOCKER: —
MINOR: 6 gambar proyek, sampul blog, dan foto tim masih placeholder grafis
TIDAK TERVERIFIKASI: kursor kustom, tombol magnetik, pratinjau gambar ikut kursor (headless tidak punya pointer halus); `astro check` (pakai tsc --noEmit)
```

## Perintah
- `pnpm build` → 21 halaman statis, tanpa error.
- `npx tsc --noEmit` → tanpa error.
- Lighthouse 12 (mobile, server dengan kompresi gzip):

| Halaman | Perf | A11y | BP | SEO | LCP |
|---|---|---|---|---|---|
| `/` | 92 | 100 | 100 | 100 | 3.0 s (loader kunjungan pertama) |
| `/projects/` | 99 | 100 | 100 | 100 | 2.0 s |
| `/projects/northwind/` | 99 | 100 | 100 | 100 | 1.8 s |
| `/about/` | 98 | 100 | 100 | 100 | 2.2 s |
| `/blog/` | 99 | 100 | 100 | 100 | 2.0 s |
| `/blog/motion-that-helps/` | 99 | 100 | 100 | 100 | 1.9 s |

## Dibandingkan dengan mockup v1.4 (di-approve)
- Loader → hero, page transition, menu, C1 dibalik → showcase C2 (10 langkah, snap, keluar blur), services, stats, process, testimonials, clients, journal, CTA wipe, footer v4.1: sama.
- Beda yang tercatat di `docs/decisions.md`: section tidak lagi transparan saat pergantian mood (perbaikan kontras); loader dipercepat (LCP).
- Reduced-motion: tanpa loader/panel/pin; About & showcase tampil statis; semua konten terlihat.
- 360/390, 768, 1280, 1440: tanpa scroll horizontal. Satu `<h1>` per halaman. Semua `<img>` punya alt.

## Perbaikan selama QA
1. Kontras: teks section paper di atas latar body gelap saat transisi → section memakai latar sendiri.
2. LCP Home 3.8 s → loader dipercepat + preload font.
3. ARIA: SplitText menambah `aria-label` pada `<p>` → hanya heading yang memakai aria auto.
4. Aria-label h1 hero tanpa spasi ("brandspeople") → spasi eksplisit.
5. CSS: kurung kurawal berlebih di aturan mobile image-scale.
