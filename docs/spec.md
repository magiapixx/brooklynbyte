# Spec: Brooklynbyte

> Status: **draf, menunggu approve owner**. Dibuat 2026-11-06 oleh spec-writer.

## 1. Temuan riset & koreksi brief
- Brooklynbyte adalah perusahaan **fiktif** (permintaan owner). Tidak ada riset web; semua nama, angka, klien, testimoni, dan artikel dikarang dan ditandai fiktif di footer. Aturan 5 di `AGENTS.md` (jangan mengarang data nyata) dikecualikan oleh owner untuk proyek uji ini.
- Owner mengizinkan **foto dan video stok** (Unsplash/Pexels). Ini pengecualian dari aturan "Tanpa video"; dicatat di `docs/decisions.md`.
- Kode referensi C1 dan C2 berlisensi MIT: boleh diadaptasi dengan kredit (komentar di file motion + `docs/decisions.md`).
- Koreksi brief: tidak ada.

## 2. Ringkasan
- **Tujuan**: portofolio digital agency yang membuat pengunjung (1) menjelajah hasil proyek dan (2) menghubungi lewat **WhatsApp**.
- **Audiens**: founder startup, kepala marketing, dan product lead di perusahaan menengah yang mencari partner desain + engineering.
- **Bahasa**: English. **Font utama**: Plus Jakarta Sans. **Aksen**: oranye.
- **Metrik keberhasilan** [ASUMSI]:
  1. ≥ 40% sesi membuka minimal satu halaman detail proyek.
  2. Klik tombol WhatsApp ≥ 3% dari sesi.
  3. Lighthouse Performance ≥ 90 di mobile meski animasinya kaya.

## 3. Sitemap
| Halaman | URL | Catatan |
|---|---|---|
| Home | `/` | Loader hanya di kunjungan pertama per sesi |
| Projects | `/projects/` | Daftar 10 proyek + filter kategori |
| Project detail | `/projects/[slug]/` | 10 halaman |
| About us | `/about/` | |
| Blog | `/blog/` | Daftar 6 artikel + filter tag |
| Blog detail | `/blog/[slug]/` | 6 halaman |
| 404 | `/404` | |

Navigasi: Home, Projects, About us, Blog, plus tombol **WhatsApp** di header dan tombol mengambang di semua halaman. Menu layar penuh (R4) di semua ukuran layar.

## 4. Per halaman
Tingkat animasi seluruh situs: **kaya** (lihat tabel "Tingkat animasi" di `skills/web-motion/SKILL.md`): gerak masuk + koreografi di setiap section, transisi di sebagian besar pasangan section, micro-interaction, **page transition** antar halaman, dan 1–2 momen signature per halaman.

### Global
- **Loader** (C2): counter `[00]`→`[100]`, lalu transisi langsung ke hero Home. Muncul sekali per sesi; kunjungan berikutnya memakai page transition biasa.
- **Page transition**: setiap pindah halaman memakai transisi (misalnya panel menutup lalu membuka, judul halaman baru masuk). Detail ditentukan ui-ux-designer.
- **Menu layar penuh** (R4): kata besar bertumpuk, item aktif terang, info kontak + WhatsApp.
- **Footer** (R8): CTA WhatsApp + email, navigasi, sosial, alamat studio, wordmark "brooklynbyte" raksasa, legal + catatan "data fiktif", kembali ke atas.
- **Tombol WhatsApp mengambang**: `wa.me` dengan pesan pembuka terisi.

### Home `/`
1. **Hero** (R6): bingkai membulat, headline posisi agency, video/foto stok, CTA "See our work" + "Chat on WhatsApp". Masuk dari loader.
2. **About teaser** (C1 dibalik, R1): pin; angka naik (mis. jumlah proyek); foto kecil di sel grid membesar ke layar penuh.
3. **Projects showcase** (C2, R2): transisi dari foto layar penuh About; pin 10 langkah, satu per proyek; daftar kiri nama proyek, kanan kategori, judul tengah hasil proyek, progress 01/10. Klik membuka detail proyek. Keluar: kontainer menyusut + blur.
4. **Services** (R3, R5, R6): 5–6 layanan, akordeon + pratinjau gambar saat hover.
5. **Stats** (R9, R7): 4 angka besar.
6. **Process** (R10): 3–4 tahap, kartu bertingkat dengan chip.
7. **Testimonials** (R5): 4 kartu.
8. **Clients** (R7): baris logo klien fiktif (wordmark teks/SVG).
9. **Journal teaser**: 3 artikel terbaru.
10. **CTA** (R5): "Got a project in mind? Let's talk" + marquee + tombol WhatsApp.

### Projects `/projects/`
1. Header halaman: judul besar + jumlah proyek.
2. Filter kategori (Branding, Web, Product, Campaign).
3. Daftar/grid 10 proyek: foto, nama, kategori, tahun; hover pratinjau.
4. CTA WhatsApp.

### Project detail `/projects/[slug]/`
1. Hero proyek: nama, klien, kategori, tahun, peran, foto utama layar penuh.
2. Ringkasan: tantangan, pendekatan, hasil (2–3 angka).
3. Galeri 4–6 gambar (campuran lebar penuh dan dua kolom).
4. Kutipan klien.
5. Navigasi "Next project" (foto proyek berikutnya, transisi halaman).
6. CTA WhatsApp.

### About us `/about/`
1. Header halaman: pernyataan misi.
2. **Image scale** (C1 dibalik): versi lengkap dengan angka dan cerita.
3. Nilai/prinsip kerja (3–4).
4. Tim (6–8 orang fiktif, foto stok).
5. Process (sama dengan Home atau versi detail).
6. Stats + logo klien.
7. CTA WhatsApp.

### Blog `/blog/`
1. Header halaman.
2. Filter tag.
3. Artikel unggulan + grid 5 artikel lain: gambar, tag, tanggal, waktu baca.

### Blog detail `/blog/[slug]/`
1. Header artikel: judul, tag, tanggal, waktu baca, penulis, gambar utama.
2. Isi artikel (Markdown): heading, paragraf, kutipan, gambar, daftar, kode.
3. Progress baca.
4. Artikel terkait (3).
5. CTA WhatsApp.

## 5. Gaya desain
- Arah: **gelap, berani, editorial-teknis**. Dasar gelap dengan section terang, judul besar, kartu dan bingkai membulat, satu aksen oranye. Rekomendasi pack: `dark-tech` + `swiss` (hanya rekomendasi).
- Dasar: R2, R3, R4, R6 (gelap, tipografi besar), R7 (kartu membulat, angka besar), R1 (grid bergaris terang), R8 (wordmark footer).
- Warna, skala huruf, layout, dan detail gerak diputuskan ui-ux-designer.

## 6. Fitur fungsional
- **Konten**: Astro content collections (Markdown/MDX) untuk `projects` (10) dan `blog` (6). Tanpa CMS eksternal.
- **WhatsApp**: tautan `https://wa.me/<nomor>?text=<pesan>`; nomor `[PLACEHOLDER: +62 812-0000-0000]`.
- **Filter** Projects dan Blog: sisi klien, tetap bisa dipakai tanpa JS (semua item tampil).
- **Page transition**: tidak boleh merusak tombol back/forward, fokus keyboard, dan judul halaman untuk screen reader.
- **Aset**: foto/video stok Unsplash/Pexels (lisensi gratis), dicatat di `docs/assets.md` dengan sumber. Logo klien fiktif dibuat sebagai wordmark SVG. Aset AI tidak dipakai [ASUMSI].
- RSS feed blog [ASUMSI: ya].

## 7. Acceptance criteria
- [ ] 7 tipe halaman dan semua halaman detail (10 proyek, 6 artikel) ter-build statis.
- [ ] Loader muncul sekali per sesi dan transisi ke hero; `prefers-reduced-motion` melewati loader.
- [ ] Page transition berjalan di semua tautan internal; back/forward benar; fokus pindah ke `<main>` atau judul baru.
- [ ] Home: About teaser (C1 dibalik) dan Projects showcase (C2) berjalan, dengan transisi di antara keduanya; showcase bisa dipakai dengan keyboard (daftar proyek adalah tautan).
- [ ] Tombol WhatsApp ada di header, mengambang, footer, dan setiap CTA; membuka `wa.me` dengan pesan terisi.
- [ ] Semua section, termasuk header dan footer, memenuhi cakupan "kaya" di `web-motion`.
- [ ] Konten terbaca tanpa JS; semua animasi menghormati reduced-motion.
- [ ] Responsif di 360, 768, 1280, 1920px tanpa scroll horizontal.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- [ ] Footer memenuhi anatomi footer dan memuat catatan "data fiktif".
- [ ] Kredit MIT untuk C1 dan C2 tercatat.

## 8. Di luar scope
- Form kontak, newsletter, atau backend apa pun (kontak hanya lewat WhatsApp/email).
- CMS eksternal, multi-bahasa, dark/light toggle manual [ASUMSI: mengikuti sistem].
- Efek suara (C2) dan WebGL.
- Analitik dan cookie banner.

## 9. Pertanyaan terbuka
1. Apakah boleh ada versi terang (light mode mengikuti sistem), atau situs selalu gelap dengan section terang tertentu?
2. Apakah perlu email selain WhatsApp di CTA? [ASUMSI: ya, `hello@brooklynbyte.studio` fiktif]
3. Lokasi studio fiktif: Brooklyn, New York (sesuai nama)? [ASUMSI: ya]

## 10. Tabel task
| ID | Task | Agent | Bergantung |
|---|---|---|---|
| T1 | Design direction + mockup + prototype gerak (Home, Projects, Project detail, About, Blog, Blog detail, loader, menu, page transition) | ui-ux-designer | approve spec |
| — | **BERHENTI: owner "approve desain"** | orchestrator | T1 |
| T2 | Scaffold Astro + Tailwind v4 + GSAP + Lenis + content collections | devops | approve desain |
| T3 | Copy semua halaman + 10 proyek + 6 artikel + alt text (`docs/content.md`, file Markdown) | seo-content | approve desain |
| T4 | Token, font Plus Jakarta Sans, peran tipografi, komponen `ui/` + state interaksi | design-system | T2 |
| T5 | Foto/video stok: kurasi, potong, kompres, `docs/assets.md` | asset-designer | T4 |
| T6 | Logo klien fiktif (SVG wordmark) + favicon + OG image | asset-designer | T4 |
| T7 | Layout global: BaseLayout, header, menu layar penuh, footer, tombol WhatsApp | frontend-engineer | T3, T4 |
| T8 | Home (semua section, statis) | frontend-engineer | T5, T7 |
| T9 | Projects index + detail (template) | frontend-engineer | T5, T7 |
| T10 | About + Blog index + Blog detail | frontend-engineer | T5, T7 |
| T11 | Efek standar: gerak masuk, transisi section, micro-interaction, Lenis | motion-developer | T8–T10 |
| T12 | Signature 1: loader → hero + page transition | motion-developer | T11 |
| T13 | Signature 2: About image scale (C1 dibalik) → Projects showcase (C2) | motion-developer | T11 |
| T14 | Metadata: SEO, OG, sitemap, RSS | seo-content | T8–T10 |
| T15 | Header keamanan + deploy staging | devops | T13, T14 |

QA (`qa-reviewer`) setelah setiap task; `security-reviewer` sebelum rilis.

## 11. Sumber
- C1: https://codepen.io/daniel-hult/pen/yLpwqgR (MIT)
- C2: https://codepen.io/filipz/pen/zxGPYMP (MIT)
- Referensi gambar R1–R10: `docs/references/`

Spec ini harus disetujui owner sebelum coding.
