import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, url }) => {
	if (params.lang === 'en') {
		redirect(301, url.href.replace('en', 'en-US'));
	}
	return { lang: params.lang };
}) satisfies LayoutServerLoad;
