"use client";

import { useMemo, useState } from "react";

export function LightingEstimator() {
  const [width,setWidth]=useState(4);
  const [length,setLength]=useState(5);
  const [targetLux,setTargetLux]=useState(150);
  const [utilization,setUtilization]=useState(0.55);
  const [maintenance,setMaintenance]=useState(0.8);
  const [fixtureLumens,setFixtureLumens]=useState(900);
  const result=useMemo(()=>{
    const area=Math.max(0,width)*Math.max(0,length);
    const required=area*targetLux/Math.max(.01,utilization*maintenance);
    return {area,required,fixtures:fixtureLumens>0?Math.ceil(required/fixtureLumens):0};
  },[width,length,targetLux,utilization,maintenance,fixtureLumens]);
  const numberInput=(label:string,value:number,setter:(value:number)=>void,step:number,min:number,max:number,suffix:string)=><label className="calculator-field"><span>{label}</span><div><input type="number" min={min} max={max} step={step} value={value} onChange={(event)=>{const next=Number(event.target.value);if(Number.isFinite(next))setter(Math.min(max,Math.max(min,next)));}} /><small>{suffix}</small></div></label>;
  return <div className="calculator">
    <div className="calculator-intro"><p className="eyebrow">PRELIMINARY ESTIMATE / LUMEN METHOD</p><h2>基础照明光通量估算</h2><p>输入空间面积、目标照度和假设系数，估算所需总光通量与灯具数量。它不是 IES/LDT 配光模拟，也不能代替现场照度验收。</p></div>
    <div className="calculator-grid">
      {numberInput("房间宽度",width,setWidth,.1,.5,30,"m")}
      {numberInput("房间长度",length,setLength,.1,.5,50,"m")}
      {numberInput("目标平均照度",targetLux,setTargetLux,10,20,1000,"lx")}
      {numberInput("利用系数（UF）",utilization,setUtilization,.01,.1,1,"0–1")}
      {numberInput("维护系数（MF）",maintenance,setMaintenance,.01,.1,1,"0–1")}
      {numberInput("单灯具光通量",fixtureLumens,setFixtureLumens,50,100,50000,"lm")}
    </div>
    <div className="calculator-result"><div><span>空间面积</span><strong>{result.area.toFixed(1)} m²</strong></div><div><span>估算总光通量</span><strong>{Math.ceil(result.required).toLocaleString("zh-CN")} lm</strong></div><div><span>灯具数量估算</span><strong>{result.fixtures} 盏</strong></div></div>
    <p className="calculator-note">计算关系：总光通量 ≈ 目标照度 × 面积 ÷（利用系数 × 维护系数）。未纳入灯具配光、安装高度、空间反射率、遮挡、眩光和实际调光曲线。请勿将该结果直接作为施工灯具数量。</p>
  </div>;
}
