"use client";

import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../lib/api/user";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const data = {
      email: target.email.value.trim(),
      password: target.password.value.trim(),
    };
    setLoading(true);
    try {
      const login = await loginUser(data);
      if (login.success) {
        setCookie("tokenAccess", login.token, { maxAge: 3000 });
        toast.success("Logeada con éxito. Hola Agus!");
        router.push("/dashboard");
        return;
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Los datos ingresados no son correctos...");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: "#0f0f1e",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f1f5f9",
    outline: "none",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.borderColor = "rgba(168,85,247,0.6)");
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "#0f0f1e" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
        >
          <Sparkles size={20} className="text-white" />
        </div>
        <span
          className="text-5xl font-alfa tracking-wide"
          style={{
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Stickeria
        </span>
      </div>

      {/* Card */}
      <div
        className="w-full sm:max-w-md rounded-2xl p-8"
        style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}
      >
        <h1 className="text-xl font-semibold text-white text-center mb-6">
          Ingresá con tu cuenta
        </h1>

        <form onSubmit={onSubmitForm} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium"
              style={{ color: "#94a3b8" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="nombre@email.com"
              required
              className="w-full px-4 py-2.5 rounded-xl text-sm transition-all"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
              style={{ color: "#94a3b8" }}
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 pr-10 rounded-xl text-sm transition-all"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
                style={{ color: "#64748b" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a855f7")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                title="Mostrar/ocultar contraseña"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity mt-1"
            style={{
              background: loading
                ? "rgba(168,85,247,0.4)"
                : "linear-gradient(135deg, #a855f7, #ec4899)",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs" style={{ color: "#334155" }}>
        © 2023 MS-Dev™ — Todos los derechos reservados.
      </p>
    </section>
  );
};
