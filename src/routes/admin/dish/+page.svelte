<script lang="ts">
	import type { Dish } from '$lib/type/dish.type';
	import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import { Tooltip } from '@svelte-plugins/tooltips';
	import { CollapsibleCard } from 'svelte-collapsible';
	import { database } from '../../../firebase/firebase-server';
	import vietnamese from '$lib/images/vietnamese.webp';
	import english from '$lib/images/english.webp';
	import { BADGE_COLOR_CLASSES } from '$lib/constant/badge';

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
		dishes = listDish;
	};

	onMount(() => {
		getDishes();
	});
</script>

<svelte:head>
	<title>Dishes</title>
	<meta name="description" content="hôm nay ăn gì" />
	<link
		href="./../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
		rel="stylesheet" />
</svelte:head>

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
			<div class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 text-gray-200">
				<div class="shadow-lg bg-slate-800">
					<div class="relative">
						<img src={dish.thumbnail} class="w-full h-48 object-cover" alt={dish.slug} />
						<span
							class="absolute top-3 right-3 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
							>{dish.slug}</span>
					</div>
					<div class="p-3 flex flex-col gap-5">
						<div class="flex justify-between">
							<h3>{dish.title.find((t) => t.language === selectedLanguage)?.data}</h3>
							<div class="flex gap-3">
								<button>
									<i class="fa-solid fa-trash my-auto text-red-500" />
								</button>
								<a href={`/admin/dish/${dish.slug}`} class="my-auto">
									<i class="fa-solid fa-pen-to-square my-auto text-yellow-500" />
								</a>
							</div>
						</div>
						<div class="flex gap-3">
							<div class="flex gap-3">
								<Tooltip content={$_('preparation-time')}>
									<i class="fa-solid fa-hourglass-end" />
								</Tooltip>
								<span>{dish.preparationTime} {$_('minute')}</span>
							</div>
							<div class="flex gap-3">
								<Tooltip content={$_('cooking-time')}>
									<i class="fa-regular fa-clock" />
								</Tooltip>
								<span>{dish.cookingTime} {$_('minute')}</span>
							</div>
						</div>
						<div
							class="flex bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 rounded-lg w-full">
							<CollapsibleCard open={false}>
								<button
									slot="header"
									class="header text-xs bg-transparent hover:bg-blue-500 text-gray-300 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded duration-300">
									<span>{$_('meal-categories')}</span>
								</button>
								<div slot="body" class="flex flex-wrap gap-3 mt-3">
									{#each dish.mealCategories as category, categoryIndex}
										<span
											class="text-xs inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset {BADGE_COLOR_CLASSES[
												categoryIndex % BADGE_COLOR_CLASSES.length
											]}">{$_(category)}</span>
									{/each}
								</div>
							</CollapsibleCard>
						</div>
						<div
							class="flex bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 rounded-lg w-full">
							<CollapsibleCard open={false}>
								<button
									slot="header"
									class="header text-xs bg-transparent hover:bg-blue-500 text-gray-300 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded duration-300">
									<span>{$_('ingredient-categories')}</span>
								</button>
								<div slot="body" class="flex flex-wrap gap-3 mt-3">
									{#each dish.ingredientCategories as category, categoryIndex}
										<span
											class="text-xs inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset {BADGE_COLOR_CLASSES[
												categoryIndex % BADGE_COLOR_CLASSES.length
											]}">{$_(category)}</span>
									{/each}
								</div>
							</CollapsibleCard>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
