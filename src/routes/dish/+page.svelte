<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _, locale } from 'svelte-i18n';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import DishCard from '$lib/components/dish/dish-card.svelte';

	export let data: PageData;
	$: ({ dishes } = data);

	let selectedLanguage = 'en';

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
</script>

<svelte:head>
	<title>{$_('metadata.dish.title')}</title>
	<meta name="description" content={$_('metadata.dish.description')} />
	<meta name="keywords" content="ăn gì, what to eat, eat what, ăn chi"/>
	<meta name="robots" content="index,follow" />
</svelte:head>

<section id="banner">
	<div class="banner h-64 flex flex-col gap-2 justify-center items-center text-purple-500">
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

<section id="main" class="p-5 md:p-10">
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
	<div class="grid grid-cols-12 p-5">
		<div class="col-span-12 md:col-span-2" />
		<div class="col-span-12 md:col-span-10">
			<div class="p-5">
				<div class="grid grid-cols-12 gap-5">
					{#each dishes as dish, i}
						<DishCard {dish} {selectedLanguage} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.banner {
		background-image: url($lib/images/dish-page-banner.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		backdrop-filter: blur(5px);
	}
</style>
