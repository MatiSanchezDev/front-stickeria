import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/auth";
import { getItemsServices, createItemServices } from "@/lib/services/stickerService";

export async function GET(req: NextRequest) {
  const { token, error } = await validateToken(req);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "50");
    const result = await getItemsServices(page, limit, token);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { token, error } = await validateToken(req);
  if (error) return error;

  try {
    const body = await req.json();
    const data = await createItemServices(body, token);
    return NextResponse.json({ success: true, message: "Sticker creado con éxito.", data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
