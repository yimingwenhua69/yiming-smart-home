export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    { error: "legacy_endpoint_retired", message: "设备资料已迁移至带来源证据的静态产品知识库，请使用 /products/。" },
    { status: 410, headers: { "Cache-Control": "no-store" } }
  );
}
