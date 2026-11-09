---
name: web-typeface
description: Ahli tipografi website: memilih dan memasangkan typeface, skala huruf fluid, pemuatan font yang ringan di Astro, dan tipografi ekspresif per gaya desain.
---

# Web Typeface — Ahli Tipografi

Skill ini menentukan HURUF: pilihan typeface, pasangan, skala ukuran, ritme, dan cara memuat font. Di website level Awwwards, tipografi adalah elemen visual utama, bukan sekadar wadah teks.

## Langkah kerja

1. **Tentukan karakter** dari subjek dan gaya (tegas, tenang, teknis, mewah, nakal).
2. **Pilih 2–3 peran font**: Display (judul, karakter kuat), Body (nyaman dibaca), Utility (monospace untuk label/data, opsional).
3. **Pilih rasio mobile + desktop**, lalu jalankan generator `typescale.mjs` (lihat Skala tipografi).
4. **Atur detail**: line-height, letter-spacing, lebar baris.
5. **Muat font secara efisien** (subset, woff2, preload).

## Memasangkan typeface

- Kontras yang jelas: display ekspresif + body netral. Jangan dua font yang "mirip tapi beda".
- Satu keluarga variable font bisa cukup untuk display dan body jika punya rentang berat/lebar luas.
- Maksimal 3 keluarga per situs.
- Cek dukungan karakter (huruf Indonesia aman di Latin standar; cek tanda kutip, —, €, Rp).

## Rekomendasi per gaya

Pilihan font gratis dan perlakuannya untuk tiap gaya ada di skill **`web-styles`** (bagian "Tipografi" di pack yang dipilih). Font berbayar/indie yang sering dipakai pemenang Awwwards (cek lisensi web): PP Neue Montreal, PP Editorial New, Neue Haas Grotesk, Monument Extended, Druk. Sumber gratis berkualitas: Google Fonts, Fontshare, Velvetyne, Collletttivo.

Hindari sebagai default: Inter, Roboto, Poppins, Montserrat, Space Grotesk (terlalu umum). Pakai jika user memintanya.

## Skala tipografi (modular scale)

Skala **tidak boleh ditebak**. Semua ukuran dihitung dari satu rumus: ukuran body dikali rasio pangkat n, lalu dibuat fluid antara viewport 360px dan 1440px.

### 1. Pilih rasio
| Rasio | Nama | Karakter | Cocok untuk |
|---|---|---|---|
| 1.067 | Minor Second | sangat rapat | dasbor, UI padat |
| 1.125 | Major Second | rapat | aplikasi, dark-tech |
| 1.200 | Minor Third | seimbang | situs korporat, mobile umumnya |
| 1.250 | Major Third | jelas | situs pemasaran, editorial |
| 1.333 | Perfect Fourth | kontras | editorial, landing page |
| 1.414 | Augmented Fourth | dramatis | luxury, portofolio |
| 1.500 | Perfect Fifth | sangat dramatis | brutalism, hero besar |
| 1.618 | Golden Ratio | ekstrem | poster, hanya untuk sedikit langkah |

Pilih **dua rasio**: satu untuk mobile (360px) dan satu untuk desktop (1440px). Rasio mobile selalu sama atau lebih kecil, karena layar sempit tidak muat lompatan besar. Rekomendasi per gaya ada di bagian "Tipografi" setiap style pack (`web-styles`).

### 2. Hitung dengan generator (wajib)
```bash
node skills/web-typeface/typescale.mjs --ratio-min minor-third --ratio-max major-third \
  --base-min 16 --base-max 18 --mega 112 --hero-chars 24
```
Tanpa akses terminal (misalnya Google AI Studio): minta owner menjalankan perintah ini dan menempelkan hasilnya, atau hitung manual dengan rumus di bawah dan tandai "BELUM DIVERIFIKASI".

Generator menghasilkan blok `@theme` lengkap, tabel min/max px, dan peringatan. Salin hasilnya ke `global.css`. **Jangan mengetik angka clamp sendiri.** Bila ada PERINGATAN, perbaiki rasio atau batasnya, lalu jalankan ulang.

Rumus yang dipakai (untuk dicek manual):
```
min_n  = base_min × rasio_mobile^n        max_n = base_max × rasio_desktop^n
slope  = (max_n − min_n) / (1440 − 360)   intercept = min_n − slope × 360
--text-<n>: clamp(min_n/16 rem, intercept/16 rem + slope×100 vw, max_n/16 rem)
```

### 3. Langkah skala (10 langkah, nama tetap)
| Token | n | line-height | letter-spacing |
|---|---|---|---|
| `xs` | −2 | 1.5 | +0.01em |
| `sm` | −1 | 1.5 | 0 |
| `base` | 0 | 1.6 | 0 |
| `lg` | 1 | 1.5 | −0.005em |
| `xl` | 2 | 1.3 | −0.01em |
| `2xl` | 3 | 1.2 | −0.015em |
| `3xl` | 4 | 1.1 | −0.02em |
| `4xl` | 5 | 1.05 | −0.025em |
| `display` | 6 | 1.0 | −0.03em |
| `mega` | 7 | 0.92 | −0.035em |

Setiap langkah punya pasangan token Tailwind v4: `--text-xl--line-height` dan `--text-xl--letter-spacing`. Dengan begitu, `text-xl` otomatis membawa line-height dan tracking-nya sendiri. `--text-wordmark` (logo/wordmark raksasa, dekoratif) ditambahkan manual dan wajib `aria-hidden="true"`.

### 3b. Menimpa line-height / letter-spacing
Pasangan line-height dan letter-spacing dari generator adalah default. Bila style pack atau design-direction meminta nilai lain (misalnya brutalism `mega` line-height 0.85, luxury body line-height 1.7), design-system **menimpa token**-nya tepat di bawah output generator, misalnya `--text-mega--line-height: 0.85;`, lalu mencatatnya di `docs/design-system.md`. Menimpa lewat `leading-[..]`/`tracking-[..]` di markup tetap dilarang. Ukuran body di pack (misalnya "18–20px") diterjemahkan menjadi `--base-min/--base-max` generator.

### 4. Peran (role) → token
Halaman tidak memakai `text-*` langsung untuk teks berperan. design-system membuat utility peran:
```css
@utility type-h1 { font-size: var(--text-display); line-height: var(--text-display--line-height); letter-spacing: var(--text-display--letter-spacing); font-family: var(--font-display); font-weight: 600; }
```
Tabel peran default (boleh diubah di design-direction, tapi harus ditulis):
| Peran | Token | Catatan |
|---|---|---|
| `type-hero` | `mega` | hanya h1 di hero |
| `type-h1` | `display` | h1 halaman selain hero |
| `type-h2` | `3xl` | judul section |
| `type-h3` | `xl` | judul kartu / sub-section |
| `type-h4` | `lg` | judul kecil, semi-bold |
| `type-lead` | `lg` | paragraf pembuka |
| `type-body` | `base` | paragraf |
| `type-small` | `sm` | teks pendukung |
| `type-caption` | `sm` | keterangan gambar, `--color-muted` |
| `type-label` | `xs` | uppercase, +0.08em, `--font-mono` bila pack memakai font utility (bila tidak, font body) |
| `type-stat` | `2xl` | angka besar, `tabular-nums` |
| `type-quote` | `2xl` | kutipan/testimoni |

### 5. Aturan
- **Zoom (WCAG 1.4.4)**: nilai tengah clamp wajib `rem + vw`, tidak boleh `vw` saja. Maks ≤ 2,5 × min untuk semua teks yang dibaca (generator membatasi otomatis). Wordmark dekoratif (`aria-hidden`) dikecualikan.
- **Batas bawah**: body ≥ 16px; `sm` ≥ 14px; `xs` (label) ≥ 12px.
- **Muat di 360px**: judul hero dicek dengan `--hero-chars` = jumlah karakter **kata atau frasa terpanjang yang tidak boleh terpotong** di mobile (bukan seluruh kalimat; baris boleh pecah antar kata). Bila tidak muat, pendekkan judul atau turunkan `--mega`.
- **Tanpa nilai sembarang**: tidak boleh `text-[..]`, `leading-[..]`, atau `tracking-[..]` di markup. Kebutuhan baru ditambahkan sebagai token atau peran oleh design-system.
- **Hierarki terlihat**: dua peran berurutan (misalnya h2 dan h3) minimal berbeda dua langkah skala, atau satu langkah ditambah perbedaan berat huruf.
- Maksimal 3 berat huruf per situs (misalnya 400, 600, 700).
- **Line-height < 1 dan highlight**: line-height di bawah 1 (default `mega` 0,92) hanya aman bila judul tidak memakai blok latar. Judul dengan highlight (`.mark`) yang bisa membungkus di mobile: override `--text-mega--line-height` ke ≥ 1, dan letakkan blok di bawah teks (`.mark { position: relative; z-index: -1 }` + `isolate` di parent) agar tidak menutup descender baris atas. Cek di 360px.
- Aturan dasar `h1`–`h4` di `@layer base` hanya mengatur `font-family` dan `font-weight`, **bukan** ukuran, line-height, atau letter-spacing; semua itu datang dari peran `type-*`. Ini mencegah aturan dasar bertabrakan dengan peran.

## Detail yang membedakan

- **Line-height** dan **letter-spacing** sudah ikut token tiap langkah (lihat tabel langkah). Label uppercase memakai peran `type-label` (+0.08em).
- **Lebar baris**: body 55–70 karakter (`max-width: 65ch`).
- `text-wrap: balance` untuk judul, `text-wrap: pretty` untuk paragraf.
- `font-variant-numeric: tabular-nums` untuk angka yang berjajar (harga, statistik, tanggal).
- Gunakan tanda baca yang benar: “kutip”, — em dash, – rentang angka.

## Tipografi ekspresif

- Teks raksasa yang terpotong tepi layar (brutalism).
- Campur berat/lebar dalam satu judul (variable font: `font-variation-settings: 'wght' 900, 'wdth' 125`).
- Teks sebagai gambar: outline (`-webkit-text-stroke`), mask gambar ke dalam huruf (`background-clip: text`).
- Teks bergerak diatur oleh skill `web-motion` (SplitText, marquee, animasi variable axis).

## Memuat font di Astro (ringan)

1. Self-host file **woff2** di `public/fonts/` (atau paket `@fontsource-variable/*`).
2. Subset ke Latin (alat: `glyphhanger` atau `pyftsubset`). Target < 50 KB per file.
3. Preload hanya font display hero:
```html
<link rel="preload" href="/fonts/display.woff2" as="font" type="font/woff2" crossorigin>
```
4. `@font-face` dengan `font-display: swap` dan fallback yang ukurannya mirip (`size-adjust`, `ascent-override`) untuk mencegah layout shift.
5. Panggil `ScrollTrigger.refresh()` setelah `document.fonts.ready`.

## Output yang diserahkan

1. Satu kalimat konsep tipografi.
2. Pasangan font + alasan singkat + lisensi.
3. Token `--font-display`, `--font-body`, `--font-mono`, rasio mobile/desktop yang dipilih, dan output generator `--text-*` (dengan pasangan line-height dan letter-spacing).
4. `@font-face` siap pakai dan baris preload.
5. Tabel peran → token (`type-*`) dan utility `@utility type-*`.
