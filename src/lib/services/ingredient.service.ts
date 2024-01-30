import { baseHeader } from '$lib/constant/api';
import type { APIPagination } from '$lib/type/base.type';
import type { Ingredient } from '../../gql/graphql';

const prefix = 'ingredient';

export const IngredientService = {
	find: async (
		endpoint: string,
		page = 1,
		limit = 25,
		keyword: string | null
	): Promise<APIPagination<Ingredient>> => {
		let queryParams = `page=${page}&limit=${limit}`;
		if (keyword) {
			queryParams += `&keyword=${keyword}`;
		}
		const response = await fetch(`${endpoint}/${prefix}?${queryParams}`, {
			method: 'GET',
			headers: { ...baseHeader }
		});
		return await response.json();
	},

	findOne: async (endpoint: string, slug: string): Promise<Ingredient> => {
		const response = await fetch(`${endpoint}/${prefix}/${slug}`, {
			method: 'GET',
			headers: { ...baseHeader }
		});
		return await response.json();
	}
};
