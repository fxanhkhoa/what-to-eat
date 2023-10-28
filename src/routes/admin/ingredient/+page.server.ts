import { getIngredients } from '$lib/services/ingredient.service';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') ?? '1', 10);
	const ingredients = await getIngredients(page);
	return { ingredients };
}) satisfies PageServerLoad;
