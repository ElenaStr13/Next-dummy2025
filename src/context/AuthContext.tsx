"use client";
import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {useRouter} from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

interface User {
    id: number;
    username: string;
    image: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = getCookie("accessToken");

                if (!token) {
                    console.warn("Токен не знайдено. Користувач не авторизований.");
                    return;
                }

                let userRes = await fetch("https://dummyjson.com/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (userRes.status === 401) {
                    console.warn("Токен недійсний, пробуємо оновити...");
                    await refreshAccessToken();
                    const newToken = getCookie("accessToken");

                if (newToken) {
                        userRes = await fetch("https://dummyjson.com/auth/me", {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                    }
                }

                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUser(userData);
                } else {
                    console.error("Неможливо отримати користувача.");
                }
            } catch (error) {
                console.error(error);
            }finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            setLoading(true);
            const res = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!data.accessToken || !data.refreshToken) {
                throw new Error("API не повернуло токени. Логін не вдався.");
            }
            // Зберігаємо токен у cookies
            setCookie("accessToken", data.accessToken);
            setCookie("refreshToken", data.refreshToken);

            // Зберігаємо користувача в стейт
            const userRes = await fetch(`https://dummyjson.com/users/${data.id}`);
            const userData = await userRes.json();
            setUser(userData);

            // Перенаправлення
            router.refresh();
            router.push("/");
        } catch (error: any) {
            console.error("Помилка логіна:", error.message);
            throw error;
        }
        finally {
           setLoading(false);
       }
    };

    const refreshAccessToken = async () => {
        try {
            const refreshToken = getCookie("refreshToken");

            if (!refreshToken) {
                throw new Error("Refresh Token відсутній.");
            }

            const res = await fetch("https://dummyjson.com/auth/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            if (res.status === 401) {
                throw new Error("Токен недійсний або закінчився.");
            }

            const data = await res.json();
            //console.log("Відповідь API при оновленні токена:", data);

            if (!data.accessToken) {
                throw new Error("Не вдалося оновити токен.");
            }

            setCookie("accessToken", data.accessToken);

        } catch (error: any) {
            console.error(" Помилка оновлення токена:", error.message);
        }
    };

    const logout = async ():Promise<void> => {
        deleteCookie("accessToken");
        deleteCookie("userId");
        setUser(null);
        router.push("/auth");
    };

    return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

