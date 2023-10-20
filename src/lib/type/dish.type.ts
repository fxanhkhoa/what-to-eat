import type { Base } from './base.type';
import type { MultiLanguage } from './multi-language.type';

export type Dish = {
	slug: string;
	title: MultiLanguage<string>[];
	content: MultiLanguage<string>[];
	tags: string[];
	preparationTime: number;
	cookingTime: number;
	difficultLevel: string;
	mealCategories: string[];
	ingredientCategories: string[];
	thumbnail: string;
} & Base;
