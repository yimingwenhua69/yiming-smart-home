import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { capabilities, getBrandById, getCategoryById, getDeviceModelsForProduct, getManufacturerById, getProductBySlug, getSourceById, platforms, products, protocols } from "@/data/catalog";
import { getMediaAssetsForModel, getVerifiedImagesForModel, getVerifiedPhotometricProfile, getVerifiedThreeDAsset } from "@/data/assets";

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
  const models = getDeviceModelsForProduct(product.id);
  const model = models[0];
  if (!model) notFound();
  const manufacturer = getManufacturerById(product.manufacturerId);
  const brand = getBrandById(product.brandId);
  const category = getCategoryById(product.categoryId);
  const sourceIds = Array.from(new Set(models.flatMap((item) => item.sourceIds)));
  const productSources = sourceIds.map(getSourceById).filter((source) => source !== undefined);
  const media = getMediaAssetsForModel(model.id);
  const verifiedImages = getVerifiedImagesForModel(model.id);
  const verifiedThreeD = getVerifiedThreeDAsset(model.id);
  const photometric = getVerifiedPhotometricProfile(model.id);
  return (
    <PageFrame eyebrow="PRODUCT / DEVICE MODEL / SOURCE VERIFIED" title={product.name} description={product.summary}>
      <section className="content-section">
        <div className="product-detail">
          <div className="panel">
            <h2>产品档案</h2>
            <dl className="spec-list">
              <dt>品牌</dt><dd>{brand?.name ?? "待核实"}</dd>
              <dt>制造商</dt><dd>{manufacturer?.name ?? "待核实"}</dd>
              <dt>产品型号</dt><dd>{models.map((item) => item.modelCode ?? "型号代码未公开").join(" / ")}</dd>
              <dt>硬件版本</dt><dd>{model.hardwareRevision ?? "未单独核实"}</dd>
              <dt>品类</dt><dd>{category?.name ?? "待分类"}</dd>
              <dt>销售区域</dt><dd>{model.region === "CN" ? "中国大陆" : model.region}</dd>
              <dt>最近核验</dt><dd>{model.lastVerified}</dd>
              <dt>证据等级</dt><dd>{model.evidenceLevel === "official" ? "厂商官方资料" : model.evidenceLevel}</dd>
              <dt>价格</dt><dd>不记录静态价格</dd>
            </dl>
          </div>
          <div className="panel">
            <h2>资料完整度</h2>
            <p className="notice">{model.verificationStatus === "official-specification" ? "已找到厂商官方规格或兼容资料。规格仍需按型号、固件与安装环境理解。" : "已在厂商官方产品目录找到该产品名称；完整规格、硬件版本和平台兼容性仍待逐项核实。"}</p>
            <p style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.9 }}>图片资产：{verifiedImages.length} 个可发布 / {media.length} 个登记。3D 模型：{verifiedThreeD ? "已登记可发布资产" : "暂无准确型号且权利已核验的模型"}。光度文件：{photometric ? "已登记" : "暂无准确型号 IES/LDT 文件"}。未取得展示授权或型号匹配证据的素材不会出现在页面。</p>
            <span className="status-text">{model.verificationStatus}</span>
          </div>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>技术参数</h2><p>只显示来源明确的参数；空字段不以行业常见值代填。</p></div>
        {model.specifications.length ? <table className="data-table"><thead><tr><th>参数</th><th>官方资料记录</th><th>来源</th></tr></thead><tbody>{model.specifications.map((spec) => <tr key={spec.name}><td>{spec.name}</td><td>{spec.value}</td><td>{getSourceById(spec.sourceId)?.title ?? "来源待核实"}</td></tr>)}</tbody></table> : <div className="panel"><p>当前来源仅能确认产品目录条目，暂无可公开确认的完整技术规格。继续核对官方说明书、认证资料与具体硬件版本。</p></div>}
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>协议、平台与能力</h2><p>仅显示已有证据支持的关联，不通过产品名称推断协议和生态兼容。</p></div>
        <div className="product-detail">
          <div className="panel"><h2>协议</h2><p>{model.protocolIds.length ? model.protocolIds.map((id) => protocols.find((item) => item.id === id)?.name ?? id).join("、") : "未核实"}</p></div>
          <div className="panel"><h2>平台与能力</h2><p>平台：{model.platformIds.length ? model.platformIds.map((id) => platforms.find((item) => item.id === id)?.name ?? id).join("、") : "未核实"}</p><p>能力：{model.capabilityIds.length ? model.capabilityIds.map((id) => capabilities.find((item) => item.id === id)?.name ?? id).join("、") : "未核实"}</p></div>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>安装与验证注意事项</h2></div>
        <div className="panel"><ul>{model.limitations.map((item) => <li key={item} style={{ marginBottom: 10, color: "var(--muted)", fontSize: 12, lineHeight: 1.9 }}>{item}</li>)}</ul></div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>资料来源</h2><p>来源日期与发布方保留在记录中，后续可继续追加说明书、认证和现场验证记录。</p></div>
        <div className="source-list">{productSources.map((source) => <div className="source-item" key={source.id}><div><strong>{source.title}</strong><p>{source.publisher} · {source.evidenceLevel} · {source.checkedAt}<br />{source.notes}</p></div><a href={source.url} target="_blank" rel="noreferrer">打开来源 ↗</a></div>)}</div>
      </section>
      <section className="content-section"><Link href="/products/" className="button-secondary">← 返回产品库</Link></section>
    </PageFrame>
  );
}
