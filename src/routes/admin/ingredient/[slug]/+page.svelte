<script lang="ts">
	import type { MultiLanguage } from '$lib/type/multi-language.type';
	import { initStringMultiLanguage } from '$lib/utils/multi-language';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _, locale } from 'svelte-i18n';
	import vietnamese from '$lib/images/vietnamese.webp';
	import english from '$lib/images/english.webp';
	import { MultiSelect } from 'svelte-multiselect';
	import { INGREDIENT_CATEGORIES } from '$lib/enum/dish.enum';

	export let data: PageData;
	const { ingredient } = data;
	let selectedLanguage = 'en';
	let title: MultiLanguage<string>[] = initStringMultiLanguage();
	let slugInput = '';
	let measure = '';
	let calories = 0;
	let carbohydrate = 0;
	let fat = 0;
	let ingredientCategoriesSelected: string[] = [];
	let weight = 0;
	let protein = 0;
	let cholesterol = 0;
	let sodium = 0;

	const init = () => {};

	const setSelectedLanguage = (lang: string) => {
		locale.set(lang);
		selectedLanguage = lang;
	};

	const setTitle = (event: any) => {
		title = title.map((t) => {
			if (t.language === selectedLanguage) {
				return {
					...t,
					data: event.target.value
				};
			}
			return t;
		});
	};

	const onSubmit = () => {};

	onMount(() => {
		if (ingredient) {
			init();
		}
	});
</script>

<svelte:head>
	<title>Ingredient: {ingredient?.slug}</title>
	<meta
		name="description"
		content={ingredient?.title.find((t) => t.language === selectedLanguage)?.data} />
</svelte:head>

<section id="main" class="p-5">
	<div class="flex">
		<a
			href="/admin/ingredient"
			class="group text-purple-700 hover:text-purple-500 font-semibold transition-all duration-300 ease-in-out">
			<span
				class="bg-left-bottom bg-gradient-to-r from-purple-500 to-purple-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
				<i class="fa-solid fa-circle-left my-auto" />
				<span class="ml-2">{$_('back')}</span>
			</span>
		</a>
	</div>
	<div class="w-full mt-5">
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
	<form class="shadow-lg p-5">
		<div class="mb-6">
			<label for="slug" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Slug</label>
			<input
				bind:value={slugInput}
				type="text"
				id="slug"
				name="slug"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="mi-y"
				required />
		</div>

		<div class="mb-6">
			<label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('title')}</label>
			<input
				value={title.find((t) => t.language === selectedLanguage)?.data}
				on:change={setTitle}
				type="text"
				id="title"
				name="title"
				placeholder={$_('title')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				required />
		</div>

		<div class="mb-6">
			<label for="measure" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('measure')}</label>
			<input
				bind:value={measure}
				type="text"
				id="measure"
				name="measure"
				placeholder={$_('measure')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="mb-6">
			<label
				for="calories"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('calories')}</label>
			<input
				bind:value={calories}
				type="number"
				id="calories"
				name="calories"
				placeholder={$_('calories')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="mb-6">
			<label for="carbohydrate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('carbohydrate')}</label>
			<input
				bind:value={carbohydrate}
				type="number"
				id="carbohydrate"
				name="carbohydrate"
				placeholder={$_('carbohydrate')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="mb-6">
			<label for="fat" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('fat')}</label>
			<input
				bind:value={fat}
				type="number"
				id="fat"
				name="fat"
				placeholder={$_('fat')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="mb-6">
			<label for="weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('weight')}</label>
			<input
				bind:value={weight}
				type="number"
				id="weight"
				name="weight"
				placeholder={$_('weight')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="mb-6">
			<label for="protein" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('protein')}</label>
			<input
				bind:value={protein}
				type="number"
				id="protein"
				name="protein"
				placeholder={$_('protein')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="mb-6">
			<label for="cholesterol" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('cholesterol')}</label>
			<input
				bind:value={cholesterol}
				type="number"
				id="cholesterol"
				name="cholesterol"
				placeholder={$_('cholesterol')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="mb-6">
			<label for="sodium" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('sodium')}</label>
			<input
				bind:value={sodium}
				type="number"
				id="sodium"
				name="sodium"
				placeholder={$_('sodium')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="my-6">
			<label
				for="ingredient-categories"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('ingredient-categories')}</label>
			<MultiSelect
				ulSelectedClass="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
				bind:selected={ingredientCategoriesSelected}
				options={Object.values(INGREDIENT_CATEGORIES)} />
		</div>

		<button
			on:click={onSubmit}
			type="button"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Submit</button>
	</form>
</section>
