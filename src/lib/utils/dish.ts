import type { DishFilter } from '$lib/type/dish.type';

export const buildDishFilterQueryParams = (filter: DishFilter) => {
	let queryParams = '';
	const {
		keyword,
		tags,
		preparationTimeFrom,
		preparationTimeTo,
		cookingTimeFrom,
		cookingTimeTo,
		difficultLevels,
		mealCategories,
		ingredientCategories,
		ingredients
	} = filter;
	if (keyword) {
		queryParams += `keyword=${keyword}`;
	}
	if (tags && tags.length > 0) {
		queryParams += `&tags=${tags.join(',')}`;
	}
	if (preparationTimeFrom && preparationTimeTo) {
		queryParams += `&preparationTimeFrom=${preparationTimeFrom}&preparationTimeTo=${preparationTimeTo}`;
	}
	if (cookingTimeFrom && cookingTimeTo) {
		queryParams += `&cookingTimeFrom=${cookingTimeFrom}&preparationTimeTo=${cookingTimeTo}`;
	}
	if (difficultLevels && difficultLevels.length > 0) {
		queryParams += `&difficultLevels=${difficultLevels.join(',')}`;
	}
	if (mealCategories && mealCategories.length > 0) {
		queryParams += `&mealCategories=${mealCategories.join(',')}`;
	}
	if (ingredientCategories && ingredientCategories.length > 0) {
		queryParams += `&ingredientCategories=${ingredientCategories.join(',')}`;
	}
	if (ingredients && ingredients.length > 0) {
		queryParams += `&ingredients=${ingredients.join(',')}`;
	}

	return queryParams;
};
