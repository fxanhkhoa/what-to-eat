export type IngredientsInDish = {
	quantity: number;
	slug: string;
	note: string;
};

export type DishFilter = {
	keyword?: string | null;
	tags?: string[] | null;
	preparationTimeFrom?: number | null;
	preparationTimeTo?: number | null;
	cookingTimeFrom?: number | null;
	cookingTimeTo?: number | null;
	difficultLevels?: string[] | null;
	mealCategories?: string[] | null;
	ingredientCategories?: string[] | null;
	ingredients?: string[] | null;
};
