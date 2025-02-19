"use client"
import Link from "next/link";
import {User} from "@/components/users/User";
import {fetchUsers} from "@/services/api.service";
import {useEffect, useState} from "react";
import {IUser} from "@/models/IUser";
import {Pagination} from "@/components/pagination/Pagination";
import css from "./Users.module.css";

export const Users =  () => {

    const [users, setUsers] = useState<IUser[]>([]); // Список користувачів
    const [page, setPage] = useState(1); // Додаємо стан для сторінки
    const limit = 10; // Скільки користувачів показувати на сторінці
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1); // Загальна кількість сторінок
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchUsers(page, limit);
                setUsers(data.users);
                setTotalPages(Math.ceil(data.total / limit));
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [page]);

    return (
        <div>
            {
                users.map((user) => <div key={user.id} className={css.list}>
                    <Link href={`/users/${user.id}`} >
                        <User user={user} />
                    </Link>
                </div>)
            }
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
};

