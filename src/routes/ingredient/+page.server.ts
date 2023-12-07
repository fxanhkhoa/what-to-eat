import { PUBLIC_ENDPOINT } from '$env/static/public';
import { IngredientService } from '$lib/services/ingredient.service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') ?? '1', 10);
	const limit = parseInt(url.searchParams.get('limit') ?? '1', 10);
	const keyword = url.searchParams.get('keyword');
	try {
		const ingredients = await IngredientService.find(PUBLIC_ENDPOINT, page, limit, keyword);
		return { ingredients };
	} catch (err) {
		throw error(404, {
			message: 'Not found'
		});
	}
}) satisfies PageServerLoad;
