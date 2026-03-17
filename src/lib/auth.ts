import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function validateToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.split(" ").pop();

  if (!token) {
    return { user: null, error: NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 }) };
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return { user: null, error: NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 }) };
  }

  return { user: data.user, token: token!, error: null };
}
