import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifySession } from "@/lib/auth";
import { invalidateProjectsCache, Project } from "@/lib/supabase";
import { stripHtml, validateString } from "@/lib/security";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

async function checkAuth() {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get("admin_session")?.value);
}

function unavailableResponse() {
  return NextResponse.json(
    { error: "Project persistence is not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local." },
    { status: 503 }
  );
}

function sanitizeProject(body: Record<string, unknown>): Omit<Project, "id"> {
  const techStack = Array.isArray(body.tech_stack)
    ? body.tech_stack.map((value) => stripHtml(String(value)).slice(0, 50)).filter(Boolean)
    : typeof body.tech_stack === "string"
      ? body.tech_stack.split(",").map((value) => stripHtml(value.trim()).slice(0, 50)).filter(Boolean)
      : [];

  return {
    title: stripHtml(validateString(body.title || "Untitled Project", 120, "Title")),
    description: stripHtml(validateString(body.description || "", 1000, "Description", true)),
    problem: stripHtml(validateString(body.problem || "", 1500, "Problem", true)),
    solution: stripHtml(validateString(body.solution || "", 1500, "Solution", true)),
    impact: stripHtml(validateString(body.impact || "", 1000, "Impact", true)),
    live_url: validateString(body.live_url || "", 500, "Live URL", true).trim(),
    source_code_url: validateString(body.source_code_url || "", 500, "Source URL", true).trim(),
    tech_stack: techStack,
    theme_color: typeof body.theme_color === "string" ? body.theme_color.slice(0, 30) : "#1e1e1e",
    is_active: body.is_active === undefined ? true : Boolean(body.is_active),
    stars: typeof body.stars === "number" ? body.stars : 0,
    forks: typeof body.forks === "number" ? body.forks : 0,
    issues: typeof body.issues === "number" ? body.issues : 0,
  };
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!supabaseAdmin) return unavailableResponse();

  const { data, error } = await supabaseAdmin.from("projects").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!supabaseAdmin) return unavailableResponse();

  try {
    const project = sanitizeProject(await request.json());
    const { data, error } = await supabaseAdmin.from("projects").insert(project).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    invalidateProjectsCache();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid payload" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!supabaseAdmin) return unavailableResponse();

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    const project = sanitizeProject(body);
    const { data, error } = await supabaseAdmin.from("projects").update(project).eq("id", body.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    invalidateProjectsCache();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid payload" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!supabaseAdmin) return unavailableResponse();

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  invalidateProjectsCache();
  return NextResponse.json({ success: true });
}
