import {IRecipe} from "@/models/IRecipe";

export type  IRecipeResponse = {
    users:IRecipe[]
    total: number;
    skip: number;
    limit: number;
}