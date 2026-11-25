import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div><p className="eyebrow">YIMING STUDIO</p><h2>先确认能不能装，<br />再决定值不值得选。</h2><p>面向中国市场的智能家居、灯光设计与工程知识库。</p></div>
        <div className="footer-links"><Link href="/products/">产品资料</Link><Link href="/protocols/">协议与生态</Link><Link href="/lighting/">灯光技术</Link><Link href="/engineering/">工程资料</Link><Link href="/search/">站内搜索</Link></div>
      </div>
      <div className="footer-bottom"><span>© YIMING STUDIO · 奕明智能工作室</span><span>公开知识 · 来源可追溯 · 未核实信息不作为正式参数</span></div>
    </footer>
  );
}
