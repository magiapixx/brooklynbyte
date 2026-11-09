# Design system — Brooklynbyte

- Token di `src/styles/global.css` (`@theme`): skala teks 10 langkah dari generator (minor-third → perfect-fourth, 16→18px, mega 152px; override `--text-mega--line-height: 0.9`), ease `--ease-brand` (expo.out), `--ease-c2` (C2 customEase), durasi fast/base/slow 0.35/0.64/1.2s.
- Mood: `night` (default), `paper`, `ember` via `data-mood`; nilai OKLCH sesuai design-direction §4.
- Peran: `type-hero`, `type-h1`–`type-h4`, `type-lead`, `type-body`, `type-small`, `type-caption`, `type-label`, `type-stat`, `type-stat-sm`, `type-quote`.
- Komponen `ui/`: `Button` (pill, isi oranye dari titik kursor, teks roll, magnetik opsional, ikon WhatsApp), `SectionHead`, `WaIcon`.
- State interaksi: hover/focus-visible/active untuk tombol, tautan (`ulink`, `flink`), chip, akordeon, kartu, baris proyek, menu.
