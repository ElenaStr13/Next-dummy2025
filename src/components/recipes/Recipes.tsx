"use client"
import Link from "next/link";
import {fetchRecipes} from "@/services/api.service";
import {useEffect, useState} from "react";
import {IRecipe} from "@/models/IRecipe";
import {Recipe} from "@/components/recipes/Recipe";
import {Pagination} from "@/components/pagination/Pagination";

export const Recipes =  () => {

    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [page, setPage] = useState(1);
    const limit = 10;
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRecipes = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchRecipes(page, limit);
                setRecipes(data.recipes);
                setTotalPages(Math.ceil(data.total / limit));
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
    }, [page]);

    return (
        <div>
            {
                recipes.map((recipe) => <div key={recipe.id}>
                        <Recipe recipe={recipe} />
                </div>)
            }
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
};

