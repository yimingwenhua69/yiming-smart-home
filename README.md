# YIMING STUDIO · 奕明智能家居知识库

当前开发版本：**1.0.0**  
技术栈：Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Prisma 7 · PostgreSQL · Zod

## 项目目标

面向中国市场的智能家居产品、协议生态、平台集成、灯光技术、空间场景和工程资料知识库。

不包含：登录、商城、支付、留资、客户隐私采集和真实设备控制。

产品信息只发布有来源的记录。当前目录包含 25 个产品、25 个设备型号、131 条独立规格、4 条官方平台兼容记录、14 条 Aqara SDK 内部设备映射和 35 个来源。硬件版本与本工作室实测记录尚为空。新增官方资料覆盖 Aqara 八款传感器的型号、无线协议、供电、测量范围和安装限制。未知型号、参数、兼容性、图片和 3D 资产保持未确认，不用虚构内容补齐。

## 页面结构

- `/`：YIMING STUDIO 品牌首页
- `/products/`：产品全景矩阵、搜索、分类筛选、收藏和最多三款产品对比
- `/products/[slug]/`：静态预生成的产品详情、参数、限制和来源
- `/manufacturers/`：厂商与品牌入口
- `/protocols/`：Matter、Thread、Zigbee、Z-Wave、KNX、Wi-Fi、Bluetooth LE
- `/platforms/`：Apple Home、Google Home、Alexa、Home Assistant、华为鸿蒙智家
- `/lighting/`：照明设计、显色、眩光、调光、IES/LDT 与初步光通量估算
- `/scenes/`：客厅、卧室、玄关、餐厨场景逻辑
- `/engineering/`：预埋布线、网络、调试、验收与交付
- `/search/`：全站知识搜索

旧 `/devices/` 与 `/knowledge/[slug]/` 路由保留跳转。旧 `/api/devices` 端点返回 410，不再暴露无来源的示例设备记录。

## 本地开发

需要 Node.js 24 和 npm。

```bash
npm ci
# 首次创建本地配置；保留已有 .env，不要覆盖
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm run db:generate
npm run dev
```

PowerShell 用户可直接执行上面的命令。不要提交 `.env`、数据库文件、密钥或 `node_modules`。

公开产品与知识页面不访问数据库。当前 `/api/health` 仍通过 Prisma 对 PostgreSQL 执行 `SELECT 1`；正常返回 200，数据库不可用或配置错误返回 503。旧 Prisma 设备 seed 已改为 no-op，防止再次生成通用虚构产品。

## 验证命令

```bash
npm run db:validate
npm run lint
npm run typecheck
npm test
npm run test:coverage
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright 默认使用其管理的 Chromium；如需指定本机浏览器，可设置 `CHROMIUM_PATH`。

CI 工作流：`.github/workflows/ci.yml`。GitHub Actions 的实际状态是发布验收依据；仅提交工作流不代表检查已经通过。

## 目录约定

- `src/data/catalog.ts`：厂商、品牌、产品、设备型号、硬件版本、独立规格、平台兼容、实测验证、协议、平台、能力与来源登记
- `src/data/knowledge.ts`：协议、灯光、场景和工程知识
- `src/lib/catalog-schema.ts`：Zod 数据结构与实体关系校验（包含来源外键、型号归属、规格、兼容和实测关系）
- `src/app/`：Next.js 路由
- `src/components/`：站点组件、搜索、产品对比、灯光估算
- `docs/`：架构、素材真实性、来源和阶段记录
- `tests/`：目录校验、API 测试和浏览器测试

## 资料真实性与资产原则

- 官方目录条目不代表全部规格已经确认。
- 型号、协议、兼容性和参数必须绑定来源。
- 不发布无授权的厂商图片、视频或 3D 模型。
- 当前没有通过验证的本地产品图片或 3D 资产，因此产品详情如实显示缺失状态。
- 灯光估算器采用流明法，仅用于初步估算；精确照度分析需要准确 IES/LDT 和完整空间输入。

## 部署状态

尚未发布生产环境。Cloudflare Workers + OpenNext 为候选方案，需完成适配器兼容验证、预览部署、域名、回滚和实际浏览器验收后才能确定。
