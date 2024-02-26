<script lang="ts">
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import DishCard from '$lib/components/dish/dish-card.svelte';
	import { createPagination, melt } from '@melt-ui/svelte';
	import { buildDishFilterQueryParams } from '$lib/utils/dish';
	import type { DishFilter } from '$lib/type/dish.type';
	import DishFilterComp from '$lib/components/dish/DishFilterComp.svelte';
	import Empty from '$lib/components/empty.svelte';

	export let data: PageData;
	const { rows, keyword, lang, limit, page, total, filter } = data;

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages }
	} = createPagination({
		count: total,
		perPage: limit,
		defaultPage: page,
		siblingCount: 1,
		onPageChange: (p) => {
			onSearch(filter, p.next);
			return p.next;
		}
	});

	let selectedLanguage = lang === 'en-US' ? 'en' : lang;

	const onSearch = (value: DishFilter, newPage?: number) => {
		console.log(value);
		let queryParams = buildDishFilterQueryParams(value);
		if (queryParams === '') {
			queryParams = `page=${newPage ? newPage : page}&limit=${limit}`;
		} else {
			queryParams += `&page=${newPage ? newPage : page}&limit=${limit}`;
		}
		location.href = `${location.pathname}?${queryParams}`;
	};
</script>

<svelte:head>
	<title>{$_('metadata.dish.title')}</title>
	<meta name="description" content={$_('metadata.dish.description')} />
	<meta name="keywords" content="ăn gì, what to eat, eat what, ăn chi" />
	<meta name="robots" content="index,follow" />
</svelte:head>

<section id="banner">
	<div class="banner h-64 flex flex-col gap-2 justify-center items-center text-purple-500 p-5">
		<h1 class="drop-shadow-lg font-bold uppercase">{$_('metadata.dish.title')}</h1>
		<h5 class="text-gray-200">{$_('metadata.dish.description')}</h5>
		<div class="flex gap-2 mt-3">
			<a
				class="group text-gray-300 hover:text-white font-semibold transition-all duration-300 ease-in-out"
				href="/">
				<span
					class="bg-left-bottom bg-gradient-to-r from-purple-500 to-purple-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
					{$_('home')}
				</span>
			</a>
			<span>/</span>
			<span class="text-gray-300 font-bold underline">{$_('dish')}</span>
		</div>
	</div>
</section>

<section id="main" class="p-5 md:p-10 flex flex-col">
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
	<div class="grid grid-cols-12 p-5 h-[80vh]">
		<div class="col-span-12 md:col-span-3 xl:col-span-3">
			<DishFilterComp {selectedLanguage} on:search={(result) => onSearch(result.detail)} {filter} />
		</div>
		<div class="col-span-12 md:col-span-9 xl:col-span-9 overflow-auto">
			<div class="p-2 md:p-5">
				<div class="grid grid-cols-12 gap-5">
					{#if !rows.length}
						<div class="col-span-12 h-[60vh]">
							<Empty />
						</div>
					{:else}
						{#each rows as dish, i}
							<DishCard {dish} {selectedLanguage} />
						{/each}
					{/if}
				</div>
			</div>
		</div>
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

<style>
	.banner {
		background-image: url($lib/images/dish-page-banner.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		backdrop-filter: blur(5px);
	}
</style>
