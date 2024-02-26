import { DIFFICULT_LEVELS } from '$lib/enum/dish.enum';
import type { ColorList } from '$lib/type/color.type';

export const DISH_DIFFICULTY_BADGE: { name: string; color: ColorList }[] = [
	{ name: DIFFICULT_LEVELS.EASY, color: 'green' },
	{ name: DIFFICULT_LEVELS.MEDIUM, color: 'blue' },
	{ name: DIFFICULT_LEVELS.HARD, color: 'red' }
];
