import Link from "next/link";

const spaces = [
  { name: "全屋灯光", description: "从清晨到夜晚，让光随生活变换。", number: "01" },
  { name: "智能安防", description: "关注家的每一刻，安心触手可及。", number: "02" },
  { name: "舒适环境", description: "让温度、空气与窗帘，融入日常节奏。", number: "03" },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">奕明<span>智能家居</span></Link>
        <nav aria-label="主导航"><Link href="/devices">设备库</Link><a href="#solutions">智能生活</a><a href="#about">关于奕明</a></nav>
      </header>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">YIMING · SMART HOME</p>
          <h1 id="hero-title">让家，<br />更懂生活。</h1>
          <p className="intro">以简单的连接，回应每一个日常。<br />探索灯光、安防与环境协同的全屋智能体验。</p>
          <a className="button" href="#solutions">探索智能生活 <span aria-hidden="true">↗</span></a>
          <div className="home-art" aria-hidden="true"><div className="window" /><div className="sun" /><div className="floor" /><div className="seat" /></div>
        </section>
        <section id="solutions" className="solutions" aria-labelledby="solutions-title">
          <p className="eyebrow">为每一种日常</p><h2 id="solutions-title">从一个场景，走进智能生活。</h2>
          <div className="cards">{spaces.map((space) => <article key={space.number}><span className="number">{space.number}</span><h3>{space.name}</h3><p>{space.description}</p></article>)}</div>
        </section>
        <section id="about" className="about"><p className="eyebrow">关于奕明</p><h2>科技融入生活，<br />舒适回归日常。</h2><p>我们关注人与空间的连接，探索更自然、更便捷的居家方式。</p></section>
      </main>
      <footer>奕明智能家居 · P2 项目骨架</footer>
    </>
  );
}
