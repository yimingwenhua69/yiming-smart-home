# yiming-smart-home

## SCALE Engine Integration

This project uses SCALE Engine for AI engineering governance.

### Workflow
1. Explore → Plan → Implement → Verify → Learn
2. All tool calls pass through SCALE gates
3. Dangerous commands are physically blocked
4. Tests must pass before completion

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

### Commands
- `scale create <type> <title>` — Create artifact
- `scale transition <id> <action>` — State transition
- `scale doctor` — Health check

<!-- scale-engine:language-policy:start -->
## SCALE Language Policy

- 默认使用中文与用户沟通，除非用户明确要求其他语言。
- Follow the project language policy at `/workspace/scratch/28116400cf41/yiming-smart-home/.scale/agent-language.md`.
<!-- scale-engine:language-policy:end -->

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
