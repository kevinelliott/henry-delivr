import { NextRequest, NextResponse } from "next/server";
import { DEMO_DELIVERABLES } from "@/lib/demo-data";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const { getSupabaseAdmin } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase.from("deliverables").select("*").eq("id", id).single();
      if (!error && data) return NextResponse.json({ data });
    }
  } catch {}

  const demo = DEMO_DELIVERABLES.find(d => d.id === id);
  if (!demo) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: demo, demo: true });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { status, title, description } = body;

  const validStatuses = ["pending", "reviewing", "changes_requested", "approved"];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const { getSupabaseAdmin } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseAdmin();
    if (supabase) {
      const updates: Record<string, string> = {};
      if (status) updates.status = status;
      if (title) updates.title = title;
      if (description) updates.description = description;
      const { data, error } = await supabase.from("deliverables").update(updates).eq("id", id).select().single();
      if (!error && data) return NextResponse.json({ data });
    }
  } catch {}

  const demo = DEMO_DELIVERABLES.find(d => d.id === id);
  if (!demo) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: { ...demo, ...body }, demo: true });
}
