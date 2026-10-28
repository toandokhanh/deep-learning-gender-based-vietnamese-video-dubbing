const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { validName, ownsUpload, rateLimit } = require('./security');

test('uploaded media names cannot select paths or shell syntax', () => {
  for (const name of ['../other.mp4', '/tmp/a.mp4', 'a;id.mp4', 'a..mp4', '-flag.mp4', undefined]) assert.equal(validName(name), false);
  assert.equal(validName('a_0123456789.mp4'), true);
});

test('an upload is owned only by its recorded user', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'upload-owner-test-'));
  try {
    fs.writeFileSync(path.join(directory, 'abc.mp4.owner'), 'user-a');
    assert.equal(ownsUpload('user-a', 'abc.mp4', directory), true);
    assert.equal(ownsUpload('user-b', 'abc.mp4', directory), false);
    assert.equal(ownsUpload('user-a', '../abc.mp4', directory), false);
    assert.equal(ownsUpload('user-a', 'missing.mp4', directory), false);
  } finally { fs.rmSync(directory, { recursive: true, force: true }); }
});

test('request limit rejects overflow without blocking a different client', () => {
  const limiter = rateLimit(1);
  let allowed = 0, rejected = 0;
  const response = { status(code) { assert.equal(code, 429); rejected++; return this; }, json() {} };
  limiter({ ip: 'client-a' }, response, () => allowed++);
  limiter({ ip: 'client-a' }, response, () => allowed++);
  limiter({ ip: 'client-b' }, response, () => allowed++);
  assert.equal(allowed, 2); assert.equal(rejected, 1);
});
