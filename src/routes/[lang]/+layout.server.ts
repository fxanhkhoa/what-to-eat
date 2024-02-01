import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
	return { lang: params.lang };
}) satisfies LayoutServerLoad;
