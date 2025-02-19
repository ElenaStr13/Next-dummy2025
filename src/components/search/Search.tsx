"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./Search.module.css";

export const Search = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        router.push(`/search?q=${query}`); // Перехід на сторінку пошуку
    };

    return (
        <form className={css.searchContainer} onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Пошук..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={css.input}
            />
            <button type="submit" className={css.button}>🔍</button>
        </form>
    );
};
