<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { locale, _ } from 'svelte-i18n';
	import { Tooltip } from '@svelte-plugins/tooltips';
	import { Youtube } from '$lib/utils/youtube';
	import { page } from '$app/stores';
	import { showSuccess } from '$lib/utils/toast';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import DishCard from '$lib/components/dish/dish-card.svelte';
	import DifficultyLevel from '$lib/components/ultility/difficulty-level.svelte';
	import { DIFFICULT_LEVELS } from '$lib/enum/dish.enum';
	import Category from '$lib/components/ultility/category.svelte';

	export let data: PageData;
	$: ({ dish, ingredients, relatedDishes } = data);
	let selectedLanguage = 'en';

	onMount(() => {
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

	const copyLink = () => {
		navigator.clipboard.writeText($page.url.toString());
		showSuccess($_('copied'));
	};
</script>

<svelte:head>
	<title>{$_('dish')}: {dish.title.find((t) => t?.lang === selectedLanguage)?.data}</title>
	<meta name="description" content="hôm nay ăn gì" />
</svelte:head>

<section id="banner" class="h-[40rem] relative">
	<img src={dish.thumbnail} alt={dish.slug} class="w-full h-full object-cover" />
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
	<div class="flex flex-col gap-5 md:gap-10">
		<div class="grid grid-cols-12 gap-5 md:gap-10">
			<div class="col-span-12 md:col-span-6 flex flex-col justify-center p-3">
				<h1 class="font-bold drop-shadow-lg">
					{dish.title.find((t) => t?.lang === selectedLanguage)?.data}
				</h1>
			</div>
			<div class="col-span-12 md:col-span-6 flex flex-col gap-2 text-gray-500 p-3">
				<DifficultyLevel
					difficultLevel={dish.difficultLevel ?? DIFFICULT_LEVELS.EASY}
					fontSizeClass="text-2xl" />
				<h5 class="text-gray-500">
					{dish.shortDescription.find((t) => t?.lang === selectedLanguage)?.data}
				</h5>
				<div class="flex justify-start gap-5">
					<div class="flex gap-4">
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
				<Category categories={[...dish.mealCategories, ...dish.ingredientCategories]} />
			</div>
		</div>
		<div class="grid grid-cols-12 gap-5 md:gap-10 mt-5">
			<div class="col-span-12 md:col-span-6 p-3">
				<iframe
					class="aspect-video w-full"
					src={`//www.youtube.com/embed/${Youtube.getId(dish.videos[0] ?? '')}`}
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen />
			</div>
			<div class="col-span-12 md:col-span-6 p-3">
				<div class="flex">
					<h4 class="text-gray-500">{$_('ingredients')}</h4>
				</div>
				<ul class="list-none">
					{#each dish.ingredients as ingredient}
						<div class="inline-flex md:flex items-center">
							<label
								class="relative flex items-center p-3 rounded-full cursor-pointer"
								for="ripple-on"
								data-ripple-dark="true">
								<input
									id="ripple-on"
									type="checkbox"
									class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500 hover:before:opacity-10" />
								<div
									class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
									<i class="fa-solid fa-check" />
								</div>
							</label>
							<label
								class="mt-px font-light text-gray-500 cursor-pointer select-none"
								for="ripple-on">
								<div class="grid grid-cols-12 gap-2">
									<div class="col-span-2 font-bold">
										{ingredient?.quantity}
										{ingredients.find((i) => i.slug === ingredient?.slug)?.measure}
									</div>
									<div class="col-span-3">
										{ingredients
											.find((i) => i.slug === ingredient?.slug)
											?.title.find((t) => t?.lang === selectedLanguage)?.data}
									</div>
									<div class="col-span-7 text-gray-400">
										({ingredient?.note})
									</div>
								</div>
							</label>
						</div>
					{/each}
				</ul>
			</div>
		</div>
		<div class="grid grid-cols-12 gap-5 md:gap-10 mt-5">
			<div class="col-span-12 p-3">
				{@html dish.content.find((c) => c?.lang === selectedLanguage)?.data}
			</div>
		</div>
		<div class="flex justify-center gap-3">
			<button
				on:click={copyLink}
				class="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
				<span
					class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease" />
				<span
					class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease" />
				<span
					class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease" />
				<span
					class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease" />
				<span
					class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100" />
				<span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease"
					><i class="fa-solid fa-link" /></span>
			</button>
			<a
				href={`https://www.facebook.com/sharer/sharer.php?u=${$page.url.toString()}`}
				target="_blank"
				class="relative px-5 py-3 overflow-hidden font-medium text-blue-600 bg-gray-100 border border-blue-100 rounded-lg shadow-inner group">
				<span
					class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-blue-600 group-hover:w-full ease" />
				<span
					class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-blue-600 group-hover:w-full ease" />
				<span
					class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-blue-600 group-hover:h-full ease" />
				<span
					class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-blue-600 group-hover:h-full ease" />
				<span
					class="absolute inset-0 w-full h-full duration-300 delay-300 bg-blue-900 opacity-0 group-hover:opacity-100" />
				<span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease"
					><i class="fa-brands fa-facebook-f" /></span>
			</a>
			<a
				href={`http://twitter.com/intent/tweet?text=${
					dish.shortDescription.find((s) => s?.lang === selectedLanguage)?.data
				}&url=${$page.url.toString()}&hashtags=${dish.tags.join(',')}`}
				target="_blank"
				class="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
				<span
					class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease" />
				<span
					class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease" />
				<span
					class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease" />
				<span
					class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease" />
				<span
					class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100" />
				<span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease"
					><i class="fa-brands fa-x-twitter" /></span>
			</a>
			<a
				href={`mailto:?subject=${
					dish.title.find((t) => t?.lang === selectedLanguage)?.data
				}&amp;body=${
					dish.shortDescription.find((t) => t?.lang === selectedLanguage)?.data
				} ${$page.url.toString()}`}
				target="_blank"
				class="relative px-5 py-3 overflow-hidden font-medium text-purple-600 bg-gray-100 border border-purple-100 rounded-lg shadow-inner group">
				<span
					class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-purple-600 group-hover:w-full ease" />
				<span
					class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-purple-600 group-hover:w-full ease" />
				<span
					class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-purple-600 group-hover:h-full ease" />
				<span
					class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-purple-600 group-hover:h-full ease" />
				<span
					class="absolute inset-0 w-full h-full duration-300 delay-300 bg-purple-900 opacity-0 group-hover:opacity-100" />
				<span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease"
					><i class="fa-regular fa-envelope" /></span>
			</a>
		</div>
		<hr />
		<div class="grid grid-cols-12 gap-5">
			{#each relatedDishes as dish, i}
				<DishCard {selectedLanguage} {dish} />
			{/each}
		</div>
	</div>
</section>
