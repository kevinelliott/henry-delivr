import { NextRequest, NextResponse } from "next/server";
import { DEMO_COMMENTS } from "@/lib/demo-data";
import { v4 as uuidv4 } from "uuid";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const { getSupabaseAdmin } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase.from("comments").select("*").eq("deliverable_id", id).order("timestamp", { ascending: true });
      if (!error) return NextResponse.json({ data });
    }
  } catch {}

  const comments = DEMO_COMMENTS.filter(c => c.deliverable_id === id);
  return NextResponse.json({ data: comments, demo: true });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { author, text } = body;

  if (!author || !text) {
    return NextResponse.json({ error: "author and text are required" }, { status: 400 });
  }

  const comment = {
    id: uuidv4(),
    deliverable_id: id,
    author,
    text,
    timestamp: new Date().toISOString(),
  };

  try {
    const { getSupabaseAdmin } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase.from("comments").insert(comment).select().single();
      if (!error) return NextResponse.json({ data }, { status: 201 });
    }
  } catch {}

  return NextResponse.json({ data: comment, demo: true }, { status: 201 });
}
