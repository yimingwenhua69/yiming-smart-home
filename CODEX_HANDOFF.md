# Codex 项目交接说明

## 项目状态

- 项目：奕明智能家居网站。
- 阶段：P2 骨架搭建；任务 ID：`TASK-001`。
- P0 需求和 P1 架构已确认；当前不得进入 P3。
- 当前源码仍是 Next.js 初始模板，尚未实现网站首页、`/api/health`、Prisma 数据库连接或 Prisma schema。
- SCALE Engine 0.58.0 已安装，治理配置位于 `.scale/`，项目规则位于 `AGENTS.md`。
- 本地 Git 仓库已初始化，但没有提交、远端地址或已推送代码。
- GitHub 私有仓库 `yimingwenhua69/yiming-smart-home` 已创建，默认分支 `main` 当前只有 README；本地代码尚未上传。

## 冻结架构

- Next.js App Router、React、TypeScript（`strict: true`）、Tailwind CSS。
- Next.js Route Handlers；PostgreSQL + Prisma ORM；Zod 输入校验。
- P2 目标：可运行首页、`GET /api/health` 返回 JSON、通过 Prisma 实际连通 PostgreSQL。
- 本地开发数据库拟采用 Prisma 7 `prisma dev`；部署平台留到 P5 评估。

## 当前环境与阻塞

- Node.js `v24.22.1`。
- 当前 `package.json` 还没有 Prisma、PostgreSQL driver adapter、Zod 或 dotenv 依赖。
- Prisma 依赖安装曾返回 `npm error Invalid Version:`；安装结果未验证。
- `npm run build` 曾因 `next: not found` 失败；之后依赖目录被重建，build/lint 尚未重新验证。
- `.scale/verification.json` 的 quick preflight 曾记录构建失败；保留该证据原样，不手工改写。
- CodeGraph 与 Graphify 当前不可用；继续时按 SCALE 规则记录降级状态，不得声称已通过。

## 下一步

1. 先检查 GitHub 私有仓库当前内容和 `.gitignore`，避免覆盖远端 README 或上传密钥。
2. 恢复并验证 npm 依赖安装；固定 Prisma 7 与适配器版本。
3. 完成最小 Prisma schema、数据库客户端、Zod 环境变量校验、健康检查 Route Handler 和中文项目首页。
4. 运行 SCALE quick preflight、lint、build，并启动开发服务器核验首页和健康接口。
5. 将实际命令结果写入 SCALE 生成的证据；所有门禁通过后再转入 P3。

## 交接纪律

- 一次只完成一个可验收单元；所有完成声明必须有真实命令或 `.scale/` 证据。
- 不修改已生成的 `.scale/` 证据文件内容；通过 SCALE 命令刷新证据。
- 不提交 `.env`、密钥、数据库本地数据或 `node_modules`。
- 若 P2 实现需要改变冻结架构，先回到 P1 确认。

## Codex 接续更新（2026-11-07）

当前代码与依赖已补齐至 P2 待验证骨架。以 `docs/worklog/TASK-001.md` 为最新状态，本文原始环境与下一步段落保留为历史交接信息。原始和本轮 SCALE JSON 证据的原样副本位于 `docs/worklog/evidence/TASK-001/`，以便新任务读取；原 `.scale/evidence` 未修改。

新任务需选择保存 P2 的分支，先核对网络放行是否实际生效，再按 README 生成 Prisma 客户端、验证 schema、build、typecheck 和健康接口。生成器为 prisma-client，Prisma / client / adapter-pg 为 7.10.1。当前不能宣称 P2 完成，不进入 P3。

## 发布后验证更新（最新）

旧网络阻塞已解除：Prisma 生成、schema 校验、生产 build、typecheck、健康接口 200/503 均已验证。现有 6 项测试、后端覆盖率门槛和 2 项浏览器测试通过。详见 docs/worklog/TASK-001.md 最新章节；全量 audit 有 8 项开发依赖中危，生产依赖为 0，治理工具仍有降级，不宣称所有门禁或 P3 已完成。新任务使用该分支最新提交，不重复修改/发布环境。
