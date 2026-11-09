# Style pack: neo-brutalism

Status: disetujui (pustaka awal)

## Karakter
Versi brutalism yang ramah: garis hitam tebal, bayangan keras tanpa blur, dan warna datar yang cerah. Terasa seperti stiker dan kertas warna. Energik, mudah didekati, sedikit main-main.

## Cocok / tidak cocok
- Cocok: startup, SaaS, aplikasi produktivitas, komunitas, kursus online, event.
- Tidak cocok: brand mewah, firma hukum, lembaga yang butuh kesan formal.

## Layout
- Grid 12 kolom, tetapi elemen tampil sebagai **blok/kartu** dengan border 2–3px.
- Ruang sedang; kartu boleh sedikit miring (±2°) untuk 1–2 elemen saja.
- Radius kecil sampai sedang (6–16px) atau 0; konsisten di satu proyek.
- Bayangan keras: `box-shadow: 4px 4px 0 var(--color-fg)` (6–8px untuk elemen besar).
- Pola khas: hero dengan kartu-kartu bertumpuk; grid fitur berwarna; marquee stiker; FAQ akordeon berbingkai; kartu harga.

## Warna
- Latar terang hangat atau putih (L 0.96–0.99).
- 2–4 warna datar cerah (C 0.12–0.2) dengan lightness tinggi (L 0.75–0.9) untuk blok; teks tetap gelap.
- Garis dan bayangan = `--color-fg`.
- Tema gelap: latar L ~0.18, blok warna diturunkan L ke ~0.6, garis jadi terang.
- Proporsi: 50 latar / 30 blok warna / 20 garis & teks.

## Tipografi
| Peran | Pilihan gratis | Perlakuan |
|---|---|---|
| Display | Bricolage Grotesque, Familjen Grotesk | Berat 700–800, tidak harus uppercase (line-height dari token) |
| Body | Public Sans, Figtree | 16–18px |
| Utility | Space Mono, JetBrains Mono | Badge, label |

Skala: rasio mobile **minor-third (1.2)**, desktop **perfect-fourth (1.333)**, base 16/18px. Judul tebal; cukup 5–6 peran.
`node skills/web-typeface/typescale.mjs --ratio-min minor-third --ratio-max perfect-fourth --base-min 16 --base-max 18`

## Gerak
- Ease: `back.out(1.7)`, `power2.out`. Durasi 0.25–0.5s.
- Khas: tombol "ditekan" (translate 4px + bayangan menyusut); kartu masuk memantul; stiker berputar sedikit saat hover; counter angka.
- Hindari: gerak lambat dan sinematik; parallax panjang.

## Aset
- Ilustrasi: datar, outline hitam tebal, warna blok yang sama dengan palet.
- Foto: dibingkai border + bayangan keras, atau dipotong bentuk (lingkaran, kapsul).
- 3D: jarang; bila ada, objek bulat sederhana dengan outline.
- Ikon: garis tebal 2px, sudut membulat.

## Komponen khas
- Tombol: warna blok, border 2–3px, bayangan keras; hover/aktif = bergeser menutup bayangan.
- Kartu: border + bayangan keras, header berwarna.
- Navigasi: kapsul berbingkai, link aktif berlatar warna.

## Klise yang dihindari
- Semua warna pelangi sekaligus; batasi 2–4.
- Bayangan dengan blur (itu bukan neo-brutalism).
- Kartu miring di mana-mana.
- Emoji sebagai ikon.

## Checklist
- [ ] Border dan bayangan keras konsisten (tebal, offset, warna)
- [ ] Palet blok 2–4 warna, teks di atasnya kontras ≥ 4.5:1
- [ ] Interaksi tombol terasa "ditekan"
- [ ] Radius konsisten di seluruh proyek
