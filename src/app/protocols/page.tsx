import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { protocolGuides } from "@/data/knowledge";
import { protocols, getSourceById } from "@/data/catalog";
export const metadata: Metadata = { title: "协议与生态", description: "Matter、Thread、Zigbee、Z-Wave、KNX、Wi-Fi 与 Bluetooth LE 技术边界和选型核对。" };
export default function ProtocolsPage() {
  return <PageFrame eyebrow="PROTOCOLS / ECOSYSTEM" title="协议决定连接方式，不替你保证兼容。" description="把网络承载、应用协议、设备 Profile、平台集成和实测结果分开记录。相同协议标识不代表功能完全互通。">
    <section className="content-section"><div className="section-heading"><h2>协议总览</h2><p>协议家族、传输介质、网络拓扑和主要风险。具体设备支持必须回到准确型号和版本。</p></div>
      <table className="data-table"><thead><tr><th>协议</th><th>技术定位</th><th>承载 / 拓扑</th><th>核对重点</th></tr></thead><tbody>{protocols.map((protocol)=><tr id={protocol.id} key={protocol.id}><td><strong>{protocol.name}</strong></td><td>{protocol.family}<br />{protocol.summary}</td><td>{protocol.transport}<br />{protocol.topology}</td><td>{protocol.cautions.join(" ")}</td></tr>)}</tbody></table>
    </section>
    <section className="content-section"><div className="section-heading"><h2>深入技术说明</h2><p>选型前的检查清单比“支持 Zigbee / Matter”这样的单一标签更重要。</p></div><div className="guide-grid">{protocolGuides.map((guide)=><article className="guide-card" id={guide.id} key={guide.id}><h2>{guide.title}</h2><p>{guide.intro}</p>{guide.sections.map((section)=><div key={section.title}><h3>{section.title}</h3><p>{section.body}</p></div>)}<h3>工程核对清单</h3><ul>{guide.checklist.map((item)=><li key={item}>{item}</li>)}</ul></article>)}</div></section>
    <section className="content-section"><div className="section-heading"><h2>标准与资料来源</h2></div><div className="source-list">{protocols.flatMap((protocol)=>protocol.sourceIds).filter((id,index,all)=>all.indexOf(id)===index).map((id)=>{const source=getSourceById(id);return source?<div className="source-item" key={id}><div><strong>{source.title}</strong><p>{source.publisher} · {source.evidenceLevel}</p></div><a href={source.url} target="_blank" rel="noreferrer">查看资料 ↗</a></div>:null;})}</div></section>
  </PageFrame>;
}
