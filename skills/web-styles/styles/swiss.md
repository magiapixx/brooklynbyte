# Style pack: swiss

Status: disetujui (pustaka awal)

## Karakter
Gaya Tipografi Internasional: objektif, terstruktur, informasi di atas dekorasi. Hierarki dibangun dari ukuran, posisi, dan grid, bukan dari ornamen.

## Cocok / tidak cocok
- Cocok: firma desain, arsitek, insinyur, institusi, museum desain, event konferensi, laporan data.
- Tidak cocok: brand yang ingin terasa hangat, personal, atau mewah-emosional.

## Layout
- Grid modular ketat (12 kolom × baris modul); semua elemen menempel ke garis grid.
- Rata kiri, rata atas (flush left, ragged right); asimetris.
- Radius 0; garis sedikit, dipakai sebagai struktur.
- Pola khas: poster hero (angka/huruf sangat besar + blok warna); tabel jadwal/data; grid proyek berukuran seragam; daftar bernomor; footer kolom informasi.

## Warna
- Putih/hitam ditambah 1–2 warna primer datar (merah, biru, kuning) dengan chroma tinggi.
- Blok warna besar sebagai elemen komposisi, bukan aksen kecil.
- Tema gelap: hitam + putih + warna primer yang sama.
- Proporsi: 60 putih / 25 hitam / 15 warna primer.

## Tipografi
| Peran | Pilihan gratis | Perlakuan |
|---|---|---|
| Display | Schibsted Grotesk, Hanken Grotesk | Berat 500–700, huruf kecil/kapital sesuai konten, tracking rapat |
| Body | Hanken Grotesk | base 16/18px, satu ukuran body saja |
| Utility | Hanken Grotesk tabular, Space Mono | Angka, tanggal, nomor |

Skala: rasio mobile **minor-third (1.2)**, desktop **major-third (1.25)**, base 16/18px. Pakai maksimal 4–5 peran (misalnya hero, h2, h3, body, label).
`node skills/web-typeface/typescale.mjs --ratio-min minor-third --ratio-max major-third --base-min 16 --base-max 18`

Batasi ke 1 keluarga huruf, 2–3 berat, dan 4–5 ukuran.

## Gerak
- Ease: `power1.inOut`, `power2.out`. Durasi 0.4–0.7s.
- Khas: elemen meluncur lurus sepanjang sumbu grid; blok warna mengisi modul (scaleX/scaleY); angka berganti seperti papan jadwal; grid filter dengan Flip.
- Hindari: rotasi, pantulan, efek organik.

## Aset
- Ilustrasi: bentuk geometris dasar (lingkaran, bujur sangkar, garis) dan diagram.
- Foto: dipotong ke modul grid, hitam-putih atau warna asli tanpa filter.
- 3D: tidak perlu.
- Ikon: geometris sederhana.

## Komponen khas
- Tombol: blok warna persegi atau teks dengan panah.
- Kartu: modul grid tanpa border/shadow, judul di atas kiri.
- Navigasi: kolom teks kecil sejajar grid.

## Klise yang dihindari
- Helvetica tiruan tanpa sistem grid (gaya tanpa struktur).
- Teks rata tengah.
- Terlalu banyak ukuran huruf.
- Warna primer dipakai sebagai gradien.

## Checklist
- [ ] Semua elemen menempel ke grid modul
- [ ] Rata kiri konsisten
- [ ] Maksimal 2–3 berat dan 4–5 ukuran huruf
- [ ] Warna primer dipakai sebagai blok komposisi
