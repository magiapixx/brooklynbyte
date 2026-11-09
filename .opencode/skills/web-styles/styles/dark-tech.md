# Style pack: dark-tech

Status: disetujui (pustaka awal)

## Karakter
Gelap, presisi, dan hidup: seperti panel kendali atau terminal. Data, kode, dan struktur ditampilkan sebagai bagian dari estetika. Terasa canggih tanpa menjadi film fiksi ilmiah murahan.

## Cocok / tidak cocok
- Cocok: AI, developer tool, infrastruktur cloud, keamanan siber, fintech, web3, riset.
- Tidak cocok: F&B, fashion, layanan anak, brand yang harus terasa hangat.

## Layout
- Grid 12 kolom dengan garis grid tipis yang terlihat samar; panel-panel berbingkai 1px.
- Rapat-sedang; banyak elemen kecil (label, status, angka).
- Radius kecil (4–8px) atau 0.
- Pola khas: hero dengan visual 3D/shader + perintah terminal; bento fitur dengan cuplikan kode; log/aktivitas real-time; tabel perbandingan; changelog.

## Warna
- Latar gelap dengan hue (L 0.12–0.18, C 0.01–0.03), bukan hitam murni.
- Satu aksen bercahaya. **Jangan default ke hijau/oranye asam**: cari dari subjek (biru kobalt, ungu ultraviolet, kuning natrium, cyan) dan jelaskan alasannya.
- Warna semantik untuk status (ok/peringatan/kritis) terpisah dari aksen.
- Tema terang: wajib disediakan (abu-abu dingin terang + aksen yang sama, diturunkan lightness-nya).
- Proporsi: 80 gelap / 15 teks / 5 aksen bercahaya.

## Tipografi
| Peran | Pilihan gratis | Perlakuan |
|---|---|---|
| Display | Geist, Chakra Petch (untuk kesan lebih teknis) | Berat 500–600, tracking rapat |
| Body | Geist | 16–17px |
| Utility | Geist Mono, JetBrains Mono | Kode, angka, label status, timestamp |

Skala: rasio mobile **major-second (1.125)**, desktop **minor-third (1.2)**, base 16/17px. Skala rapat untuk antarmuka padat; angka memakai mono.
`node skills/web-typeface/typescale.mjs --ratio-min major-second --ratio-max minor-third --base-min 16 --base-max 17`

## Gerak
- Ease: `power4.out`, `expo.out`. Durasi 0.3–0.8s.
- Khas: teks diacak lalu tersusun (ScrambleText); kode diketik; garis grid menyala mengikuti kursor; angka/metrik berganti live; partikel atau wireframe 3D bereaksi pada scroll.
- Hindari: glitch berlebihan, kedip cepat (risiko kejang), scanline penuh layar.

## Aset
- 3D: wireframe, partikel, permukaan noise/shader; garis tipis bercahaya.
- Ilustrasi: diagram arsitektur sistem, grafik, node-and-edge.
- Foto: jarang; bila ada, desaturasi dan diberi tint gelap.
- Ikon: garis 1.5px, geometris.

## Komponen khas
- Tombol: solid aksen dengan teks gelap, atau bingkai 1px dengan glow tipis saat hover.
- Kartu: panel berbingkai 1px, header mono kecil, sudut kecil.
- Navigasi: bar tipis dengan status kecil (versi, status sistem).

## Klise yang dihindari
- Hitam pekat + hijau neon / oranye asam tanpa alasan (klise AI).
- Gradien ungu-biru "AI".
- Efek Matrix, hujan kode, hologram.
- Teks abu-abu gelap di latar gelap (kontras gagal).

## Checklist
- [ ] Aksen dipilih dari subjek dan dijelaskan
- [ ] Teks sekunder tetap ≥ 4.5:1 di latar gelap
- [ ] Tema terang tersedia
- [ ] Efek berkedip < 3 kali per detik
