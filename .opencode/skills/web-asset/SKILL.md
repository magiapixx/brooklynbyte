---
name: web-asset
description: Membuat aset visual website level Awwwards tanpa video: ilustrasi SVG teknis/isometrik, diagram siap animasi, 3D prosedural Three.js, gambar raster teroptimasi, dan OG image, dengan batas ukuran yang ketat.
---

# Web Asset — Ahli Aset Visual

Skill ini mengatur cara membuat ASET: ilustrasi, diagram, ikon, 3D, dan gambar. Animasinya diatur skill `web-motion`; warnanya dari `web-colorist`.

## Prinsip

1. **Aset menjelaskan subjek.** Gambar harus menunjukkan sesuatu yang nyata dari dunia klien (produknya, prosesnya, materialnya), bukan bentuk dekoratif acak.
2. **Satu bahasa visual.** Semua aset dalam satu situs memakai gaya garis, sudut, dan palet yang sama.
3. **Ringan dulu.** Pilih format terkecil yang cukup: SVG > 3D prosedural > raster > model `.glb`. Tanpa video.
4. **Bisa ganti tema.** Warna dari token CSS, bukan nilai tetap.
5. **Siap digerakkan.** Struktur aset dirancang untuk animasi sejak awal.

## Memilih format

| Kebutuhan | Format |
|---|---|
| Ilustrasi teknis, diagram, ikon, pola | SVG inline (komponen `.astro`) |
| Objek 3D sederhana (balok, pelat, kemasan, rangka) | Geometri prosedural Three.js |
| Objek 3D kompleks (produk asli, karakter) | `.glb` dari Blender, dikompres |
| Foto produk, tim, lokasi | Raster dari klien atau stok berlisensi |
| Tekstur (beton, kertas, kain) | Shader noise, atau raster ≤ 1024 px yang bisa diulang |
| OG image | PNG 1200×630 |

## Gaya ilustrasi yang tidak terlihat seperti clip-art

Gaya aset (ilustrasi, foto, 3D, ikon) ditentukan bagian "Aset" di style pack (`web-styles`). Teknik di bawah adalah contoh untuk gaya teknis/minimal; gaya lain (misalnya `playful-3d`, `luxury`) memakai perlakuan berbeda.


- **Gambar teknik**: garis tipis seragam (1–1.5 px, `vector-effect="non-scaling-stroke"`), garis ukur, label mono kecil, nomor bagian (`A`, `B`, `01`).
- **Isometrik**: proyeksi 30°. Tiga sisi kotak memakai tiga tingkat terang dari token (`--color-bg`, `--color-surface`, `--color-border`) dengan garis `--color-fg`. Aksen hanya pada satu elemen.
- **Blueprint/diagram**: grid tipis di belakang, elemen utama tegas di depan, panah dan anotasi.
- Hindari: gradien pelangi, bayangan lembut, karakter kartun generik, ikon set bawaan tanpa disesuaikan.

### Rumus isometrik (untuk script pembuat SVG)
Titik 3D `(x, y, z)` ke 2D:
```
sx = (x - y) * cos(30°)
sy = (x + y) * sin(30°) - z
```
Gambar sisi dari yang paling jauh ke paling dekat (urutkan berdasarkan `x + y + z`).
Untuk aset berulang (tumpukan kontainer, rak, rangka), buat script kecil (Python atau Node) yang menghasilkan SVG, lalu simpan hasilnya sebagai komponen. Jangan menulis ratusan path dengan tangan.

## SVG siap animasi

```astro
<svg viewBox="0 0 400 300" role="img" aria-labelledby="t-truss">
  <title id="t-truss">{alt}</title>
  <g data-part="grid" stroke="var(--color-border)">…</g>
  <g data-part="beam-1" fill="none" stroke="var(--color-fg)" vector-effect="non-scaling-stroke">…</g>
  <g data-part="accent" fill="var(--color-accent)">…</g>
</svg>
```
- `data-part` per kelompok gerak, urut sesuai koreografi.
- Garis yang akan tergambar: `stroke`, `fill="none"`, path utuh (bukan banyak potongan kecil). **Jangan** beri `vector-effect: non-scaling-stroke` pada garis yang dianimasikan dengan `drawSVG`; panjang dash jadi salah dan garis tidak tergambar penuh. Pakai `non-scaling-stroke` hanya untuk ilustrasi statis.
- Label teks: hitung lebarnya saat menentukan `viewBox` (perkiraan mono 9px ≈ 6 px per karakter), atau label akan terpotong di tepi.
- Bentuk yang akan muncul/merakit: kelompok `<g>` terpisah dengan `transform-box: fill-box` agar bisa diskalakan dari pusatnya.

## 3D prosedural (Three.js)

Aset 3D adalah **data**, bukan scene. Contoh balok I (profil WF):
```ts
// src/assets/3d/i-beam.ts — tanpa import three; motion-developer yang membuat mesh.
export const iBeamProfile = (h = 1, b = 0.6, tw = 0.08, tf = 0.12) => [
  [-b/2, -h/2], [b/2, -h/2], [b/2, -h/2 + tf], [tw/2, -h/2 + tf],
  [tw/2, h/2 - tf], [b/2, h/2 - tf], [b/2, h/2], [-b/2, h/2],
  [-b/2, h/2 - tf], [-tw/2, h/2 - tf], [-tw/2, -h/2 + tf], [-b/2, -h/2 + tf],
];
```
`motion-developer` memakai profil ini dengan `THREE.Shape` + `ExtrudeGeometry`.
- Batas: ≤ 50.000 segitiga per scene, material sederhana (`MeshStandardMaterial`), maksimal 2 lampu.
- Warna material dibaca dari token saat runtime, bukan ditulis tetap.
- Selalu sediakan fallback SVG yang menggambarkan objek yang sama.

## Raster

- Simpan sumber resolusi penuh di `src/assets/images/`; tampilkan dengan `<Image>` / `<Picture>` dari `astro:assets` (AVIF + WebP, `widths` sesuai layout).
- Foto: ≤ 200 KB per gambar setelah konversi. Hero di atas lipatan: `loading="eager"`, `fetchpriority="high"`; lainnya lazy.
- Konversi manual: `sharp` (`npx sharp-cli` atau script Node).

## Model `.glb`

```bash
npx @gltf-transform/cli optimize in.glb out.glb --compress draco --texture-compress webp --texture-size 1024
```
Decoder Draco di-self-host di `public/draco/` (lihat aturan motion-developer).

## OG image

PNG 1200×630, ≤ 300 KB. Isi: nama brand, satu kalimat, satu elemen visual khas. Hasilkan dari SVG dengan `sharp`:
```bash
node -e "require('sharp')('og.svg').png().toFile('public/og-default.png')"
```

## Optimasi SVG

```bash
npx svgo --multipass -i in.svg -o out.svg
```
Jangan biarkan svgo menghapus `data-part`, `<title>`, atau `vector-effect` (gunakan konfigurasi `removeUnknownsAndDefaults: false` bila perlu).

## Checklist

- [ ] Semua aset di Daftar aset design-direction sudah ada
- [ ] Warna hanya dari token; tampil benar di tema terang, gelap, dan setiap mood
- [ ] Ukuran di bawah batas; tercatat di `docs/assets.md`
- [ ] Aset bergerak punya `data-part` dan fallback statis
- [ ] Alt text dirujuk dari `docs/content.md`
- [ ] Sumber dan lisensi tercatat; aset AI ditandai
