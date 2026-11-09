# Style pack: playful-3d

Status: disetujui (pustaka awal)

## Karakter
Ceria dan taktil: objek 3D bulat yang terasa bisa disentuh, warna cerah yang harmonis, dan gerak memantul. Mengundang orang untuk bermain dengan halaman.

## Cocok / tidak cocok
- Cocok: produk konsumen, aplikasi mobile, F&B kekinian, edukasi anak muda, fintech ramah, event.
- Tidak cocok: firma hukum, layanan duka, institusi pemerintah, brand mewah.

## Layout
- Grid 12 kolom; blok besar dengan radius besar (20–32px); kapsul untuk tombol dan tag.
- Ruang sedang; objek 3D boleh keluar dari kartu (overlap) untuk kesan kedalaman.
- Pola khas: hero dengan objek 3D besar yang mengikuti kursor; grid fitur bento membulat; langkah-langkah dengan ilustrasi 3D kecil; testimoni dalam gelembung; CTA besar berwarna.

## Warna
- Latar terang lembut (L 0.96–0.98) atau satu warna pastel.
- 2–3 warna cerah harmonis (C 0.12–0.2) dengan lightness 0.65–0.85; satu warna utama.
- Tema gelap: latar biru tua/ungu tua (L ~0.2, C ~0.04), objek tetap cerah.
- Proporsi: 55 latar / 30 blok warna / 15 teks.

## Tipografi
| Peran | Pilihan gratis | Perlakuan |
|---|---|---|
| Display | Unbounded, Bricolage Grotesque | Berat 600–800 (line-height dari token) |
| Body | Onest, Figtree | 16–18px |
| Utility | Onest (berat 600) | Tag, label dalam kapsul |

Skala: rasio mobile **minor-third (1.2)**, desktop **perfect-fourth (1.333)**, base 16/18px. Judul besar dan tebal, langkah kecil tetap lega.
`node skills/web-typeface/typescale.mjs --ratio-min minor-third --ratio-max perfect-fourth --base-min 16 --base-max 18`

## Gerak
- Ease: `back.out(1.6)`, `elastic.out(1, 0.5)` (hemat). Durasi 0.4–0.9s.
- Khas: objek 3D berputar dan memantul mengikuti kursor; kartu "pop" saat masuk; tombol membesar sedikit saat hover; objek jatuh dengan fisika ringan.
- Hindari: gerak terlalu banyak sekaligus; elastic di semua elemen (bikin pusing).

## Aset
- 3D: inti gaya ini. Objek prosedural bulat (kapsul, torus, bola, kotak membulat) dengan `MeshPhysicalMaterial`/clearcoat, lampu lembut. Bentuk kompleks (karakter, produk) butuh `.glb` dari Blender/Spline.
- Ilustrasi: bentuk bulat dengan gradien halus satu warna.
- Foto: dipotong dalam bentuk membulat, latar warna datar.
- Ikon: membulat, garis 2px atau isi.

## Komponen khas
- Tombol: kapsul berwarna, hover membesar 1.03–1.05.
- Kartu: radius besar, latar warna lembut, objek 3D kecil di sudut.
- Navigasi: kapsul mengambang dengan latar blur ringan.

## Klise yang dihindari
- Karakter 3D generik ala stok ("blob" tersenyum).
- Gradien pelangi dan neon.
- Glassmorphism di setiap kartu.
- Objek 3D berat yang membuat halaman lambat (jaga ≤ 1 MB, lazy load).

## Checklist
- [ ] Objek 3D punya fallback gambar/SVG
- [ ] Palet 2–3 warna, teks kontras ≥ 4.5:1
- [ ] Gerak memantul dipakai pada elemen kunci saja
- [ ] Radius konsisten (satu nilai untuk kartu, kapsul untuk tombol)
