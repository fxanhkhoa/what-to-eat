import type { Base } from "./base.type";
import type { MultiLanguage } from "./multi-language.type";

export type Ingredient = {
    slug: string;
    title: MultiLanguage<string>[];
    measure: string;
    calories: number;
    carbohydrate: number;
    fat: number;
    ingredientCategory: string[];
    weight: number;
    protein: number;
    cholesterol: number;
    sodium: number;
} & Base;
