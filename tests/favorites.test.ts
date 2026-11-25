import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { getFavoriteIds, subscribeFavorites, toggleFavorite } from "../src/lib/favorites";

type WindowStub = { window?: unknown };

function makeStorage(): Storage {
  const map = new Map<string, string>();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => { map.set(key, value); },
    removeItem: (key) => { map.delete(key); },
    clear: () => map.clear(),
    key: (index) => Array.from(map.keys())[index] ?? null,
    get length() { return map.size; }
  } as Storage;
}

function stubWindow() {
  (globalThis as unknown as WindowStub).window = {
    localStorage: makeStorage(),
    addEventListener: () => {},
    removeEventListener: () => {}
  };
}

const originalWindow = (globalThis as unknown as WindowStub).window;

afterEach(() => {
  const globalStub = globalThis as unknown as WindowStub;
  if (originalWindow === undefined) delete globalStub.window;
  else globalStub.window = originalWindow;
});

test("favorites are empty without a browser", () => {
  assert.deepEqual(getFavoriteIds(), []);
});

test("toggle adds and removes a favorite", () => {
  stubWindow();
  assert.deepEqual(getFavoriteIds(), []);
  toggleFavorite("dev-1");
  assert.deepEqual(getFavoriteIds(), ["dev-1"]);
  toggleFavorite("dev-1");
  assert.deepEqual(getFavoriteIds(), []);
});

test("subscribe returns unsubscribe and notifies on toggle", () => {
  stubWindow();
  let calls = 0;
  const unsubscribe = subscribeFavorites(() => { calls += 1; });
  toggleFavorite("dev-1");
  assert.equal(calls, 1);
  unsubscribe();
  toggleFavorite("dev-2");
  assert.equal(calls, 1);
});
