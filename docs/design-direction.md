# Design Direction: Brooklynbyte

> v1.4 (2026-11-06, footer v4.1) · ui-ux-designer · Mockup: `design/mockup/index.html` (+ 5 halaman lain). Status: **menunggu "approve desain"**.

## 1. Gaya
**Jalur: berbasis referensi + rekomendasi pack.** Pack utama `dark-tech`, pendukung `swiss` (grid bergaris, angka besar). Pack hanya rekomendasi; owner boleh meminta gaya ditafsir langsung dari referensi.

| Ref | Prioritas | Pack terdekat | Kecocokan | Alasan |
|---|---|---|---|---|
| C2, R2, R3, R4 | tinggi | dark-tech | tinggi | Latar gelap, tipografi raksasa, daftar dengan item aktif |
| C1, R1, R9 | tinggi | swiss | tinggi | Grid bergaris tipis, angka besar, ruang putih |
| R6, R7 | sedang | dark-tech (kartu membulat) | sedang | Bingkai hero & kartu membulat |
| R5, R8 | sedang | — | — | CTA + marquee, wordmark footer terpotong |

**Dari referensi diambil**: lihat `docs/references/references.md` (tabel disetujui owner). **Tidak diambil**: hijau lime/zaitun, merah, gradien oranye penuh, foto api, huruf kapital penuh, efek suara.

**Penyesuaian**: oranye hanya sebagai aksen (blok, titik aktif, garis progres, panel transisi), bukan latar penuh kecuali CTA. Judul sentence case. Foto stok diberi **grade duotone hangat** (bayangan coklat gelap, highlight krem) agar seragam dengan palet.

## 2. Alur pengguna
Pengunjung (founder/marketing lead) → loader → hero → About (angka + foto membesar) → showcase 10 proyek → klik proyek → detail → "Next project" atau WhatsApp. Aksi utama: **lihat proyek** dan **Chat on WhatsApp** (header, tombol mengambang, CTA, footer).

## 3. Peta section
### Global
| Elemen | Pola | Isi | Gerak |
|---|---|---|---|
| Loader | Layar penuh gelap, wordmark + counter | `brooklynbyte` + `[00]`→`[100]` | `loader` → `hero-in` |
| Header | Bar tipis: logo kiri, "Menu" + WhatsApp kanan | — | `header-hide` |
| Menu | Layar penuh (R4): kata besar bertumpuk kanan, kontak kiri | 4 item + WhatsApp + email + alamat | `menu-open` |
| Page transition | Panel oranye + nama halaman tujuan | — | `page-out` / `page-in` |
| WhatsApp mengambang | Lingkaran 56px kanan bawah | ikon + label hover | `wa-pulse` |
| Footer | §3b | — | `footer-curtain`, `wordmark-rise` |

### Home
| Section | Tujuan | Pola | Konten (batas) | Aset | Mood |
|---|---|---|---|---|---|
| Hero | Posisi | Bingkai membulat (R6) berisi video, judul 2 baris di atas, meta bawah | Judul maks 6 kata; sub maks 20 kata; 2 CTA | V1 | night |
| About teaser | Kredibilitas | C1 dibalik: kiri teks + counter, kanan grid 4 sel, foto di sel kecil → layar penuh | topline 4 kata, angka + 2 kata, paragraf maks 32 kata | P1 (Halcyon) | paper |
| Showcase | Bukti | C2: foto layar penuh, judul atas "Selected / Work", bawah nama proyek aktif, daftar kiri (nama) & kanan (kategori), progress | 10 proyek | P1–P10 | night |
| Services | Apa yang dikerjakan | Akordeon dalam kartu gelap membulat (R3) + pratinjau gambar ikut kursor (R5) | 6 layanan, deskripsi maks 30 kata | P2–P7 | night |
| Stats | Skala | 4 angka besar berbaris (R9) | 4 angka + label 2 kata | — | night |
| Process | Kurangi risiko | Kartu bertingkat dengan chip (R10) | 4 tahap, durasi, 3–5 chip | — | night |
| Testimonials | Kepercayaan | 3 kartu + kutipan besar | maks 35 kata | T1–T3 | paper |
| Clients | Bukti sosial | Marquee wordmark klien | 10 nama | — | paper |
| Journal | Keahlian | 3 kartu artikel | judul maks 10 kata | B1–B3 | night |
| CTA | Konversi | Blok oranye: "Got a project in mind? Let's talk" + marquee + tombol WhatsApp (R5) | 6 kata | — | ember |

### Projects · Project detail · About · Blog · Blog detail
| Halaman | Section (urutan) |
|---|---|
| Projects | Header judul raksasa + jumlah · Filter chip (All, Branding, Web, Product, Campaign) · Daftar baris besar (nama, kategori, tahun) + pratinjau foto ikut kursor · CTA |
| Project detail | Hero (nama raksasa, meta 4 kolom, foto layar penuh) · Ringkasan (tantangan / pendekatan / hasil 3 angka) · Galeri (1 penuh, 2 kolom, 1 penuh) · Kutipan · Next project (foto penuh, nama) |
| About | Header pernyataan (kata demi kata) · Image scale C1 versi lengkap · Prinsip (4 baris akordeon) · Tim 8 orang · Process · Stats · Clients · CTA |
| Blog | Header · Filter tag · Artikel unggulan (gambar lebar) · Grid 5 kartu |
| Blog detail | Bar progres baca · Header (tag, judul, meta, gambar) · Prosa (maks 68ch) · Artikel terkait 3 · CTA |

## 3b. Footer (v4.1, tema About, tanpa garis)
```
latar paper (sama dengan About), tanpa garis
• CONTACT                         • MENU
hello@brooklynbyte.studio         Home  Projects  About us  Blog
Chat on WhatsApp ↗                Instagram  LinkedIn  Dribbble

© 2026 Brooklynbyte · Fictional company              Back to top ↑
brooklynbyte   (hitam, 100% lebar, baseline menempel ke sisi bawah layar; ekor "y" terpotong)
```
- Mobile: dua blok bertumpuk.
- Gerak: blok muncul (reveal), huruf wordmark naik stagger 0.04. Hover: garis bawah tumbuh, panah geser.
- Riwayat: v1 kartu terang, v2 gelap + cahaya, v3 putih empat kolom, v4 bergaris (direvisi owner).

## 4. Warna (OKLCH)
| Peran | night (default) | paper | ember |
|---|---|---|---|
| bg | `oklch(0.16 0.006 50)` | `oklch(0.965 0.006 70)` | `oklch(0.68 0.19 42)` |
| surface | `oklch(0.21 0.008 50)` | `oklch(0.93 0.008 70)` | `oklch(0.63 0.18 42)` |
| fg | `oklch(0.96 0.006 70)` | `oklch(0.18 0.008 50)` | `oklch(0.16 0.006 50)` |
| muted | `oklch(0.70 0.01 60)` | `oklch(0.48 0.01 60)` | `oklch(0.16 0.006 50 / .72)` |
| border | `oklch(0.30 0.008 50)` | `oklch(0.86 0.008 70)` | `oklch(0.16 0.006 50 / .25)` |
| accent | `oklch(0.68 0.19 42)` | `oklch(0.60 0.19 40)` (blok saja) | `oklch(0.16 0.006 50)` |
| on-accent | `oklch(0.16 0.006 50)` | `oklch(0.98 0.004 70)` | `oklch(0.96 0.006 70)` |
- Situs **selalu gelap** dengan section terang/oranye (jawaban asumsi pertanyaan terbuka 1). Tidak mengikuti tema sistem.
- Oranye sebagai teks hanya di night (kontras ±6:1). Di paper hanya blok.
- Pergantian mood body hanya antar section tinggi (≥80% layar); CTA (ember) dan footer statis.

## 5. Huruf
- **Plus Jakarta Sans** (variable 200–800), satu keluarga untuk semua peran. Label: 12px, uppercase, +0.08em, weight 600. Angka `tabular-nums`.
- Skala: Minor Third (mobile) → Perfect Fourth (desktop), base 16→18, `mega` 152px.
  `node skills/web-typeface/typescale.mjs --ratio-min minor-third --ratio-max perfect-fourth --base-min 16 --base-max 18 --mega 152 --hero-chars 9` (kata terpanjang tak terpotong: "Northwind" = 9). Tanpa peringatan.

| Token | 360 | 1440 | Peran |
|---|---|---|---|
| xs | 12 | 12 | `type-label` |
| sm | 14 | 14 | `type-small`, `type-caption` |
| base | 16 | 18 | `type-body` |
| lg | 19,2 | 24 | `type-lead`, `type-h4` |
| xl | 23 | 32 | `type-h3` |
| 2xl | 27,6 | 42,6 | `type-stat-sm`, `type-quote` |
| 3xl | 33,2 | 56,8 | — |
| 4xl | 39,8 | 75,8 | `type-h2` |
| display | 47,8 | 101 | `type-h1`, `type-stat` |
| mega | 60,8 | 152 | `type-hero` (judul hero, showcase, halaman) |
- Override token: `--text-mega--line-height: 0.9` (judul raksasa dua baris rapat, tanpa highlight). Berat: 400 body, 500 judul besar, 700 logo/wordmark.

## 6. Rencana gerak
Tingkat: **kaya**. Ease brand `expo.out` = `cubic-bezier(0.16, 1, 0.3, 1)`; ease transisi C2 `customEase` = `M0,0 C0.86,0 0.07,1 1,1` (= `cubic-bezier(0.86,0,0.07,1)`). Durasi fast 0.35s, base 0.64s, slow 1.2s. Stagger 0.05s.
Gerakan khas dark-tech dipakai: (1) **teks diacak lalu tersusun** (ScrambleText) di label section dan counter loader; (2) **angka berganti live** (counter About, stats).

### Gerak per section
| Section | Elemen | data-motion | Pemicu | Koreografi |
|---|---|---|---|---|
| Loader | wordmark, counter, panel | `loader` | load | counter acak naik 30ms/langkah sampai 100 → teks naik & hilang 0.6s → panel naik −100% 1.2s `power3.inOut` |
| Header | bar | `header-hide` | scroll | sembunyi saat turun, muncul saat naik |
| Hero | bingkai, baris judul, meta, CTA | `hero-in` | setelah loader / page-in | bingkai `clip-path inset(12% round 32px)`→`inset(0 round 32px)` + skala video 1.2→1; baris judul naik dari mask stagger 0.08; meta & CTA fade-up |
| About teaser | counter, sel grid, foto | `image-scale` | pin +=1600, scrub | **C1 dibalik**: kotak 4→1 menyusut, foto `scale 0.9→1`, wrapper `xPercent 50→0`, counter 0→140, judul berubah ke oranye |
| Showcase | foto, judul kata, daftar, progress | `showcase` | pin 10 × 80vh, snap | per langkah: foto baru `clip-path` dari bawah (turun) / atas (naik) 0.64s; foto lama turun 5% + fade; kata judul dari mask; titik aktif pindah; progress |
| Services | baris akordeon, pratinjau | `accordion`, `cursor-preview` | klik / hover | tinggi panel 0→auto 0.64s; pratinjau gambar mengikuti kursor (quickTo 0.4s), ganti gambar dengan clip |
| Stats | angka | `count` | top 80% | angka naik 1.6s, label scramble |
| Process | 4 kartu | `stagger-rise` | top 75% | kartu naik bertingkat (y 80→0, stagger 0.12), chip pop stagger |
| Testimonials | kartu | `stagger`, `parallax` | top 80% / scrub | kartu fade-up; kolom tengah parallax −8% |
| Clients | baris wordmark | `marquee` | selalu | marquee 30s, melambat saat hover |
| Journal | kartu | `clip-reveal` | top 80% | gambar clip dari bawah + scale 1.1→1 |
| CTA | blok, judul, marquee | `wipe-up`, `marquee` | scrub top 95%→40% | blok oranye naik (clip-path); judul baris dari mask |
| Footer | 2 sel, wordmark | `reveal`, `wordmark-rise` | scroll | sel muncul; huruf wordmark naik stagger 0.04 |
| Label section (semua) | teks label | `scramble` | top 85% | ScrambleText 0.8s |
| Halaman lain: header halaman | judul raksasa | `title-split` | page-in | baris/kata naik dari mask |
| Projects: daftar | baris | `stagger`, `cursor-preview`, `flip-filter` | top 85% / hover / klik filter | baris masuk; pratinjau ikut kursor; filter dengan Flip 0.64s |
| Project detail | foto hero, galeri, next | `clip-reveal`, `parallax`, `next-project` | scroll / klik | foto parallax; galeri clip; next project: foto membesar lalu page transition |
| About: tim | kartu | `stagger` | top 80% | — |
| Blog: kartu | gambar | `clip-reveal`, `flip-filter` | scroll / klik | — |
| Blog detail | bar progres | `read-progress` | scrub | scaleX mengikuti posisi baca |

### Transisi antar section (Home)
| Dari → Ke | Teknik | Pemicu |
|---|---|---|
| Loader → Hero | panel naik + bingkai hero terbuka | load |
| Hero → About | bingkai hero mengecil (scale 0.92, radius membesar) sementara About naik menutupi | scrub |
| About → Showcase | **foto serah-terima**: foto layar penuh akhir About = latar proyek 01 | pin berurutan |
| Showcase → Services | showcase mengecil + blur, Services naik menutupi (overlap 60vh) | scrub |
| Services → Stats | tanpa (stagger) | — |
| Stats → Process | tanpa | — |
| Process → Testimonials | mood night → paper | top 50% |
| Testimonials → Clients | tanpa | — |
| Clients → Journal | mood paper → night | top 50% |
| Journal → CTA | wipe-up blok oranye | scrub |
| CTA → Footer | blok oranye ke putih bersih (tanpa transisi khusus) | — |
7 dari 10 pasangan memakai teknik selain fade.

### Transisi antar halaman
- Klik tautan internal → panel oranye naik dari bawah (0.64s `customEase`) dengan nama halaman tujuan (scramble) → pindah halaman → panel naik keluar ke atas → judul halaman `title-split`. Back/forward: sama. Fokus pindah ke `<h1>`.
- Kunjungan pertama ke Home: loader (sekali per sesi). Reduced-motion: tanpa loader dan tanpa panel.

### Interaksi komponen
| Komponen | State | Efek | Durasi | Oleh |
|---|---|---|---|---|
| Tombol pill | hover / focus / active | isi oranye tumbuh dari titik kursor (lingkaran), teks naik-ganti (roll) / outline 2px / scale .97 | fast | design-system (CSS) + motion (posisi isi) |
| Tombol magnetik (CTA, WhatsApp) | hover | tertarik ke kursor ±12px | quickTo 0.4s | motion |
| Kursor | di atas kartu/baris proyek | lingkaran 12px → 88px berlabel "View" | base | motion |
| Tautan teks | hover / focus | garis bawah tumbuh dari kiri, keluar ke kanan | fast | design-system |
| Item menu | hover | item terang, lainnya redup 0.3, panah masuk | fast | frontend |
| Baris akordeon | hover / open | latar surface, panah berputar 45° | fast | frontend |
| Kartu proyek/artikel | hover / focus | gambar scale 1.05, meta naik | base | frontend |
| Chip filter | hover / aktif | latar oranye | fast | design-system |
| Showcase daftar | hover / aktif | opacity 0.3→1, titik aktif | fast | motion |
| WhatsApp mengambang | idle / hover | cincin pulse 2.4s / label keluar ke kiri | base | design-system |
| Kembali ke atas | hover | panah naik | fast | frontend |

- Reduced-motion: tanpa loader, tanpa pin/scrub (C1 tampil di keadaan akhir, showcase jadi daftar biasa), tanpa panel, Lenis mati.

## 7. Momen signature
1. **Loader → hero + page transition** (global).
2. **About image scale (C1 dibalik) → Projects showcase (C2)**, dengan foto serah-terima. Fallback: About tampil statis dengan foto penuh; showcase jadi daftar 10 proyek.
Tidak ada WebGL. Di mockup keduanya **versi penuh**, bukan sederhana.

## 8. Responsif
- 360: hero bingkai radius 20px; showcase daftar kiri-kanan disembunyikan, hanya judul + nama + progress; akordeon tanpa pratinjau kursor (gambar di dalam panel); kursor kustom & magnetik mati di layar sentuh.
- 768: grid 8 kolom; process 2×2.
- 1280+: penuh. Konten maks 1600px.

## 9. Daftar aset
| ID | Isi | Sumber mockup | Final |
|---|---|---|---|
| V1 | Tim berdiskusi | Pexels (dari ice7) | Pexels, grade hangat |
| P1–P10 | Foto proyek | 4 foto Unsplash ter-grade + 6 **placeholder** grafis | Foto stok per proyek, grade hangat |
| B1–B6 | Sampul artikel | placeholder grafis | Foto stok |
| T1–T8 | Foto tim | placeholder siluet | Foto stok potret |
| S1–S2 | Studio | Unsplash (dari ice7), ter-grade | sama |

Arah desain dan mockup ini harus disetujui owner ("approve desain") sebelum design-system dimulai.
