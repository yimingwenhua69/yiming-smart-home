# YIMING SMART HOME 1.0.0 — 技术架构

## 产品边界

面向中国市场的公开只读智能家居知识库。无登录、商城、支付、留资、客户隐私采集和真实设备控制。产品数据必须可追溯；没有证据的字段保持为空。

## 信息架构

1. 品牌官网首页
2. 产品库与产品详情
3. 厂商与品牌目录
4. 协议与生态
5. 平台与集成
6. 灯光技术与光通量估算
7. 空间场景与联动逻辑
8. 工程安装、调试与交付
9. 全站搜索
10. 来源与证据资料

## 技术栈

- Next.js 16 App Router、React 19、TypeScript strict、Tailwind CSS 4。
- 公开知识页面使用静态数据与静态路由预生成；产品详情通过 \`generateStaticParams\` 预生成。
- 客户端交互限于搜索、分类筛选、收藏、产品对比和灯光初步估算。
- 产品目录位于 \`src/data/catalog.ts\`；知识内容位于 \`src/data/knowledge.ts\`。
- \`src/lib/catalog-schema.ts\` 使用 Zod 校验数据结构和实体关系。
- PostgreSQL / Prisma 保留给历史健康检查和后续可选服务，不参与公开产品页、搜索、筛选或对比。
- 旧版数据库设备 API 返回 410，不再公开过去的通用占位设备数据。

## 部署决策

当前没有配置或发布生产部署。Next.js 项目仍保留动态 \`/api/health\` Route Handler，因此不能直接宣称已支持纯静态导出或仅靠 Cloudflare Static Assets 完成部署。

首选候选为 Cloudflare Workers + OpenNext 适配器；上线前必须完成：
- 固定并验证 OpenNext / Wrangler 版本与 lockfile。
- 检查 Next.js 16.4.5 对应适配器兼容矩阵。
- 为健康接口决定保留数据库检查还是改为静态运行状态检查。
- 完成预览部署、域名、缓存、日志、回滚和真实浏览器验收。
- 复核免费套餐限制与实际流量，不把“免费额度”描述成无限免费。

公开页面不依赖 PostgreSQL；健康接口当前仍需要 PostgreSQL 连接串。部署前必须明确该接口策略。

## 核心数据实体

目标数据域：
- Manufacturer / Brand（独立实体，品牌归属制造商）
- Product / DeviceModel（独立实体，通过稳定 ID 关联）
- HardwareRevision（独立硬件版本实体，后续补充）
- ProductSpecification / Capability
- Protocol / Platform / Integration
- CompatibilityRecord / DeviceVerification
- Source / Evidence
- MediaAsset / ThreeDAsset / PhotometricProfile
- Scene / AutomationSpecification
- EngineeringGuide / KnowledgeArticle

当前首批目录已将 Manufacturer、Brand、Product 和 DeviceModel 拆分为独立实体；Product 通过 modelIds 关联 DeviceModel，品牌通过 manufacturerId 关联制造商。硬件版本目前以 DeviceModel.hardwareRevision 可空字段预留，尚未拆成独立 HardwareRevision 实体；规格仍以内嵌、带 sourceId 的记录保存。

## 证据规则

每项重要产品事实应保留：
- 值与单位
- 准确产品型号 / 硬件版本
- 来源 ID、发布方和原始 URL
- 证据等级
- 适用地区
- 核验日期
- 适用固件或平台版本
- 限制条件和备注

厂商官方目录、官方规格、官方兼容清单、开源社区数据库、实验室测试和现场实测必须区分。目录出现不等同于当前有货；宣传语不等同于实验室测试；社区支持不等同于厂商官方支持。

## 媒体与版权

每个图片、视频、3D 模型和光度文件必须记录：
- 对应的准确产品型号或场景
- 来源 URL、发布方、采集与核验日期
- 授权 / 许可证状态和署名要求
- 当前 / 待复核 / 已过期 / 权利未确认状态
- 官方原始素材、授权素材、实拍、扫描或重建来源

没有明确授权不得下载、重托管或复制厂商图片与模型。无法确认展示权时，只链接官方来源，不在本站重托管。

## 3D 与光学

- 产品 3D 只允许对应准确型号的官方 CAD、实物扫描或基于可核验尺寸和多角度资料的重建模型。
- 不允许把通用模型冒充真实产品。
- 模型缺失时显示“暂无已核验 3D 资产”。
- 光度模拟必须使用准确灯具型号对应的 IES / LDT 文件，并记录房间尺寸、表面反射率、安装高度、维护系数和计算平面。
- 当前灯光计算器仅为流明法初步估算，不是照度分布模拟，也不是施工验收工具。

## 扩展原则

新增产品必须补齐准确型号、来源、参数证据和兼容关系，再自动进入产品页、筛选、搜索和对比。不得在页面组件里重复手工维护产品事实。
