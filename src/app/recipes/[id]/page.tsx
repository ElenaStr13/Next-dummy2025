import {fetchRecipeById} from "@/services/api.service";

export const generateMetadata = async ():Promise<MediaMetadata>=> {

}
const  RecipePage = async ({ params }: { params: { id: string } }) =>  {
    const recipeId = Number(params.id);
    const recipe = await fetchRecipeById(recipeId);

    if (!recipe) {
        return <h2>Рецепт не знайдено</h2>;
    }

    return (
        <div >
            <div>
                <h2>{recipe.name}</h2>
                <p><strong>Кухня:</strong> {recipe.cuisine}</p>
                <p><strong>Час приготування:</strong> {recipe.prepTimeMinutes} хв</p>
                <p><strong>Інгредієнти:</strong> {recipe.ingredients.join(", ")}</p>
                <p><strong>Інструкція:</strong> {recipe.instructions.join(". ")}</p>
                <img src={recipe.image} alt={recipe.name} width="200" />
            </div>
        </div>
    );
}

export default RecipePage;