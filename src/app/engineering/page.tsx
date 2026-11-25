import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { engineeringGuides } from "@/data/knowledge";
export const metadata: Metadata = { title: "工程与资料", description: "智能家居预埋布线、网络规划、设备调试、工程验收与资料交付。" };
export default function EngineeringPage() {
  return <PageFrame eyebrow="ENGINEERING / INSTALLATION / DELIVERY" title="工程质量，决定智能体验的下限。" description="从装修前设计、线路预埋、网络规划到设备调试与竣工交付，建立可施工、可验收、可维护的工程体系。">
    <section className="content-section"><div className="section-heading"><h2>工程知识手册</h2><p>所有市电、配电、弱电施工与消防安防事项必须符合当地法规并由合格专业人员实施。</p></div><div className="guide-grid">{engineeringGuides.map((guide,index)=><article className="guide-card" id={guide.id} key={guide.id}><div className="card-top"><span>{String(index+1).padStart(2,"0")}</span><span>ENGINEERING</span></div><h2>{guide.title}</h2><p>{guide.summary}</p><ol>{guide.steps.map((step)=><li key={step}>{step}</li>)}</ol><div className="notice">{guide.warning}</div></article>)}</div></section>
    <section className="content-section"><div className="section-heading"><h2>标准交付资料目录</h2></div><table className="data-table"><thead><tr><th>交付物</th><th>最低要求</th><th>维护责任</th></tr></thead><tbody><tr><td>设备清单</td><td>品牌、制造商、准确型号、硬件版本、固件版本、安装位置和数量。</td><td>项目工程师</td></tr><tr><td>点位与线路图</td><td>灯具、面板、传感器、网关、AP、窗帘与执行器点位及线缆编号。</td><td>设计 / 施工</td></tr><tr><td>网络拓扑图</td><td>路由、交换、AP、VLAN、IP 地址规划、mDNS 与组播策略。</td><td>网络工程师</td></tr><tr><td>场景与逻辑表</td><td>触发、条件、动作、优先级、异常处理和验收用例。</td><td>系统调试</td></tr><tr><td>配置备份</td><td>控制器、网关、平台配置与恢复步骤；不得包含明文密码。</td><td>系统维护</td></tr><tr><td>验收报告</td><td>功能、网络、照明、设备离线、断电恢复和人工接管测试。</td><td>项目验收</td></tr></tbody></table></section>
  </PageFrame>;
}
