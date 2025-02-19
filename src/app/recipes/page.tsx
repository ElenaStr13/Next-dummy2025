import {Recipes} from "@/components/recipes/Recipes";
import css from "./page.module.css";

const RecipesPage = () => {

    return (
        <div className={css.allRecipes}>
            <h3 className={css.title}>Список рецептів</h3>
            <Recipes/>
        </div>
    );
}

export default RecipesPage;