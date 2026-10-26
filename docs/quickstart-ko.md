# 빠른 시작 — 과업 설계 스킬

## 이게 뭔가요

팀을 만들었는데(루미·노바 같은), 새 일을 시킬 때마다 "누가 뭘 하지?"를 내가 다 정해줘야 했다면 — 그 생각을 총괄 에이전트가 먼저 하게 하는 스킬이에요.

"홈페이지 만들고 싶어" 한 마디에 총괄이 이렇게 답합니다:

> 규모 **중** — 역할 3개, 산출물이 서로 의존.
> 기존으로 됨: 노바(카피), 루미(검수) · 임시: 디자이너, 개발자 · 정식 신설: 없음
> 1. 그냥 해 2. 팀으로 해 3. 정식으로 뽑자 4. 보류 — 아직 아무것도 시작하지 않았어요.

## 설치 3줄

```bash
git clone https://github.com/IrumHahn/openclaw-task-planner.git
openclaw skills install ./openclaw-task-planner/skill/task-planner --agent main
node ./openclaw-task-planner/scripts/install_hook.mjs --workspace ~/.openclaw/workspace
```

세 번째 줄이 총괄의 `AGENTS.md`에 "새 과업이 오면 과업 설계 먼저" 규칙을 넣어요. 원래 파일은 `AGENTS.md.bak-task-planner-<시각>`으로 남습니다.

## 확인하기

총괄에게 **"홈페이지 만들고 싶어"** 라고 말해 보세요. 제안서가 나오고 번호를 묻는다면 성공. 바로 일을 시작하면 `AGENTS.md`에 구역이 들어갔는지 확인하세요(`grep task-planner ~/.openclaw/workspace/AGENTS.md`).

## 자주 묻는 것

- **작은 일에도 매번 제안서가 나오나요?** 아니요. 규모 "소"면 "그냥 진행할게요" 한 줄이에요.
- **임시 직원은 어디 생기나요?** 에이전트 목록에는 안 생겨요. 총괄이 서브에이전트 세션으로 띄우고 끝나면 사라집니다.
- **정식 직원이 필요하다고 하면?** 권고만 해요. 실제 채용은 `agent-team-onboarding` 스킬이 내 승인을 받고 합니다.
