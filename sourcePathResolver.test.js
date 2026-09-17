import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveDownloadedSourcePath } from './sourcePathResolver.js';

const makeFiles = (...names) => names.map((name) => ({ name }));

test('uses the exact mp4 path when it exists', () => {
  const files = makeFiles('source-123.mp4');
  const result = resolveDownloadedSourcePath('/tmp', files, '/tmp/source-123.mp4');
  assert.equal(result, '/tmp/source-123.mp4');
});

test('falls back to matching files when the guessed name is absent', () => {
  const files = makeFiles('source-123.webm', 'other.mp4');
  const result = resolveDownloadedSourcePath('/tmp', files, '/tmp/source-123.mp4');
  assert.equal(result, '/tmp/source-123.webm');
});

test('returns null when no matching download exists', () => {
  const files = makeFiles('other.mp4', 'source-999.mp4');
  const result = resolveDownloadedSourcePath('/tmp', files, '/tmp/source-123.mp4');
  assert.equal(result, null);
});
