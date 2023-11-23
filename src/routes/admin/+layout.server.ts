import { COOKIES_TOKEN } from '$lib/constant/cookies';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get(COOKIES_TOKEN);
	return { token };
}) satisfies LayoutServerLoad;
