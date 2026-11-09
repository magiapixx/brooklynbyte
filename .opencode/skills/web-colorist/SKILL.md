---
name: web-colorist
description: Ahli warna untuk website: membangun palet dengan OKLCH, token peran warna, kontras WCAG, light/dark mode, dan palet per gaya (brutalism, minimalism, editorial).
---

# Web Colorist — Ahli Warna

Skill ini menentukan PALET dan cara warna dipakai. Hasil akhirnya selalu berupa token CSS di `src/styles/tokens.css` yang dipakai Tailwind.

## Langkah kerja

1. **Cari asal warna dari subjek**, bukan dari tren. Tanyakan: material apa, tempat apa, budaya apa yang dekat dengan brand ini? (contoh: software house di Jakarta → beton, lampu jalan natrium, layar terminal, batik modern).
2. **Tentukan 1 warna aksen** yang menjadi identitas. Hanya satu.
3. **Bangun netral** dengan sedikit hue dari aksen (bukan abu-abu murni).
4. **Tetapkan peran**, bukan nama warna.
5. **Cek kontras** semua pasangan teks/latar.
6. **Buat versi gelap** dengan sengaja, bukan sekadar membalik.

## Gunakan OKLCH

OKLCH membuat terang-gelap konsisten antar hue. Format: `oklch(L C H)`.
- L (lightness) 0–1: atur hierarki terang/gelap di sini.
- C (chroma) 0–0.37: kejenuhan. Netral 0.005–0.02, aksen 0.15–0.25.
- H (hue) 0–360.

Skala netral: pertahankan H dan C kecil, ubah L saja (contoh L: 0.98, 0.94, 0.86, 0.70, 0.50, 0.35, 0.22, 0.14).

## Token peran (wajib)

```css
:root {
  --bg: ...;          /* latar utama */
  --surface: ...;     /* kartu, panel */
  --fg: ...;          /* teks utama */
  --muted: ...;       /* teks sekunder */
  --line: ...;        /* border, garis grid */
  --accent: ...;      /* aksen identitas */
  --on-accent: ...;   /* teks di atas aksen */
}
@media (prefers-color-scheme: dark) { :root { /* redefinisi token yang sama */ } }
```
Komponen hanya boleh memakai token ini. Jangan ada hex langsung di komponen.

## Aturan proporsi 60-30-10

60% latar/netral, 30% teks dan elemen sekunder, 10% aksen. Aksen dipakai untuk: CTA utama, satu highlight per section, state aktif. Bukan untuk dekorasi di mana-mana.

## Kontras (WCAG)

- Teks body: minimal **4.5:1**.
- Teks besar (≥ 24px, atau ≥ 19px bold) dan ikon/UI: minimal **3:1**.
- Teks di atas gambar: beri lapisan gelap/terang atau latar solid.
- Jalankan pengecekan dengan script kecil (rumus relative luminance WCAG) sebelum menyerahkan palet.

## Palet per gaya

Rentang lightness, chroma, jumlah aksen, dan proporsi warna untuk tiap gaya ada di skill **`web-styles`** (bagian "Warna" di pack yang dipilih). Langkah kerja di atas tetap berlaku untuk semua gaya: aksen dicari dari subjek, netral diberi hue, kontras dicek.

## Warna per section

Section boleh punya mood sendiri lewat atribut `data-mood="<nama>"`. Setiap mood adalah selector CSS `[data-mood="<nama>"]` yang mendefinisikan ulang token warna untuk light DAN dark, jadi dark mode tetap benar. Skill `web-motion` hanya mengganti atribut ini. Maksimal 3 mood dalam satu halaman, semuanya diambil dari palet yang sama.

## Hindari (klise desain AI)

- Krem hangat + serif + aksen terakota.
- Hitam pekat + satu hijau neon / oranye menyala tanpa alasan.
- Gradien ungu-ke-biru di atas putih.
- Abu-abu murni tanpa hue.
Jika user meminta salah satu ini secara eksplisit, ikuti user.

## Output yang diserahkan

1. Satu kalimat konsep warna (asal-usulnya dari subjek).
2. `tokens.css` lengkap light + dark.
3. Tabel kontras pasangan utama (fg/bg, muted/bg, on-accent/accent).
4. Contoh pemakaian di Tailwind (`bg-[var(--bg)]` atau `theme.extend.colors`).
