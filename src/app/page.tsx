import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { categories, knowledgeDomains, manufacturers, products } from "@/data/catalog";

const scenes = [
  { id: "living", name: "客厅", description: "会客、观影与日常休闲", href: "/scenes/#living" },
  { id: "bedroom", name: "卧室", description: "睡眠、起夜与晨起", href: "/scenes/#bedroom" },
  { id: "entrance", name: "玄关", description: "回家、离家与夜间通行", href: "/scenes/#entrance" },
  { id: "dining", name: "餐厨", description: "烹饪、用餐与清洁", href: "/scenes/#dining" }
];

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <section className="home-hero">
        <div className="home-copy">
          <p className="eyebrow">SMART HOME · LIGHTING · SPACE</p>
          <h1>让空间与科技<br /><span>自然地融为一体。</span></h1>
          <p>从真实产品与可核验参数出发，理解智能家居系统、灯光设计和空间体验。先确认能不能装，再决定值不值得选。</p>
          <div className="home-actions"><Link className="button-primary" href="/products/">探索产品知识 <span>↗</span></Link><Link className="button-secondary" href="/lighting/">进入灯光实验室 <span>↗</span></Link></div>
          <div className="home-stats"><span><strong>{products.length}</strong>已建档产品</span><span><strong>{manufacturers.length}</strong>研究厂商</span><span><strong>{knowledgeDomains.length}</strong>知识领域</span></div>
        </div>
        <div className="home-visual" role="img" aria-label="空间光影概念示意，非真实项目摄影"><div className="visual-floor" /><div className="visual-seat" /><span className="visual-caption">SPATIAL LIGHTING CONCEPT · 示意</span></div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>先理解系统，再选择设备。</h2><p>不做商城式堆砌。以品类、协议、平台和工程约束组织信息，让每一次选型都有依据。</p></div>
        <div className="knowledge-grid">{categories.map((category,index)=><Link className="knowledge-card" href={"/products/#"+category.id} key={category.id}><div className="card-top"><span>{String(index+1).padStart(2,"0")}</span><span>PRODUCT CATEGORY</span></div><h2>{category.name}</h2><p>{category.description}</p><span className="card-arrow">↗</span></Link>)}</div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>从空间场景出发。</h2><p>以真实生活任务组织照明、遮阳、传感和控制逻辑。当前空间图形为概念示意，不冒充已完成项目。</p></div>
        <div className="scene-grid">{scenes.map((scene)=><Link href={scene.href} className="scene-card" key={scene.id}><div className="scene-visual"><span>{scene.name.toUpperCase()} · CONCEPT</span></div><div className="scene-copy"><h2>{scene.name}</h2><p>{scene.description}</p></div></Link>)}</div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>六大知识领域。</h2><p>从设备型号，到协议生态；从光学参数，到工程交付，形成可持续维护的专业资料体系。</p></div>
        <div className="knowledge-grid">{knowledgeDomains.map((domain,index)=><Link className="knowledge-card" href={domain.href} key={domain.id}><div className="card-top"><span>{String(index+1).padStart(2,"0")}</span><span>{domain.english}</span></div><h2>{domain.title}</h2><p>{domain.description}</p><span className="card-arrow">↗</span></Link>)}</div>
      </section>
      <section className="content-section"><div className="notice">资料原则：产品型号、规格和兼容性必须绑定来源与核验日期。没有可靠来源的字段保持为空；没有授权的产品图片和 3D 模型不展示。产品价格不作为静态知识库参数。</div></section>
    </main>
    <SiteFooter />
  </>;
}
