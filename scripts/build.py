#!/usr/bin/env python3
"""Buat ulang adapter tiap alat dari sumber netral di agents/ + AGENTS.md.

Jalankan dari root paket:  python3 scripts/build.py
Edit HANYA file di agents/ dan AGENTS.md, lalu jalankan skrip ini.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# name: (deskripsi, kelas model, read_only)
ROLES = {
    "orchestrator": ("Tech Lead: membagi brief jadi task, mendelegasikan ke agent lain, berhenti untuk approval owner, dan melapor.", "berat", False),
    "spec-writer": ("Mengubah brief klien menjadi docs/spec.md (riset, sitemap, acceptance criteria, pertanyaan terbuka, tabel task). Tidak menulis kode.", "berat", False),
    "ui-ux-designer": ("Merancang alur pengguna, peta section, warna, huruf, dan rencana gerak di docs/design-direction.md, lalu membuat mockup visual statis di design/ untuk direview owner sebelum coding. Tidak menulis kode produksi.", "berat", False),
    "design-system": ("Membuat token desain Tailwind v4 dan komponen UI dasar sesuai gaya visual proyek (brutalism, minimalism, dll.).", "berat", False),
    "asset-designer": ("Membuat aset visual: ilustrasi dan diagram SVG siap animasi, data 3D prosedural, gambar raster teroptimasi, OG image, plus manifest docs/assets.md. Tidak menganimasikan.", "berat", False),
    "frontend-engineer": ("Membangun halaman dan section Astro + Tailwind sesuai spec dan design system. Tidak menangani animasi.", "ringan", False),
    "motion-developer": ("Pemilik tunggal semua gerak: animasi standar GSAP/ScrollTrigger/Lenis (data-motion) dan momen signature WebGL, 3D, tipografi kinetik, transisi halaman (data-creative) dengan fallback statis.", "berat", False),
    "backend-cms": ("Form (Astro Actions), content collections/CMS, env, dan integrasi pihak ketiga.", "ringan", False),
    "qa-reviewer": ("Mereview dan menguji hasil task terhadap spec, aksesibilitas, performa, dan motion. Hanya melapor, tidak mengedit.", "berat", True),
    "devops": ("Scaffold proyek, CI/CD GitHub Actions, dan deploy staging. Tidak pernah deploy production.", "ringan", False),
    "seo-content": ("Metadata, Open Graph, JSON-LD, sitemap/robots, dan draf copywriting.", "ringan", False),
    "security-reviewer": ("Audit secret, dependency, validasi input, header keamanan, dan data pribadi. Hanya melapor.", "berat", True),
}

CLAUDE_MODEL = {"berat": "opus", "ringan": "sonnet"}

# Skill yang dibaca tiap peran. Untuk chat UI (prompts/*.txt) isinya ditempel langsung.
ROLE_SKILLS = {
    "ui-ux-designer": ["web-styles", "web-layout", "web-colorist", "web-typeface", "web-motion", "web-asset"],
    "asset-designer": ["web-asset", "web-colorist", "web-layout"],
    "design-system": ["web-colorist", "web-typeface", "web-layout"],
    "motion-developer": ["web-motion", "web-layout", "web-typeface", "web-colorist"],
}
GEMINI_READ = ["read_file", "read_many_files", "list_directory", "glob", "grep_search",
               "web_fetch", "google_web_search"]
GEMINI_WRITE = ["write_file", "replace", "run_shell_command"]
HEADER = "<!-- DIBUAT OTOMATIS oleh scripts/build.py. Edit agents/{n}.md, bukan file ini. -->\n"
PREAMBLE = "Sebelum mulai, baca `AGENTS.md` (standar bersama) dan `docs/spec.md` bila ada.\n\n"


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def skill_text(name: str) -> str:
    return (ROOT / "skills" / name / "SKILL.md").read_text(encoding="utf-8")


def main() -> None:
    shared = (ROOT / "AGENTS.md").read_text(encoding="utf-8")

    # Skill: sumber di skills/, disalin ke .claude/skills/ dan .opencode/skills/.
    for f in sorted(p for p in (ROOT / "skills").rglob("*") if p.is_file()):
        rel = f.relative_to(ROOT / "skills")
        for target in (".claude/skills", ".opencode/skills"):
            dst = ROOT / target / rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_bytes(f.read_bytes())

    for name, (desc, weight, read_only) in ROLES.items():
        body = (ROOT / "agents" / f"{name}.md").read_text(encoding="utf-8")

        # Claude Code: orchestrator = sesi utama (lewat CLAUDE.md), bukan subagent.
        if name != "orchestrator":
            tools = "Read, Glob, Grep, Bash" if read_only else "Read, Write, Edit, Glob, Grep, Bash, WebSearch, WebFetch"
            write(ROOT / ".claude/agents" / f"{name}.md",
                  f"---\nname: {name}\ndescription: {desc}\ntools: {tools}\nmodel: {CLAUDE_MODEL[weight]}\n---\n"
                  + HEADER.format(n=name) + PREAMBLE + body)

        # OpenCode (format v2): model tidak di-hardcode, diatur pengguna.
        mode = "primary" if name == "orchestrator" else "subagent"
        perms = ""
        if read_only:
            perms = ("permissions:\n"
                     "  - action: edit\n    resource: \"*\"\n    effect: deny\n")
        write(ROOT / ".opencode/agents" / f"{name}.md",
              f"---\ndescription: {desc}\nmode: {mode}\n{perms}---\n"
              + HEADER.format(n=name) + PREAMBLE + body)

        # Gemini CLI: subagent native (.gemini/agents) + slash command (.gemini/commands/team).
        if name != "orchestrator":
            gtools = GEMINI_READ + (["run_shell_command"] if read_only else GEMINI_WRITE)
            tool_lines = "".join(f"  - {t}\n" for t in gtools)
            gname = name.replace("-", "_")  # nama aman untuk @mention
            write(ROOT / ".gemini/agents" / f"{gname}.md",
                  f"---\nname: {gname}\ndescription: {desc}\ntools:\n{tool_lines}model: inherit\n---\n"
                  + HEADER.format(n=name) + PREAMBLE + body)
        write(ROOT / ".gemini/commands/team" / f"{name}.toml",
              f'description = "Tim: jalankan peran {name}. {desc}"\n'
              'prompt = """\n'
              f"Untuk giliran ini kamu berperan sebagai `{name}`.\n"
              "Ikuti instruksi peran dan standar bersama di bawah ini dengan ketat.\n"
              "Kerjakan HANYA task berikut, lalu tutup dengan format laporan dari AGENTS.md.\n\n"
              "TASK: {{args}}\n\n"
              f"--- INSTRUKSI PERAN ---\n@{{agents/{name}.md}}\n\n"
              "--- STANDAR BERSAMA ---\n@{AGENTS.md}\n"
              '"""\n')

        # Chat UI (Google AI Studio, Gemini Gems, dll.): satu file siap tempel ke System Instructions.
        write(ROOT / "prompts" / f"{name}.txt",
              f"=== INSTRUKSI SISTEM: {name} ===\n"
              "Kamu bekerja sebagai satu peran dalam tim AI software house.\n"
              "Kamu kemungkinan TIDAK punya akses file: ikuti bagian \"Mode tanpa akses file\".\n\n"
              f"{body}\n\n=== STANDAR BERSAMA (AGENTS.md) ===\n\n{shared}"
              + "".join(f"\n\n=== SKILL: {s} ===\n\n{skill_text(s)}" for s in ROLE_SKILLS.get(name, []))
              + ("\n\n=== STYLE PACK ===\nBila docs/design-direction.md memakai style pack, minta owner "
                 "menempelkan isi skills/web-styles/styles/<pack>.md. Bila gaya ditulis langsung dari "
                 "referensi, cukup design-direction.\n"
                 if name in ("design-system", "asset-designer", "motion-developer") else ""))

    write(ROOT / "CLAUDE.md",
          "# Claude Code\n\nSesi utama berperan sebagai Orchestrator.\n\n@AGENTS.md\n@agents/orchestrator.md\n")
    write(ROOT / "GEMINI.md",
          "# Gemini CLI\n\nSesi utama berperan sebagai Orchestrator.\n\n@./AGENTS.md\n@./agents/orchestrator.md\n")
    write(ROOT / ".gemini/commands/team/start.toml",
          'description = "Tim: mulai proyek baru dari brief klien (orchestrator)"\n'
          'prompt = """\n'
          "Kamu adalah Orchestrator. Brief klien:\n\n{{args}}\n\n"
          "Jalankan langkah 1 dan 2 di agents/orchestrator.md: cek repo, lalu MINTA REFERENSI\n"
          "desain ke owner dan BERHENTI. Setelah referensi diterima (atau owner menulis\n"
          "\"tanpa referensi\"), lanjutkan langkah 3 sampai 5: serahkan ke @spec_writer\n"
          "(atau kerjakan sebagai spec-writer bila subagent tidak tersedia), ringkas spec,\n"
          "lalu BERHENTI dan tunggu approval.\n\n"
          "@{agents/orchestrator.md}\n"
          '"""\n')
    print(f"OK: {len(ROLES)} peran -> .claude/, .opencode/, .gemini/, prompts/, CLAUDE.md, GEMINI.md")


if __name__ == "__main__":
    main()
