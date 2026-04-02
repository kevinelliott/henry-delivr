import { NextRequest, NextResponse } from "next/server";
import { DEMO_DELIVERABLES } from "@/lib/demo-data";
import { v4 as uuidv4 } from "uuid";

export async function GET(_req: NextRequest) {
  // Try Supabase first
  try {
    const { getSupabaseAdmin } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase.from("deliverables").select("*").order("created_at", { ascending: false });
      if (!error) return NextResponse.json({ data });
    }
  } catch {}

  // Fallback to demo data
  return NextResponse.json({ data: DEMO_DELIVERABLES, demo: true });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, url, client_email } = body;

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const deliverable = {
    id: uuidv4(),
    title,
    description: description ?? "",
    url: url ?? null,
    status: "pending",
    token: uuidv4(),
    created_at: new Date().toISOString(),
    agency_id: "demo-agency",
    client_email: client_email ?? null,
  };

  try {
    const { getSupabaseAdmin } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase.from("deliverables").insert(deliverable).select().single();
      if (!error) return NextResponse.json({ data }, { status: 201 });
    }
  } catch {}

  return NextResponse.json({ data: deliverable, demo: true }, { status: 201 });
}
