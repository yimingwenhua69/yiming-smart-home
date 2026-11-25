import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function PageFrame({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="page-main">
        <section className="page-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-intro">{description}</p>
        </section>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
