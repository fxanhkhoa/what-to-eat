import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	if (params.slug === 'null') {
		return {};
	}
	return { slug: params.slug };
}) satisfies PageServerLoad;
