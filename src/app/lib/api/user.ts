import { Auth } from "@/app/interface/auth.interfase";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function loginUser(user: Auth) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Error al Logearse.");
  return res.json();
}
