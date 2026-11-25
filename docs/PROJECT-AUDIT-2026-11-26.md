# YIMING SMART HOME 1.0.0 — Repository Audit

Audit date: 2026-11-26  
Repository: https://github.com/yimingwenhua69/yiming-smart-home  
Audited ref: main @ 9fe00b953bb1398996a01e2ab96f109f7c596816  
Working branch: codex/yiming-smart-home-v1.0.0

## Verified repository facts

- The active repository is a Next.js App Router project, not the previously recorded Astro project.
- Runtime stack: Next.js 16.4.5, React 19.3.0, TypeScript strict mode, Tailwind CSS 4.
- Data stack in the current branch: Prisma 7.10.1 + PostgreSQL + pg adapter + Zod.
- Main's latest inspected commit is P3 TASK-002 device knowledge base (2026-11-09).
- The current public repository README and handoff notes contain stale P2 descriptions; the latest commit history and source files take precedence.
- The original product seed contained 25 generic, unbranded placeholder entries such as “智能吸顶灯” and “智能网关”. They did not identify an exact manufacturer, brand, product model, official product page or evidence source. The 1.0.0 branch now retires that seed and returns HTTP 410 from the old device API.
- The public 1.0.0 product and knowledge pages now read version-controlled catalog data; the old device API has been retired. PostgreSQL remains only for the legacy health endpoint.
- The current home page uses CSS shapes as a decorative illustration; it is not a real photographed smart-home scene.
- Current product details are limited to generic description, protocol, price note, install condition and selection points. There is no complete manufacturer/model/specification/source/verification/media/3D model structure.
- Existing favorite state is localStorage-only. It does not require an account and can be retained as an optional browser feature.
- No Astro configuration exists in the active repository.

## Immediate correctness risks

1. Placeholder seed records can be mistaken for real products.
2. Generic protocol labels may be incorrectly assigned to products without model-specific evidence.
3. Price notes have no source date and can become stale.
4. Current database-backed dynamic routes are not suitable for a zero-cost static public knowledge base.
5. Current home “scene” illustration must not be described as real photography.
6. No asset provenance, copyright/license, capture date, verification date or product-version relationship is enforced.

## V1.0.0 technical decision

Keep the existing Next.js 16 + TypeScript + Tailwind stack. Do not migrate to Astro or introduce a second application.

Convert the public read-only knowledge base to static generation:
- Structured, version-controlled catalog data.
- Static product/manufacturer/protocol/platform/scene/engineering pages.
- Client-side search, filtering, comparison and favorites.
- Three.js viewer loaded only when a verified model asset exists.
- No runtime PostgreSQL requirement for public browsing.
- Cloudflare Workers Static Assets as the zero-cost-first deployment target.

Do not publish unverified product data or images to meet a numerical quota. Product quantity is not a release target; evidence quality takes precedence.

## Immediate remediation

- Retire the generic placeholder seed.
- Introduce normalized catalog entities and evidence records.
- Replace runtime database product reads with static catalog reads.
- Add static route generation and Cloudflare deployment configuration.
- Add asset validation and product evidence validation.
- Add CI build/type/lint/data checks before production deployment.

## Audit limitation

This audit is based on the GitHub main branch source files and commit metadata available on 2026-11-26. No claim is made that the user's Windows working directory has been read or modified. Local-only files not pushed to this repository remain outside this audit.


## 1.0.0 branch implementation update (2026-11-26)

The branch now contains the first public knowledge-base implementation. See:
- \`docs/SCOPE-ACCEPTANCE-V1.0.0.md\`
- \`docs/worklog/V1.0.0-TASK-001.md\`
- \`docs/ARCHITECTURE-V1.0.0.md\`

Historical main-branch snapshot: 14 product records and 18 source records. The active 1.0.0 branch has since expanded and normalized the catalog. Product pages no longer query PostgreSQL. Generic seed records are retired; the old API returns 410. CI has been added but has not yet been verified by an actual Actions run at the time of this update.

Outstanding gaps after normalization: real hardware revision and studio verification records, licensed product images, verified 3D assets, accurate IES/LDT files and photometric simulation, broader manufacturer research, full-text indexing of all knowledge content, OpenNext deployment validation, and production visual acceptance.

No claim is made that local PowerShell commands, npm tests, builds, SCALE gates, browser tests, deployment, or real-device tests were executed by this remote repository update.


Historical interim 1.0.0 snapshot: 15 product records, 15 device-model records, 5 brands, and 23 sources. See the latest continuation below for current counts. Added official Aqara M200, FP2 and Door/Window Sensor T1 support/spec references and an Orvibo S5 record explicitly marked for model verification because its detail page is historical and uses lab-theory data.

## Latest 1.0.0 continuation (2026-11-26)

- Aqara: added official model/spec/support records for Motion Sensor T1/E1, Door & Window Sensor E1/P1, Temperature & Humidity Sensor T1, Water Leak Sensor T1, Light Sensor T1 and Vibration Sensor T1. Conflicting temperature-range wording is preserved with source notes rather than silently reconciled.
- Xiaomi: added the official Xiaomi Smart Multi-mode Gateway 2 crowdfunding record (campaign ended; current availability and retail SKU unverified) and Xiaomi Smart Home Screen 10 official listing (model code and radio functions not exposed by the readable official page).
- Added Bluetooth Mesh as a separate protocol instead of conflating it with BLE.
- Separated Xiaomi hardware brand from Mi Home ecosystem brand; products are assigned to Xiaomi brand.
- Current catalog count: 27 products, 27 device models, 134 independent specifications, 8 protocols, 6 brands, 37 sources, 5 compatibility / integration path records, 2 integration systems, 14 Aqara SDK mappings.
- CI passed all gates on current HEAD 0e4a191f9bac2b868ccfd35c11d66d1270025a0f (GitHub Actions run 45708859850): Prisma schema, ESLint, TypeScript, unit/integration tests, coverage, production build and Playwright browser tests. No production deployment or local Windows validation is implied.
