import { OrderId, OrderInput } from "@/interface/order.interface";
import { Token } from "@/interface/token.interfase";
import { notFound } from "next/navigation";

export async function getOrders(token: Token, page?: string, limit?: string) {
  try {
    const pages = page || "1";
    const limits = limit || "100";
    const res = await fetch(`/api/order?page=${pages}&limit=${limits}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok)
      throw new Error(
        "Error al consumir api. Cerrar sesion e intente nuevamente."
      );
    return res.json();
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export async function getOrder(id: OrderId, token: Token) {
  try {
    const res = await fetch(`/api/order/${id}`, {
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

export async function createOrder(sticker: OrderInput, token: Token) {
  try {
    const res = await fetch(`/api/order`, {
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

export async function editOrder(
  id: OrderId,
  payload: OrderInput,
  token: Token
) {
  try {
    const res = await fetch(`/api/order/${id}`, {
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

export async function deleteOrder(id: OrderId, token: Token) {
  try {
    const res = await fetch(`/api/order/${id}`, {
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
