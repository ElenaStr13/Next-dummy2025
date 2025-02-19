"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./page.module.css";

export default function AuthPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await login(username, password);
        } catch (error) {
           setError("Невірний логін або пароль");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={css.loginContainer}>
            <h1>Авторизація</h1>
            {error && <p>{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                className={css.input}
                onChange={(e) => setUsername(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                value={password}
                className={css.input}
                onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className={css.button}>Увійти</button>
        </form>
    );
}
