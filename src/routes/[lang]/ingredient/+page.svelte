<script lang="ts">
	import IngredientCard from '$lib/components/ingredient/ingredient-card.svelte';
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { createPagination, melt } from '@melt-ui/svelte';
	import SearchBar from '$lib/components/searchBar.svelte';

	export let data: PageData;
	const { rows, total, keyword, page, limit, lang } = data;
	const selectedLanguage = lang === 'en-US' ? 'en' : lang;

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages }
	} = createPagination({
		count: total,
		perPage: limit,
		defaultPage: page,
		siblingCount: 1,
		onPageChange: (p) => {
			if (keyword) {
				location.href = `${location.pathname}?keyword=${keyword}&page=${p.next}`;
			} else {
				location.href = `${location.pathname}?page=${p.next}`;
			}
			return p.next;
		}
	});

	const onSearch = (keyword: string) => {
		location.href = `/${selectedLanguage}/ingredient?keyword=${keyword}`;
	};
</script>

<svelte:head>
	<title>{$_('metadata.ingredient.title')}</title>
	<meta name="description" content={$_('metadata.ingredient.description')} />
</svelte:head>

<section id="banner" class="flex flex-col justify-center items-center gap-5 p-5 md:p-10">
	<h1 class="font-bold">{$_('metadata.ingredient.title')}</h1>
	<h4>{$_('metadata.ingredient.description')}</h4>
</section>

<form id="filter">
	<div class="mx-5 flex justify-center gap-2 bg-gray-100 rounded-lg">
		<SearchBar
			{selectedLanguage}
			on:onResult={(result) => onSearch(result.detail)}
			value={keyword ?? ''} />
	</div>
</form>

<section id="main" class="p-5 bg-gradient-to-b from-white to-gray-100 md:p-10">
	<div class="flex">
		<button
			on:click={() => history.back()}
			class="group text-purple-700 hover:text-purple-500 font-semibold transition-all duration-300 ease-in-out">
			<span
				class="bg-left-bottom bg-gradient-to-r from-purple-500 to-purple-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
				<i class="fa-solid fa-circle-left my-auto" />
				<span class="ml-2">{$_('back')}</span>
			</span>
		</button>
	</div>
	<div class="grid grid-cols-12 gap-5 overflow-auto h-[45vh]">
		{#if !total}
			<div
				class="col-span-12 flex flex-col justify-center items-center gap-5 border-8 drop-shadow-lg shadow-lg">
				<h1 class="font-bold">{$_('no-item-info')}</h1>
				<i class="fa-solid fa-inbox text-4xl" />
			</div>
		{/if}
		{#each rows as ingredient}
			<div class="col-span-12 md:col-span-4">
				<IngredientCard {ingredient} {selectedLanguage} />
			</div>
		{/each}
	</div>
	<nav class="flex flex-col items-center gap-4 mt-3" aria-label="pagination" use:melt={$root}>
		<div class="flex items-center gap-2">
			<button
				class="grid h-8 items-center rounded-md bg-white px-3 text-sm text-purple-900 shadow-sm
      hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-purple-900
      data-[selected]:text-white"
				use:melt={$prevButton}><i class="fa-solid fa-chevron-left" /></button>
			{#each $pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<span>...</span>
				{:else}
					<button
						class="grid h-8 items-center rounded-md bg-white px-3 text-sm text-purple-900 shadow-sm
          hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-purple-900
        data-[selected]:text-white"
						use:melt={$pageTrigger(page)}>{page.value}</button>
				{/if}
			{/each}
			<button
				class="grid h-8 items-center rounded-md bg-white px-3 text-sm text-purple-900 shadow-sm
      hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-purple-900
    data-[selected]:text-white"
				use:melt={$nextButton}><i class="fa-solid fa-chevron-right" /></button>
		</div>
	</nav>
</section>
