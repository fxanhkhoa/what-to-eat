import type { Dish } from '$lib/type/dish.type';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import { database } from '../../../firebase/firebase-server';

const getDishes = async (page: number) => {
	const dishesRef = collection(database, 'dishes');
	let dishQuery;
	const listDish: Dish[] = [];
	if (page === 1) {
		dishQuery = query(dishesRef, where('mealCategories', 'array-contains', 'BREAKFAST'), orderBy('createdAt'), limit(25));
	} else {
		// Query the first page of docs
		const first = query(dishesRef, orderBy('createdAt'), limit(page * 25));
		const documentSnapshots = await getDocs(first);

		// Get the last visible document
		const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
		// console.log('last', lastVisible);

		// Construct a new query starting at this document,
		// get the next 25 cities.
		dishQuery = query(dishesRef, orderBy('createdAt'), startAfter(lastVisible), limit(25));
	}

	const querySnapshot = await getDocs(dishQuery);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		// console.log(doc.id, ' => ', doc.data());
		listDish.push(doc.data() as Dish);
	});
	return listDish;
};

export const load = (async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') ?? '1', 10);
	const dishes = getDishes(page);
	return { dishes };
}) satisfies PageServerLoad;
