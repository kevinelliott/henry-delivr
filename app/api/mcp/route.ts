import { NextRequest, NextResponse } from "next/server";
import { DEMO_DELIVERABLES, DEMO_COMMENTS } from "@/lib/demo-data";

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

async function handleMethod(method: string, params: Record<string, unknown> = {}) {
  switch (method) {
    case "get_deliverable": {
      const { token, id } = params as { token?: string; id?: string };

      try {
        const { getSupabaseAdmin } = await import("@/lib/supabase/server");
        const supabase = await getSupabaseAdmin();
        if (supabase) {
          const query = supabase.from("deliverables").select("*");
          const { data, error } = token ? await query.eq("token", token).single() : await query.eq("id", id).single();
          if (!error && data) return { deliverable: data };
        }
      } catch {}

      const demo = token
        ? DEMO_DELIVERABLES.find(d => d.token === token)
        : DEMO_DELIVERABLES.find(d => d.id === id);

      if (!demo) throw { code: -32001, message: "Deliverable not found" };
      return { deliverable: demo, demo: true };
    }

    case "update_status": {
      const { id, status } = params as { id: string; status: string };
      const validStatuses = ["pending", "reviewing", "changes_requested", "approved"];
      if (!validStatuses.includes(status)) {
        throw { code: -32602, message: "Invalid status" };
      }

      try {
        const { getSupabaseAdmin } = await import("@/lib/supabase/server");
        const supabase = await getSupabaseAdmin();
        if (supabase) {
          const { data, error } = await supabase.from("deliverables").update({ status }).eq("id", id).select().single();
          if (!error && data) return { deliverable: data };
        }
      } catch {}

      const demo = DEMO_DELIVERABLES.find(d => d.id === id);
      if (!demo) throw { code: -32001, message: "Deliverable not found" };
      return { deliverable: { ...demo, status }, demo: true };
    }

    case "add_comment": {
      const { deliverable_id, author, text } = params as { deliverable_id: string; author: string; text: string };
      if (!author || !text || !deliverable_id) {
        throw { code: -32602, message: "deliverable_id, author, and text are required" };
      }

      const comment = {
        id: crypto.randomUUID(),
        deliverable_id,
        author,
        text,
        timestamp: new Date().toISOString(),
      };

      try {
        const { getSupabaseAdmin } = await import("@/lib/supabase/server");
        const supabase = await getSupabaseAdmin();
        if (supabase) {
          const { data, error } = await supabase.from("comments").insert(comment).select().single();
          if (!error && data) return { comment: data };
        }
      } catch {}

      return { comment, demo: true };
    }

    default:
      throw { code: -32601, message: "Method not found" };
  }
}

// Suppress unused import warning
void DEMO_COMMENTS;

export async function POST(req: NextRequest) {
  let body: JsonRpcRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
  }

  const { id, method, params } = body;

  try {
    const result = await handleMethod(method, (params ?? {}) as Record<string, unknown>);
    return NextResponse.json({ jsonrpc: "2.0", id, result });
  } catch (err: unknown) {
    const error = err as { code?: number; message?: string };
    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      error: { code: error.code ?? -32603, message: error.message ?? "Internal error" },
    });
  }
}

export async function GET() {
  return NextResponse.json({
    jsonrpc: "2.0",
    info: {
      name: "henry-delivr MCP API",
      version: "1.0.0",
      methods: ["get_deliverable", "update_status", "add_comment"],
    },
  });
}
