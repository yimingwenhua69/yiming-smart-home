import Link from "next/link";

type Item = { id: string; title: string; description: string; href: string; meta?: string };

export function KnowledgeGrid({ items }: { items: Item[] }) {
  return (
    <div className="knowledge-grid">
      {items.map((item, index) => (
        <Link className="knowledge-card" href={item.href} key={item.id}>
          <div className="card-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{item.meta ?? "KNOWLEDGE"}</span></div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <span className="card-arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
    </div>
  );
}
