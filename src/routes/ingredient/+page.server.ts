import { PUBLIC_ENDPOINT } from '$env/static/public';
import { IngredientService } from '$lib/services/ingredient.service';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') ?? '1', 10);
	const limit = parseInt(url.searchParams.get('limit') ?? '9', 10);
	const keyword = url.searchParams.get('keyword');
	try {
		const data = await IngredientService.find(PUBLIC_ENDPOINT, page, limit, keyword);
		return { rows: data.data ?? [], total: data.count, keyword, page, limit };
	} catch (err) {
		return { rows: [], total: 0, keyword, page, limit };
	}
}) satisfies PageServerLoad;
