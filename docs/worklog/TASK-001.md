# TASK-001 / P2 接续记录

## 范围与计划

导入用户交接 ZIP，保留 Git 元数据。原远端 README 已备份至 `/workspace/scratch/yiming-original-README.md`。历史 `.scale/evidence` 与 `.scale/verification.json` 不手工修改，后续验证通过 SCALE CLI 追加证据。
本轮目标：依赖恢复、中文首页、Zod 环境校验、Prisma 7 最小 schema / pg adapter / GET 健康接口；仍保持 P2，不推进 P3。

## 已验证

- npm ci 成功；Prisma / client / adapter 固定为 7.10.1。
- lint 通过。生成的 CommonJS 治理 Hook 使用对应 ESLint 例外；应用规则保留。
- 3 项环境变量校验测试通过；该模块行、分支、函数覆盖率均为 100%。其他模块覆盖率未验收。
- Playwright 使用系统 Chromium：390px、1440px 首页展示、中文标题、导航、无横向溢出、无页面脚本异常，2 项通过。
- 首页 HTTP 200，中文语言标记符合预期。
- Prisma dev 已启动；使用 pg 直接执行 SELECT 1 成功。这不等同于 Prisma 客户端贯通。
- npm audit --omit=dev：生产依赖漏洞 0；不代表全部安全门禁完成。

## 当前阻塞与失败

Prisma CLI 下载 schema-engine 的 SHA256 校验文件，被 `binaries.prisma.sh` 网络策略拒绝（HTTP 403）。未关闭校验，未使用未经验证的二进制。`prisma generate` 尚未成功，导致生产 build 无法解析生成客户端；健康接口集成、Prisma schema validate、typecheck 尚未通过。SCALE quick preflight 已执行，整体失败，失败原因是 build 缺少生成客户端；不得将 G3 非严格 TDD 标记解读为测试先行已通过。

CodeGraph、Graphify 不可用，使用显式 rg / 文件读取降级；hrain 本地内存可用。SCALE full capability verify 未通过。完整能力配置命令（本轮未执行）：

```bash
npx -y @hongmaple0820/scale-engine@0.58.0 setup --pack full --memory-provider hrain --memory-mode local-only --apply --yes --dir .
```

## 审查

健康接口只暴露固定状态，不返回配置或原始错误；查询使用固定 SQL，连接及查询超时均为 3 秒。数据库连接串经 Zod 限定为 PostgreSQL 协议。首页使用系统字体，构建不依赖 Google Fonts。关闭初始模板的 Cache Components / Partial Prefetching，避免与健康接口动态路由配置冲突，不改变冻结框架。未对现有数据库进行 schema push 或迁移。

未进行独立评审或全量安全验收，不声称所有门禁通过。未提交、推送或发布 GitHub 代码。

## 恢复步骤

在环境设置保存 `binaries.prisma.sh` 网络变更后，重新执行：

```bash
npm run db:generate
npm run db:validate
npm run build
npm run typecheck
npm run lint
npm test
npm run test:coverage
npm run test:e2e
```

使用 README 中数据库配置启动应用，再请求 `/api/health` 验证 200 / connected；断开本任务启动的数据库后验证 503 / unavailable，再恢复数据库。通过 SCALE preflight 重新生成证据。全部必要检查通过后再评估 P2 交付。

## 网络放行后续核验

再次检查发现：配置草稿 revision 5 已包含 `binaries.prisma.sh`，但当前运行实例仍为 spec revision 1，自定义允许主机为空。重新运行 `npm run db:generate` 仍退出 1，schema-engine.gz.sha256 下载返回 HTTP 403。已通过 SCALE shell 追加本轮执行证据，未重写历史证据。Prisma CLI、client、pg adapter 实装版本均为 7.10.1；生成器为 prisma-client。本次被请求的是 CLI schema-engine，不是应用查询所用的 Rust 查询引擎。等待环境设置保存并应用网络变更，再验证生成、生产构建及健康接口。

## 发布后实际验证（最新状态，2026-11-07）

本节覆盖前述历史阻塞。当前运行环境已更换，network policy 为 unrestricted / enforced，observations_current=true。未编辑或发布环境配置。Prisma 客户端正常生成，下载与 TLS / 校验验证保持开启，旧 HTTP 403 阻塞已解除。

### 已完成

- Prisma generate、schema validate、生产 build、TypeScript typecheck、lint 均通过。
- SCALE quick preflight 的 G3、G0、G4、G5 通过；G3 为非严格 TDD，不代表已证明测试先行。quick 也不代表全套治理能力验收。
- 生产首页 HTTP 200、中文内容及语言标记通过。
- 生产健康接口经 Prisma 连接本地 PostgreSQL 执行 SELECT 1，返回 HTTP 200 / connected。独立失败实例指向不可用端口，返回 HTTP 503 / unavailable。JSON 内容、no-store 缓存头已断言，不返回原始异常。
- 新增健康集成测试，含真实数据库、客户端复用、非法配置、数据库不可用；连同原测试共 6 项通过。
- 后端 src/lib/** 与 src/app/api/** 覆盖率：行 97.14%、分支 97.50%、函数 100%，设置 80% 最低门槛。生成代码和 UI 组件不在此覆盖率分母中。
- 浏览器复验 390px / 1440px 两项均通过。
- 生产依赖 npm audit --omit=dev 为 0 漏洞；全量 npm audit 报告 8 项 moderate、0 high、0 critical，受影响节点均为开发依赖。全量 audit 退出 1，不能称其无告警通过。未自动执行建议的 eslint-config-next 跨主版本降级。

### 剩余事项与审查结论

P2 的首页、Prisma 数据库连接和健康接口功能目标已验证。未进入 P3；CodeGraph、Graphify 仍不可用，SCALE full capability verify 未通过，hrain 本地内存可用。保留开发依赖中危风险作为后续依赖治理事项。没有进行独立多人评审或生产部署安全验收，不将 quick preflight 扩大解释为全部门禁通过。

本轮代码审查：未改动业务逻辑；新增测试使用固定 SELECT 1，不改表，不执行迁移；错误分支测试仅改变独立进程的连接目标，清理测试 Prisma 客户端；集成测试顺序执行，不共享并发可变环境变量。健康接口外部契约不泄露连接串或错误。两个生产测试进程已在验证后停止；未来任务需重新启动数据库和应用。

原始成功/失败 JSON 证据副本保存在 `docs/worklog/evidence/TASK-001/published/` 及 `scale/`，历史证据不覆写。

### 新任务交接指令

继续 TASK-001 / P2，选择 codex/task-001-p2-20261107 分支最新提交。先读 CODEX_HANDOFF.md、本记录的“发布后实际验证”及 README，不重复应用旧的环境草稿。先检查实际环境和工作区。按 README 启动本地数据库，生成 Prisma 客户端，再运行 schema validate、build、typecheck、lint、6 项测试、后端覆盖率和 2 项浏览器测试；如需复验 HTTP 健康契约，按 README 启动正常/失败两个生产实例并运行 health-smoke。继续评估 8 项开发依赖中危告警和治理工具降级，保留证据；P2 其余门禁验收完成前不进入 P3，不发布环境。
