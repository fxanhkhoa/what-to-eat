import { baseHeader } from '$lib/constant/api';
import type { APIPagination } from '$lib/type/base.type';
import type { Dish } from '../../gql/graphql';

const prefix = 'dish';

export const DishService = {
	find: async (
		endpoint: string,
		page = 1,
		limit = 25,
		keyword: string | null
	): Promise<APIPagination<Dish>> => {
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

	findOne: async (endpoint: string, slug: string): Promise<Dish> => {
		const response = await fetch(`${endpoint}/${prefix}/${slug}`, {
			method: 'GET',
			headers: { ...baseHeader }
		});
		return await response.json();
	},

	random: async (endpoint: string, limit: number = 10): Promise<Dish[]> => {
		const queryParams = `limit=${limit}`;
		const response = await fetch(`${endpoint}/${prefix}/random?${queryParams}`, {
			method: 'GET',
			headers: { ...baseHeader }
		});
		return await response.json();
	}
};
