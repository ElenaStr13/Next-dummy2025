import {IUsersResponse} from "@/models/IUserResponce";
import {IRecipeResponse} from "@/models/IRecipeResponce";
import {IRecipe} from "@/models/IRecipe";
import {getCookie} from "cookies-next";

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getCookie("accessToken");

    if (!token) {
        throw new Error("Токен відсутній. Користувач не авторизований.");
    }

    let headers: Record<string, string> = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        //...(options.headers instanceof Headers ? Object.fromEntries(options.headers.entries()) : options.headers),
    };

    if (options.headers instanceof Headers) {
        // Якщо це Headers, конвертуємо в об'єкт
        headers = { ...headers, ...Object.fromEntries(options.headers.entries()) };
    } else if (typeof options.headers === "object" && options.headers !== null) {
        // Якщо це вже об'єкт, додаємо його в headers
        headers = { ...headers, ...options.headers as Record<string, string> };
    }

    const res = await fetch(url, {
        ...options,
        headers, //Передаємо виправлений headers
    });

    if (!res.ok) throw new Error("Помилка запиту");

    return res.json();
};
export const fetchUsers = async (page: number = 1, limit: number = 10): Promise<IUsersResponse> => {
    const skip = (page - 1) * limit;
    const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error("Помилка при завантаженні користувачів");

    const data = await res.json();
    return  data;
};
export const fetchUserById = async (id: number) => {
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    return res.json();
};

export const fetchRecipes = async (page: number = 1, limit: number = 10): Promise<IRecipeResponse> => {
    const skip = (page - 1) * limit;
    const res = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error("Помилка при завантаженні рецептів");

    const result = await res.json();
    //console.log("Дані від API:", result);
    return  result;
};

export const fetchRecipeById = async (id: number) => {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`);
    return res.json();
};

// Отримуємо рецепти конкретного користувача за його ID
export const fetchUserRecipes = async (userId: number): Promise<IRecipe[]> => {
    const allRecipes = await fetchRecipes(1, 100); // Отримуємо всі рецепти

    console.log("Отримані дані рецептів:", allRecipes);
    if (!allRecipes || !Array.isArray(allRecipes.recipes)) {
        throw new Error("Некоректна структура відповіді від API");
    }

    return allRecipes.recipes.filter((recipe: IRecipe) => recipe.userId === userId);
};
