import assert from "node:assert/strict";
import { test } from "node:test";
import { brands, capabilities, categories, compatibilityRecords, deviceModels, deviceVerifications, hardwareRevisions, integrationSystems, manufacturers, productSpecifications, products, protocols, sources } from "../src/data/catalog";
import { validateCatalog } from "../src/lib/catalog-schema";
import { mediaAssets, photometricProfiles, threeDAssets, validateAssetRegistry } from "../src/data/assets";

test("catalog entity identifiers are unique", () => {
  for (const collection of [sources, manufacturers, brands, categories, products, deviceModels, protocols, capabilities, integrationSystems, hardwareRevisions, productSpecifications, compatibilityRecords, deviceVerifications]) {
    const ids = collection.map((item) => item.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate identifier found");
  }
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
