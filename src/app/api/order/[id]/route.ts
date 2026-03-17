import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/auth";
import {
  getOrderServices,
  updateOrderServices,
  deleteOrderServices,
} from "@/lib/services/orderService";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { token, error } = await validateToken(req);
  if (error) return error;

  try {
    const { id } = await params;
    const data = await getOrderServices(Number(id), token);
    return NextResponse.json({ success: true, message: "Orden obtenida con éxito.", data });
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
    const data = await updateOrderServices(Number(id), body, token);
    return NextResponse.json({ success: true, message: "Orden editada con éxito.", data });
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
    const data = await deleteOrderServices(Number(id), token);
    return NextResponse.json({ success: true, message: "Orden eliminada con éxito.", data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
