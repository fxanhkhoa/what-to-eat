<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _, locale } from 'svelte-i18n';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { DIFFICULT_LEVELS } from '$lib/enum/dish.enum';

	export let data: PageData;
	const { dishes } = data;
	let selectedLanguage = 'en';

	onMount(() => {
		console.log(data.dishes);
		const sub = locale.subscribe((lang) => {
			if (lang === 'en-US') {
				locale.set('en');
				return;
			}
			if (lang) {
				selectedLanguage = lang;
			}
		});
		return sub;
	});
</script>

<svelte:head>
	<title>{$_('metadata.dish.breakfast.title')}</title>
	<meta name="description" content={$_('metadata.dish.breakfast.description')} />
</svelte:head>

<section id="banner" class="h-96 flex flex-col justify-center items-center rounded-b-3xl">
	<div class="grid grid-cols-12 p-5 md:p-10">
		<div
			class="col-span-12 md:col-span-6 font-serif drop-shadow-lg flex flex-col justify-center gap-3 p-3">
			<a
				href="/dish"
				class="group text-purple-700 hover:text-purple-500 font-semibold transition-all duration-300 ease-in-out">
				<span
					class="bg-left-bottom bg-gradient-to-r from-purple-500 to-purple-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
					<i class="fa-solid fa-circle-left my-auto" />
					<span class="ml-2">{$_('back')}</span>
				</span>
			</a>
			<h1 class="text-white">{$_('BREAKFAST')}</h1>
			<p class="text-gray-100 text-justify">{$_('metadata.dish.breakfast.description')}</p>
			<div>
				<a
					href="#main"
					class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
					<span
						class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
						<svg
							class="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
					</span>
					<span
						class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease"
						>{$_('discover')}</span>
					<span class="relative invisible">{$_('discover')}</span>
				</a>
			</div>
		</div>
		<div class="col-span-12 md:col-span-6 flex justify-center">
			<img
				class="w-full h-auto"
				src="https://firebasestorage.googleapis.com/v0/b/what-to-eat-90d3e.appspot.com/o/banh-mi.png?alt=media&token=3d63a0b9-7285-4ea9-8595-cdf99d7af4b9"
				alt="banh-mi" />
		</div>
	</div>
</section>

<section id="main">
	<div class="grid grid-cols-12 p-5">
		<div class="col-span-12 md:col-span-2" />
		<div class="col-span-12 md:col-span-10">
			<div class="p-5">
				<div class="grid grid-cols-12 gap-5">
					{#each dishes as dish, i}
						<div class="col-span-12 md:col-span-6 grid grid-cols-12 shadow-lg rounded-lg rounded-r-full">
							<div class="col-span-5 p-5">
								<img
									src={dish.thumbnail}
									alt={dish.slug}
									class="object-cover rounded-lg w-full h-full" />
							</div>
							<div class="col-span-5 flex flex-col gap-2 py-5 pr-5">
								{#if dish.difficultLevel === DIFFICULT_LEVELS.EASY}
									<span class="text-green-500 text-xs font-semibold"
										>{$_(dish.difficultLevel)}</span>
								{/if}
								{#if dish.difficultLevel === DIFFICULT_LEVELS.MEDIUM}
									<span class="text-blue-500 text-xs font-semibold">{$_(dish.difficultLevel)}</span>
								{/if}
								{#if dish.difficultLevel === DIFFICULT_LEVELS.HARD}
									<span class="text-red-500 text-xs font-semibold">{$_(dish.difficultLevel)}</span>
								{/if}

								<h4 class="font-bold">
									{dish.title?.find((t) => t.language === selectedLanguage)?.data}
								</h4>
								<span class="text-gray-400 text-left"
									>{dish.shortDescription?.find((s) => s.language === selectedLanguage)?.data ??
										''}</span>
								<div class="flex gap-1">
									<i class="fa-solid fa-stopwatch my-auto" />
									<span class="ml-1">{dish.preparationTime + dish.cookingTime}</span>
									<span>{$_('minute')}</span>
								</div>
							</div>
							<div class="col-span-2 relative">
								<!-- <button
									class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 w-full h-full flex flex-col gap-3 justify-center items-center transition duration-300 ease-in-out rounded-r-lg">
									<i class="fa-solid fa-circle-right" />
									<span>{$_('view-detail')}</span>
								</button> -->
								<a
									href={`/dish/${dish.slug}`}
									class="relative w-full h-full inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-l rounded-r-full group">
									<span
										class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
										<svg
											class="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
									</span>
									<span
										class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease"
										>{$_('discover')}</span>
									<span class="relative invisible">{$_('discover')}</span>
								</a>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	#banner {
		background-image: url($lib/images/wood-table-bg.jpg);
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
