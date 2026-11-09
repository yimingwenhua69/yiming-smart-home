import { Prisma } from "@/generated/prisma/client";
import { getDatabase } from "@/lib/db";
import { deviceListQuery } from "@/lib/schemas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const search = Object.fromEntries(new URL(request.url).searchParams);
  const parsed = deviceListQuery.safeParse(search);
  if (!parsed.success) {
    return Response.json({ error: "invalid query" }, { status: 400 });
  }
  const { q, category, protocol, tag, sort, order, page, pageSize } = parsed.data;

  const where: Prisma.DeviceWhereInput = {};
  if (category) where.category = category;
  if (protocol) where.protocol = protocol;
  if (tag) where.tags = { has: tag };
  if (q) where.OR = [{ name: { contains: q, mode: "insensitive" } }, { tags: { has: q } }];

  const orderBy =
    sort === "price" ? { priceCents: order } : sort === "newest" ? { createdAt: order } : { name: order };

  const db = getDatabase();
  const [total, items] = await Promise.all([
    db.device.count({ where }),
    db.device.findMany({ where, orderBy, skip: (page - 1) * pageSize, take: pageSize }),
  ]);

  return Response.json({ items, total, page, pageSize }, { headers: { "Cache-Control": "no-store" } });
}
