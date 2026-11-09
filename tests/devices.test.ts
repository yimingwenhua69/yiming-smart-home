import "dotenv/config";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { GET as listDevices } from "../src/app/api/devices/route";
import { GET as getDevice } from "../src/app/api/devices/[id]/route";
import { deviceListQuery } from "../src/lib/schemas";
import { getDatabase } from "../src/lib/db";

const globals = globalThis as unknown as { prisma?: ReturnType<typeof getDatabase> };
afterEach(async () => {
  await globals.prisma?.$disconnect();
  delete globals.prisma;
});

test("device list query applies defaults", () => {
  const parsed = deviceListQuery.parse({});
  assert.equal(parsed.page, 1);
  assert.equal(parsed.pageSize, 20);
  assert.equal(parsed.sort, "name");
  assert.equal(parsed.order, "asc");
});

test("device list query rejects non-positive page", () => {
  assert.throws(() => deviceListQuery.parse({ page: "0" }));
});

test("device list query rejects unknown sort field", () => {
  assert.throws(() => deviceListQuery.parse({ sort: "bogus" }));
});

test("GET /api/devices returns paginated shape", async () => {
  const response = await listDevices(new Request("http://localhost/api/devices"));
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.ok(Array.isArray(body.items));
  assert.equal(typeof body.total, "number");
  assert.equal(body.page, 1);
  assert.equal(body.pageSize, 20);
});

test("GET /api/devices filters by category", async () => {
  const url = new URL("http://localhost/api/devices");
  url.searchParams.set("category", "灯光");
  const response = await listDevices(new Request(url));
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.ok(body.items.length > 0);
  for (const item of body.items) assert.equal(item.category, "灯光");
});

test("GET /api/devices searches by q", async () => {
  const url = new URL("http://localhost/api/devices");
  url.searchParams.set("q", "门锁");
  const response = await listDevices(new Request(url));
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.ok(body.items.some((d: { name: string }) => d.name.includes("门锁")));
});

test("GET /api/devices sorts by price ascending", async () => {
  const url = new URL("http://localhost/api/devices");
  url.searchParams.set("sort", "price");
  url.searchParams.set("order", "asc");
  const response = await listDevices(new Request(url));
  assert.equal(response.status, 200);
  const body = await response.json();
  const priced = body.items.filter((d: { priceCents: number | null }) => d.priceCents != null);
  for (let i = 1; i < priced.length; i++) {
    assert.ok(priced[i - 1].priceCents <= priced[i].priceCents);
  }
});

test("GET /api/devices/:id returns a device", async () => {
  const response = await getDevice(new Request("http://localhost/api/devices/dev-light-01"), {
    params: Promise.resolve({ id: "dev-light-01" }),
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.id, "dev-light-01");
  assert.equal(body.name, "智能吸顶灯");
});

test("GET /api/devices/:id returns 404 for unknown id", async () => {
  const response = await getDevice(new Request("http://localhost/api/devices/nope"), {
    params: Promise.resolve({ id: "nope" }),
  });
  assert.equal(response.status, 404);
});
