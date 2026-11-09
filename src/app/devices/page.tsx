"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FavoriteButton } from "@/components/FavoriteButton";

type Device = {
  id: string;
  name: string;
  category: string;
  protocol: string;
  priceCents?: number | null;
  priceNote?: string | null;
  installCondition: string;
  selectionPoints: string[];
  tags: string[];
  description: string;
};

const CATEGORIES = ["灯光", "安防", "环境", "影音", "传感", "控制"];
const PROTOCOLS = ["Zigbee", "蓝牙Mesh", "Wi-Fi", "Matter", "Z-Wave", "RS485"];

export default function DevicesPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [protocol, setProtocol] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [data, setData] = useState<{ items: Device[]; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (category) params.set("category", category);
    if (protocol) params.set("protocol", protocol);
    params.set("sort", sort);
    params.set("order", order);
    params.set("page", "1");
    params.set("pageSize", "100");
    fetch(`/api/devices?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((body) => {
        if (!cancelled) {
          setData(body);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [q, category, protocol, sort, order]);

  const items = data?.items ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← 返回首页
        </Link>
        <h1 className="mt-2 text-3xl font-bold">设备知识库</h1>
        <p className="text-gray-500">浏览、搜索、筛选智能家居设备</p>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索设备名或标签"
          className="rounded-lg border border-gray-300 px-3 py-2"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2">
          <option value="">全部分类</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={protocol} onChange={(e) => setProtocol(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2">
          <option value="">全部协议</option>
          {PROTOCOLS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2">
          <option value="name">按名称</option>
          <option value="price">按价格</option>
          <option value="newest">按最新</option>
        </select>
        <button
          type="button"
          onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}
          className="rounded-lg border border-gray-300 px-3 py-2"
        >
          {order === "asc" ? "升序 ↑" : "降序 ↓"}
        </button>
        <button
          type="button"
          onClick={() => setView((v) => (v === "grid" ? "list" : "grid"))}
          className="rounded-lg border border-gray-300 px-3 py-2"
        >
          {view === "grid" ? "列表视图" : "网格视图"}
        </button>
      </div>

      {loading && <p className="py-12 text-center text-gray-500">加载中…</p>}
      {!loading && error && <p className="py-12 text-center text-red-500">加载失败：{error}</p>}
      {!loading && !error && items.length === 0 && <p className="py-12 text-center text-gray-500">没有匹配的设备</p>}

      {!loading && !error && items.length > 0 && (
        <div className={view === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-3"}>
          {items.map((device) => (
            <article key={device.id} className="rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <Link href={`/devices/${device.id}`} className="text-lg font-semibold hover:underline">
                  {device.name}
                </Link>
                <FavoriteButton deviceId={device.id} label={false} />
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">{device.category}</span>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">{device.protocol}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{device.description}</p>
              <p className="mt-2 text-sm font-medium text-gray-800">
                {device.priceNote ?? (device.priceCents != null ? `¥${device.priceCents / 100}` : "价格待询")}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {device.tags.map((tag) => (
                  <span key={tag} className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      {data && <p className="mt-6 text-sm text-gray-400">共 {data.total} 款设备</p>}
    </main>
  );
}
