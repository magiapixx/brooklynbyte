# Style pack: editorial

Status: disetujui (pustaka awal)

## Karakter
Halaman diperlakukan seperti majalah atau buku: tipografi serif yang matang, kolom teks, caption, dan foto besar dengan crop berani. Membaca menjadi pengalaman utama.

## Cocok / tidak cocok
- Cocok: media, publikasi, lembaga riset, NGO, museum, budaya, blog panjang, laporan tahunan.
- Tidak cocok: aplikasi dengan banyak interaksi UI, toko dengan katalog besar.

## Layout
- Grid 12 kolom dengan kolom teks sempit (55–70 karakter) dan margin untuk catatan/caption.
- Ritme majalah: judul besar, deck/subjudul, byline, drop cap, pull quote, nomor halaman/bagian.
- Garis rule tipis di antara bagian; radius 0.
- Pola khas: sampul (judul + foto penuh); daftar artikel dengan nomor; artikel dua kolom; galeri dengan caption; indeks/daftar isi.

## Warna
- Latar "kertas" (L 0.95–0.98, sedikit hangat atau dingin) dan "tinta" gelap.
- Satu aksen warna cetak klasik (merah, biru, hijau tua) chroma sedang (0.1–0.16).
- Tema gelap: kertas gelap (L ~0.17) dan tinta krem.
- Proporsi: 70 kertas / 27 tinta / 3 aksen.

## Tipografi
| Peran | Pilihan gratis | Perlakuan |
|---|---|---|
| Display | Fraunces, Instrument Serif, Newsreader | Berat 300–600, italic untuk penekanan, optical size besar |
| Body | Source Serif 4, Literata (atau sans: Instrument Sans) | base 17/20px (generator); timpa `--text-base--line-height: 1.7` bila serif |
| Utility | IBM Plex Mono, IBM Plex Sans Condensed | Byline, tanggal, caption, nomor bagian |

Skala: rasio mobile **major-third (1.25)**, desktop **perfect-fourth (1.333)**, base 17/20px. Body lebih besar untuk kenyamanan membaca.
`node skills/web-typeface/typescale.mjs --ratio-min major-third --ratio-max perfect-fourth --base-min 17 --base-max 20`

## Gerak
- Ease: `power2.out`. Durasi 0.6–0.9s.
- Khas: foto terbuka dengan clip-path seperti halaman dibalik; pull quote muncul per baris; indikator progres baca; transisi halaman berupa geser lembut.
- Hindari: animasi yang mengganggu membaca; teks yang bergerak saat dibaca.

## Aset
- Ilustrasi: gaya cetak (garis tinta, cross-hatch, duotone).
- Foto: besar, crop berani, caption mono kecil; duotone atau hitam-putih untuk arsip.
- 3D: jarang.
- Ikon: hampir tidak ada; pakai teks dan nomor.

## Komponen khas
- Tombol: teks bergaris bawah atau kapital kecil, bukan blok warna besar.
- Kartu artikel: gambar + kategori + judul serif + byline, dipisah garis.
- Navigasi: masthead (nama besar di tengah atau kiri) dan rubrik.

## Klise yang dihindari
- Krem + serif + terakota (klise AI paling umum) kecuali diminta.
- Kolom teks terlalu lebar.
- Drop cap dan pull quote di setiap bagian.
- Garis hairline padat ala koran di semua tempat.

## Checklist
- [ ] Lebar baris 55–70 karakter
- [ ] Hierarki judul/deck/byline/caption jelas
- [ ] Foto punya caption dan crop yang disengaja
- [ ] Nyaman dibaca di ponsel (body ≥ 17px)
