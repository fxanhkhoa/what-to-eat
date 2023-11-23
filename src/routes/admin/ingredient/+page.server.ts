import { COOKIES_TOKEN } from '$lib/constant/cookies';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get(COOKIES_TOKEN);
	return { token };
}) satisfies PageServerLoad;
