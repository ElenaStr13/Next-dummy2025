import { fetchRecipes } from "@/services/api.service";
import Link from "next/link";

const RecipesByTagPage = async ({ params }: { params: { tag: string } }) => {
    const tag = decodeURIComponent(params.tag); // Декодуємо тег
    const allRecipes = await fetchRecipes(1, 100); // Завантажуємо всі рецепти
    const filteredRecipes = allRecipes.recipes.filter((recipe) =>
        recipe.tags.includes(tag)
    );

    return (
        <div>
            <h2>Рецепти з тегом: #{tag}</h2>

            {filteredRecipes.length > 0 ? (
                <ul>
                    {filteredRecipes.map((recipe) => (
                        <li key={recipe.id}>
                            <Link href={`/recipes/${recipe.id}`}>
                                {recipe.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Рецептів з таким тегом не знайдено.</p>
            )}
        </div>
    );
};

export default RecipesByTagPage;
