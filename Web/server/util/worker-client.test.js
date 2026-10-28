const { test } = require('node:test');
const assert = require('node:assert/strict');
const { post } = require('./worker-client');

test('worker POST sends JSON and service token with a timeout and no redirects', async (t) => {
  let sent;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    sent = { url, options };
    return { status: 200, json: async () => ({ result: 'ok' }) };
  });
  let received;
  await post({ url: 'http://127.0.0.1:6000/job', headers: { 'X-Service-Token': 'test-only' }, json: { video: 'demo.mp4' }, timeout: 1000 },
    (error, response, body) => { received = { error, response, body }; });
  assert.equal(sent.options.method, 'POST');
  assert.equal(sent.options.headers['X-Service-Token'], 'test-only');
  assert.equal(sent.options.body, '{"video":"demo.mp4"}');
  assert.equal(sent.options.redirect, 'error');
  assert.ok(sent.options.signal instanceof AbortSignal);
  assert.deepEqual(received, { error: null, response: { statusCode: 200 }, body: { result: 'ok' } });
});

test('worker transport and JSON failures are forwarded exactly once', async (t) => {
  for (const failure of ['transport', 'json']) {
    t.mock.method(globalThis, 'fetch', async () => {
      if (failure === 'transport') throw new Error('network unavailable');
      return { status: 500, json: async () => { throw new Error('invalid JSON'); } };
    });
    let calls = 0;
    await post({ url: 'http://127.0.0.1:6000/job', json: {} }, (error) => {
      calls++;
      assert.ok(error instanceof Error);
    });
    assert.equal(calls, 1);
    t.mock.restoreAll();
  }
});

test('worker HTTP failures retain their status for controller checks', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => ({ status: 403, json: async () => ({ error: 'denied' }) }));
  await post({ url: 'http://127.0.0.1:6000/job', json: {} }, (error, response) => {
    assert.equal(error, null);
    assert.equal(response.statusCode, 403);
  });
});
