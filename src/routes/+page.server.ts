import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { COOKIES_LANG } from '$lib/constant/cookies';

export const load = (async ({ cookies }) => {
	const lang = cookies.get(COOKIES_LANG) ?? 'en-US';
	return redirect(301, `/${lang}`);
}) satisfies PageServerLoad;
