import { notFound, redirect } from "next/navigation";
const destinations: Record<string,string> = { products:"/products/", protocols:"/protocols/", platforms:"/platforms/", lighting:"/lighting/", scenes:"/scenes/", engineering:"/engineering/" };
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(destinations).map((slug)=>({slug})); }
export default async function LegacyKnowledgeRoute({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const destination=destinations[slug]; if(!destination) notFound(); redirect(destination);
}
