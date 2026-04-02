import { NextRequest, NextResponse } from "next/server";
import { DEMO_DELIVERABLES, DEMO_COMMENTS } from "@/lib/demo-data";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret") ?? req.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.ADMIN_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { getSupabaseAdmin } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseAdmin();
    if (supabase) {
      const [deliverables, comments] = await Promise.all([
        supabase.from("deliverables").select("status"),
        supabase.from("comments").select("id"),
      ]);

      if (!deliverables.error && !comments.error) {
        const d = deliverables.data ?? [];
        return NextResponse.json({
          total_deliverables: d.length,
          by_status: {
            pending: d.filter(x => x.status === "pending").length,
            reviewing: d.filter(x => x.status === "reviewing").length,
            changes_requested: d.filter(x => x.status === "changes_requested").length,
            approved: d.filter(x => x.status === "approved").length,
          },
          total_comments: comments.data?.length ?? 0,
        });
      }
    }
  } catch {}

  // Demo stats
  const d = DEMO_DELIVERABLES;
  return NextResponse.json({
    total_deliverables: d.length,
    by_status: {
      pending: d.filter(x => x.status === "pending").length,
      reviewing: d.filter(x => x.status === "reviewing").length,
      changes_requested: d.filter(x => x.status === "changes_requested").length,
      approved: d.filter(x => x.status === "approved").length,
    },
    total_comments: DEMO_COMMENTS.length,
    demo: true,
  });
}
