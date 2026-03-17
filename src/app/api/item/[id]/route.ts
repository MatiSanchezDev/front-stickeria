import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/auth";
import {
  getItemServices,
  updateItemServices,
  deleteItemServices,
} from "@/lib/services/stickerService";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { token, error } = await validateToken(req);
  if (error) return error;

  try {
    const { id } = await params;
    const data = await getItemServices(Number(id), token);
    return NextResponse.json({ success: true, message: "Sticker obtenido con éxito.", data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { token, error } = await validateToken(req);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await req.json();
    const data = await updateItemServices(Number(id), body, token);
    return NextResponse.json({ success: true, message: "Sticker modificado con éxito.", data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { token, error } = await validateToken(req);
  if (error) return error;

  try {
    const { id } = await params;
    const data = await deleteItemServices(Number(id), token);
    return NextResponse.json({ success: true, message: "Sticker eliminado con éxito.", data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
