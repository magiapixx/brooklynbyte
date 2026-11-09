# Style pack: luxury

Status: disetujui (pustaka awal)

## Karakter
Lambat, tenang, dan percaya diri. Kemewahan datang dari ruang, kualitas foto, dan tipografi yang halus, bukan dari ornamen emas. Setiap transisi terasa seperti membuka pintu dengan pelan.

## Cocok / tidak cocok
- Cocok: hotel, resort, fashion, perhiasan, properti premium, restoran fine dining, parfum.
- Tidak cocok: produk murah/promo, aplikasi teknis, layanan cepat.

## Layout
- Grid 12 kolom dengan margin sangat lebar; konten sering terpusat di 6–8 kolom.
- Sangat lega: section 160–240px; satu gambar atau satu kalimat per layar.
- Radius 0 atau sangat kecil; garis 0.5–1px.
- Pola khas: hero foto penuh layar dengan nama brand kecil; teks tengah dengan banyak ruang; galeri horizontal lambat; kartu kamar/produk besar; reservasi sederhana.

## Warna
- Netral hangat lembut (gading, pasir, arang) dengan chroma rendah 0.005–0.02.
- Aksen sangat redup (zaitun tua, burgundy, biru malam), atau tanpa aksen.
- Tema gelap: arang hangat (L 0.15–0.2) dengan teks gading.
- Proporsi: 70 latar / 25 foto / 5 teks & aksen.

## Tipografi
| Peran | Pilihan gratis | Perlakuan |
|---|---|---|
| Display | Bodoni Moda, Cormorant Garamond, Italiana | Berat 300–400, ukuran besar, letter-spacing sedikit lebar untuk kapital |
| Body | Jost, Mulish | base 16/17px, berat 300–400; timpa `--text-base--line-height: 1.7` |
| Utility | Jost (kapital kecil +0.2em) | Label, navigasi |

Skala: rasio mobile **minor-third (1.2)**, desktop **augmented-fourth (1.414)**, base 16/17px. Kontras besar antara display tipis dan body kecil.
`node skills/web-typeface/typescale.mjs --ratio-min minor-third --ratio-max augmented-fourth --base-min 16 --base-max 17`

## Gerak
- Ease: `expo.out`, `power2.inOut`. Durasi 1.2–1.8s.
- Khas: foto skala 1.15 menjadi 1 perlahan; teks fade per baris dengan jeda panjang; galeri digeser lambat; kursor kecil yang membesar di atas foto; transisi halaman berupa tirai warna netral.
- Hindari: apa pun yang cepat, memantul, atau berkedip.

## Aset
- Foto: inti gaya ini. Penuh layar, cahaya alami, grain halus, warna diturunkan saturasinya. **Wajib dari klien atau stok berlisensi**; jangan diganti ilustrasi.
- Ilustrasi: garis sangat tipis (monogram, ornamen minimal) bila perlu.
- 3D: jarang; bila ada, produk dengan material realistis (`.glb`).
- Ikon: garis 1px, sangat sedikit.

## Komponen khas
- Tombol: teks kapital kecil dengan garis bawah tipis, atau garis bingkai tipis.
- Kartu: foto besar + nama + satu baris; tanpa border.
- Navigasi: tersembunyi di menu layar penuh, atau 3–4 tautan kapital kecil.

## Klise yang dihindari
- Gradien emas, efek kilau, tekstur marmer stok.
- Huruf script/kaligrafi berlebihan.
- Terlalu banyak teks; kemewahan butuh ruang.
- Foto stok generik (pasangan tersenyum, gelas sampanye).

## Checklist
- [ ] Foto berkualitas tersedia (bila tidak, gaya ini tidak cocok)
- [ ] Ruang sangat lega dan konsisten
- [ ] Semua gerak lambat (≥ 1s)
- [ ] Teks gading/arang tetap kontras ≥ 4.5:1
