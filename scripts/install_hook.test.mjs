import test from 'node:test';
import assert from 'node:assert/strict';
import { upsertBlock, removeBlock, BLOCK_START, BLOCK_END } from './install_hook.mjs';

test('appends block to existing text once', () => {
  const once = upsertBlock('# AGENTS\n\nhello\n');
  assert.ok(once.includes(BLOCK_START) && once.includes(BLOCK_END));
  assert.ok(once.startsWith('# AGENTS\n\nhello\n'));
  const twice = upsertBlock(once);
  assert.equal(twice, once);
  assert.equal(twice.split(BLOCK_START).length, 2);
});

test('replaces stale block content', () => {
  const stale = `intro\n${BLOCK_START}\nold\n${BLOCK_END}\noutro\n`;
  const fresh = upsertBlock(stale);
  assert.ok(!fresh.includes('\nold\n'));
  assert.ok(fresh.startsWith('intro\n') && fresh.endsWith('outro\n'));
});

test('remove restores text without block', () => {
  const withBlock = upsertBlock('a\n');
  assert.equal(removeBlock(withBlock), 'a\n');
});

test('does not touch other managed blocks', () => {
  const other = 'x\n<!-- agent-team-onboarding:start -->\nteam\n<!-- agent-team-onboarding:end -->\n';
  const out = removeBlock(upsertBlock(other));
  assert.equal(out, other);
});
