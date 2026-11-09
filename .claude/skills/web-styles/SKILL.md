---
name: web-styles
description: Pustaka gaya visual website (style pack): brutalism, neo-brutalism, minimalism, editorial, swiss, luxury, playful-3d, dark-tech, bento. Memilih, menggabungkan, dan membuat pack baru dari referensi.
---

# Web Styles — Pustaka Gaya

Pustaka ini berisi **rekomendasi**, bukan aturan wajib: referensi owner tetap sumber utama, dan desain boleh dibuat langsung dari referensi tanpa pack. Setiap gaya disimpan sebagai **style pack** di `styles/<nama>.md`. Satu pack berisi semua keputusan gaya: layout, warna, huruf, gerak, aset, komponen, dan klise yang harus dihindari. Skill lain (`web-layout`, `web-colorist`, `web-typeface`, `web-motion`, `web-asset`) berisi teknik yang netral gaya. Rasa ditentukan oleh `docs/design-direction.md`, yang boleh berbasis pack atau ditulis langsung dari referensi.

## Pack yang tersedia
| Pack | Karakter singkat | Cocok untuk |
|---|---|---|
| `brutalism` | Mentah, grid terlihat, huruf raksasa, kontras ekstrem | Studio kreatif, musik, galeri, manifesto |
| `neo-brutalism` | Warna datar cerah, garis tebal, bayangan keras, ramah | Startup, produk SaaS, komunitas, edukasi |
| `minimalism` | Ruang kosong, presisi, sedikit warna | Arsitektur, produk premium, konsultan |
| `editorial` | Seperti majalah: serif, kolom, foto besar | Media, lembaga, NGO, publikasi, budaya |
| `swiss` | Grid ketat, sans grotesk, hierarki dari ukuran | Firma desain, teknik, institusi |
| `luxury` | Lambat, serif kontras tinggi, foto penuh layar | Hotel, fashion, properti, perhiasan |
| `playful-3d` | Objek 3D bulat, warna cerah, gerak memantul | Produk konsumen, aplikasi, F&B, anak muda |
| `dark-tech` | Gelap, wireframe, data hidup, monospace | AI, developer tool, fintech, keamanan |
| `bento` | Ubin bersudut bulat beda ukuran, satu ubin aksen, foto + angka | Studio digital, SaaS, startup, portofolio berbasis angka |

## Cara merekomendasikan (ui-ux-designer)
1. Baca referensi owner (`docs/references/`). Untuk setiap referensi, tentukan pack terdekat dan tulis tabel pencocokan:
   `| Ref | Prioritas | Pack terdekat | Kecocokan (tinggi/sedang/rendah) | Alasan |`
   Bila kecocokan rendah atau tidak ada, tulis gaya langsung dari referensi di design-direction; pack tidak wajib dipakai.
2. **Konflik antar referensi**: bila referensi mengarah ke pack yang bertentangan (misalnya `brutalism` vs `luxury`):
   - referensi berprioritas lebih tinggi menentukan pack utama; yang lebih rendah hanya boleh menyumbang detail yang tidak bertentangan;
   - bila prioritasnya sama, **BERHENTI dan tanya owner** (sebutkan kedua pack dan apa bedanya). Jangan menebak, jangan mencampur diam-diam.
3. Bila memakai pack: rekomendasikan **satu pack utama**, boleh ditambah **satu pack pendukung** untuk bagian tertentu, misalnya `minimalism` + aksen `swiss` pada grid data. Lebih dari dua pack membuat situs terasa tidak konsisten.
4. Tulis di `docs/design-direction.md`: pack utama, pack pendukung (bila ada), dan **penyesuaian**: apa yang diubah dari pack agar sesuai klien dan referensi.
5. Nilai di pack (warna, font, durasi) adalah **titik awal**, bukan nilai wajib. Warna aksen tetap dicari dari subjek klien (lihat `web-colorist`).

## Menyimpan gaya baru sebagai pack (opsional)
Bila gaya ditulis langsung dari referensi (misalnya retro Y2K, organik/hand-drawn, art deco) dan owner ingin memakainya lagi:
1. Salin `styles/_template.md` menjadi `styles/<nama-baru>.md`.
2. Isi setiap bagian dari pengamatan referensi: apa yang konsisten di semua referensi, bukan detail satu situs.
3. Tandai di bagian atas: `Dibuat dari: R1, R3 (proyek <nama>)` dan `Status: draft`.
4. Tawarkan ke owner di gerbang "approve desain" (bersama mockup). Hanya bila owner setuju, simpan dengan status `disetujui owner` untuk proyek berikutnya.

## Aturan
- Pack adalah gaya, bukan template: jangan menyalin contoh section mentah-mentah. Konten dan struktur tetap mengikuti spec.
- Setiap pack tetap tunduk pada aturan bersama: kontras WCAG, reduced-motion, tanpa video, batas ukuran aset, nama token di `AGENTS.md`.
- Bagian "Klise yang dihindari" di pack wajib dipatuhi kecuali owner memintanya secara eksplisit.
