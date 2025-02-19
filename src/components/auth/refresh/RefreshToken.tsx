import { NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";

export async function POST(req: Request) {
    try {
        const refreshToken = getCookie("refreshToken", { req });

        if (!refreshToken) {
            return NextResponse.json({ success: false, message: "Немає refreshToken" }, { status: 401 });
        }

        const response = await fetch("https://dummyjson.com/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            return NextResponse.json({ success: false, message: "Помилка оновлення токена" }, { status: 401 });
        }

        const data = await response.json();

        // Оновлення токена
        const responseWithCookies = NextResponse.json({ success: true, accessToken: data.accessToken });

        setCookie("accessToken", data.accessToken, { req, res: responseWithCookies, maxAge: 60 * 60 * 24 });

        return responseWithCookies;
    } catch (error) {
        return NextResponse.json({ success: false, message: "Помилка сервера" }, { status: 500 });
    }
}
