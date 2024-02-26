<script lang="ts">
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { showSuccess } from '$lib/utils/toast';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import DishCard from '$lib/components/dish/dish-card.svelte';
	import DifficultyLevel from '$lib/components/utility/difficulty-level.svelte';
	import { DIFFICULT_LEVELS } from '$lib/enum/dish.enum';
	import Category from '$lib/components/utility/category.svelte';
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import YoutubeFrame from '$lib/components/common/YoutubeFrame.svelte';

	export let data: PageData;
	$: ({ dish, ingredients, relatedDishes, pageUrl, lang } = data);
	let selectedLanguage = data.lang === 'en-US' ? 'en' : data.lang;

	const copyLink = () => {
		navigator.clipboard.writeText($page.url.toString());
		showSuccess($_('copied'), 'OK');
	};
</script>

<svelte:head>
	<title>{$_('dish')}: {dish.title.find((t) => t?.lang === selectedLanguage)?.data}</title>
	<meta
		name="description"
		content={dish.shortDescription.find((t) => t?.lang === selectedLanguage)?.data} />
	<meta name="keywords" content={dish.tags.join(', ')} />
	<meta name="subject" content={dish.title.find((t) => t?.lang === selectedLanguage)?.data} />
	<meta name="copyright" content="Dratini Technology" />
	<meta name="robots" content="index,follow" />
	<meta name="coverage" content="Worldwide" />
	<meta name="distribution" content="Global" />
	<meta name="rating" content="General" />
	<meta name="revisit-after" content="7 days" />

	<meta name="og:title" content={dish.title.find((t) => t?.lang === selectedLanguage)?.data} />
	<meta name="og:type" content="dish" />
	<meta name="og:url" content={`${pageUrl}/dish/${dish.slug}`} />
	<meta name="og:image" content={dish.thumbnail} />
	<meta name="og:site_name" content={dish.title.find((t) => t?.lang === selectedLanguage)?.data} />
	<meta
		name="og:description"
		content={dish.shortDescription.find((t) => t?.lang === selectedLanguage)?.data} />
</svelte:head>

<section
	id="banner"
	class={`h-[20rem] md:h-[40rem] relative bg-center bg-no-repeat bg-cover`}
	style={`background-image: url("${dish.thumbnail}");`} />

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
				<Category categories={[...dish.mealCategories, ...dish.ingredientCategories]} />
			</div>
		</div>
		<div class="grid grid-cols-12 gap-5 md:gap-10 mt-5">
			<div class="col-span-12 md:col-span-6 p-3">
				<YoutubeFrame id={dish.videos[0] ?? ''} />
			</div>
			<div class="col-span-12 md:col-span-6 p-3">
				<div class="flex">
					<h4 class="text-gray-500">{$_('ingredients')}</h4>
				</div>
				<ul class="list-none">
					{#each dish.ingredients.reverse() as ingredient}
						<div class="inline-flex md:flex items-center w-full">
							<label
								class="relative flex items-center p-3 rounded-full cursor-pointer"
								for={ingredient?.slug}
								data-ripple-dark="true">
								<input
									id={ingredient?.slug}
									type="checkbox"
									class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500 hover:before:opacity-10" />
								<div
									class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
									<i class="fa-solid fa-check" />
								</div>
							</label>
							<label
								class="flex-1 mt-px font-light text-gray-500 cursor-pointer select-none"
								for={ingredient?.slug}>
								<div class="grid grid-cols-12 gap-2">
									<div class="col-span-2 font-bold my-auto">
										{ingredient?.quantity}
										{ingredients.find((i) => i.slug === ingredient?.slug)?.measure}
									</div>
									<div class="col-span-4 my-auto">
										{ingredients
											.find((i) => i.slug === ingredient?.slug)
											?.title.find((t) => t?.lang === selectedLanguage)?.data}
									</div>
									<div class="col-span-6 text-gray-400 my-auto">
										{#if ingredient?.note !== ''}
											({ingredient?.note})
										{/if}
									</div>
								</div>
							</label>
							<div>
								<a
									href={`/ingredient?keyword=${ingredient?.slug.replaceAll('-', ' ')}`}
									class="bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded transition duration-300">
									<span><i class="fa-solid fa-arrow-up-right-from-square" /></span>
								</a>
							</div>
						</div>
					{/each}
				</ul>
			</div>
		</div>
		<div class="grid grid-cols-12 gap-5 md:gap-10 mt-5">
			<div class="col-span-12 p-3">
				<div class="dish-html-wrapper">
					{@html dish.content.find((c) => c?.lang === selectedLanguage)?.data}
				</div>
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
		<div class="bg-slate-100 rounded-lg p-3">
			<div class="flex justify-center mb-3">
				<h2 class="text-purple-400 font-semibold">{$_('related-dishes')}</h2>
			</div>
			<div class="grid grid-cols-12 gap-5">
				{#each relatedDishes as dish}
					<DishCard {selectedLanguage} {dish} />
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.dish-html-wrapper > :global(h2) {
		@apply text-gray-500 py-3;
	}

	.dish-html-wrapper > :global(ul) {
		@apply list-disc pl-5;
	}

	.dish-html-wrapper > :global(p) {
		@apply py-1 leading-loose flex gap-2 flex-wrap;
	}

	.dish-html-wrapper > :global(p) > :global(img) {
		@apply object-cover h-auto w-96 transition-all delay-500 duration-300 ease-in-out rounded-2xl border-solid border border-purple-200;
	}

	.dish-html-wrapper > :global(p) > :global(code) {
		@apply p-3 font-serif text-purple-400 rounded-lg bg-slate-50 text-base before:content-['_🌟'];
	}

	/* .dish-html-wrapper > :global(p) > :global(img:hover) {
		@apply w-[500px];
	} */

	.dish-html-wrapper > :global(p) > :global(a) {
		text-decoration: underline !important;
		text-decoration-color: #e9d5ff !important;
		text-decoration-thickness: 1px;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		transition-duration: 300ms;
	}
	.dish-html-wrapper > :global(p) > :global(a:hover) {
		--tw-text-opacity: 1 !important;
		color: rgb(168 85 247 / var(--tw-text-opacity)) !important;
	}
</style>
