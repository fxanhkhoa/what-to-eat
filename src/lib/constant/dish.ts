import { DIFFICULT_LEVELS } from '$lib/enum/dish.enum';
import type { ColorList } from '$lib/type/color.type';
import type { DishFilter } from '$lib/type/dish.type';

export const DISH_DIFFICULTY_BADGE: { name: string; color: ColorList }[] = [
	{ name: DIFFICULT_LEVELS.EASY, color: 'green' },
	{ name: DIFFICULT_LEVELS.MEDIUM, color: 'blue' },
	{ name: DIFFICULT_LEVELS.HARD, color: 'red' }
];

export const DEFAULT_DISH_FILTER: DishFilter = {
	preparationTimeFrom: 1,
	preparationTimeTo: 60,
	cookingTimeFrom: 1,
	cookingTimeTo: 60
};
