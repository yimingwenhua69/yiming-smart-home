import assert from "node:assert/strict";
import { test } from "node:test";
import { GET as listDevices } from "../src/app/api/devices/route";
import { GET as getDevice } from "../src/app/api/devices/[id]/route";
import { deviceListQuery } from "../src/lib/schemas";

test("legacy device list endpoint returns 410 instead of exposing placeholder data", async () => {
  const response = await listDevices();
  assert.equal(response.status, 410);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), {
    error: "legacy_endpoint_retired",
    message: "设备资料已迁移至带来源证据的静态产品知识库，请使用 /products/。"
  });
});

test("legacy device detail endpoint returns 410 instead of exposing placeholder data", async () => {
  const response = await getDevice();
  assert.equal(response.status, 410);
  assert.deepEqual(await response.json(), {
    error: "legacy_endpoint_retired",
    message: "旧版示例设备记录已停止公开，请使用 /products/ 中的来源可追溯产品档案。"
  });
});

test("device list query parser keeps bounded pagination defaults", () => {
  const parsed = deviceListQuery.parse({});
  assert.equal(parsed.page, 1);
  assert.equal(parsed.pageSize, 20);
  assert.equal(parsed.sort, "name");
  assert.equal(parsed.order, "asc");
});

test("device list query parser rejects invalid pagination and sort values", () => {
  assert.throws(() => deviceListQuery.parse({ page: "0" }));
  assert.throws(() => deviceListQuery.parse({ sort: "bogus" }));
});
