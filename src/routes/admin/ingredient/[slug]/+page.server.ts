import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../../../firebase/firebase-server';
import type { Ingredient } from '$lib/type/ingredient.type';

const getIngredient = async (slug: string) => {
	const ingredientRef = doc(database, 'ingredients', slug);
	const docSnap = await getDoc(ingredientRef);
	if (docSnap.exists()) {
		return docSnap.data() as Ingredient;
	}
	return null;
};

export const load = (async ({ params }) => {
	if (params.slug === 'null') {
		return {};
	}
	const ingredient = await getIngredient(params.slug);
	if (!ingredient) {
		throw error(404, {
			message: 'Not found'
		});
	}
	return { ingredient };
}) satisfies PageServerLoad;
