import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { database } from '../../firebase/firebase-server';
import type { Ingredient } from '$lib/type/ingredient.type';

export const getIngredients = async (page = 1) => {
    console.log(page)
	const ingredientRef = collection(database, 'ingredients');
	let ingredientQuery;
	const listIngredient: Ingredient[] = [];
	if (page === 1) {
		ingredientQuery = query(ingredientRef, orderBy('createdAt'), limit(25));
	} else {
		// Query the first page of docs
		const first = query(ingredientRef, orderBy('createdAt'), limit(page * 25));
		const documentSnapshots = await getDocs(first);

		// Get the last visible document
		const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
		// console.log('last', lastVisible);

		// Construct a new query starting at this document,
		// get the next 25 cities.
		ingredientQuery = query(ingredientRef, orderBy('createdAt'), startAfter(lastVisible), limit(25));
	}

	const querySnapshot = await getDocs(ingredientQuery);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		// console.log(doc.id, ' => ', doc.data());
		listIngredient.push(doc.data() as Ingredient);
	});
	return listIngredient;
};

export const searchIngredients = (keyword: string) => {}