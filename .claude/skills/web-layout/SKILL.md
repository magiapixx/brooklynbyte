---
name: web-layout
description: Merancang layout website level Awwwards (brutalism, minimalism, editorial, swiss) dengan Astro + Tailwind: grid, pola section, ritme spasi, dan responsif.
---

# Web Layout — Ahli Tata Letak

Skill ini menentukan STRUKTUR halaman: grid, urutan section, ritme spasi, dan perilaku responsif. Warna diurus skill `web-colorist`, huruf oleh `web-typeface`, gerakan oleh `web-motion`. Jika skill itu tersedia, pakai bersama.

Stack default: **Astro + Tailwind CSS + GSAP + Lenis**. Tanpa video (terlalu berat). Efek visual berasal dari tipografi, SVG, shader/WebGL ringan, dan animasi scroll.

## Langkah kerja

1. **Pahami brief**: apa produknya, siapa audiensnya, apa SATU aksi utama halaman (hubungi, daftar, beli, lihat portofolio).
2. **Pakai style pack** dari `docs/design-direction.md` (skill `web-styles`). Jika belum ada, tanyakan; jangan memilih gaya sendiri.
3. **Tulis peta section** sebelum kode: nama section, tujuan, isi, dan elemen "wow" (maksimal 1 elemen wow per 2–3 section).
4. **Bangun grid dan token spasi** dulu, baru isi section satu per satu.
5. **Cek di 375px, 768px, 1440px**. Halaman tidak boleh scroll horizontal.

## Sistem grid

- Desktop: 12 kolom, gutter `clamp(16px, 2vw, 32px)`, margin luar `clamp(16px, 4vw, 64px)`.
- Tablet: 8 kolom. Mobile: 4 kolom.
- Konten bacaan maksimal ~65 karakter per baris (`max-w-prose`). Lebar baris lain dibuat token oleh design-system (misalnya `--container-measure-narrow: 45ch` → `max-w-measure-narrow`), bukan `max-w-[..ch]`.
- Boleh MELANGGAR grid secara sengaja (elemen menembus margin, teks overlap gambar), tapi hanya di 1–2 titik agar terasa disengaja.

## Token spasi (skala vertikal)

Gunakan satu skala dan patuhi: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192`. Jarak antar section memakai `clamp(96px, 15vw, 192px)`. Atur jarak antar elemen dengan `gap` di flex/grid, bukan margin per elemen.

## Pola section (pilih, jangan pakai semua)

| Pola | Kapan dipakai |
|---|---|
| Hero tipografi raksasa | Brand kuat, pesan pendek |
| Hero split (teks + objek 3D/shader) | Produk teknologi |
| Marquee teks berjalan | Pemisah antar section, daftar klien |
| Section di-pin + konten berganti | Menjelaskan proses langkah demi langkah |
| Scroll horizontal | Portofolio / galeri proyek |
| Kartu bertumpuk (stacking cards) | Layanan atau fitur |
| Grid asimetris (bento tidak simetris) | Showcase campuran |
| Daftar besar dengan hover reveal gambar | Daftar proyek / layanan |
| Footer raksasa (CTA + nama brand full-width) | Penutup |

## Anatomi footer

Footer adalah section penutup, bukan sisa halaman. Rancang dengan wireframe seperti section lain.

**Isi wajib**
- Ulang aksi utama: CTA atau kontak singkat (email sebagai tautan).
- Navigasi: tautan ke section/halaman utama (sama dengan header).
- Tautan sosial sebagai `<a>` sungguhan (atau `[PLACEHOLDER: url]`), bukan teks biasa.
- Info legal: hak cipta, kredit aset, tautan kebijakan bila ada.
- Tombol "kembali ke atas" (tautan ke `#top`).

**Wordmark raksasa** (bila dipakai)
- Lebarnya mengisi kontainer (±95–100%), tidak berhenti di tengah. Ukuran dihitung dari jumlah karakter: `font-size ≈ lebar kontainer / (karakter × lebar huruf)`; buat token `--text-wordmark` dengan nilai `vw` yang sudah dikalibrasi, lalu cek di 360, 1280, dan 1920px.
- Wordmark dekoratif diberi `aria-hidden="true"` dan tidak menggantikan teks brand yang terbaca.

**Struktur dan jarak**
- Kolom informasi mengikuti grid (misalnya 3–4 kolom di desktop, 1–2 di mobile), dengan label kecil di atas tiap kolom.
- Jarak dari section sebelumnya dan antar blok di footer memakai token spasi; tidak ada ruang kosong lebih tinggi dari jarak antar section.
- Footer punya gerak masuk (misalnya wordmark naik dari mask) dan state hover untuk setiap tautan.

## Gaya

Aturan gaya (grid terlihat atau tersembunyi, kerapatan, radius, pola section khas) ada di skill **`web-styles`**, satu file per gaya. Skill ini hanya berisi teknik layout yang berlaku untuk semua gaya. Ikuti pack yang dipilih di `docs/design-direction.md`.

## Struktur file Astro

```
src/
  layouts/Base.astro        # head, font, Lenis + GSAP init
  components/sections/      # Hero.astro, Services.astro, Work.astro, ...
  components/ui/            # Button.astro, Marquee.astro, Cursor.astro
  styles/tokens.css         # warna, font, spasi sebagai CSS variables
  scripts/motion.ts         # semua inisialisasi animasi
```
Satu section = satu komponen. Setiap section punya `data-section="nama"` agar mudah ditarget animasi.

## Aturan wajib

- Halaman lengkap dan terbaca tanpa JavaScript (animasi adalah lapisan tambahan).
- Hero tidak wajib `100vh`; ukur dari isinya.
- Gambar: WebP/AVIF, `loading="lazy"` kecuali hero, selalu ada `width`/`height`.
- Target berat halaman awal < 2 MB.
- Tombol/tautan minimal 44×44px di mobile.
- Gunakan konten nyata, jangan lorem ipsum.

## Checklist sebelum selesai

- [ ] Peta section jelas dan setiap section punya satu tujuan
- [ ] Grid dan spasi konsisten dengan token
- [ ] Tidak ada scroll horizontal di 375px
- [ ] Maksimal satu elemen "wow" per 2–3 section
- [ ] Gaya konsisten dari hero sampai footer
- [ ] Footer memenuhi anatomi footer (isi wajib, wordmark mengisi kontainer, jarak token)
