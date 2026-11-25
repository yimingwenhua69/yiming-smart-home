import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { manufacturers } from "@/data/catalog";
export const metadata: Metadata = { title: "厂商与品牌", description: "中国智能家居市场主要厂商、品牌官网与产品资料入口。" };
export default function ManufacturersPage() {
  return <PageFrame eyebrow="MANUFACTURERS / BRANDS" title="先厘清品牌、制造商与平台的关系。" description="同一个品牌可能由不同企业生产；同一制造商也可能提供多个品牌或 OEM 产品。资料按实体关系维护，不以名称相似推断归属。">
    <section className="content-section"><div className="section-heading"><h2>厂商档案</h2><p>官网与产品中心为公开研究入口；研究状态不代表该厂商全部产品已经入库。</p></div><div className="knowledge-grid">{manufacturers.map((manufacturer,index)=><article className="knowledge-card" id={manufacturer.id} key={manufacturer.id}><div className="card-top"><span>{String(index+1).padStart(2,"0")}</span><span>{manufacturer.status==="active"?"ACTIVE RESEARCH":"RESEARCH QUEUE"}</span></div><h2>{manufacturer.englishName}</h2><p>{manufacturer.name} · {manufacturer.country}</p><p>{manufacturer.note}</p><div className="product-foot"><a href={manufacturer.website} target="_blank" rel="noreferrer">品牌官网 ↗</a><a href={manufacturer.productCenter} target="_blank" rel="noreferrer">产品中心 ↗</a></div></article>)}</div></section>
    <section className="content-section"><div className="notice">特别说明：涂鸦智能主要作为 IoT 平台与生态技术方研究。未经核实，不将使用 Tuya 芯片、SDK 或云平台的 OEM 产品直接登记为“涂鸦品牌硬件”。</div></section>
  </PageFrame>;
}
