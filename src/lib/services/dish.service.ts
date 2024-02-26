import { baseHeader } from '$lib/constant/api';
import type { APIPagination } from '$lib/type/base.type';
import type { DishFilter } from '$lib/type/dish.type';
import { buildDishFilterQueryParams } from '$lib/utils/dish';
import type { Dish } from '../../gql/graphql';

const prefix = 'dish';

export const DishService = {
	find: async (
		endpoint: string,
		page = 1,
		limit = 25,
		filter: DishFilter
	): Promise<APIPagination<Dish>> => {
		let queryParams = buildDishFilterQueryParams(filter);
		if (queryParams === '') {
			queryParams = `page=${page}&limit=${limit}`;
		} else {
			queryParams += `&page=${page}&limit=${limit}`;
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
