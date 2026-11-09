# Style pack: brutalism

Status: disetujui (pustaka awal)

## Karakter
Jujur, mentah, dan sengaja tidak dipoles, seperti beton ekspos atau poster fotokopi. Struktur halaman diperlihatkan, bukan disembunyikan. Percaya diri, sedikit konfrontatif.

## Cocok / tidak cocok
- Cocok: studio kreatif, label musik, galeri, festival, portofolio desainer, manifesto.
- Tidak cocok: layanan kesehatan, keuangan konsumen, brand yang menjual rasa aman.

## Layout
- Grid 12 kolom yang **terlihat**: border 1–2px di antara sel, sel kotak tegas.
- Rapat: gutter kecil (8–16px), konten penuh sampai tepi.
- Sudut tajam (`radius: 0`), border tebal sama dengan warna teks.
- Pola khas: hero huruf raksasa yang menabrak tepi; tabel indeks besar (no, nama, tahun, kategori); marquee; daftar dengan hover inversi; footer wordmark selebar layar.
- Boleh melanggar grid secara sengaja di 1–2 titik (teks menimpa gambar).

## Warna
- Netral ekstrem: L ≥ 0.96 atau ≤ 0.15, chroma ~0.
- Satu aksen jenuh tinggi (C ≥ 0.2) yang "mengganggu", dipakai hemat.
- Tema gelap: balik penuh (hitam/putih), aksen tetap.
- Proporsi: 60 netral / 35 teks / 5 aksen.

## Tipografi
| Peran | Pilihan gratis | Perlakuan |
|---|---|---|
| Display | Archivo (lebar 112–125, berat 800–900), Anton | Uppercase; timpa token `--text-mega--line-height: 0.85` dan `--text-display--line-height: 0.88`; boleh terpotong tepi (wordmark dekoratif) |
| Body | Archivo, Public Sans | 16–18px, rata kiri |
| Utility | IBM Plex Mono, JetBrains Mono | Label, nomor indeks, tanggal, koordinat |

Skala: rasio mobile **major-third (1.25)**, desktop **perfect-fifth (1.5)**, base 16/18px. Langkah `display`/`mega` mendominasi; pakai `--mega` untuk hero raksasa (dibatasi aturan zoom).
`node skills/web-typeface/typescale.mjs --ratio-min major-third --ratio-max perfect-fifth --base-min 16 --base-max 18`

## Gerak
- Ease: `steps(4)`, `power4.inOut`, atau tanpa transisi. Durasi 0.15–0.4s.
- Khas: hover inversi warna instan; teks yang "dicetak" per karakter dengan `steps`; marquee cepat; gambar muncul tanpa fade (cut).
- Hindari: fade lembut panjang, parallax halus, easing elastis.

## Aset
- Ilustrasi: jarang; bila ada, garis tebal satu warna atau ASCII art.
- Foto: kontras tinggi, hitam-putih, grain, halftone; crop agresif.
- 3D: tidak perlu; bila dipakai, wireframe tanpa shading.
- Ikon: panah teks (→ ↗), bukan set ikon.

## Komponen khas
- Tombol: kotak border tebal, hover = inversi penuh.
- Kartu: sel grid, bukan kartu mengambang; tanpa shadow.
- Navigasi: daftar teks mono di bar atas, garis bawah tebal.

## Klise yang dihindari
- Kekacauan tanpa sistem (brutalism tetap punya grid).
- Font "glitch" atau distorsi berlebihan.
- Shadow, gradien, dan glassmorphism.
- Warna aksen lebih dari satu.

## Checklist
- [ ] Grid terlihat dan konsisten di semua section
- [ ] Satu aksen saja
- [ ] Hover dan transisi cepat atau instan
- [ ] Kontras teks tetap ≥ 4.5:1 meski gaya kasar
