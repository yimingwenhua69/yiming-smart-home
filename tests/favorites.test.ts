import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { getFavoriteIds, subscribeFavorites, toggleFavorite } from "../src/lib/favorites";

type WritableGlobal = { window?: unknown } & typeof globalThis;

function makeStorage(): Storage {
  const map = new Map<string, string>();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => {
      map.set(k, v);
    },
    removeItem: (k) => {
      map.delete(k);
    },
    clear: () => map.clear(),
    key: (i) => Array.from(map.keys())[i] ?? null,
    get length() {
      return map.size;
    },
  } as Storage;
}

function stubWindow() {
  (globalThis as WritableGlobal).window = {
    localStorage: makeStorage(),
    addEventListener: () => {},
    removeEventListener: () => {},
  };
}

const originalWindow = (globalThis as WritableGlobal).window;

afterEach(() => {
  const g = globalThis as WritableGlobal;
  if (originalWindow === undefined) delete g.window;
  else g.window = originalWindow;
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
  const unsubscribe = subscribeFavorites(() => {
    calls += 1;
  });
  toggleFavorite("dev-1");
  assert.equal(calls, 1);
  unsubscribe();
  toggleFavorite("dev-2");
  assert.equal(calls, 1);
});
