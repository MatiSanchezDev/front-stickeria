import { Auth } from "@/interface/auth.interfase";

export async function loginUser(user: Auth) {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Error al Logearse.");
  return res.json();
}
