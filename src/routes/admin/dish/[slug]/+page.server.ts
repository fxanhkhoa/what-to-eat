import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	if (params.slug !== 'null') {
		return params;
	}
	return { slug: null };
}) satisfies PageServerLoad;
