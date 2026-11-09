# Tim AI Agent untuk Website (Astro + Tailwind + GSAP + Lenis)

Paket ini bisa dipakai di alat AI dan model apa pun. Instruksinya ditulis
sekali di `agents/` dan `AGENTS.md`, lalu adapter untuk setiap alat dibuat
otomatis dari situ.

## Isi paket
```
AGENTS.md            standar bersama (sumber utama, dibaca semua alat)
agents/*.md          instruksi 12 peran (sumber utama)
skills/*/SKILL.md    6 skill desain: web-styles (pustaka gaya), web-layout, web-motion,
                     web-colorist, web-typeface, web-asset
scripts/build.py     membuat ulang semua adapter di bawah ini
-- adapter (dibuat otomatis, jangan diedit langsung) --
CLAUDE.md            Claude Code
.claude/agents/      subagent Claude Code
.claude/skills/      salinan skill untuk Claude Code
GEMINI.md            Gemini CLI (konteks utama)
.gemini/agents/      subagent Gemini CLI
.gemini/commands/    slash command /team:* untuk Gemini CLI
.opencode/agents/    agent OpenCode (format v2)
.opencode/skills/    salinan skill untuk OpenCode
prompts/*.txt        siap tempel untuk chat UI (Google AI Studio, dll.)
```

Kalau ingin mengubah aturan, edit `AGENTS.md`, `agents/*.md`, atau
`skills/*/SKILL.md`, lalu jalankan `python3 scripts/build.py`.

## Referensi desain (wajib sebelum proyek)
Orchestrator selalu meminta referensi lebih dulu dan berhenti sampai
referensi diterima (atau owner menulis "tanpa referensi"). Bentuk yang bisa
diproses ada di `templates/docs/references/references.md`:
- Screenshot PNG/JPG/WebP, satu file per section, lebar ±1440px
- Catatan per referensi: URL, prioritas, **ambil**, **jangan ambil**
- Animasi: 3–4 screenshot berurutan + deskripsi tertulis
- PDF brand guideline
Tidak bisa diproses: video saja, link Instagram/TikTok, halaman di balik
login. ui-ux-designer membutuhkan model yang bisa melihat gambar (VL).
Referensi dipakai sebagai prinsip, bukan untuk disalin.

## Skala tipografi
`skills/web-typeface/typescale.mjs` membuat skala fluid 10 langkah (`xs` …
`mega`) dari rasio musik (Minor Second 1.067 … Golden Ratio 1.618) untuk
mobile dan desktop, lengkap dengan pasangan line-height dan letter-spacing,
plus pengecekan zoom 200%, ukuran minimum, dan judul hero di 360px. Setiap
style pack merekomendasikan pasangan rasionya. Halaman memakai peran
`type-*` (hero, h1–h4, lead, body, small, caption, label, stat, quote).

## Pustaka gaya (style pack)
`skills/web-styles/styles/` berisi 8 gaya: brutalism, neo-brutalism,
minimalism, editorial, swiss, luxury, playful-3d, dark-tech. Satu file =
layout, warna, huruf, gerak, aset, komponen, dan klise yang dihindari.
Pack hanya **rekomendasi**: ui-ux-designer merekomendasikan pack terdekat
dari referensi, atau menulis gaya langsung dari referensi bila tidak ada yang
cocok atau owner tidak mau memakai pack. Menyimpan gaya baru sebagai pack
hanya ditawarkan, tidak wajib.
Skill lain kini netral gaya.

## Peran desain dan skill
- **ui-ux-designer**: setelah spec disetujui, menulis
  `docs/design-direction.md` (alur pengguna, peta section, warna, huruf,
  rencana gerak, momen signature) dan **mockup visual** statis di
  `design/mockup/` (HTML per halaman + screenshot desktop/mobile, terang/
  gelap, dan **prototype gerak hidup**: animasi scroll, transisi antar
  section, dan hover berjalan sungguhan, dengan panel Tema / Gerak nyala-
  mati / Putar ulang hero). Owner melihat dan mencoba mockup, lalu menulis
  "approve desain" (tampilan + gerak) sebelum coding dimulai.
- **motion-developer** (Motion & Creative Developer): pemilik tunggal semua
  gerak, dari animasi standar sampai momen signature (shader WebGL, 3D,
  tipografi kinetik, transisi halaman, kursor custom). Spec memecahnya jadi
  task standar dulu, lalu task signature.
- **asset-designer**: membuat ilustrasi/diagram SVG, data 3D prosedural,
  gambar raster, dan OG image dari Daftar aset di design-direction, lalu
  mencatatnya di `docs/assets.md`. Tidak menganimasikan; motion-developer
  menggerakkan aset lewat `data-part`.
- Skill yang dibaca: ui-ux-designer membaca kelima skill; motion-developer
  membaca 4 skill (tanpa web-asset); asset-designer membaca web-asset,
  colorist, layout; design-system membaca colorist, typeface, layout. Di `prompts/*.txt`, isi skill sudah ditempel langsung.
- Kalau skill bertentangan dengan `AGENTS.md`, yang berlaku `AGENTS.md`.
  Edit skill hanya di `skills/`, lalu jalankan `scripts/build.py`.
- `AGENTS.md` punya tabel **kepemilikan file** dan daftar **nama token**.
  Satu file hanya diedit oleh satu agent, dan semua agent memakai nama
  token yang sama.
- `seo-content` punya dua task: copy (`docs/content.md`, sebelum frontend)
  dan metadata (sebelum rilis).

## Cara pakai per alat

Untuk semua alat yang bekerja di repo, salin seluruh isi paket ke root proyek.

**OpenCode** (termasuk model gratis OpenCode Zen)
- `AGENTS.md` dibaca otomatis. Agent ada di `.opencode/agents/`.
- Pilih agent `orchestrator` sebagai agent utama. Subagent dipanggil dengan
  menyebut namanya, misalnya `@spec-writer`.
- Model per agent bisa diatur lewat field `model:` di frontmatter (format
  `provider/model`). Kalau tidak diisi, agent memakai model yang sedang dipilih.
- Kalau OpenCode Anda masih versi lama dan menolak field `permissions`,
  hapus blok itu dari `qa-reviewer` dan `security-reviewer`. Instruksi
  read-only di prompt tetap berlaku.

**Claude Code**
- `CLAUDE.md` mengimpor `AGENTS.md`, dan subagent ada di `.claude/agents/`.
  Sesi utama otomatis menjadi Orchestrator.

**Gemini CLI**
- `GEMINI.md` mengimpor `AGENTS.md` dan peran Orchestrator, jadi sesi
  utama otomatis menjadi Orchestrator.
- **Subagent native** ada di `.gemini/agents/`. Nama memakai garis bawah:
  `@spec_writer`, `@design_system`, `@frontend_engineer`,
  `@motion_developer`, `@ui_ux_designer`, `@asset_designer`, `@backend_cms`, `@qa_reviewer`, `@devops`,
  `@seo_content`, `@security_reviewer`. Ketik `/agents` untuk melihat daftarnya.
- **Slash command** ada di `.gemini/commands/team/`. Ini cara paling andal,
  dan tetap jalan walaupun subagent tidak aktif di versi Anda:
  - `/team:start <brief klien>` untuk memulai proyek sampai gerbang approval
  - `/team:spec-writer <task>`, `/team:frontend-engineer T7`, dan seterusnya
  - Jalankan `/commands reload` kalau command belum muncul.
- Kalau Gemini CLI menolak salah satu nama tool di frontmatter agent
  (nama tool bisa berubah antar versi), hapus baris tool itu.

**Gemini web app (Gems)**
- Buat satu Gem per peran, lalu tempel isi `prompts/<peran>.txt` ke kolom
  instruksi Gem. Caranya sama dengan AI Studio di bawah.

**Codex, Cursor, GitHub Copilot, dan alat lain yang membaca `AGENTS.md`**
- `AGENTS.md` dibaca otomatis. Berpindah peran caranya sama seperti di
  Gemini CLI.

**Google AI Studio, atau chat web apa pun**
1. Buka chat baru, lalu tempel isi `prompts/<peran>.txt` ke kolom
   **System instructions**.
2. Pakai satu chat untuk satu peran. Mulailah dari `spec-writer.txt`.
3. Karena AI tidak bisa membuka repo, tempelkan `docs/spec.md` dan file
   lain yang dibutuhkan. AI akan menjawab dengan file lengkap berformat
   `// FILE: path`, lalu Anda salin ke proyek.
4. Gunakan mode chat biasa. Mode "Build" di AI Studio memakai stack
   sendiri dan tidak mengikuti stack Astro ini.

## Memilih model untuk tiap peran

| Peran | Kelas | Alasan |
|---|---|---|
| orchestrator, spec-writer, ui-ux-designer, design-system, asset-designer, motion-developer, qa-reviewer, security-reviewer | **Berat** | butuh penalaran panjang, riset, dan ketelitian |
| frontend-engineer, backend-cms, devops, seo-content | **Ringan** | pekerjaan eksekusi yang terarah dan jelas |

Untuk model di daftar Anda:
- Nama yang mengandung **Flash**, **Lightning**, atau ukuran kecil biasanya
  dioptimalkan untuk kecepatan. Mulailah dengan model ini untuk peran
  **ringan**.
- Model berlabel **VL** (vision-language), misalnya Nemotron 3.5 Super VL,
  bisa melihat gambar. Model ini cocok untuk `qa-reviewer` saat memeriksa
  screenshot, atau `ui-ux-designer` dan `design-system` saat membaca
  referensi visual.
- Untuk peran **berat**, pakai model terbesar dan terkuat yang tersedia.
  Model gratis biasanya lebih lemah di sini, jadi tetap pertahankan review
  manusia di gerbang approval.

Kemampuan setiap model gratis berbeda-beda dan cepat berubah. Cara paling
aman adalah menguji sendiri: jalankan `spec-writer` dengan brief yang sama
(misalnya "website untuk LBH Yogyakarta") di beberapa model, lalu
bandingkan. Perhatikan apakah model itu mengarang data, apakah ia berhenti
di gerbang approval, dan apakah format laporannya dipatuhi.

## Tips untuk model kecil/gratis
- Berikan **satu task per percakapan**, dan sebutkan ID task dari spec.
- Kalau hasilnya mulai melenceng, mulai chat baru. Konteks yang terlalu
  panjang menurunkan kualitas model kecil.
- Selalu jalankan `pnpm astro check` dan `pnpm build` sendiri. Jangan
  percaya begitu saja pada laporan "SELESAI".
- Tiga gerbang tetap dipegang manusia: **approve spec**, **approve desain**
  (setelah melihat mockup), dan **merge ke main**.

## Brooklynbyte — menjalankan proyek
```
pnpm install
pnpm dev        # http://localhost:4321
pnpm build && pnpm preview
```
Mockup yang di-approve: buka `design/mockup/index.html` di browser.
