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
