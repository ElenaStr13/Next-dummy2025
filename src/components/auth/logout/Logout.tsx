import { NextResponse } from "next/server";
import { deleteCookie } from "cookies-next";

// Логіка виходу
export async function POST(req: Request) {
    const responseWithCookies = NextResponse.json({ success: true });

    deleteCookie("accessToken", { req, res: responseWithCookies });
    deleteCookie("refreshToken", { req, res: responseWithCookies });

    return responseWithCookies;
}
