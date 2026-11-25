import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { getCategoryById, getManufacturerById, getProductBySlug, getSourceById, products } from "@/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return product ? { title: product.name, description: product.summary } : { title: "产品未找到" };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const manufacturer = getManufacturerById(product.manufacturerId);
  const category = getCategoryById(product.categoryId);
  const productSources = product.sourceIds.map(getSourceById).filter((source) => source !== undefined);
  return (
    <PageFrame eyebrow="PRODUCT RECORD / SOURCE VERIFIED" title={product.name} description={product.summary}>
      <section className="content-section">
        <div className="product-detail">
          <div className="panel">
            <h2>产品档案</h2>
            <dl className="spec-list">
              <dt>品牌</dt><dd>{product.brand}</dd>
              <dt>制造商</dt><dd>{manufacturer?.name ?? "待核实"}</dd>
              <dt>型号</dt><dd>{product.model ?? "未确认"}</dd>
              <dt>品类</dt><dd>{category?.name ?? "待分类"}</dd>
              <dt>销售区域</dt><dd>中国大陆</dd>
              <dt>最近核验</dt><dd>{product.lastVerified}</dd>
              <dt>证据等级</dt><dd>{product.evidenceLevel === "official" ? "厂商官方资料" : product.evidenceLevel}</dd>
              <dt>价格</dt><dd>不记录静态价格</dd>
            </dl>
          </div>
          <div className="panel">
            <h2>资料完整度</h2>
            <p className="notice">{product.verificationStatus === "official-specification" ? "已找到厂商官方规格或兼容资料。规格仍需按型号、固件与安装环境理解。" : "已在厂商官方产品目录找到该产品名称；完整规格、硬件版本和平台兼容性仍待逐项核实。"}</p>
            <p style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.9 }}>产品图片：未取得可确认的本地复用授权，暂不展示。3D 模型：暂无与该准确型号匹配且来源可追溯的模型。</p>
            <span className="status-text">{product.verificationStatus}</span>
          </div>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>技术参数</h2><p>只显示来源明确的参数；空字段不以行业常见值代填。</p></div>
        {product.specifications.length ? <table className="data-table"><thead><tr><th>参数</th><th>官方资料记录</th><th>来源</th></tr></thead><tbody>{product.specifications.map((spec) => <tr key={spec.name}><td>{spec.name}</td><td>{spec.value}</td><td>{getSourceById(spec.sourceId)?.title ?? "来源待核实"}</td></tr>)}</tbody></table> : <div className="panel"><p>当前来源仅能确认产品目录条目，暂无可公开确认的完整技术规格。继续核对官方说明书、认证资料与具体硬件版本。</p></div>}
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>协议、平台与能力</h2><p>仅显示已有证据支持的关联，不通过产品名称推断协议和生态兼容。</p></div>
        <div className="product-detail">
          <div className="panel"><h2>协议</h2><p>{product.protocolIds.length ? product.protocolIds.join("、") : "未核实"}</p></div>
          <div className="panel"><h2>平台与能力</h2><p>平台：{product.platformIds.length ? product.platformIds.join("、") : "未核实"}</p><p>能力：{product.capabilityIds.length ? product.capabilityIds.join("、") : "未核实"}</p></div>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>安装与验证注意事项</h2></div>
        <div className="panel"><ul>{product.limitations.map((item) => <li key={item} style={{ marginBottom: 10, color: "var(--muted)", fontSize: 12, lineHeight: 1.9 }}>{item}</li>)}</ul></div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>资料来源</h2><p>来源日期与发布方保留在记录中，后续可继续追加说明书、认证和现场验证记录。</p></div>
        <div className="source-list">{productSources.map((source) => <div className="source-item" key={source.id}><div><strong>{source.title}</strong><p>{source.publisher} · {source.evidenceLevel} · {source.checkedAt}<br />{source.notes}</p></div><a href={source.url} target="_blank" rel="noreferrer">打开来源 ↗</a></div>)}</div>
      </section>
      <section className="content-section"><Link href="/products/" className="button-secondary">← 返回产品库</Link></section>
    </PageFrame>
  );
}
