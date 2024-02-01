import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {lang: params.lang};
}) satisfies PageServerLoad;
