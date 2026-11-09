import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { getEnvironment } from "../src/lib/env";

const original = process.env.DATABASE_URL;
afterEach(() => {
  if (original === undefined) delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = original;
});

test("accepts PostgreSQL connection strings", () => {
  for (const protocol of ["postgres", "postgresql"]) {
    const url = `${protocol}://user:password@localhost:5432/yiming`;
    process.env.DATABASE_URL = url;
    assert.equal(getEnvironment().DATABASE_URL, url);
  }
});

test("rejects missing configuration", () => {
  delete process.env.DATABASE_URL;
  assert.throws(getEnvironment);
});

test("rejects invalid URLs and other database protocols", () => {
  for (const url of ["", "not-a-url", "https://example.com", "mysql://localhost/db"]) {
    process.env.DATABASE_URL = url;
    assert.throws(getEnvironment);
  }
});
