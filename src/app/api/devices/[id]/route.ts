import { getDatabase } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const device = await getDatabase().device.findUnique({ where: { id } });
  if (!device) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  return Response.json(device, { headers: { "Cache-Control": "no-store" } });
}
