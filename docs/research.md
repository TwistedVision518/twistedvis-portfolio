# Research — Pranav Praveen (TwistedVision518)

*Generated 2026-10-10 — all facts verified via `gh` CLI against GitHub API. No assumptions beyond what the prompt provided.*

## Identity (verified)

- **Name:** Pranav Praveen
- **Handle:** `TwistedVision518` (also `TwistedVis` on dev platforms per prompt)
- **GitHub:** https://github.com/TwistedVision518 — 49 public repos, 13 followers, 22 following, account since 2020-10-06
- **Location:** Bangalore (GitHub profile)
- **Email (git config):** pranavpraveen0@gmail.com
- **Bio (profile README):** *Linux enthusiast • Custom ROM developer • Cybersecurity learner*
- **README tagline block:** "Building a self-made Linux distribution · Maintaining and developing custom ROMs for the Nothing Phone (2a) lineup · Currently learning cybersecurity"
- **Education (from prompt, not GitHub-verifiable):** 21, final-year BCA (Cyber Security specialization) @ Symbiosis SICSR, Pune; schooling at Delhi Public School Bangalore East — included on site but flagged as prompt-sourced.
- **Internship (from prompt, not GitHub-verifiable):** Leapcodes Private Limited, May–July 2026

## What he actually builds

### 1. Android custom ROM & device work (core identity)
Pranav is **known for Nothing Phone (2a) / (2a) Plus (codename: Aerodactyl) custom ROM maintenance**. Evidence across repos, orgs, and recent activity:

- **Device trees (personal + orgs):**
  - `TwistedVision518/device_nothing_Aerodactyl_main` — "Unified Device trees for Aerodactyl (Pacman / PacmanPro)" (C++, 1★, fork)
  - `TwistedVision518/android_device_nothing_Aerodactyl` — Common device tree config for Nothing Phone (2a) and (2a) Plus
  - `TwistedVision518/android_device_nothing_Aerodactyl-lineage-23.0` (C++)
  - `TwistedVision518/android_frameworks_base-nothing2a-udfps` — frameworks/base with MediaTek UDFPS dimlayer reversal patch (Java)
  - Forks of AOSP pieces: `frameworks_base`, `packages_apps_Launcher3`, `packages_apps_Singularity`, `packages_apps_FaceUnlock`, `android_packages_apps_AxThemePicker`, `android_external_wpa_supplicant_8`, `android_hardware_interfaces`, etc. — indicates ROM framework/system-level work.

- **Release hub:**
  - `project-aerodactyl` (TypeScript, 2★, 2 forks) — *Interactive ROM release hub for Nothing Phone 2a and 2a Plus custom builds*. React + TypeScript + Vite, hosted on Netlify at `project-aerodactyl.netlify.app`. Content model is per-ROM JSON under `src/content/roms/` — this is his most polished portfolio-grade project.

- **Organisations (gh api user/orgs + memberships):**
  - 8 orgs, 7 as **admin**, 1 as member:
    - `Pixelify-AOSP` (122 repos, **admin**) — AOSP distribution org. Recent pushes to `official_devices`.
    - `LunarisPacman` (22 repos, **admin**) — "Trees for lunaris aosp for Aerodactyl" — contains `android_device_nothing_Aerodactyl`, kernel, vendor, hardware_mediatek etc.
    - `PixelTwistedAerodactyl` (8 repos, **admin**) — device + build + frameworks for Aerodactyl
    - `LunarisTwistedPacmanPro` (1 repo, **admin**)
    - `PixelPacmanPro` (8 repos, **admin**)
    - `Evox-Aerodactyl` (10 repos, **admin**)
    - `Lunaris-Stagging` (73 repos, **admin**, typo in name)
    - `ASCP-staging` (3 repos, **member**)
  - Collectively these represent **multiple AOSP ROM flavours for the same device** (Lunaris/Pacman/Pixelify/Evolution X forks), strongly implying maintainer / builder role rather than casual contributor. Recent `PushEvent` feed (2026-10-04) is dominated by `Pixelify-AOSP/official_devices` and `device_nothing_Aerodactyl_main` pushes.

### 2. Linux systems
- **Odysee** (Shell, pinned, 1★) — Automated Arch Linux Install (fork of ArchTitus-style installer, KDE preset).
- **Exodius spins** — `Exodius-Ubuntu-afterinstall-spin`, `ExodiusFedoraAfterInstall`, `Exodius-Arch-afterinstall-spin` (all Shell) — post-install scripts installing DEs/WMs/apps.
- Profile README claim: "Building a self-made Linux distribution" — **not independently verifiable** as a public repo; no matching repo found in listing. Treat as aspirational / in-progress.

### 3. Application & AI projects (pinned + recent)
- **Zenny** (TypeScript, pinned, 1★) — AI Recipe Assistant (Next.js 16, React 19, Python Flask, Gemini 2.0) — live at `twistedzenny.netlify.app`. Features: ingredient→recipes, pantry, meal planner, nutrition tracking, budget filter.
- **L.I.E.S** (JavaScript, pinned, 1★) — "Layered Intrusion & Extraction System" — real-time network traffic analyzer + threat detection (React + Tailwind + Recharts + react-simple-maps + Flask/Socket.IO + Scapy) with hex dump, pcap export, cyber map. Aligns with Cyber Security studies.
- **TradingBot** (Python, pinned, 1★) — Lightweight CLI trading bot for Binance Futures Testnet (MARKET/LIMIT/STOP_MARKET, HMAC signing, logging). Has optional Flask Web UI (`app.py`).
- **Image_Waste_Classification** (Python, pinned, 2★) — Waste classification via Google Colab.

### 4. Other
- Early portfolio experiments: `Portfolio` (React), `NextPortfolio`, `portfolio-responsive-complete`, `ResponsiveePortfolio`, `pp-folio` — now superseded.
- `CollegeAssets` (Python) — college resources.
- `Bento`, `myvim`, `Bashscripting` forks.

## Languages & stack (verified)

- **Profile README declares:** C, C#, C++, Java, HTML5, Markdown, PHP, Bash, PowerShell, Python, Nix, JavaScript, CSS3, Dart, Kotlin; plus JWT, React Native, React Hook Form, Semantic UI React, MySQL, PNPM, NPM, Pandas, GitHub Actions, Git/GitHub/GitLab, TensorFlow, Netlify, PyTorch, Firebase.
- **Repo language breakdown (gh api):** HTML (8), JavaScript (4), Python (4), Shell (4), C++ (3), TypeScript (3), Java (2), plus C/Makefile/SCSS/CSS — matches README claims (AOSP is C/C++/Java/Makefile heavy; web projects are TS/JS).
- **Recent activity:** All public PushEvents in last month relate to ROM device trees and Pixelify official_devices — confirms ROM work is *current*.

## Community & credibility signals

- Not a star-driven profile (most repos 0–2★) — credibility comes from **maintainer/admin roles** across multiple ROM orgs, not stars.
- Pinned repos are a curated mix: **2 Linux**, **2 AI/cyber**, **1 trading**, **1 ROM device tree** — shows breadth intentionally.
- No Twitter/X handle on GitHub; Instagram `pranavislost` and email `pranavpraveen0@gmail.com` from README.

## What to emphasize on the portfolio (synthesis)

- **Positioning:** "Custom ROM maintainer for Nothing Phone (2a) — ships AOSP builds (Pixelify/Lunaris/Evolution X flavours) from device tree to release hub" as primary identity; Linux/systems and cyber-security as secondary.
- **Projects to pull live from GitHub in Experience & Projects (merged):** `project-aerodactyl`, `L.I.E.S`, `Zenny`, `TradingBot`, `Odysee` + the unified `device_nothing_Aerodactyl` trees. Optionally surface `Image_Waste_Classification` if space.
- **Orgs to name-drop:** Pixelify-AOSP, LunarisPacman, Evox-Aerodactyl (with admin badge).
- **Education:** BCA Cyber Security @ SICSR Symbiosis Pune + DPS Bangalore East (prompt-sourced, not GitHub-verified — flag in footer).

## Could not verify / flagged for Pranav

- Internship details, role, or technologies at Leapcodes Private Limited (May–July 2026) — not on GitHub; will present as provided.
- "Self-made Linux distribution" — claimed in README but no public repo found; will mention as "building" not "shipped".
- Exact course year / graduation date for BCA — prompt says final-year at 21; not verifiable.
- Any non-public contributions, private repos, or closed-source work.
