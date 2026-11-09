# Style pack: bento

Dibuat dari: opsi beranda C "Bento" (proyek Brooklynbyte, November 2026), disimpan atas permintaan owner sebagai ide gaya  ·  Status: disetujui owner (2026-11-08)

## Karakter
Halaman tersusun dari ubin bersudut bulat dengan ukuran berbeda, seperti kotak bento atau dashboard produk. Setiap ubin memuat satu gagasan: judul, video, angka, foto karya, wajah tim, jam studio. Terasa modern, rapi, dan "produk", tetapi tetap hangat karena foto dan satu ubin aksen yang mencolok.

## Cocok / tidak cocok
- Cocok: studio digital dan agensi, SaaS dan aplikasi, startup, portofolio dengan banyak bukti angka, landing page produk, event.
- Tidak cocok: teks panjang (artikel, laporan, hukum), merek mewah yang butuh ruang lega, situs dengan sedikit konten (ubin kosong terlihat dipaksakan).

## Layout
- Grid: 4 kolom (≥1024px), 6 kolom (≥1280px), 2 kolom tablet, 1 kolom mobile. Celah antar ubin kecil dan seragam (12px). Baris memakai tinggi relatif layar (`minmax(200px, 30svh)`).
- Ruang: rapat di dalam grid, lega di antara section (`--section`).
- Sudut & garis: radius besar `clamp(20px, 2.2vw, 32px)`; tanpa border; pemisah berupa perbedaan warna latar ubin (`--color-surface` vs `--color-bg`).
- Pola section khas:
  1. **Hero bento**: ubin judul besar (2×2 atau 3×3) + video + angka di ubin aksen + foto karya dengan kapsul keterangan + wajah tim + jam studio (ubin kecil disembunyikan di layar sempit).
  2. **Mosaik karya**: proyek dalam ubin berbeda ukuran (satu 2×2, satu tinggi 1×2, sisanya 1×1 atau 2×1) + satu ubin angka beraksen.
  3. **Kartu menumpuk saat scroll** (alternatif karya): kartu sticky `top: calc(96px + i * 14px)`, info di kiri, foto di kanan, kotak "Result" beraksen.
  4. **Akordeon bento** (layanan): kiri sticky judul + ubin CTA aksen, kanan ubin akordeon; ubin terbuka berubah gelap dan menampilkan deskripsi, chip deliverable, foto.
  5. **Grid layanan bento**: ubin intro lebar + ubin layanan teks/foto (ada yang setengah teks setengah foto) + ubin CTA aksen di pojok.

## Warna
- Netral: latar dan ubin dari keluarga yang sama dengan langkah L kecil (mis. bg L 0.16 / ubin L 0.21 di tema gelap; bg L 0.965 / ubin L 0.93 di tema terang), hue hangat rendah chroma (≤0.01).
- Aksen: satu warna jenuh (mis. oranye L 0.68 C 0.19 H 42), dipakai sebagai **ubin penuh** (angka, CTA, Result), bukan hanya teks.
- Tema gelap: cocok sebagai default; foto tetap berwarna, kapsul keterangan semi-transparan dengan blur.
- Proporsi: 60 netral / 32 foto & video / 8 ubin aksen. Maksimal satu ubin aksen per layar.

## Tipografi
| Peran | Pilihan gratis | Perlakuan |
|---|---|---|
| Display | Plus Jakarta Sans, Inter Tight, Manrope | Berat 500, tracking rapat (-0.03 sampai -0.04em), judul ubin maksimal 11ch |
| Body | Plus Jakarta Sans, Inter | Kecil dan tenang; teks ubin 1–2 kalimat |
| Utility | Label kapital kecil dengan titik aksen (`lbl-dot`) | Label ubin, tag kategori, jam, nomor |

Angka besar di ubin memakai `font-variant-numeric: tabular-nums` dan `clamp()` agar tidak meluap.
Skala: rasio mobile **major-third (1.25)**, desktop **perfect-fourth (1.333)**, base 16/18px.
`node skills/web-typeface/typescale.mjs --ratio-min major-third --ratio-max perfect-fourth --base-min 16 --base-max 18`

## Gerak
- Ease: `power3.out` / ease brand. Durasi 0.4–0.9s.
- Gerakan khas: ubin muncul berurutan (stagger 0.07s) saat masuk layar; angka menghitung naik; foto di ubin zoom pelan saat hover (scale 1.04–1.06); panah ubin berputar 45° saat hover; kartu menumpuk sticky (CSS saja).
- Hindari: ubin membesar/mengecil (expand/shrink), tilt 3D, atau glare pada kartu — owner menolak efek ini di proyek asal. Hindari juga gerak terus-menerus di banyak ubin sekaligus.

## Aset
- Ilustrasi: jarang; bila ada, ikon garis sederhana di ubin.
- Foto: crop penuh ubin (`object-fit: cover`), keterangan di kapsul bulat semi-transparan di bawah ubin.
- 3D: tidak perlu.
- Ikon: panah ↗ di lingkaran aksen, avatar tim bertumpuk.

## Komponen khas
- Tombol: kapsul (pill), solid aksen atau garis; tombol bulat panah ↗ di sudut ubin.
- Kartu/ubin: radius besar, tanpa border, latar surface; varian: foto penuh, angka, teks, aksen penuh, setengah foto.
- Chip: kapsul kecil untuk kategori · tahun dan deliverable.
- Navigasi: header minimal di atas grid; tidak ada sidebar.

## Klise yang dihindari
- Grid ubin seragam tanpa hierarki (semua 1×1) — wajib ada ubin besar dan kecil.
- Ubin terisi teks panjang atau lorem — satu gagasan per ubin.
- Banyak ubin aksen berwarna dalam satu layar.
- Glassmorphism berlebihan dan bayangan tebal pada setiap ubin.
- Ubin kosong dekoratif tanpa isi bermakna.

## Checklist
- [ ] Ada hierarki ukuran ubin (minimal satu ubin besar per grid)
- [ ] Maksimal satu ubin aksen penuh per layar
- [ ] Grid runtuh rapi ke 2 kolom (tablet) dan 1 kolom (mobile); ubin kecil yang tidak penting disembunyikan
- [ ] Angka besar tidak meluap di 360px dan zoom 200%
- [ ] Teks di atas foto selalu di kapsul semi-transparan (kontras WCAG)
- [ ] Gerak kartu hanya reveal/stagger dan hover zoom foto, tanpa expand/shrink
