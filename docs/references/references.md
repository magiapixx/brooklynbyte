# Referensi desain: Brooklynbyte

Diterima dari owner 2026-11-06. Referensi adalah **sumber prinsip, bukan untuk disalin**.
Owner mengonfirmasi tabel "ambil / jangan ambil" di bawah (2026-11-06).

## Arahan umum owner
- Web loader sebelum halaman utama, dengan transisi dari loader ke hero section.
- Fokus animasi: **transisi antar section**. Tingkat animasi: kaya (page transition, micro animation, section transition).
- CodePen 1 dipakai untuk About us dengan animasi **dibalik** (gambar kecil ke besar), lalu transisi ke CodePen 2 sebagai projects showcase. Sisanya disesuaikan.
- Font utama: **Plus Jakarta Sans**. Aksen: **oranye**. Bahasa: **English**.
- Aset: foto/video stok, disesuaikan dengan desain web.

## Referensi kode

### C1 — Daniel Hult, "Scroll UI animation"
- Prioritas: tinggi
- URL: https://codepen.io/daniel-hult/pen/yLpwqgR
- File: `codepen-01-daniel-hult-image-scale.txt`, `codepen-src/b2af3cee-scroll-ui-animation/` (lisensi MIT)
- Untuk section: About us
- Ambil: section di-pin, angka naik (counter), garis grid tengah, 4 kotak penutup yang menskala berurutan, foto bergeser/menskala.
- Ubah: **urutan dibalik**: foto mulai kecil di satu sel grid lalu membesar ke layar penuh.
- Jangan ambil: ScrollSmoother (pakai Lenis), warna hijau zaitun, font Matter.
- Gerak: pin `end: +=1500`, scrub; timeline: counter 0→97, warna judul, wrapper xPercent, image scale, box 1–4 scaleX/scaleY berurutan.

### C2 — Filip Zrnzevic, "Full screen scroll slideshow with sound FX"
- Prioritas: tinggi
- URL: https://codepen.io/filipz/pen/zxGPYMP
- File: `codepen-02-filipz-showcase.txt`, `codepen-src/ff153e2c-gsap-component-full-screen-scroll-slideshow-with-sound-fx/` (lisensi MIT)
- Untuk section: Projects showcase (Home) + loader
- Ambil: loader counter [00]→[100] lalu overlay naik (1.2s, power3.inOut) dan kolom muncul berurutan; section di-pin 10 langkah dengan snap; foto latar clip-path dari bawah/atas + parallax 5% foto lama; judul tengah per kata dari mask (SplitText, CustomEase `M0,0 C0.86,0 0.07,1 1,1`, 0.64s); daftar kiri/kanan dengan titik aktif; progress 01/10; keluar: kontainer menyusut + blur.
- Jangan ambil: efek suara, huruf kapital penuh, font PP Neue Montreal, foto api oranye.

## Referensi gambar

| Ref | File | Ambil | Jangan ambil |
|---|---|---|---|
| R1 | ref-01.png | Bingkai About (layout C1): grid bergaris, angka besar, foto kecil di sel | Hijau zaitun |
| R2 | ref-02.png | Projects showcase (C2): foto layar penuh, judul besar atas-bawah, daftar kiri-kanan dengan titik aktif, progress 05/10 | Foto orang bernuansa api |
| R3 | ref-03.jpg | Daftar layanan akordeon: nomor, nama, deskripsi, panah, satu baris terbuka, kartu gelap membulat | Hijau lime |
| R4 | ref-04.jpg | Menu layar penuh: kata besar bertumpuk, item aktif terang, lainnya redup; info kontak kiri | — |
| R5 | ref-05.jpg | Baris layanan dengan gambar hover, kartu testimoni, CTA "Let's talk" + marquee, wordmark CONTACT raksasa | Lingkaran merah |
| R6 | ref-06.jpg | Hero di dalam bingkai membulat, daftar layanan berganti terang saat hover dengan pratinjau gambar | — |
| R7 | ref-07.jpg | Kartu membulat, angka besar (230K), baris logo klien, FAQ | Gradien oranye penuh |
| R8 | ref-08.jpg | Footer: wordmark raksasa terpotong di bawah, kolom tautan, CTA | — |
| R9 | ref-09.jpg | Baris statistik besar (58+ / 123+) | Teks lorem |
| R10 | ref-10.jpg | Timeline proses: kartu bertingkat dengan chip | — |

## Referensi footer (diterima 2026-11-06, revisi footer)
| Ref | File | Ambil | Jangan ambil |
|---|---|---|---|
| F1 | ref-footer-01.jpg | Latar gelap dengan cahaya oranye kabur dari bawah, wordmark raksasa di dasar | Logo dua gaya huruf, badge Google |
| F2 | ref-footer-02.jpg | Kolom dengan label kecil uppercase + garis kiri, tautan berukuran besar | Logo ikon |
| F3 | ref-footer-03.jpg | Wordmark sebagai penutup | Kartu biru, form newsletter |
| F4 | ref-footer-04.jpg | CTA terpisah di atas footer | Footer kartu putih |
| F5 | ref-footer-05.jpg | Pola "Let's work together" + tautan, alamat studio | Kuning lime |
| F6 | ref-footer-06.jpg | Garis pemisah sebelum wordmark, legal di dasar | Tombol kotak hitam |

## Hal yang tidak disukai
- Footer v1 (kartu terang di atas gelap): tidak cocok dengan bagian lain.
- Video saja / berat tanpa alasan (owner mengizinkan stok video untuk proyek ini, tetap ringan).
