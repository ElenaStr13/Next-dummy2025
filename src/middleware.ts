import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//     const accessToken = req.cookies.get("accessToken")?.value ?? ""; // ✅ Додаємо явний тип
//
//     if (!accessToken && req.nextUrl.pathname !== "/auth") {
//         return NextResponse.redirect(new URL("/auth", req.url));
//     }
//
//     return NextResponse.next();
// }
export function middleware(req: NextRequest) {
    const cookies = req.headers.get("cookie") || ""; // ✅ Отримуємо всі cookies
    const accessTokenCookie = cookies
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="));
    const accessToken = accessTokenCookie ? accessTokenCookie.split("=")[1] : "";

    if (!accessToken && req.nextUrl.pathname !== "/auth") {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/users/:path*"]
};