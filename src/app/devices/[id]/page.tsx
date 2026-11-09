import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DeviceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const device = await getDatabase().device.findUnique({
    where: { id },
    include: { scenes: { orderBy: { sortOrder: "asc" } } },
  });
  if (!device) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/devices" className="text-sm text-gray-500 hover:underline">
        ← 返回设备库
      </Link>
      <header className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{device.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">{device.category}</span>
            <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">{device.protocol}</span>
          </div>
        </div>
        <FavoriteButton deviceId={device.id} />
      </header>

      <p className="mt-4 text-gray-600">{device.description}</p>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-4">
          <dt className="text-sm font-medium text-gray-500">价格参考</dt>
          <dd className="mt-1 font-medium">
            {device.priceNote ?? (device.priceCents != null ? `¥${device.priceCents / 100}` : "价格待询")}
          </dd>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <dt className="text-sm font-medium text-gray-500">安装条件</dt>
          <dd className="mt-1">{device.installCondition}</dd>
        </div>
      </dl>

      <section className="mt-6 rounded-xl border border-gray-200 p-4">
        <h2 className="font-semibold">选型要点</h2>
        <ul className="mt-2 list-disc pl-5">
          {device.selectionPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      {device.tags.length > 0 && (
        <section className="mt-6">
          <h2 className="font-semibold">标签</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {device.tags.map((tag) => (
              <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {device.scenes.length > 0 && (
        <section className="mt-6">
          <h2 className="font-semibold">适用场景</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {device.scenes.map((scene) => (
              <span key={scene.id} className="rounded-full bg-green-50 px-2 py-1 text-sm text-green-700">
                {scene.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
