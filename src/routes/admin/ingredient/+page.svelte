<script lang="ts">
	import type { PageData } from './$types';
	import { _, locale } from 'svelte-i18n';
	import vietnamese from '$lib/images/vietnamese.webp';
	import english from '$lib/images/english.webp';
	import { onMount } from 'svelte';
	import { Tooltip } from '@svelte-plugins/tooltips';
	import { page } from '$app/stores';
	import { getContextClient, gql, queryStore } from '@urql/svelte';
	import type { Ingredient } from '../../../gql/graphql';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Pagination from '$lib/components/pagination.svelte';

	let selectedLanguage = 'en';

	const p = parseInt($page.url.searchParams.get('page') ?? '1', 10);
	const keyword = $page.url.searchParams.get('keyword');

	const limit = 25;

	const ingredients = queryStore<{ ingredients: Ingredient[] }>({
		client: getContextClient(),
		query: gql`
			query ($keyword: String, $page: Int, $limit: Int) {
				ingredients(keyword: $keyword, page: $page, limit: $limit) {
					_id
					slug
					title {
						lang
						data
					}
					createdAt
					updatedAt
				}
			}
		`,
		variables: { keyword, page: p, limit },
		requestPolicy: 'cache-and-network'
	});

	function setSelectedLanguage(lang: string) {
		locale.set(lang);
		selectedLanguage = lang;
	}

	const deleteIngredient = (slug: string) => {};

	onMount(() => {});
</script>

<svelte:head>
	<title>{$_('ingredient-management')}</title>
	<meta name="description" content={$_('ingredient-management')} />
</svelte:head>

<section id="main" class="p-5">
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
		<h1 class="text-white font-bold drop-shadow-lg">{$_('ingredient-management')}</h1>
		<div class="flex">
			<a
				href="/admin/ingredient/null"
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
	{#if $ingredients.fetching}
		<p>Loading...</p>
	{:else if $ingredients.error}
		<p>Oh no... {$ingredients.error.message}</p>
	{:else if !$ingredients.data}
		<p>Oh no... no data</p>
	{:else}
		<div class="grid grid-cols-12 gap-5">
			{#each $ingredients?.data?.ingredients as ingredient, i}
				<div class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 text-gray-200">
					<div class="shadow-lg bg-slate-800">
						<div class="p-3 flex flex-col gap-5">
							<div class="flex justify-between">
								<h3>{ingredient.title?.find((t) => t?.lang === selectedLanguage)?.data}</h3>
								<div class="flex gap-3">
									<button on:click={() => deleteIngredient(ingredient.slug)}>
										<i class="fa-solid fa-trash my-auto text-red-500" />
									</button>
									<a href={`/admin/ingredient/${ingredient.slug}`} class="my-auto">
										<i class="fa-solid fa-pen-to-square my-auto text-yellow-500" />
									</a>
								</div>
							</div>
							<div class="flex justify-between">
								<div class="flex gap-2">
									<Tooltip content={$_('created-at')}>
										<i class="fa-solid fa-clock my-auto" />
									</Tooltip>
									<span>{new Date(ingredient.createdAt).toLocaleDateString(selectedLanguage)}</span>
								</div>
								<div class="flex gap-2">
									<Tooltip content={$_('updated-at')}>
										<i class="fa-solid fa-stopwatch my-auto" />
									</Tooltip>
									<span>{new Date(ingredient.updatedAt).toLocaleDateString(selectedLanguage)}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<hr class="my-5" />
		<Pagination
			disabledPrevious={p === 1}
			disabledNext={!$ingredients.data.ingredients.length}
			on:next={() => (location.href = `/admin/ingredient?page=${p + 1}`)}
			on:prev={() => (location.href = `/admin/ingredient?page=${p - 1}`)} />
	{/if}
</section>
