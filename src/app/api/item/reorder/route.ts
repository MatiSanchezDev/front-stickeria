import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/auth";
import { reorderItemsServices } from "@/lib/services/stickerService";

export async function PATCH(req: NextRequest) {
  const { token, error } = await validateToken(req);
  if (error) return error;

  try {
    const { items } = await req.json();
    console.log("reorder items:", JSON.stringify(items));
    await reorderItemsServices(items, token);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("reorder error:", err);
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
