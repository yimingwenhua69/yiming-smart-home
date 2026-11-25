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
- The current product seed contains 25 generic, unbranded placeholder entries such as “智能吸顶灯” and “智能网关”. They do not identify an exact manufacturer, brand, product model, official product page or evidence source. They are not acceptable as public product records.
- The current product API and device pages depend on PostgreSQL at request time.
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

Do not publish unverified product data or images to meet a numerical quota. The 25-product requirement is a release gate, not permission to fabricate.

## Immediate remediation

- Retire the generic placeholder seed.
- Introduce normalized catalog entities and evidence records.
- Replace runtime database product reads with static catalog reads.
- Add static route generation and Cloudflare deployment configuration.
- Add asset validation and product evidence validation.
- Add CI build/type/lint/data checks before production deployment.

## Audit limitation

This audit is based on the GitHub main branch source files and commit metadata available on 2026-11-26. No claim is made that the user's Windows working directory has been read or modified. Local-only files not pushed to this repository remain outside this audit.
