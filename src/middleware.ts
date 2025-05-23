import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("tokenAccess")?.value;
  const path = request.nextUrl.pathname;

  // 🔒 Si el usuario está autenticado y quiere entrar a "/", lo redirigimos
  if (path === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url)); // o la ruta que uses
  }

  // 🔐 Si intenta entrar a cualquier ruta privada sin token, lo sacamos
  if (path !== "/" && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
