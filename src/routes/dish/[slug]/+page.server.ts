import { PUBLIC_ENDPOINT } from '$env/static/public';
import { DishService } from '$lib/services/dish.service';
import { IngredientService } from '$lib/services/ingredient.service';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	try {
		const dish = await DishService.findOne(PUBLIC_ENDPOINT, params.slug);
		const ingredientPromises = dish.ingredients.map((ingredient) => {
			return IngredientService.findOne(PUBLIC_ENDPOINT, ingredient?.slug ?? '');
		});
		const relatedDishesPromises = dish.relatedDishes.map((dish) =>
			DishService.findOne(PUBLIC_ENDPOINT, dish ?? '')
		);
		const ingredients = await Promise.all(ingredientPromises);
		const relatedDishes = await Promise.all(relatedDishesPromises);
		return { dish, ingredients, relatedDishes };
	} catch (err) {
		console.log(err)
		throw error(500, {
			message: 'Internal server error'
		});
	}
}) satisfies PageServerLoad;
