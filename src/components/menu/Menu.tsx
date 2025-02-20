"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import css from './Menu.module.css';
import {Search} from "@/components/search/Search";
import {useEffect, useState} from "react";

const Menu = () => {
    const { user, logout, loading } = useAuth();
   const [localUser, setLocalUser] = useState(user);

    useEffect(() => {
        if (user) {
            setLocalUser(user);
        }
    }, [user]);
    if (loading) {
        return <p>Завантаження...</p>;
    }

    return (
        <nav className={css.menu}>
            <Link href="/" className={css.nav}>Головна</Link>
            {user ? (
               <div className={css.nav}>
                    <Link href="/users">Користувачі</Link>
                    <Link href="/recipes">Рецепти</Link>
                   <Search />
                    <img src={user.image} alt="User avatar" width="40" style={{ borderRadius: "50%" }} />
                    <span>{user.username}</span>
                    <button className={css.button} onClick={logout}>Вийти</button>
                </div >
            ) : (
                <Link href="/auth" className={css.nav}>Увійти</Link>
            )}
        </nav>
    );
};

export default Menu;
