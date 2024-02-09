<script lang="ts">
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import vietnamese from '$lib/images/vietnamese.webp';
	import english from '$lib/images/english.webp';
	import { BADGE_COLOR_CLASSES } from '$lib/constant/badge';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { getContextClient, gql, mutationStore, queryStore } from '@urql/svelte';
	import { page } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import type { Dish } from '../../../gql/graphql';
	import Pagination from '$lib/components/pagination.svelte';
	import type { Unsubscriber } from 'svelte/store';
	import Collapsible from '$lib/components/common/Collapsible.svelte';
	import Tooltip from '$lib/components/common/Tooltip.svelte';

	const p = parseInt($page.url.searchParams.get('page') ?? '1', 10);
	const keyword = $page.url.searchParams.get('keyword');

	const limit = 25;
	let removeObservable: Unsubscriber;

	let selectedLanguage = 'en';

	function setSelectedLanguage(lang: string) {
		locale.set(lang);
		selectedLanguage = lang;
	}

	const client = getContextClient();
	const dishes = queryStore<{ dishes: Dish[] }>({
		client,
		query: gql`
			query ($keyword: String, $page: Int, $limit: Int) {
				dishes(keyword: $keyword, page: $page, limit: $limit) {
					_id
					slug
					title {
						lang
						data
					}
					preparationTime
					cookingTime
					mealCategories
					ingredientCategories
					thumbnail
					createdAt
					updatedAt
				}
			}
		`,
		variables: { keyword, page: p, limit },
		requestPolicy: 'cache-and-network'
	});

	const deleteDish = async (slug: string) => {
		if (confirm(`are you sure to delete ${slug}?`)) {
			const result = mutationStore({
				client,
				query: gql`
					mutation ($slug: String!) {
						removeDish(slug: $slug) {
							_id
							slug
						}
					}
				`,
				variables: { slug }
			});

			removeObservable = result.subscribe((res) => {
				if (!res.fetching && !res.error) {
					toast.push($_('successfully'), {
						theme: {
							'--toastColor': 'mintcream',
							'--toastBackground': 'rgba(72,187,120,0.9)',
							'--toastBarBackground': '#2F855A'
						}
					});
					removeObservable;
				} else if (!res.fetching && res.error) {
					toast.push(`${$_('fail')}: ${res.error.message}`, {
						theme: {
							'--toastColor': 'mintcream',
							'--toastBackground': '#d40202',
							'--toastBarBackground': '#b30000'
						}
					});
					removeObservable;
				}
			});
		}
	};

	onMount(() => {});
</script>

<svelte:head>
	<title>Dishes</title>
	<meta name="description" content="hôm nay ăn gì" />
</svelte:head>

<section id="dish" class="p-5">
	<div class="flex">
		<a
			href="/admin"
			class="group text-purple-700 hover:text-purple-500 font-semibold transition-all duration-300 ease-in-out">
			<span
				class="bg-left-bottom bg-gradient-to-r from-purple-500 to-purple-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
				<i class="fa-solid fa-circle-left my-auto" />
				<span class="ml-2">{$_('back')}</span>
			</span>
		</a>
	</div>
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
	{#if $dishes.fetching}
		<p>Loading...</p>
	{:else if $dishes.error}
		<p>Oh no... {$dishes.error.message}</p>
	{:else if !$dishes.data}
		<p>Oh no... no data</p>
	{:else}
		<div class="grid grid-cols-12 gap-5">
			{#each $dishes.data.dishes as dish, i}
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
								<h3>{dish.title.find((t) => t?.lang === selectedLanguage)?.data}</h3>
								<div class="flex gap-3">
									<button on:click={() => deleteDish(dish.slug)}>
										<i class="fa-solid fa-trash my-auto text-red-500" />
									</button>
									<a href={`/admin/dish/${dish.slug}`} class="my-auto">
										<i class="fa-solid fa-pen-to-square my-auto text-yellow-500" />
									</a>
								</div>
							</div>
							<div class="flex gap-3">
								<Tooltip text={$_('preparation-time')}>
									<div class="flex gap-4 cursor-default">
										<i class="fa-solid fa-hourglass-end my-auto" />
										<span>{dish.preparationTime} {$_('minute')}</span>
									</div>
								</Tooltip>
								<Tooltip text={$_('cooking-time')}>
									<div class="flex gap-3 cursor-default">
										<i class="fa-regular fa-clock my-auto" />
										<span>{dish.cookingTime} {$_('minute')}</span>
									</div>
								</Tooltip>
							</div>
							<Collapsible title={$_('meal-categories')}>
								<div class="flex flex-wrap gap-3 mt-3">
									{#each dish.mealCategories as category, categoryIndex}
										<span
											class="text-xs inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset {BADGE_COLOR_CLASSES[
												categoryIndex % BADGE_COLOR_CLASSES.length
											]}">{$_(category ?? '')}</span>
									{/each}
								</div>
							</Collapsible>
							<Collapsible title={$_('meal-categories')}>
								<div class="flex flex-wrap gap-3 mt-3">
									{#each dish.ingredientCategories as category, categoryIndex}
										<span
											class="text-xs inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset {BADGE_COLOR_CLASSES[
												categoryIndex % BADGE_COLOR_CLASSES.length
											]}">{$_(category ?? '')}</span>
									{/each}
								</div>
							</Collapsible>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<hr class="my-5" />
		<Pagination
			disabledPrevious={p === 1}
			disabledNext={!$dishes.data.dishes.length}
			on:next={() => (location.href = `/admin/dish?page=${p + 1}`)}
			on:prev={() => (location.href = `/admin/dish?page=${p - 1}`)} />
	{/if}
</section>
