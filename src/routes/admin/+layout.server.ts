import { COOKIES_REFRESH_TOKEN, COOKIES_TOKEN } from '$lib/constant/cookies';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get(COOKIES_TOKEN);
	const refreshToken = cookies.get(COOKIES_REFRESH_TOKEN);
	return { token, refreshToken };
}) satisfies LayoutServerLoad;
