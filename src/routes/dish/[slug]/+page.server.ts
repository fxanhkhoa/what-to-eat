import type { Dish } from '$lib/type/dish.type';
import { doc, getDoc } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import { database } from '../../../firebase/firebase-server';
import { error } from '@sveltejs/kit';

const getDish = async (slug: string) => {
	const dishesRef = doc(database, 'dishes', slug);
	const docSnap = await getDoc(dishesRef);
	if (docSnap.exists()) {
		return docSnap.data() as Dish;
	}
	return null;
};

export const load = (async ({ params }) => {
	const dish = await getDish(params.slug);
	if (!dish) {
		throw error(404, {
			message: 'Not found'
		});
	}
	return { dish };
}) satisfies PageServerLoad;
