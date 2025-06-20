import {
  Sticker,
  StickerId,
  StickerInput,
} from "@/interface/sticker.interface";
import { Token } from "@/interface/token.interfase";
import { notFound } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function getStickers(token: Token, page?: string, limit?: string) {
  try {
    const pages = page || "1";
    const limits = limit || "50";
    const res = await fetch(`${API_BASE}/item?page=${pages}&limit=${limits}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export async function getSticker(id: StickerId, token: Token) {
  try {
    const res = await fetch(`${API_BASE}/item/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Error al Logearse.");
    return res.json();
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export async function createSticker(sticker: StickerInput, token: Token) {
  try {
    const res = await fetch(`${API_BASE}/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sticker),
    });
    if (!res.ok) throw new Error("Error al Logearse.");
    return res.json();
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export async function editSticker(
  id: StickerId,
  payload: Sticker,
  token: Token
) {
  try {
    const res = await fetch(`${API_BASE}/item/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Error al Logearse.");
    return res.json();
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export async function deleteSticker(id: StickerId, token: Token) {
  try {
    const res = await fetch(`${API_BASE}/item/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Error al Logearse.");
    return res.json();
  } catch (error) {
    console.log(error);
    notFound();
  }
}
