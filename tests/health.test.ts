import "dotenv/config";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { GET } from "../src/app/api/health/route";
import { getDatabase } from "../src/lib/db";

const original = process.env.DATABASE_URL;
const globals = globalThis as unknown as { prisma?: ReturnType<typeof getDatabase> };
afterEach(async () => {
  await globals.prisma?.$disconnect();
  delete globals.prisma;
  if (original === undefined) delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = original;
});

test("health executes a real PostgreSQL query and reuses the client", async () => {
  const response = await GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok", database: "connected" });
  assert.equal(getDatabase(), getDatabase());
  assert.equal(response.headers.get("Cache-Control"), "no-store");
});

test("health hides invalid environment configuration", async () => {
  process.env.DATABASE_URL = "https://example.com/private-value";
  const response = await GET();
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: "degraded", database: "unavailable" });
});

test("health returns 503 when PostgreSQL is unavailable", async () => {
  process.env.DATABASE_URL = "postgresql://invalid:invalid@127.0.0.1:1/unavailable";
  const response = await GET();
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: "degraded", database: "unavailable" });
});
