import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";
import { categories, products, sources } from "@/data/catalog";
import { ProductExplorer } from "@/components/ProductExplorer";

export const metadata: Metadata = { title: "产品知识库", description: "按品类浏览真实可追溯的智能家居产品型号与技术资料。" };

export default function ProductsPage() {
  return <PageFrame eyebrow="PRODUCT KNOWLEDGE / CATALOG" title="智能家居产品全景矩阵。" description="以产品型号和来源证据为核心，不展示虚构商品卡片、不填充猜测参数、不提供过期价格。">
    <section className="content-section">
      <div className="section-heading"><h2>产品档案与型号对比</h2><p>支持关键词检索、品类筛选、收藏和最多三款产品并排对比。空字段表示来源尚未确认。</p></div>
      <ProductExplorer products={products} categories={categories} />
    </section>
    <section className="content-section">
      <div className="notice">价格字段当前统一为空：厂商页面价格、促销价和渠道价会随时间变化，只有带地区、渠道、采集时间和有效期的报价才会进入价格研究，不作为产品固有规格。</div>
      <div className="source-list" style={{marginTop:24}}>{sources.filter((source)=>source.sourceType==="official-product-catalog").map((source)=><div className="source-item" key={source.id}><div><strong>{source.title}</strong><p>{source.publisher} · 核验日期 {source.checkedAt}</p></div><a href={source.url} target="_blank" rel="noreferrer">官方来源 ↗</a></div>)}</div>
    </section>
  </PageFrame>;
}
