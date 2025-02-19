import { NextResponse } from "next/server";
import {IUserWithTokens} from "@/models/IUserWithTokens";

interface LoginResponse {
    success: boolean;
    user?: IUserWithTokens;
    message?: string;
}

// Логіка логінації
export async function POST(req: Request): Promise<NextResponse<LoginResponse>> {
    try {
        const { username, password } = await req.json();

        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: "Невірний логін або пароль" },
                { status: 401 } as ResponseInit // Явне зазначення типу ResponseInit
            );
        }

        const data: IUserWithTokens = await response.json();

        // Встановлення cookies
        const responseWithCookies = NextResponse.json(
            { success: true, user: data },
            { status: 200 }
        );

        const headers: HeadersInit = {
            "Set-Cookie": [
                `accessToken=${data.accessToken}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24}`,
                `refreshToken=${data.refreshToken}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24}`,
            ].join(", "),
        };

        return NextResponse.json({ success: true, user: data }, { status: 200 });


    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Помилка сервера" },
            { status: 500}
        );
    }
}
