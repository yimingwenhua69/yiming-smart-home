import assert from 'node:assert/strict';

// Run against the production server and a separate instance pointed at an unavailable database.
const healthy = process.env.HEALTHY_BASE_URL || 'http://127.0.0.1:3100';
const unavailable = process.env.UNAVAILABLE_BASE_URL || 'http://127.0.0.1:3101';
for (const [base, expectedStatus, expectedBody] of [
  [healthy, 200, { status: 'ok', database: 'connected' }],
  [unavailable, 503, { status: 'degraded', database: 'unavailable' }],
]) {
  const response = await fetch(`${base}/api/health`, { signal: AbortSignal.timeout(10000) });
  assert.equal(response.status, expectedStatus);
  assert.match(response.headers.get('content-type'), /application\/json/);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), expectedBody);
  console.log(`Health contract passed: HTTP ${expectedStatus}, ${expectedBody.database}`);
}
const home = await fetch(healthy, { signal: AbortSignal.timeout(10000) });
assert.equal(home.status, 200);
const html = await home.text();
assert.match(html, /lang="zh-CN"/);
assert.match(html, /更懂生活/);
console.log('Production homepage passed: HTTP 200, Chinese content');
