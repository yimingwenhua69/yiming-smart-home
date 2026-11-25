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

## P2 门禁收尾（最新）

以 docs/worklog/TASK-001.md 的“P2 剩余门禁处理”为准：8 项中危已通过限定父依赖版本的 minimatch override 清零；消费者匹配兼容性检查通过。CodeGraph 与 Graphify 本地代码索引可用，复现命令见 README。SCALE full preflight 的 G3/G0/G4/G5/G6/G7 均已新鲜执行通过；自审无缺陷但保留启发式建议，不声称独立审查或完整工具包安装完成。保持 P2，不自动进入 P3，不修改/发布环境。


## YIMING STUDIO 1.0.0 接续状态（2026-11-26，当前有效）

当前有效分支：`codex/yiming-smart-home-v1.0.0`。以该分支源码和 [V1.0.0 TASK-001](docs/worklog/V1.0.0-TASK-001.md) 为准。上方 P2 交接段落为历史记录，不代表当前 GitHub 状态。

已建立 Next.js 16 + React 19 + TypeScript + Tailwind 的中文知识库首轮页面：品牌首页、产品库与详情、厂商目录、协议、平台、灯光、场景、工程、搜索、产品对比、收藏和流明法初步估算器。产品数据在 `src/data/catalog.ts`，知识内容在 `src/data/knowledge.ts`，Zod 校验在 `src/lib/catalog-schema.ts`。

当前数据为 5 个制造商、6 个品牌、7 个分类、8 个协议、5 个平台、16 个能力、27 个产品、27 个设备型号、134 条独立规格、5 条兼容 / 集成路径记录、2 个集成系统、14 条 Aqara SDK 映射和 37 个来源。产品条目区分官方目录、官方规格和兼容证据；未知参数不填，不展示未授权图片或未经型号核验的 3D 模型。

旧示例设备 API 已返回 410，旧 Prisma seed 已变成 no-op，避免再次公开虚构通用设备。公开知识页面不查询 PostgreSQL；旧健康接口仍需数据库连接。

CI 工作流已添加；当前 HEAD 0e4a191f9bac2b868ccfd35c11d66d1270025a0f 的 Prisma schema、lint、typecheck、tests、coverage、production build 和 Playwright 浏览器测试全部通过（GitHub Actions run 45708859850）。当前未配置生产部署。

后续必须完成：补充真实 HardwareRevision 和 DeviceVerification 记录；继续采集 Tuya 与更多 Xiaomi 型号级资料；取得准确型号且授权清晰的图片、GLB / CAD / 扫描模型和 IES/LDT 文件；扩展全文知识正文索引；验证 Cloudflare OpenNext 适配、预览部署、域名、缓存、回滚与生产视觉验收。没有授权或证据时，保持缺失状态，不得伪造。
