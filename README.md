# 奕明智能家居

Next.js App Router、React、TypeScript、Tailwind CSS、PostgreSQL、Prisma 7 和 Zod。当前为 TASK-001 / P2 骨架，不进入 P3。

## 本地开发

使用 Node.js 24；依赖版本由 package-lock.json 固定。

```bash
export npm_config_cache=/workspace/.npm-cache
export XDG_DATA_HOME="$PWD/.local/share"
export XDG_CONFIG_HOME="$PWD/.local/config"
export XDG_CACHE_HOME=/workspace/.cache
npm ci
# 仅首次创建；已有 .env 时保留原配置
 test -f .env || cp .env.example .env
npx prisma dev --name yiming --port 51213 --db-port 51214 --shadow-db-port 51215 --detach
npm run db:generate
npm run dev -- --hostname 127.0.0.1
```

示例连接串仅供本地 Prisma dev。不要用于部署；不要提交 .env 或数据库文件。
Prisma 引擎下载要求允许 `binaries.prisma.sh`；保持 TLS 和校验文件验证开启。

## 验证

```bash
npm run lint
npm test
npm run test:coverage
npm run build
npm run typecheck
npm run test:e2e
curl --fail http://127.0.0.1:3000/api/health
```

Playwright 默认使用 `/usr/bin/chromium`；其他环境通过 `CHROMIUM_PATH` 指定 Chromium 可执行文件。
健康接口会通过 Prisma 执行 `SELECT 1`；正常返回 HTTP 200 和 `{"status":"ok","database":"connected"}`，配置错误或数据库不可用时返回 HTTP 503，不泄露连接串或异常细节。不会自动执行数据库迁移。

测试需要已启动的本地 PostgreSQL 和生成后的 Prisma 客户端。覆盖率命令覆盖 `src/lib/**` 与 `src/app/api/**`，并要求行、分支、函数覆盖率至少 80%；不计生成代码或首页组件，首页另有浏览器测试。当前验证结果与阻塞见 [TASK-001 记录](docs/worklog/TASK-001.md)。

## 当前范围

提供中文响应式首页、数据库客户端和健康接口源码。首页为 P2 最小展示骨架，尚未对照原始参考页面进行视觉验收，也未实现业务表单或设备控制。Prisma schema 中 Inquiry 仅为待确认的骨架模型，本轮未建表或迁移。

## 生产健康接口复验

构建完成后，在两个终端分别启动 `npm run start -- --hostname 127.0.0.1 --port 3100`，以及 `DATABASE_URL=postgresql://invalid:invalid@127.0.0.1:1/unavailable npm run start -- --hostname 127.0.0.1 --port 3101`，然后执行 `node scripts/qa/health-smoke.mjs`。第二个实例仅用于验证数据库不可用时的 503 响应，不修改正常数据库。验证完停止这两个测试实例。

## 开发工具依赖与代码索引

TypeScript ESLint 8.72.1 的 minimatch 间接依赖受到 GHSA-g3hv-75wg-m249 影响。package.json 仅对该版本的 typescript-estree 设置 minimatch 11.0.1 覆盖；保留 Next.js / ESLint 主版本及其他 minimatch 依赖。升级 typescript-eslint 时重新评估并移除此临时覆盖。`npm run check:lint-deps` 实测项目服务的包含/排除匹配。

覆盖率保留 Node 原生报告，同时从其 test:coverage 事件生成 SCALE 0.58 可识别的汇总，数值取行、分支、函数覆盖率的最小值。不更改测试结果、80% 阈值或退出码。

可选代码分析工具仅在工作区安装，不修改环境设置或全局 agent 配置：

```bash
bash scripts/qa/code-intelligence.sh
export PATH="/workspace/.tools/codegraph/node_modules/.bin:/workspace/.tools/bin:$PATH"
npm_config_cache=/workspace/.npm-cache npx -y @hongmaple0820/scale-engine@0.58.0 codegraph status --dir . --json
```

需要 npm 与 uv；安装固定版本 CodeGraph 1.6.2、graphifyy 0.9.103（官方发行名，命令为 graphify）。Graphify 只执行本地代码 AST 分析，不调用模型；不提供文档/图片语义分析。索引目录可重新生成，不提交数据库或图缓存。
