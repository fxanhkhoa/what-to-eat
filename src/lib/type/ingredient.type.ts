import type { INGREDIENT_CATEGORIES } from "$lib/enum/dish.enum";
import type { MultiLanguage } from "./multi-language.type";

export type Ingredient = {
    slug: string;
    title: MultiLanguage<string>[];
    measure: string;
    calories: number;
    carbohydrate: number;
    fat: number;
    ingredientCategory: INGREDIENT_CATEGORIES;
    weight: number;
    protein: number;
    cholesterol: number;
    sodium: number;
};
