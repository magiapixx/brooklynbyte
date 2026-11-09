#!/usr/bin/env node
// Generator skala tipografi fluid (modular scale) untuk Tailwind v4 @theme.
// Pakai:  node skills/web-typeface/typescale.mjs --ratio-min minor-third --ratio-max major-third
// Opsi:   --ratio-min / --ratio-max  nama atau angka rasio (mobile / desktop)
//         --base-min 16 --base-max 18  ukuran body (px) di viewport min / max
//         --vw-min 360 --vw-max 1440   rentang viewport (px)
//         --zoom-limit 2.5             batas max/min (WCAG 1.4.4, zoom 200%)
//         --mega <px>                  ukuran maks `mega` khusus hero (opsional; tetap dibatasi zoom-limit)
//         --hero-chars <n> --char-width 0.55   cek baris terpanjang judul hero muat di vw-min
// Hasil:  blok @theme (--text-*, --text-*--line-height, --text-*--letter-spacing) + tabel + peringatan.

const RATIOS = {
  'minor-second': 1.067, 'major-second': 1.125, 'minor-third': 1.2, 'major-third': 1.25,
  'perfect-fourth': 1.333, 'augmented-fourth': 1.414, 'perfect-fifth': 1.5, 'golden-ratio': 1.618,
};
// Langkah skala: nama token, eksponen, line-height, letter-spacing (em).
const STEPS = [
  ['xs', -2, 1.5, 0.01], ['sm', -1, 1.5, 0], ['base', 0, 1.6, 0], ['lg', 1, 1.5, -0.005],
  ['xl', 2, 1.3, -0.01], ['2xl', 3, 1.2, -0.015], ['3xl', 4, 1.1, -0.02], ['4xl', 5, 1.05, -0.025],
  ['display', 6, 1.0, -0.03], ['mega', 7, 0.92, -0.035],
];

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, arr) => (v.startsWith('--') ? [...a, [v.slice(2), arr[i + 1]]] : a), []));
const ratio = (v, d) => { if (!v) return d; const n = RATIOS[v] ?? Number(v); if (!n || n <= 1) throw new Error(`Rasio tidak dikenal: ${v}`); return n; };
const rMin = ratio(args['ratio-min'], 1.2), rMax = ratio(args['ratio-max'], 1.25);
const bMin = Number(args['base-min'] ?? 16), bMax = Number(args['base-max'] ?? 18);
const vMin = Number(args['vw-min'] ?? 360), vMax = Number(args['vw-max'] ?? 1440);
const zoomLimit = Number(args['zoom-limit'] ?? 2.5);
const megaPx = args.mega ? Number(args.mega) : null;
const heroChars = args['hero-chars'] ? Number(args['hero-chars']) : null;
const charW = Number(args['char-width'] ?? 0.55);
const FLOOR = { xs: 12, sm: 14 };
const r4 = (n) => Math.round(n * 10000) / 10000;
const rem = (px) => `${r4(px / 16)}rem`;
const name = (r) => Object.entries(RATIOS).find(([, v]) => v === r)?.[0] ?? r;

const warnings = [];
const rows = [];
const css = STEPS.map(([tok, n, lh, ls]) => {
  let min = Math.max(bMin * rMin ** n, FLOOR[tok] ?? 0);
  let max = Math.max(bMax * rMax ** n, FLOOR[tok] ?? 0);
  if (tok === 'mega' && megaPx) { max = megaPx; min = Math.max(min, max / zoomLimit); }
  if (max < min) max = min;
  if (max > min * zoomLimit) { warnings.push(`${tok}: max ${max.toFixed(1)}px > ${zoomLimit}× min; dibatasi ke ${(min * zoomLimit).toFixed(1)}px (atau turunkan rasio desktop).`); max = min * zoomLimit; }
  if (tok === 'base' && min < 16) warnings.push('base < 16px: body terlalu kecil.');
  if (tok === 'mega' && heroChars) {
    const fit = (vMin - 32) / (heroChars * charW);
    if (min > fit) warnings.push(`mega: min ${min.toFixed(1)}px terlalu besar untuk ${heroChars} karakter di ${vMin}px (maks ±${fit.toFixed(1)}px). Pendekkan judul atau izinkan baris pecah.`);
  }
  const slope = (max - min) / (vMax - vMin);
  const intercept = min - slope * vMin;
  if (intercept <= 0) warnings.push(`${tok}: bagian rem ≤ 0, teks tidak ikut zoom. Turunkan rasio desktop.`);
  rows.push([tok, min.toFixed(1), max.toFixed(1)]);
  const fluid = min === max ? rem(min) : `clamp(${rem(min)}, ${rem(intercept)} + ${r4(slope * 100)}vw, ${rem(max)})`;
  return `  --text-${tok}: ${fluid};\n  --text-${tok}--line-height: ${lh};\n  --text-${tok}--letter-spacing: ${ls}em;`;
});

console.log(`/* Skala: ${name(rMin)} (${rMin}) di ${vMin}px → ${name(rMax)} (${rMax}) di ${vMax}px; base ${bMin}→${bMax}px. Dibuat oleh typescale.mjs */`);
console.log(`@theme {\n${css.join('\n')}\n}`);
console.log('\n/* Token | min px | max px');
for (const [t, a, b] of rows) console.log(`   ${t.padEnd(8)} | ${a.padStart(6)} | ${b.padStart(6)}`);
console.log('*/');
if (warnings.length) { console.error('\nPERINGATAN:\n- ' + warnings.join('\n- ')); process.exitCode = 1; }
