import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { lightingGuides } from "@/data/knowledge";
import { LightingEstimator } from "@/components/LightingEstimator";
export const metadata: Metadata = { title: "灯光技术", description: "照明设计、显色、眩光、调光、IES/LDT 光度文件与智能照明控制工程知识。" };
export default function LightingPage() {
  return <PageFrame eyebrow="LIGHTING / PHOTOMETRY / CONTROL" title="灯光设计，从光品质开始。" description="不把灯具数量当作设计质量。以空间任务、视觉舒适、配光、驱动、控制和真实光度数据建立完整照明方案。">
    <section className="content-section"><div className="section-heading"><h2>灯光技术知识</h2><p>设计数据必须对应具体灯具、驱动和光学版本；缺少光度文件时，只能进行概念级讨论。</p></div><div className="guide-grid">{lightingGuides.map((guide,index)=><article className="guide-card" id={guide.id} key={guide.id}><div className="card-top"><span>{String(index+1).padStart(2,"0")}</span><span>LIGHTING ENGINEERING</span></div><h2>{guide.title}</h2><p><strong>{guide.subtitle}</strong></p><p>{guide.body}</p><h3>设计检查</h3><ul>{guide.checks.map((check)=><li key={check}>{check}</li>)}</ul></article>)}</div></section>
    <section className="content-section"><div className="section-heading"><h2>照明系统参数边界</h2><p>以下为设计与验收时需要区分的变量，不提供虚构灯具参数。</p></div><table className="data-table"><thead><tr><th>参数</th><th>用途</th><th>必须取得的数据</th></tr></thead><tbody>
      <tr><td>光通量（lm）</td><td>描述光源或灯具输出的光通量</td><td>准确型号、测试标准、光学版本与测量条件</td></tr><tr><td>照度（lx）</td><td>描述指定工作面接收到的光通量密度</td><td>测量平面、测点网格、仪器、环境光与测量时间</td></tr><tr><td>相关色温（K）</td><td>描述光色外观的相关色温</td><td>色温范围、色容差、调光状态与驱动条件</td></tr><tr><td>显色指标</td><td>评价物体颜色呈现</td><td>Ra、R9、TM-30 等测试报告及测试条件</td></tr><tr><td>UGR</td><td>特定条件下评价室内统一眩光</td><td>灯具配光、空间几何、观察位置与计算条件</td></tr><tr><td>IES / LDT</td><td>灯具光度数据，用于照度与配光计算</td><td>文件必须匹配具体灯具型号、光学和安装版本</td></tr><tr><td>调光曲线</td><td>控制输入与实际光输出的关系</td><td>驱动型号、接口、最低稳定亮度、闪烁和负载范围</td></tr>
    </tbody></table></section>
    <section className="content-section"><LightingEstimator /></section>
    <section className="content-section"><div className="notice">重要边界：没有准确 IES/LDT 文件和房间材质、尺寸、安装高度等输入，不输出“精确照度模拟”。上方计算器仅用于早期光通量估算，不是照度分布模拟或施工验收依据。概念效果图必须标注示意。</div></section>
  </PageFrame>;
}
