<script lang="ts">
	import type { Dish } from '$lib/type/dish.type';
	import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import { database } from '../../../firebase/firebase-server';
	import vietnamese from '$lib/images/vietnamese.webp';
	import english from '$lib/images/english.webp';

	let dishes: Dish[] = [];
	let page = 1;
	const dishesRef = collection(database, 'dishes');

	let selectedLanguage = 'en';

	function setSelectedLanguage(lang: string) {
		locale.set(lang);
		selectedLanguage = lang;
	}


	const getDishes = async () => {
		let dishQuery;
		let listDish: Dish[] = [];
		if (page === 1) {
			dishQuery = query(dishesRef, orderBy('createdAt'), limit(25));
		} else {
			// Query the first page of docs
			const first = query(dishesRef, orderBy('createdAt'), limit(page * 25));
			const documentSnapshots = await getDocs(first);

			// Get the last visible document
			const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
			console.log('last', lastVisible);

			// Construct a new query starting at this document,
			// get the next 25 cities.
			dishQuery = query(dishesRef, orderBy('createdAt'), startAfter(lastVisible), limit(25));
		}

		const querySnapshot = await getDocs(dishQuery);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, ' => ', doc.data());
			listDish.push(doc.data() as Dish);
		});
		dishes = listDish;
	};

	onMount(() => {
		getDishes();
	});
</script>

<section id="dish" class="p-5">
	<div class="flex justify-between mb-5">
		<h1 class="text-white font-bold drop-shadow-lg">{$_('dish-management')}</h1>
		<div class="flex">
			<a
				href="/admin/dish/null"
				class="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
				<span
					class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700" />
				<span
					class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease" />
				<span class="relative text-white">+ {$_('add')}</span>
			</a>
		</div>
	</div>
	<div class="w-full mb-5">
		<div class="relative right-0">
			<ul
				class="relative flex list-none flex-wrap rounded-xl bg-blue-gray-50/60 p-1 border"
				data-tabs="tabs"
				role="list">
				<li
					class="z-30 flex-auto text-center rounded-xl transition duration-300 ease-in {selectedLanguage ===
						'vi' && 'bg-gray-400'}">
					<button
						on:click={() => setSelectedLanguage('vi')}
						type="button"
						class="text-slate-700 z-30 mb-0 fle gap-2 x w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
						data-tab-target=""
						role="tab"
						aria-selected="true">
						<img class="h-5 w-auto mx-auto" src={vietnamese} alt="vietnamese" />
					</button>
				</li>
				<li
					class="z-30 flex-auto text-center rounded-xl transition duration-300 ease-in {selectedLanguage ===
						'en' && 'bg-gray-400'}">
					<button
						on:click={() => setSelectedLanguage('en')}
						type="button"
						class="text-slate-700 z-30 mb-0 flex gap-2 w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
						data-tab-target=""
						role="tab"
						aria-selected="false">
						<img class="h-5 w-auto mx-auto" src={english} alt="english" />
					</button>
				</li>
			</ul>
		</div>
	</div>
	<div class="grid grid-cols-12 gap-5">
		{#each dishes as dish, i}
			<div class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 text-gray-200 ">
				<div class="shadow-lg bg-slate-800">
					<img src={dish.thumbnail} class="w-full h-auto" alt={dish.slug} />
					<div class="p-3">
						<div class="flex">
							<h3>{dish.title.find(t => t.language === selectedLanguage)?.data}</h3>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
