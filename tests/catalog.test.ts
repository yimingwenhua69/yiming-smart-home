import assert from "node:assert/strict";
import { test } from "node:test";
import { brands, capabilities, categories, compatibilityRecords, deviceModels, deviceVerifications, hardwareRevisions, integrationMethods, integrationSystems, manufacturers, productSpecifications, products, protocols, sources } from "../src/data/catalog";
import { catalogRegistry, validateCatalog } from "../src/lib/catalog-schema";
import { mediaAssets, photometricProfiles, threeDAssets, validateAssetRegistry } from "../src/data/assets";

test("catalog entity identifiers are unique", () => {
  for (const collection of [sources, manufacturers, brands, categories, products, deviceModels, protocols, capabilities, integrationSystems, integrationMethods, hardwareRevisions, productSpecifications, compatibilityRecords, deviceVerifications]) {
    const ids = collection.map((item) => item.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate identifier found");
  }
});

test("organizations and brands have explicit non-interchangeable roles", () => {
  assert.equal(manufacturers.find((item) => item.id === "tuya")?.organizationType, "iot-platform-provider");
  assert.equal(brands.find((item) => item.id === "tuya")?.brandType, "platform-brand");
  assert.equal(brands.find((item) => item.id === "mi-home")?.brandType, "ecosystem-brand");
  assert.equal(brands.find((item) => item.id === "xiaomi")?.brandType, "hardware-brand");
});

test("every product links to an existing manufacturer, brand, category and model", () => {
  for (const product of products) {
    assert.ok(manufacturers.some((item) => item.id === product.manufacturerId), product.id + " manufacturer missing");
    assert.ok(brands.some((item) => item.id === product.brandId), product.id + " brand missing");
    assert.equal(brands.find((item) => item.id === product.brandId)?.manufacturerId, product.manufacturerId);
    assert.ok(categories.some((item) => item.id === product.categoryId), product.id + " category missing");
    assert.ok(product.modelIds.length > 0, product.id + " must have a model record");
    for (const modelId of product.modelIds) assert.ok(deviceModels.some((model) => model.id === modelId && model.productId === product.id));
  }
});

test("device model protocol, platform, capability and source relations must resolve", () => {
  const protocolIds = new Set<string>(protocols.map((item) => item.id));
  const capabilityIds = new Set<string>(capabilities.map((item) => item.id));
  const sourceIds = new Set<string>(sources.map((item) => item.id));
  for (const model of deviceModels) {
    for (const id of model.protocolIds) assert.ok(protocolIds.has(id), model.id + " protocol missing: " + id);
    for (const id of model.specificationIds) assert.ok(productSpecifications.some((spec) => spec.id === id && spec.deviceModelId === model.id));
    for (const id of model.compatibilityRecordIds) assert.ok(compatibilityRecords.some((record) => record.id === id && record.deviceModelId === model.id));
    for (const id of model.hardwareRevisionIds) assert.ok(hardwareRevisions.some((revision) => revision.id === id && revision.deviceModelId === model.id));
    for (const id of model.verificationIds) assert.ok(deviceVerifications.some((verification) => verification.id === id && verification.deviceModelId === model.id));
    for (const id of model.capabilityIds) assert.ok(capabilityIds.has(id), model.id + " capability missing: " + id);
    for (const id of model.sourceIds) assert.ok(sourceIds.has(id), model.id + " source missing: " + id);
    for (const mapping of model.integrationModels) {
      assert.ok(integrationSystems.some((integration) => integration.id === mapping.integrationId), model.id + " integration missing: " + mapping.integrationId);
      assert.ok(sourceIds.has(mapping.sourceId), model.id + " integration source missing: " + mapping.sourceId);
    }
    for (const spec of productSpecifications.filter((item) => item.deviceModelId === model.id)) assert.ok(sourceIds.has(spec.sourceId), model.id + " spec source missing: " + spec.sourceId);
    for (const record of compatibilityRecords.filter((item) => item.deviceModelId === model.id)) assert.ok(sourceIds.has(record.sourceId), model.id + " compatibility source missing: " + record.sourceId);
    for (const revision of hardwareRevisions.filter((item) => item.deviceModelId === model.id)) for (const sourceId of revision.sourceIds) assert.ok(sourceIds.has(sourceId), model.id + " revision source missing: " + sourceId);
    for (const verification of deviceVerifications.filter((item) => item.deviceModelId === model.id)) for (const sourceId of verification.sourceIds) assert.ok(sourceIds.has(sourceId), model.id + " verification source missing: " + sourceId);
  }
});

test("public device models never contain guessed prices or unverified media", () => {
  for (const model of deviceModels) {
    assert.equal(model.price, null, model.id + " must not publish an unverified static price");
    assert.equal(model.image, null, model.id + " must not publish an unlicensed image");
    assert.equal(model.threeDAsset, null, model.id + " must not publish an unverified 3D asset");
  }
});

test("all source URLs are HTTPS and checked dates are ISO dates", () => {
  for (const source of sources) {
    assert.ok(source.url.startsWith("https://"), source.id + " source must use HTTPS");
    assert.match(source.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("Zod catalog schema and all foreign-key relations pass", () => {
  const result = validateCatalog();
  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
});


test("media, 3D and photometric asset registry enforces model and rights provenance", () => {
  const result = validateAssetRegistry();
  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
  assert.equal(mediaAssets.length, 0);
  assert.equal(threeDAssets.length, 0);
  assert.equal(photometricProfiles.length, 0);
});


test("catalog validator reports malformed records and duplicate identifiers", () => {
  const malformed = {
    ...catalogRegistry,
    sources: [
      ...catalogRegistry.sources,
      { ...catalogRegistry.sources[0], id: "duplicate-source", url: "not-a-url" },
      { ...catalogRegistry.sources[0], id: catalogRegistry.sources[0].id }
    ],
    manufacturers: [{ ...catalogRegistry.manufacturers[0], website: "not-a-url" }],
    brands: [{ ...catalogRegistry.brands[0], name: "", manufacturerId: "missing-manufacturer" }],
    categories: [{ ...catalogRegistry.categories[0], id: "" }],
    products: [{ ...catalogRegistry.products[0], slug: "bad slug", manufacturerId: "missing-manufacturer", brandId: "missing-brand", categoryId: "missing-category", modelIds: ["missing-model"] }],
    integrationSystems: [{ ...catalogRegistry.integrationSystems[0], documentationUrl: "not-a-url" }],
    platforms: [{ ...catalogRegistry.platforms[0], link: "not-a-url" }],
    capabilities: [{ ...catalogRegistry.capabilities[0], name: "" }]
  } as unknown as typeof catalogRegistry;
  const result = validateCatalog(malformed);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes("duplicate source id")));
  assert.ok(result.errors.some((error) => error.includes("source duplicate-source")));
  assert.ok(result.errors.some((error) => error.includes("manufacturer")));
  assert.ok(result.errors.some((error) => error.includes("brand")));
  assert.ok(result.errors.some((error) => error.includes("category")));
  assert.ok(result.errors.some((error) => error.includes("product")));
  assert.ok(result.errors.some((error) => error.includes("integration-system")));
  assert.ok(result.errors.some((error) => error.includes("platform")));
  assert.ok(result.errors.some((error) => error.includes("capability")));
});

test("catalog validator catches broken foreign keys and child-parent mismatches", () => {
  const baseModel = catalogRegistry.deviceModels[0];
  const baseProduct = catalogRegistry.products[0];
  const validSourceId = catalogRegistry.sources[0].id;
  const validProtocolId = catalogRegistry.protocols[0].id;
  const validCapabilityId = catalogRegistry.capabilities[0].id;
  const validIntegrationId = catalogRegistry.integrationSystems[0].id;
  const brokenModel = {
    ...baseModel,
    id: "broken-device-model",
    productId: "missing-product",
    sourceIds: [validSourceId, "missing-source"],
    integrationModels: [
      { integrationId: validIntegrationId, modelId: "valid-internal-model", sourceId: validSourceId },
      { integrationId: "missing-integration", modelId: "invalid-internal-model", sourceId: "missing-source" }
    ],
    protocolIds: [validProtocolId, "missing-protocol"],
    capabilityIds: [validCapabilityId, "missing-capability"],
    hardwareRevisionIds: ["missing-revision", "revision-parent-mismatch"],
    specificationIds: ["missing-specification", "spec-parent-mismatch"],
    compatibilityRecordIds: ["missing-compatibility", "compat-parent-mismatch"],
    verificationIds: ["missing-verification", "verification-parent-mismatch"]
  };
  const brokenRegistry = {
    ...catalogRegistry,
    brands: [...catalogRegistry.brands, { ...catalogRegistry.brands[0], id: "broken-brand", manufacturerId: "missing-manufacturer" }],
    products: [
      ...catalogRegistry.products,
      { ...baseProduct, id: "broken-product", manufacturerId: "missing-manufacturer", brandId: "missing-brand", categoryId: "missing-category", modelIds: ["missing-model"] },
      { ...baseProduct, id: "brand-owner-mismatch", manufacturerId: "huawei", brandId: catalogRegistry.brands[0].id },
      { ...baseProduct, id: "wrong-model-parent", modelIds: [baseModel.id] },
      { ...baseProduct, id: "broken-model-parent", modelIds: ["broken-device-model"] }
    ],
    deviceModels: [...catalogRegistry.deviceModels, brokenModel],
    hardwareRevisions: [
      ...catalogRegistry.hardwareRevisions,
      { id: "revision-parent-mismatch", deviceModelId: baseModel.id, revisionCode: "R1", region: "CN", sourceIds: [validSourceId], evidenceLevel: "official", checkedAt: "2026-11-26", notes: "" },
      { id: "revision-missing-model", deviceModelId: "missing-model", revisionCode: "R2", region: "CN", sourceIds: ["missing-source"], evidenceLevel: "official", checkedAt: "2026-11-26", notes: "" }
    ],
    productSpecifications: [
      ...catalogRegistry.productSpecifications,
      { id: "spec-parent-mismatch", deviceModelId: baseModel.id, name: "test", value: "1", unit: null, sourceId: validSourceId, evidenceLevel: "official", checkedAt: "2026-11-26", notes: "" },
      { id: "spec-missing-model", deviceModelId: "missing-model", name: "test", value: "1", unit: null, sourceId: "missing-source", evidenceLevel: "official", checkedAt: "2026-11-26", notes: "" }
    ],
    compatibilityRecords: [
      ...catalogRegistry.compatibilityRecords,
      { id: "compat-parent-mismatch", deviceModelId: baseModel.id, targetType: "platform", targetId: "missing-platform", methodId: "missing-method", status: "supported", evidenceLevel: "official", sourceId: validSourceId, features: [], checkedAt: "2026-11-26", notes: "" },
      { id: "compat-missing-integration", deviceModelId: "missing-model", targetType: "integration", targetId: "missing-integration", methodId: null, status: "unverified", evidenceLevel: "documented", sourceId: "missing-source", features: [], checkedAt: "2026-11-26", notes: "" }
    ],
    deviceVerifications: [
      ...catalogRegistry.deviceVerifications,
      { id: "verification-parent-mismatch", deviceModelId: baseModel.id, verificationType: "pairing", result: "pass", evidenceLevel: "lab-tested", testedAt: "2026-11-26", hardwareRevisionId: null, firmwareVersion: null, environment: "test", steps: [], observations: [], sourceIds: [validSourceId] },
      { id: "verification-missing-model", deviceModelId: "missing-model", verificationType: "functional", result: "partial", evidenceLevel: "field-tested", testedAt: "2026-11-26", hardwareRevisionId: "missing-revision", firmwareVersion: null, environment: "test", steps: [], observations: [], sourceIds: ["missing-source"] }
    ],
    protocols: [...catalogRegistry.protocols, { ...catalogRegistry.protocols[0], id: "broken-protocol", sourceIds: ["missing-source"] }]
  } as unknown as typeof catalogRegistry;
  const result = validateCatalog(brokenRegistry);
  assert.equal(result.valid, false);
  for (const fragment of [
    "missing manufacturer", "missing brand", "brand/manufacturer ownership mismatch",
    "missing category", "missing device model", "device model parent mismatch",
    "missing product", "missing source", "missing integration system", "missing protocol",
    "missing capability", "references missing hardware revision", "hardware revision parent mismatch",
    "references missing specification", "specification parent mismatch",
    "references missing compatibility record", "compatibility parent mismatch",
    "references missing verification", "verification parent mismatch",
    "references missing device model", "references missing platform", "references missing integration", "references missing integration method"
  ]) assert.ok(result.errors.some((error) => error.includes(fragment)), "expected validation error: " + fragment);
});
