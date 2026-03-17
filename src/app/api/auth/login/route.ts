import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/services/authService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await loginUser(body);
    return NextResponse.json({ success: true, token: data.session?.access_token });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al iniciar sesión";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
