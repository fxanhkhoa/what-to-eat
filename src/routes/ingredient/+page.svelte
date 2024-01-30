<script lang="ts">
	import IngredientCard from '$lib/components/ingredient/ingredient-card.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _, locale } from 'svelte-i18n';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { createPagination, melt } from '@melt-ui/svelte';

	export let data: PageData;
	const { rows, total, keyword, page, limit } = data;

	let selectedLanguage = 'en';
	let searchText = '';

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

	onMount(() => {
		locale.subscribe((lang) => {
			if (lang?.includes('en')) {
				locale.set('en');
				return;
			}
			if (lang) {
				selectedLanguage = lang.split('-')[0];
			}
		});
	});

	const onSubmit = () => {
		location.href = `/ingredient?keyword=${searchText}`;
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

<form id="filter" on:submit|preventDefault={onSubmit}>
	<div class="flex justify-center gap-2">
		<div class="w-1/2 md:w-1/3 my-auto">
			<div class="relative w-full min-w-[200px] h-10">
				<input
					bind:value={searchText}
					class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-6 py-5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
					placeholder="" />
				<label
					class="flex my-auto w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
					for="searchText">
					{$_('search-for-ingredients')}
				</label>
			</div>
		</div>
		<div class="relative">
			<div class="absolute -inset-5">
				<div
					class="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600" />
			</div>
			<button
				type="submit"
				class="relative z-10 inline-flex gap-2 items-center justify-center w-full px-4 py-2 text-xs font-bold text-white transition-all duration-200 bg-purple-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
				<span>{$_('search')}</span>
				<i class="fa-solid fa-magnifying-glass" />
			</button>
		</div>
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
