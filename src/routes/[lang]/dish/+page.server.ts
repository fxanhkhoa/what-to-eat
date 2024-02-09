import type { PageServerLoad } from './$types';
import { DishService } from '$lib/services/dish.service';
import { PUBLIC_ENDPOINT } from '$env/static/public';

export const load = (async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') ?? '1', 10);
	const limit = parseInt(url.searchParams.get('limit') ?? '10', 10);
	const keyword = url.searchParams.get('keyword');
	try {
		const dishes = await DishService.find(PUBLIC_ENDPOINT, page, limit, keyword);
		return { rows: dishes.data ?? [], total: dishes.count, keyword, page, limit };
	} catch (err) {
		return { rows: [], total: 0, keyword, page, limit };
	}
}) satisfies PageServerLoad;
