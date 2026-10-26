# openclaw-task-planner — 과업 설계 스킬

사용자가 "홈페이지 만들고 싶어", "이번 달 뭐 하지"라고 하면 총괄 에이전트가 **바로 일을 시작하지 않고** 제안서 1장을 먼저 내게 하는 OpenClaw 스킬이다.

제안서에는 액션플랜, 규모(소/중/대), 담당 세 칸(기존 직원 / 임시 서브에이전트 / 정식 신설 권고), 검수자가 들어간다. 사용자가 번호를 고르면 그제야 다음 스킬로 넘어간다.

```
task-planner (무엇을·누가)  →  agent-orchestration (어떻게 돌리고 검수)
                            →  agent-team-onboarding (정식 채용)
```

## 구성

- `skill/task-planner/` — 스킬 본체. 이 폴더만 설치하면 된다.
  - `SKILL.md` 절차 5단계 · `references/decision-rules.md` 판정 규칙 · `references/proposal-template.md` 제안서 양식 · `examples/`
- `scripts/install_hook.mjs` — 총괄 `AGENTS.md`에 "새 과업이 오면 과업 설계 먼저" 구역을 넣는다(멱등·백업·`--remove`).
- `docs/quickstart-ko.md` — 수강생용 설치 안내.

## 설치 (OpenClaw 2026.10 기준)

```bash
git clone https://github.com/IrumHahn/openclaw-task-planner.git
openclaw skills install ./openclaw-task-planner/skill/task-planner --agent main
node ./openclaw-task-planner/scripts/install_hook.mjs --workspace ~/.openclaw/workspace
```

제거: `node scripts/install_hook.mjs --workspace ~/.openclaw/workspace --remove` 후 스킬 폴더 삭제.

## 테스트

```bash
node --test scripts/install_hook.test.mjs
```

## 라이선스

코드·스킬 지침은 MIT([LICENSE](LICENSE)), 설명 문서는 CC BY 4.0([docs/LICENSE](docs/LICENSE)). 예제의 팀·이름은 가상이다.
