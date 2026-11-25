/**
 * Product knowledge is maintained in src/data/catalog.ts with explicit source
 * records, evidence levels and model-specific verification status.
 *
 * The former generic seed ("智能吸顶灯", "智能网关", etc.) was not tied to
 * exact manufacturers, model numbers or official evidence. It is intentionally
 * retired and must never be reintroduced as public product data.
 *
 * This legacy Prisma seed entrypoint is a no-op to prevent future accidental
 * publication of synthetic device records. Add real catalog records through
 * the version-controlled evidence-backed registry instead.
 */
console.log("No demo devices seeded. Use the evidence-backed catalog in src/data/catalog.ts.");
