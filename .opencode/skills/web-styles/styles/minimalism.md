# Style pack: minimalism

Status: disetujui (pustaka awal)

## Karakter
Tenang dan presisi. Setiap elemen punya alasan, ruang kosong menjadi bahan desain. Kualitas terlihat dari detail kecil: jarak, perataan, dan ketepatan huruf.

## Cocok / tidak cocok
- Cocok: arsitektur, interior, produk premium, konsultan, studio teknis, portofolio fotografer.
- Tidak cocok: e-commerce dengan ribuan produk, media berita, brand yang harus terasa ramai dan murah.

## Layout
- Grid 12 kolom tersembunyi, perataan sangat rapi.
- Lega: jarak antar section 120–200px; satu fokus per layar.
- Sudut tajam atau radius sangat kecil (2–4px); garis 1px tipis.
- Pola khas: hero teks + satu visual; daftar layanan berbaris dengan garis tipis; satu gambar besar per section; section di-pin bertahap; footer sederhana.

## Warna
- Netral dengan sedikit hue (C 0.003–0.01), hangat atau dingin sesuai subjek.
- Aksen redup (C 0.08–0.15) atau tanpa aksen; hierarki dari lightness.
- Tema gelap: netral gelap dengan hue yang sama, bukan hitam murni.
- Proporsi: 75 latar / 22 teks / 3 aksen.

## Tipografi
| Peran | Pilihan gratis | Perlakuan |
|---|---|---|
| Display | Instrument Sans, Manrope, atau serif Newsreader | Berat 400–500 (tracking dari token) |
| Body | Instrument Sans, Figtree | base 16/18px (generator) |
| Utility | Geist Mono, JetBrains Mono | Label kecil uppercase +0.1em |

Skala: rasio mobile **minor-third (1.2)**, desktop **major-third (1.25)**, base 16/18px. Kontras ukuran halus; hierarki dibantu ruang dan berat.
`node skills/web-typeface/typescale.mjs --ratio-min minor-third --ratio-max major-third --base-min 16 --base-max 18`

## Gerak
- Ease: `power3.out`, `expo.out`. Durasi 0.8–1.2s. Stagger 0.05–0.08s.
- Khas: judul naik per baris dari mask; reveal halus; gambar zoom keluar perlahan; section di-pin dengan pergantian lembut.
- Hindari: pantulan, getar, banyak efek dalam satu layar.

## Aset
- Ilustrasi: garis tipis 1–1.25px, gambar teknik atau isometrik, satu aksen.
- Foto: tenang, banyak ruang negatif, warna terkendali.
- 3D: objek tunggal sederhana dengan material matte dan garis tepi tipis.
- Ikon: garis 1–1.5px, minimal.

## Komponen khas
- Tombol: teks + panah, atau kotak solid kecil; hover warna berubah perlahan.
- Kartu: tanpa bayangan; dipisah garis tipis atau ruang.
- Navigasi: 3–5 tautan teks kecil, CTA terpisah.

## Klise yang dihindari
- Putih kosong tanpa satu pun detail khas subjek (terlihat seperti template).
- Abu-abu murni tanpa hue.
- Fade-in di setiap elemen.
- Krem + serif + terakota (klise AI) kecuali diminta.

## Checklist
- [ ] Satu fokus per layar
- [ ] Spasi mengikuti skala, perataan presisi
- [ ] Ada minimal satu detail khas subjek (data, label, material)
- [ ] Gerak lambat dan konsisten
