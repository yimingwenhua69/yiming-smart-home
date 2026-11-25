import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";
import { categories, getManufacturerById, products, sources } from "@/data/catalog";

export const metadata: Metadata = { title: "产品知识库", description: "按品类浏览真实可追溯的智能家居产品型号与技术资料。" };

export default function ProductsPage() {
  return <PageFrame eyebrow="PRODUCT KNOWLEDGE / CATALOG" title="智能家居产品全景矩阵。" description="以产品型号和来源证据为核心，不展示虚构商品卡片、不填充猜测参数、不提供过期价格。">
    <section className="content-section">
      <div className="section-heading"><h2>产品分类</h2><p>选择品类查看已建档型号。每个产品记录都关联厂商来源与最近核验日期。</p></div>
      <div className="knowledge-grid">{categories.map((item,index)=><a className="knowledge-card" href={"#"+item.id} key={item.id}><div className="card-top"><span>{String(index+1).padStart(2,"0")}</span><span>{products.filter((p)=>p.categoryId===item.id).length} RECORDS</span></div><h2>{item.name}</h2><p>{item.description}</p><p>{item.subcategories.join(" / ")}</p><span className="card-arrow">↘</span></a>)}</div>
    </section>
    {categories.map((category)=><section className="content-section" id={category.id} key={category.id}>
      <div className="section-heading"><h2>{category.name}</h2><p>{category.description}</p></div>
      {products.some((product)=>product.categoryId===category.id) ? <div className="product-grid">{products.filter((product)=>product.categoryId===category.id).map((product)=>{
        const manufacturer=getManufacturerById(product.manufacturerId);
        return <Link href={"/products/"+product.slug+"/"} className="product-card" key={product.id}><span className="product-meta">{manufacturer?.englishName} · {category.id.toUpperCase()}</span><h2>{product.name}</h2><p>{product.summary}</p><div className="product-foot"><span>{product.model??"型号待核实"}</span><span>{product.verificationStatus==="official-specification"?"官方参数":"官方目录"} ↗</span></div></Link>;
      })}</div> : <div className="panel"><h2>暂无已核验型号</h2><p>不会用虚构记录填充。该品类保留分类与子类入口，等待官方型号资料完成核验。</p></div>}
    </section>)}
    <section className="content-section">
      <div className="notice">价格字段当前统一为空：厂商页面价格、促销价和渠道价会随时间变化，只有带地区、渠道、采集时间和有效期的报价才会进入价格研究，不作为产品固有规格。</div>
      <div className="source-list" style={{marginTop:24}}>{sources.filter((source)=>source.sourceType==="official-product-catalog").map((source)=><div className="source-item" key={source.id}><div><strong>{source.title}</strong><p>{source.publisher} · 核验日期 {source.checkedAt}</p></div><a href={source.url} target="_blank" rel="noreferrer">官方来源 ↗</a></div>)}</div>
    </section>
  </PageFrame>;
}
