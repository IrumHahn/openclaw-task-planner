#!/usr/bin/env node
// 총괄 에이전트의 AGENTS.md 에 task-planner 기본행동 구역을 넣는다(멱등, 백업).
//   node scripts/install_hook.mjs --workspace ~/.openclaw/workspace [--remove] [--dry-run]
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export const BLOCK_START = '<!-- task-planner:start -->';
export const BLOCK_END = '<!-- task-planner:end -->';
const BLOCK_PATTERN = new RegExp(`\\n?${BLOCK_START}[\\s\\S]*?${BLOCK_END}\\n?`);

export const HOOK_TEXT = `## 새 과업이 오면 — 과업 설계 먼저

사용자가 새 과업·프로젝트를 말하면("~만들고 싶어", "~하고 싶어", "이번 달 뭐 하지", 업무지도 항목 착수) **바로 일을 시작하지 않는다.** \`task-planner\` 스킬로 제안서 1장을 먼저 낸다:
- 액션플랜 3~6개, 규모(소/중/대), 담당 세 칸(기존 / 임시 서브에이전트 / 정식 신설 권고), 검수자.
- 규모가 **소**면 제안서는 한 줄("규모 소 — 그냥 진행할게요")이고 바로 진행한다.
- 사용자가 번호를 고르기 전에는 서브에이전트를 띄우지도, 에이전트를 만들지도 않는다.
- "팀으로 해" → \`agent-orchestration\` Lite. "정식으로 뽑자" → \`agent-team-onboarding\`.
질문·한 단계 추가 작업·이미 도는 원장의 다음 단계에는 이 절차를 적용하지 않는다.`;

export function upsertBlock(text, content = HOOK_TEXT) {
  const block = `${BLOCK_START}\n${content.trim()}\n${BLOCK_END}`;
  if (text.includes(BLOCK_START)) return text.replace(BLOCK_PATTERN, m => `${m.startsWith('\n') ? '\n' : ''}${block}\n`);
  const sep = text === '' ? '' : text.endsWith('\n') ? '\n' : '\n\n';
  return `${text}${sep}${block}\n`;
}

export function removeBlock(text) {
  return text.replace(BLOCK_PATTERN, '');
}

function parseArgs(argv) {
  const out = { workspace: path.join(os.homedir(), '.openclaw', 'workspace'), remove: false, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--workspace') out.workspace = argv[++i];
    else if (a === '--remove') out.remove = true;
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '-h' || a === '--help') { console.log('node install_hook.mjs --workspace <dir> [--remove] [--dry-run]'); process.exit(0); }
    else throw new Error(`unknown argument: ${a}`);
  }
  return out;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const target = path.join(opts.workspace, 'AGENTS.md');
  const before = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  const after = opts.remove ? removeBlock(before) : upsertBlock(before);
  const changed = before !== after;
  const result = { target, action: opts.remove ? 'remove' : 'install', changed, dryRun: opts.dryRun, backup: null };
  if (changed && !opts.dryRun) {
    if (before !== '') {
      result.backup = `${target}.bak-task-planner-${new Date().toISOString().replace(/[:.]/g, '-')}`;
      fs.copyFileSync(target, result.backup);
    }
    fs.writeFileSync(target, after, 'utf8');
  }
  console.log(JSON.stringify(result, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) main();
