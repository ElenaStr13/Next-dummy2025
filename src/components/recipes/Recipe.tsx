import {IRecipe} from "@/models/IRecipe";
import Link from "next/link";
import css from "./Recipe.module.css";
interface UserProps {
    recipe: IRecipe;
}

export const Recipe =  ({recipe}: UserProps) => {


    return (
        <div className={css.recipeCard}>
            <h4>
                <Link href={`/recipes/${recipe.id}`}>
                {recipe.id}. {recipe.name}
        </Link>
            </h4>
            <p>Теги:</p>
            <span className={css.tagsContainer}>
                {recipe.tags.map((tag, index) => (
                    <Link key={index} href={`/recipes/tags/${tag}`} style={{ marginLeft: 8 }}>
                        #{tag}
                    </Link>
                ))}
            </span>
        </div>
    );
};