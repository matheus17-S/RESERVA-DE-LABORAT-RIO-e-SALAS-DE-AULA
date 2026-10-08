import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {

    const usuarioLogado = request.cookies.get("usuario_logado");

    if (request.nextUrl.pathname === "/" && !usuarioLogado) {
        return NextResponse.redirect(
            new URL("/acesso", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/"],
};