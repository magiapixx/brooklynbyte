# Keputusan

| Tanggal | Keputusan | Alasan | Oleh |
|---|---|---|---|
| 2026-11-06 | Data perusahaan sepenuhnya fiktif; aturan 5 AGENTS.md dikecualikan | Permintaan owner (proyek uji) | owner |
| 2026-11-06 | Foto & video stok diizinkan (pengecualian "Tanpa video") | Permintaan owner; video tetap ringan (≤ 1 MB) | owner |
| 2026-11-06 | Adaptasi kode C1 (Daniel Hult) & C2 (Filip Zrnzevic), lisensi MIT; kredit di komentar file motion | Referensi owner | ui-ux-designer |
| 2026-11-06 | Situs selalu gelap dengan section terang/oranye (tidak ikut tema sistem) | Asumsi pertanyaan terbuka 1 di spec | ui-ux-designer |
| 2026-11-06 | Email fiktif `hello@brooklynbyte.studio`; studio di Brooklyn, NY | Asumsi pertanyaan terbuka 2–3 | ui-ux-designer |
| 2026-11-06 | Mockup v1 memakai CSS/JS bersama (`assets/`) dan generator `src/build.py` untuk 6 halaman, bukan satu file mandiri per halaman | Menghindari 6 salinan header/footer/script; tetap tanpa build untuk membukanya | ui-ux-designer |
| 2026-11-06 | Mockup v1 dibuat; status: menunggu "approve desain" | Aturan tim v14 | ui-ux-designer |
| 2026-11-06 | Footer v2: gelap + cahaya oranye + wordmark putih (ref F1–F6), menggantikan kartu terang v1 | Owner: footer v1 tidak cocok dengan bagian lain | ui-ux-designer |
| 2026-11-06 | Footer v3: minimalis, latar putih, wordmark hitam (menggantikan v2) | Owner: v2 tidak cocok dengan section di atasnya | ui-ux-designer |
| 2026-11-06 | Footer v4: tema section About (latar paper, garis grid tipis C1, label bertitik oranye); elemen dikurangi: kontak, satu baris menu + sosial, wordmark, legal | Owner: v3 kurang minimalis; owner memilih 'Putih seperti About' | ui-ux-designer |
| 2026-11-06 | Footer v4.1: garis dihapus; wordmark jadi elemen terakhir, baseline menempel ke sisi bawah layar | Permintaan owner | ui-ux-designer |
| 2026-11-06 | **Approve desain** oleh owner untuk mockup v1.4 (`design/mockup/`, artifact L2GJwgBEDwYbM9DtdwnfQ4 versi 5). Coding dimulai | Gerbang approve desain | owner |
| 2026-11-06 | Produksi: setiap section memakai latar sendiri; pergantian mood body tetap ada tetapi section tidak lagi transparan | QA a11y (Lighthouse color-contrast): teks gelap section paper tampil di atas latar body gelap saat section masuk layar. Beda dari mockup: batas section tegas, bukan fade | frontend-engineer / qa-reviewer |
| 2026-11-06 | Loader dipercepat (counter ±0.6 s, panel 0.96 s) | LCP Home 3.8 s; target Performance ≥ 90 | motion-developer |
| 2026-11-06 | Scroll dipaksa di window (html/body overflow) | Laporan owner: animasi Selected work tidak aktif di preview; showcase dan pin bergantung pada scroll window | motion-developer |
| 2026-11-06 | Tombol "Animations on/off" di footer; pilihan disimpan (localStorage), default mengikuti prefers-reduced-motion | Screenshot owner menunjukkan tampilan reduced-motion (sistem mematikan animasi); pengunjung bisa memilih sendiri | motion-developer |
| 2026-11-06 | Showcase → Services: Services naik menutupi showcase (margin -60vh, sudut membulat), showcase mengecil + blur; clip-path menyusut dihapus | Laporan owner: ruang kosong di bawah Selected work | motion-developer |
| 2026-11-08 | Approve desain: versi Editorial (eks opsi D) jadi beranda `/`; seluruh situs berlatar putih (mood night/paper = palet putih, ember tetap); tombol solid oranye, tombol CTA putih, loader putih; About memakai section "Our story"; opsi A/B/C, tombol pengganti opsi, AboutScale, Showcase, image-scale.ts dan showcase.ts dihapus | Owner menulis "approve desain untuk versi editorial" (artifact versi 19). Angka contoh belum dikonfirmasi: 24 orang, 91–92% klien kembali, 3 → 24, "Weekly" | orchestrator |
| 2026-11-08 | Style pack `bento` (dari opsi C) disimpan di `skills/web-styles/styles/bento.md` dengan status disetujui owner; mockup opsi A/B/C diarsipkan sebagai zip untuk owner | Owner: "simpan ide ini sebagai ide desain bento style", lalu "approve desain" | orchestrator |

## 2026-11-09 · Beranda desain E disetujui, aksen biru untuk seluruh situs
- Owner memilih desain E ("Studio") sebagai beranda: `src/pages/home-e.astro` dipindah ke `src/pages/index.astro`; beranda Editorial lama dihapus (cadangan tidak disimpan di repo).
- Revisi E yang disetujui: footer tanpa bar bawah (wordmark menempel ke tepi bawah layar), review klien berupa kapsul berganti di bawah setiap layanan We deliver (section From clients dihapus), intro kalimat besar dengan tiga foto kapsul, Our workflow + Pricing digabung jadi "Choose your package" (kartu mendatar, judul tegak, Plus biru, masuk dari kiri ke kanan), Our perspectives berupa daftar dengan foto melayang mengikuti kursor, menu bar selebar hero, teks hero di kanan dengan gerak imbang saat scroll.
- Aksen biru `oklch(0.55 0.22 262)` menggantikan oranye di `global.css` (nama token `--orange` dipertahankan agar komponen tidak berubah); teks di atas aksen menjadi putih; mood `ember` (CTA halaman lain) menjadi biru dengan teks putih.
- Data contoh (paket, harga, review 04–06 dan review kedua tiap layanan) ditandai `[CONTOH]` dan harus diganti data asli.
- Dependency dev baru: `@astrojs/check`, `typescript` (dibutuhkan `pnpm astro check`, aturan 8 AGENTS.md).
- Owner memilih referensi Unsplash "Abstract, spiraling sculpture with blue and white tones" sebagai arah aset: semua slot gambar memakai gambar berbeda dengan bentuk 3D organik/berpilin biru-putih, bukan render kubus. Sumber lokal beresolusi sampai 2000 px dan tetap di bawah 200 KB per file; poster video mengikuti arah baru, video tetap tidak berubah.
