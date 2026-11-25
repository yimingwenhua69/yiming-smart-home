"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getManufacturerById, type Product, type ProductCategory } from "@/data/catalog";

export function ProductExplorer({ products, categories }: { products: Product[]; categories: ProductCategory[] }) {
  const [query,setQuery]=useState("");
  const [categoryId,setCategoryId]=useState("all");
  const [compareIds,setCompareIds]=useState<string[]>([]);
  const filtered=useMemo(()=>{
    const normalized=query.trim().toLocaleLowerCase();
    return products.filter((product)=>{
      const categoryMatch=categoryId==="all"||product.categoryId===categoryId;
      const searchable=[product.name,product.model??"",product.brand,product.summary,product.categoryId,...product.protocolIds].join(" ").toLocaleLowerCase();
      return categoryMatch&&(!normalized||searchable.includes(normalized));
    });
  },[query,categoryId,products]);
  const compared=products.filter((product)=>compareIds.includes(product.id));
  const specNames=Array.from(new Set(compared.flatMap((product)=>product.specifications.map((spec)=>spec.name))));
  const toggleCompare=(id:string)=>{
    setCompareIds((current)=>current.includes(id)?current.filter((item)=>item!==id):current.length<3?[...current,id]:current);
  };
  return <>
    <div className="product-controls">
      <input type="search" value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="搜索产品名称、型号、品牌或协议…" aria-label="搜索产品" />
      <select value={categoryId} onChange={(event)=>setCategoryId(event.target.value)} aria-label="筛选产品分类">
        <option value="all">全部分类</option>
        {categories.map((category)=><option value={category.id} key={category.id}>{category.name}</option>)}
      </select>
    </div>
    <div className="category-pills">
      <button type="button" className={categoryId==="all"?"pill-active":"pill"} onClick={()=>setCategoryId("all")}>全部产品</button>
      {categories.map((category)=><button type="button" id={category.id} key={category.id} className={categoryId===category.id?"pill-active":"pill"} onClick={()=>setCategoryId(category.id)}>{category.name} <span>{products.filter((item)=>item.categoryId===category.id).length}</span></button>)}
    </div>
    <div className="explorer-meta"><span>当前显示 {filtered.length} / {products.length} 条档案</span><span>对比最多选择 3 款</span></div>
    {filtered.length>0?<div className="product-grid">{filtered.map((product)=>{
      const manufacturer=getManufacturerById(product.manufacturerId);
      const selected=compareIds.includes(product.id);
      return <article className="product-card" key={product.id}>
        <div className="product-card-actions"><span className="product-meta">{manufacturer?.englishName} · {product.categoryId.toUpperCase()}</span><FavoriteButton deviceId={product.id} label={false} /></div>
        <Link href={"/products/"+product.slug+"/"}><h2>{product.name}</h2></Link>
        <p>{product.summary}</p>
        <div className="product-foot"><span>{product.model??"型号代码未公开"}</span><span>{product.verificationStatus==="official-specification"?"官方规格":"官方目录"}</span></div>
        <button type="button" className={selected?"compare-selected":"compare-button"} aria-pressed={selected} disabled={!selected&&compareIds.length>=3} onClick={()=>toggleCompare(product.id)}>{selected?"已加入对比 −":"加入对比 +"}</button>
      </article>;
    })}</div>:<div className="panel"><h2>没有匹配的产品记录</h2><p>调整搜索词或分类。未核实产品不会以虚构数据补位。</p></div>}
    {compared.length>0&&<section className="compare-panel">
      <div className="section-heading"><h2>产品参数对比</h2><p>只比较已记录字段；空白表示来源尚未确认，不代表产品不支持。</p></div>
      <div className="compare-scroll"><table className="data-table"><thead><tr><th>比较字段</th>{compared.map((product)=><th key={product.id}>{product.name}<button type="button" className="remove-compare" onClick={()=>toggleCompare(product.id)}>移除</button></th>)}</tr></thead><tbody>
        <tr><td>品牌</td>{compared.map((product)=><td key={product.id}>{product.brand}</td>)}</tr>
        <tr><td>型号</td>{compared.map((product)=><td key={product.id}>{product.model??"未公开"}</td>)}</tr>
        <tr><td>分类</td>{compared.map((product)=><td key={product.id}>{categories.find((item)=>item.id===product.categoryId)?.name??product.categoryId}</td>)}</tr>
        <tr><td>协议</td>{compared.map((product)=><td key={product.id}>{product.protocolIds.length?product.protocolIds.join(" / "):"未核实"}</td>)}</tr>
        <tr><td>证据状态</td>{compared.map((product)=><td key={product.id}>{product.verificationStatus==="official-specification"?"官方规格":"官方目录"}</td>)}</tr>
        {specNames.map((name)=><tr key={name}><td>{name}</td>{compared.map((product)=><td key={product.id}>{product.specifications.find((spec)=>spec.name===name)?.value??"—"}</td>)}</tr>)}
      </tbody></table></div>
    </section>}
  </>;
}
