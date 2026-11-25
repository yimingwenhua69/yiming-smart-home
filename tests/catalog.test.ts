import assert from "node:assert/strict";
import { test } from "node:test";
import { capabilities, categories, manufacturers, products, protocols, sources } from "../src/data/catalog";

test("catalog entity identifiers are unique", () => {
  for (const collection of [sources, manufacturers, categories, products, protocols, capabilities]) {
    const ids = collection.map((item) => item.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate identifier found");
  }
});

test("every product links to an existing manufacturer, category and source", () => {
  for (const product of products) {
    assert.ok(manufacturers.some((item) => item.id === product.manufacturerId), product.id + " manufacturer missing");
    assert.ok(categories.some((item) => item.id === product.categoryId), product.id + " category missing");
    assert.ok(product.sourceIds.length > 0, product.id + " must have at least one source");
    for (const sourceId of product.sourceIds) assert.ok(sources.some((source) => source.id === sourceId), product.id + " source missing: " + sourceId);
  }
});

test("product protocol, platform and capability relations must resolve", () => {
  const protocolIds = new Set(protocols.map((item) => item.id));
  const capabilityIds = new Set(capabilities.map((item) => item.id));
  const platformIds = new Set(["apple-home", "google-home", "alexa", "home-assistant", "harmony-home"]);
  for (const product of products) {
    for (const id of product.protocolIds) assert.ok(protocolIds.has(id), product.id + " protocol missing: " + id);
    for (const id of product.capabilityIds) assert.ok(capabilityIds.has(id), product.id + " capability missing: " + id);
    for (const id of product.platformIds) assert.ok(platformIds.has(id), product.id + " platform missing: " + id);
  }
});

test("public product records never contain guessed prices or unverified media", () => {
  for (const product of products) {
    assert.equal(product.price, null, product.id + " must not publish an unverified static price");
    assert.equal(product.image, null, product.id + " must not publish an unlicensed image");
    assert.equal(product.threeDAsset, null, product.id + " must not publish an unverified 3D asset");
  }
});

test("all source URLs are HTTPS and checked dates are ISO dates", () => {
  for (const source of sources) {
    assert.ok(source.url.startsWith("https://"), source.id + " source must use HTTPS");
    assert.match(source.checkedAt, /^\\d{4}-\\d{2}-\\d{2}$/);
  }
});
