import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { platforms, sources } from "@/data/catalog";
export const metadata: Metadata = { title: "平台与集成", description: "比较 Apple Home、Google Home、Alexa、Home Assistant 与华为鸿蒙智家平台接入方式。" };
const integrationTypes = [
  {id:"native",name:"原生集成",summary:"厂商或平台官方提供的集成方式。记录支持范围、版本、账号依赖与功能映射。"},
  {id:"matter",name:"Matter",summary:"以 Matter 认证设备和标准设备类型接入。逐项核对 Cluster、Endpoint 与平台实际呈现。"},
  {id:"lan-api",name:"本地 API",summary:"通过局域网 API 控制。重点检查鉴权、协议文档、固件兼容和网络隔离。"},
  {id:"cloud-api",name:"云端 API",summary:"通过厂商云服务接入。记录互联网依赖、令牌生命周期、服务地区与隐私边界。"},
  {id:"mqtt",name:"MQTT",summary:"通过消息代理交换状态与命令。需要定义 Topic、QoS、保留消息和离线状态。"},
  {id:"webhook",name:"Webhook",summary:"事件回调或外部自动化触发。验证签名、重试、幂等与网络可达性。"},
  {id:"bridge",name:"第三方桥接",summary:"通过 Zigbee2MQTT、ZHA 或其他桥接层连接。必须标注社区维护状态和版本。"}
];
export default function PlatformsPage() {
  return <PageFrame eyebrow="PLATFORMS / INTEGRATIONS" title="平台不是协议，接入也不是全功能互通。" description="一个设备可能同时出现在多个生态，但每个生态暴露的能力、状态、自动化和本地控制边界可能不同。">
    <section className="content-section"><div className="section-heading"><h2>平台生态</h2><p>平台介绍用于理解生态边界；产品级兼容必须关联准确型号、认证或实测记录。</p></div><div className="knowledge-grid">{platforms.map((platform,index)=><article className="knowledge-card" key={platform.id}><div className="card-top"><span>{String(index+1).padStart(2,"0")}</span><span>{platform.owner}</span></div><h2>{platform.name}</h2><p>{platform.summary}</p><p>接入路径：{platform.integration}</p><p>{platform.cautions.join(" ")}</p><span className="card-arrow"><a href={platform.link} target="_blank" rel="noreferrer">↗</a></span></article>)}</div></section>
    <section className="content-section"><div className="section-heading"><h2>集成方式矩阵</h2><p>对每条集成路径分别记录控制方向、依赖、权限、离线行为和维护责任。</p></div><div className="guide-grid">{integrationTypes.map((item)=><article className="guide-card" key={item.id}><div className="card-top"><span>{item.id.toUpperCase()}</span><span>INTEGRATION</span></div><h2>{item.name}</h2><p>{item.summary}</p></article>)}</div></section>
    <section className="content-section"><div className="notice">当前目录没有把某品牌的全部产品默认标记为 Apple Home、Google Home、Alexa 或 Home Assistant 兼容。兼容关系必须按准确型号、固件、地区和平台版本逐项建立。</div><div className="source-list" style={{marginTop:22}}>{sources.filter((source)=>source.id==="home-assistant-integrations"||source.id==="matter-csa"||source.id==="huawei-wholehome-cn").map((source)=><div className="source-item" key={source.id}><div><strong>{source.title}</strong><p>{source.publisher} · {source.notes}</p></div><a href={source.url} target="_blank" rel="noreferrer">打开来源 ↗</a></div>)}</div></section>
  </PageFrame>;
}
