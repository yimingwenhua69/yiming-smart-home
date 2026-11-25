export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    { error: "legacy_endpoint_retired", message: "旧版示例设备记录已停止公开，请使用 /products/ 中的来源可追溯产品档案。" },
    { status: 410, headers: { "Cache-Control": "no-store" } }
  );
}
