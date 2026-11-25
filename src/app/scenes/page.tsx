import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { sceneGuides } from "@/data/knowledge";
export const metadata: Metadata = { title: "空间场景与联动", description: "客厅、卧室、玄关和餐厨智能场景设计、照明分层与联动逻辑。" };
export default function ScenesPage() {
  return <PageFrame eyebrow="SCENES / AUTOMATION / SPACE" title="场景不是一串动作，而是一套空间逻辑。" description="从用户任务、环境状态和设备能力出发，定义触发条件、执行动作、冲突处理、超时策略与人工接管。">
    <section className="content-section"><div className="section-heading"><h2>空间场景库</h2><p>场景视觉为概念示意，不代表真实完工项目或实际客户案例。</p></div><div className="scene-grid">{sceneGuides.map((scene)=><article className="scene-card" id={scene.id} key={scene.id}><div className="scene-visual"><span>{scene.concept} · CONCEPT</span></div><div className="scene-copy"><h2>{scene.name}｜{scene.title}</h2><p>{scene.summary}</p><h3>照明层次</h3><ul>{scene.layers.map((layer)=><li key={layer}>{layer}</li>)}</ul><h3>联动逻辑</h3><ul>{scene.automations.map((automation)=><li key={automation}>{automation}</li>)}</ul><h3>风险与人工接管</h3><ul>{scene.cautions.map((caution)=><li key={caution}>{caution}</li>)}</ul></div></article>)}</div></section>
    <section className="content-section"><div className="section-heading"><h2>场景工程模板</h2><p>每条自动化都应具备可读、可测试、可回滚的描述。</p></div><table className="data-table"><thead><tr><th>字段</th><th>定义要求</th></tr></thead><tbody><tr><td>场景 ID / 名称</td><td>稳定唯一 ID；名称描述用户任务而不是某个设备品牌。</td></tr><tr><td>触发条件</td><td>事件、时间、存在状态、设备状态或人工输入；注明 AND / OR 关系。</td></tr><tr><td>前置条件</td><td>设备在线、模式状态、门窗状态和必要的安全检查。</td></tr><tr><td>执行动作</td><td>设备、目标状态、目标值、动作顺序、渐变时间与延迟。</td></tr><tr><td>冲突策略</td><td>并发场景优先级、重复触发、互斥条件和手动操作覆盖规则。</td></tr><tr><td>异常处理</td><td>离线、执行失败、超时、断网和状态不一致时的降级动作。</td></tr><tr><td>验收用例</td><td>正常、反向、边界、重复、断网和人工接管测试。</td></tr></tbody></table></section>
  </PageFrame>;
}
