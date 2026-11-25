"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { manufacturers, products, protocols, knowledgeDomains } from "@/data/catalog";
import { engineeringGuides, lightingGuides, protocolGuides, sceneGuides } from "@/data/knowledge";
type SearchRecord = { id:string; title:string; description:string; type:string; href:string; terms:string };
const records: SearchRecord[] = [
  ...products.map((item)=>({id:item.id,title:item.name,description:item.summary,type:"产品",href:"/products/"+item.slug+"/",terms:[item.model,item.brand,item.categoryId,...item.protocolIds].filter(Boolean).join(" ")})),
  ...manufacturers.map((item)=>({id:item.id,title:item.englishName+" / "+item.name,description:item.note,type:"厂商",href:"/manufacturers/#"+item.id,terms:item.website+" "+item.country})),
  ...protocols.map((item)=>({id:item.id,title:item.name,description:item.summary,type:"协议",href:"/protocols/#"+item.id,terms:item.family+" "+item.transport})),
  ...knowledgeDomains.map((item)=>({id:item.id,title:item.title,description:item.description,type:"知识领域",href:item.href,terms:item.english+" "+item.id})),
  ...protocolGuides.map((item)=>({id:item.id,title:item.title,description:item.intro,type:"知识内容",href:"/protocols/#"+item.id,terms:item.sections.map((section)=>section.title+" "+section.body).join(" ")})),
  ...lightingGuides.map((item)=>({id:item.id,title:item.title,description:item.body,type:"知识内容",href:"/lighting/#"+item.id,terms:item.subtitle+" "+item.checks.join(" ")})),
  ...sceneGuides.map((item)=>({id:item.id,title:item.name+"｜"+item.title,description:item.summary,type:"知识内容",href:"/scenes/#"+item.id,terms:[...item.layers,...item.automations,...item.cautions].join(" ")})),
  ...engineeringGuides.map((item)=>({id:item.id,title:item.title,description:item.summary,type:"知识内容",href:"/engineering/#"+item.id,terms:[...item.steps,item.warning].join(" ")}))
];
export function SearchExperience() {
  const [query,setQuery]=useState("");
  const [type,setType]=useState("全部");
  const filtered=useMemo(()=>{const normalized=query.trim().toLocaleLowerCase();return records.filter((record)=>(type==="全部"||record.type===type)&&(!normalized||[record.title,record.description,record.terms].join(" ").toLocaleLowerCase().includes(normalized)));},[query,type]);
  return <>
    <div className="search-panel"><input aria-label="搜索知识库" type="search" value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="搜索型号、品牌、协议、灯光参数或工程关键词…" /></div>
    <div className="home-actions" style={{marginTop:0,marginBottom:22}}>{["全部","产品","厂商","协议","知识领域","知识内容"].map((item)=><button key={item} type="button" className={type===item?"button-primary":"button-secondary"} onClick={()=>setType(item)}>{item}</button>)}</div>
    <p style={{fontSize:12,color:"var(--muted)"}}>{query.trim()?("找到 "+filtered.length+" 条结果"):"输入关键词开始检索。"} 搜索范围：产品档案、厂商、协议和六大知识领域。</p>
    <div className="search-results">{filtered.map((record)=><Link className="search-result" href={record.href} key={record.type+"-"+record.id}><span className="product-meta">{record.type}</span><br /><strong>{record.title}</strong><p>{record.description}</p></Link>)}</div>
    {filtered.length===0&&<div className="panel"><h2>没有找到匹配内容</h2><p>尝试型号缩写、品牌名、协议名称或工程关键词。</p></div>}
  </>;
}
