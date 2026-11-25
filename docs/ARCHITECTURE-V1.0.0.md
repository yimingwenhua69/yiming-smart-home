# YIMING SMART HOME 1.0.0 — Architecture

## Product definition

A public, read-only Chinese smart-home knowledge base focused on products and ecosystems sold in mainland China. No login, commerce, payment, lead capture or real-device control.

## Top-level information architecture

1. Home
2. Product catalog
3. Manufacturer directory
4. Brand directory
5. Protocols and communication
6. Platforms and integrations
7. Lighting laboratory
8. Whole-home scenes and case studies
9. Installation and engineering
10. Technical resources and developer references
11. Global search

## Runtime architecture

- Next.js 16 App Router, React, TypeScript strict mode, Tailwind CSS.
- Static generation for every public page.
- JSON/TypeScript catalog data checked with Zod.
- Client components only for search, filters, product comparison, favorites, Three.js viewer and lighting controls.
- Pagefind may be added after static export if its index/build integration is verified.
- No database or server runtime is required for anonymous browsing.
- No third-party paid API is required.

## Cloudflare deployment

- Next.js static export writes to `out/`.
- Cloudflare Workers Static Assets serves the static output.
- Wrangler configuration points `assets.directory` to `./out`.
- GitHub Actions runs data validation, lint, typecheck, tests and production build.
- Production deploy is only enabled after all required checks pass.
- Cloudflare R2 is optional for large media after measured need; first use versioned static assets when practical.

## Core entity model

- Manufacturer
- Brand
- Product
- DeviceModel
- ProductSpecification
- Protocol
- Platform
- Integration
- Capability
- CompatibilityRecord
- InstallationGuide
- KnowledgeArticle
- SceneCase
- Source
- Evidence
- MediaAsset
- ThreeDAsset
- PhotometricProfile

Product and model are separate entities. Manufacturer, brand, model and source identifiers must be stable IDs. Relations must be explicit IDs, never inferred from display names.

## Evidence model

Every important product fact carries:
- value
- source ID
- evidence level
- region
- verified date
- version/hardware revision when applicable
- notes/limitations

Official marketing claims, official technical documentation, third-party database entries, lab tests and field tests remain distinct evidence classes.

## Media model

Every displayed asset records:
- asset ID and type
- exact product model or scene ID
- original source URL
- publisher
- captured date (when known)
- checked date
- license/permission status
- asset status
- attribution
- whether the asset is official, licensed, photographed, scanned or reconstructed

Do not download or re-host copyrighted images/models without permission or a clear license. If direct display rights cannot be established, link to the official source and leave the local image absent.

## 3D architecture

- Three.js with glTF 2.0 / GLB.
- Viewer is lazy-loaded.
- A product viewer is rendered only when a model asset is verified against that exact model.
- Model provenance is explicit: official CAD, scan, or reconstruction from verified physical references.
- No generic model may be presented as the real product.
- Missing models produce a truthful “3D asset not yet verified” state.
- Lighting visual simulation must be labeled as simulation; photometric calculation requires a real IES/LDT profile and stated room/material assumptions.

## Extensibility

Adding a product requires adding one normalized product/model record, sources, verified specifications and optional media assets. Pages, filters, counts, comparison and relations derive from the catalog automatically. No product facts are duplicated manually in page components.
