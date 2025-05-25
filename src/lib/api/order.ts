import { Order, OrderId } from "@/interface/order.interface";
import { Token } from "@/interface/token.interfase";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function getOrders(token: Token) {
  const res = await fetch(`${API_BASE}/order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al Logearse.");
  return res.json();
}

export async function getOrder(id: OrderId, token: Token) {
  const res = await fetch(`${API_BASE}/order/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al Logearse.");
  return res.json();
}

export async function createOrder(sticker: Order, token: Token) {
  const res = await fetch(`${API_BASE}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sticker),
  });
  if (!res.ok) throw new Error("Error al Logearse.");
  return res.json();
}

export async function editOrder(id: OrderId, payload: Order, token: Token) {
  const res = await fetch(`${API_BASE}/order/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al Logearse.");
  return res.json();
}

export async function deleteOrder(id: OrderId, token: Token) {
  const res = await fetch(`${API_BASE}/order/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al Logearse.");
  return res.json();
}
