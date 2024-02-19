import type { PageServerLoad } from './$types';
import { DishService } from '$lib/services/dish.service';
import { PUBLIC_ENDPOINT } from '$env/static/public';

export const load = (async ({ url }) => {
	const limit = parseInt(url.searchParams.get('limit') ?? '10', 10);
	try {
		const dishes = await DishService.random(PUBLIC_ENDPOINT, limit);
		return { dishes };
	} catch (err) {
		return { dishes: [] };
	}
}) satisfies PageServerLoad;
