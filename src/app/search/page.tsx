import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { SearchExperience } from "@/components/SearchExperience";
export const metadata: Metadata = { title: "站内搜索", description: "搜索智能家居产品型号、厂商、协议生态、灯光技术与工程资料。" };
export default function SearchPage() {
  return <PageFrame eyebrow="SEARCH / KNOWLEDGE INDEX" title="搜索整个知识库。" description="从准确型号到协议术语，从灯光参数到施工问题，统一检索已建档的公开知识。"><section className="content-section"><SearchExperience /></section></PageFrame>;
}
