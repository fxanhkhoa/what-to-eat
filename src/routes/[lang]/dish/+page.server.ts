import type { PageServerLoad } from './$types';
import { DishService } from '$lib/services/dish.service';
import { PUBLIC_ENDPOINT } from '$env/static/public';
import type { DishFilter } from '$lib/type/dish.type';

export const load = (async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') ?? '1', 10);
	const limit = parseInt(url.searchParams.get('limit') ?? '10', 10);
	const keyword = url.searchParams.get('keyword');
	const tags = url.searchParams.get('tags');
	const preparationTimeFrom = url.searchParams.get('preparationTimeFrom');
	const preparationTimeTo = url.searchParams.get('preparationTimeTo');
	const cookingTimeFrom = url.searchParams.get('cookingTimeFrom');
	const cookingTimeTo = url.searchParams.get('cookingTimeTo');
	const difficultLevels = url.searchParams.get('difficultLevels');
	const mealCategories = url.searchParams.get('mealCategories');
	const ingredientCategories = url.searchParams.get('ingredientCategories');
	const ingredients = url.searchParams.get('ingredients');
	try {
		const filter: DishFilter = {
			keyword,
			tags: tags?.split(','),
			preparationTimeFrom: preparationTimeFrom ? parseInt(preparationTimeFrom, 10) : null,
			preparationTimeTo: preparationTimeTo ? parseInt(preparationTimeTo, 10) : null,
			cookingTimeFrom: cookingTimeFrom ? parseInt(cookingTimeFrom, 10) : null,
			cookingTimeTo: cookingTimeTo ? parseInt(cookingTimeTo, 10) : null,
			difficultLevels: difficultLevels?.split(','),
			mealCategories: mealCategories?.split(','),
			ingredientCategories: ingredientCategories?.split(','),
			ingredients: ingredients?.split(',')
		};
		const dishes = await DishService.find(PUBLIC_ENDPOINT, page, limit, filter);

		return {
			rows: dishes.data ?? [],
			total: dishes.count,
			keyword,
			page,
			limit,
			filter
		};
	} catch (err) {
		return { rows: [], total: 0, keyword, page, limit, filter: {} };
	}
}) satisfies PageServerLoad;
