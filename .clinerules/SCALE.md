# yiming-smart-home

## SCALE Engine Integration (Cline)

This project uses SCALE Engine for AI engineering governance via Cline.

### Commands
- `scale create <type> <title>` - Create artifact
- `scale transition <id> <action>` - Transition artifact state
- `scale list --type Spec` - List artifacts
- `scale role activate <role>` - Switch role
- `scale doctor` - Health check

### Workflow
1. Explore - Role: explorer (Read/Grep only)
2. Plan - Create Spec, refine, approve
3. Implement - Role: implementer
4. Verify - Must run tests before claiming done
5. Learn - Defects become lessons, rules, and hooks

### Agent Full Workflow Bootstrap
- Treat SCALE as an agent-facing operating workflow. Do not ask the user to run a long manual checklist when you can inspect and report the exact next command.
- At session start, verify the full capability surface before coding:
  1. `scale --version` or `npx -y @hongmaple0820/scale-engine@latest --version`
  2. `scale setup --verify --pack full --dir . --json`
  3. `scale memory provider status --dir . --json`
  4. `scale codegraph status --dir . --json`
- If SCALE or a required third-party capability is missing, propose and, when the user allows installation, run:
  `npx -y @hongmaple0820/scale-engine@latest setup --pack full --memory-provider hrain --memory-mode local-only --apply --yes --dir .`
- Default third-party expectations for the full workflow are: rtk for shell execution, hrain for local memory, optional gbrain for graph memory, CodeGraph for code structure, Graphify for knowledge graph artifacts, and browser/E2E tooling when the task touches UI or web flows.
- Do not silently downgrade to a no-memory or no-knowledge workflow. If hrain, CodeGraph, or Graphify is unavailable, mark it as blocked or degraded in the plan and include the exact setup command.
- Use the governed loop for real work: define -> plan -> build -> verify -> review -> ship. Record command evidence and never claim tests, browser checks, package checks, Feishu delivery, or release verification passed without actual output.
- For Feishu notifications, generate dry-run message plans first and only send live messages after the target chat/user is confirmed.

### Rules
- Dangerous commands are blocked through SCALE gates where the platform supports executable hooks.
- Hardcoded secrets must be rejected before edits are committed.
- Repeated retries should be treated as diagnostic evidence, not brute force.
- Claims of completion require verification evidence.
- Runtime evidence is tracked under .scale/.

### Cline-Specific Notes
- Cline project guidance is kept in .clinerules so it can coexist with user-owned AGENTS.md files.
- Use SCALE verification evidence before accepting Cline-generated completion claims.

<!-- scale-engine:language-policy:start -->
## SCALE Language Policy

- 默认使用中文与用户沟通，除非用户明确要求其他语言。
- Follow the project language policy at `/workspace/scratch/28116400cf41/yiming-smart-home/.scale/agent-language.md`.
<!-- scale-engine:language-policy:end -->
