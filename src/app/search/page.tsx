"use client"
import { fetchUsers, fetchRecipes } from "@/services/api.service";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//async ({ searchParams }: { searchParams: { q: string } }) => {
const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   // const query = searchParams.q?.toLowerCase() || "";

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Запити до API
                const usersData = await fetchUsers(1, 100);
                const recipesData = await fetchRecipes(1, 100);

                // Фільтрація користувачів та рецептів
                const users = usersData.users.filter((user) =>
                    user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query)
                );

                const recipes = recipesData.recipes.filter((recipe) =>
                    recipe.name.toLowerCase().includes(query) || recipe.tags.some(tag => tag.toLowerCase().includes(query))
                );

                setFilteredUsers(users);
                setFilteredRecipes(recipes);
            } catch (error: any) {
                console.error("Помилка при пошуку:", error);
                setError("Сталася помилка при пошуку. Спробуйте пізніше.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return (
        <div>
            <h2>Результати пошуку для "{query}"</h2>

            {loading && <p>Завантаження</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <>
                    <h3>Користувачі:</h3>
                    <ul>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <li key={user.id}>
                                    <Link href={`/users/${user.id}`}>
                                        {user.firstName} {user.lastName}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <p>Нічого не знайдено</p>
                        )}
                    </ul>

                    <h3>Рецепти:</h3>
                    <ul>
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe) => (
                                <li key={recipe.id}>
                                    <Link href={`/recipes/${recipe.id}`}>
                                        {recipe.name} ({recipe.tags.join(", ")})
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <p>Нічого не знайдено</p>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
};

//     try {
//         //Запити до API
//         const usersData = await fetchUsers(1, 100);
//         const recipesData = await fetchRecipes(1, 100);
//
//         //Фільтрація користувачів та рецептів
//         const filteredUsers = usersData.users.filter((user) =>
//             user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query)
//         );
//
//         const filteredRecipes = recipesData.recipes.filter((recipe) =>
//             recipe.name.toLowerCase().includes(query) || recipe.tags.some(tag => tag.toLowerCase().includes(query))
//         );
//
//         return (
//             <div>
//                 <h2>Результати пошуку для "{query}"</h2>
//
//                 <h3>Користувачі:</h3>
//                 <ul>
//                     {filteredUsers.length > 0 ? filteredUsers.map((user) => (
//                         <li key={user.id}>
//                             <Link href={`/users/${user.id}`}>
//                                 {user.firstName} {user.lastName}
//                             </Link>
//                         </li>
//                     )) : <p>Нічого не знайдено</p>}
//                 </ul>
//
//                 <h3>Рецепти:</h3>
//                 <ul>
//                     {filteredRecipes.length > 0 ? filteredRecipes.map((recipe) => (
//                         <li key={recipe.id}>
//                             <Link href={`/recipes/${recipe.id}`}>
//                                 {recipe.name} ({recipe.tags.join(", ")})
//                             </Link>
//                         </li>
//                     )) : <p>Нічого не знайдено</p>}
//                 </ul>
//             </div>
//         );
//     } catch (error) {
//         console.error("Помилка при виконанні пошуку:", error);
//         return <p>Сталася помилка при пошуку. Спробуйте пізніше.</p>;
//     }
//
// };

export default SearchPage;
