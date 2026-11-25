import Link from "next/link";

const links = [
  { href: "/products/", label: "产品库" },
  { href: "/protocols/", label: "协议生态" },
  { href: "/platforms/", label: "平台集成" },
  { href: "/lighting/", label: "灯光技术" },
  { href: "/scenes/", label: "空间场景" },
  { href: "/engineering/", label: "工程资料" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="奕明智能家居首页">
        <span className="brand-mark">Y</span>
        <span className="brand-copy"><strong>YIMING STUDIO</strong><small>SMART HOME · LIGHTING · SPACE</small></span>
      </Link>
      <nav className="site-nav" aria-label="主导航">
        {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
      <Link className="header-search" href="/search/">搜索知识 <span aria-hidden="true">↗</span></Link>
    </header>
  );
}
