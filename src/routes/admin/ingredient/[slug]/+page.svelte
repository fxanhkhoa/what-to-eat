<script lang="ts">
	import type { MultiLanguage } from '$lib/type/multi-language.type';
	import { initStringMultiLanguage } from '$lib/utils/multi-language';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _, locale } from 'svelte-i18n';
	import vietnamese from '$lib/images/vietnamese.webp';
	import english from '$lib/images/english.webp';
	import { INGREDIENT_CATEGORIES } from '$lib/enum/dish.enum';
	import { getContextClient, gql, mutationStore, queryStore } from '@urql/svelte';
	import type {
		CreateIngredientInput,
		Ingredient,
		UpdateIngredientInput
	} from '../../../../gql/graphql';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Select from 'svelte-select';
	import { showError, showSuccess } from '$lib/utils/toast';

	let selectedLanguage = 'en';
	let title: MultiLanguage<string>[] = initStringMultiLanguage();
	let slugInput = '';
	let measure = '';
	let calories = 0;
	let carbohydrate = 0;
	let fat = 0;
	let ingredientCategoriesSelected: { label: string; value: string }[] = [];
	let weight = 0;
	let protein = 0;
	let cholesterol = 0;
	let sodium = 0;
	let images: string[] = [];

	let mutationObservable: any;

	export let data: PageData;
	const client = getContextClient();

	const ingredient = queryStore<{ ingredient: Ingredient }>({
		client,
		query: gql`
			query ($slug: String!) {
				ingredient(slug: $slug) {
					_id
					title {
						lang
						data
					}
					slug
					measure
					calories
					carbohydrate
					fat
					ingredientCategory
					weight
					protein
					cholesterol
					sodium
					images
				}
			}
		`,
		variables: { slug: data.slug },
		requestPolicy: 'cache-and-network'
	});

	$: if (!$ingredient.fetching) {
		init($ingredient.data?.ingredient);
	}

	const init = (ingredient?: Ingredient) => {
		if (ingredient) {
			slugInput = ingredient.slug;
			if (ingredient.title) {
				title = ingredient.title as unknown as MultiLanguage<string>[];
			}
			measure = ingredient.measure ?? '';
			calories = ingredient.calories ?? 0;
			carbohydrate = ingredient.carbohydrate ?? 0;
			fat = ingredient.fat ?? 0;
			if (ingredient.ingredientCategory && ingredient.ingredientCategory) {
				ingredientCategoriesSelected = ingredient.ingredientCategory.map((e) => ({
					value: e ?? '',
					label: $_(e ?? '')
				}));
			}
			weight = ingredient.weight ?? 0;
			protein = ingredient.protein ?? 0;
			cholesterol = ingredient.cholesterol ?? 0;
			sodium = ingredient.sodium ?? 0;
			images = ingredient.images as string[];
		}
	};

	const addImage = () => {
		images = ['', ...images];
	};

	const updateImage = (index: number, data: string) => {
		images[index] = data;
	};

	const deleteImage = (index: number) => {
		const newVideos = images.filter((e, i) => i !== index);
		images = [...newVideos];
	};

	const setSelectedLanguage = (lang: string) => {
		locale.set(lang);
		selectedLanguage = lang;
	};

	const setTitle = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		title = title.map((t) => {
			if (t.lang === selectedLanguage) {
				return {
					...t,
					data: event.currentTarget.value
				};
			}
			return t;
		});
	};

	const onSubmit = async () => {
		if (!data.slug) {
			const dto: CreateIngredientInput = {
				slug: slugInput,
				title: title as any,
				measure: measure,
				calories: calories,
				carbohydrate: carbohydrate,
				fat: fat,
				ingredientCategory: ingredientCategoriesSelected.map((e) => e.value),
				weight: weight,
				protein: protein,
				cholesterol: cholesterol,
				sodium: sodium,
				images
			};
			const result = mutationStore({
				client,
				query: gql`
					mutation ($createIngredientInput: CreateIngredientInput!) {
						createIngredient(createIngredientInput: $createIngredientInput) {
							_id
							slug
						}
					}
				`,
				variables: { createIngredientInput: dto }
			});
			mutationObservable = result.subscribe((res) => {
				if (!res.fetching && !res.error) {
					showSuccess($_('successfully'), '200');
				} else if (!res.fetching && res.error) {
					showError(`${$_('fail')}: ${res.error.message}`, '500');
				}
			});
		} else {
			const dto: UpdateIngredientInput = {
				slug: slugInput,
				title: title as any,
				measure: measure,
				calories: calories,
				carbohydrate: carbohydrate,
				fat: fat,
				ingredientCategory: ingredientCategoriesSelected.map((e) => e.value),
				weight: weight,
				protein: protein,
				cholesterol: cholesterol,
				sodium: sodium,
				images
			};
			const result = mutationStore({
				client,
				query: gql`
					mutation ($updateIngredientInput: UpdateIngredientInput!) {
						updateIngredient(updateIngredientInput: $updateIngredientInput) {
							_id
							slug
						}
					}
				`,
				variables: { updateIngredientInput: dto }
			});
			mutationObservable = result.subscribe((res) => {
				if (!res.fetching && !res.error) {
					showSuccess($_('successfully'), '200');
				} else if (!res.fetching && res.error) {
					showError(`${$_('fail')}: ${res.error.message}`, '500');
				}
			});
		}
	};

	onMount(() => {
		if (ingredient) {
			init();
		}
		return { mutationObservable };
	});
</script>

<svelte:head>
	<title>{$_('ingredients')}: {data.slug ?? $_('create-new')}</title>
	<meta
		name="description"
		content={$ingredient?.data?.ingredient.title?.find((t) => t?.lang === selectedLanguage)
			?.data} />
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
				value={title.find((t) => t.lang === selectedLanguage)?.data ?? ''}
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
			<label for="calories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
			<Select
				--multi-item-bg="#29313d"
				--multi-item-outline="#29313d"
				placeholder={$_('ingredient-categories')}
				multiple
				class="rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600 dark:text-white"
				bind:value={ingredientCategoriesSelected}
				showChevron
				items={Object.values(INGREDIENT_CATEGORIES).map((v) => ({
					label: $_(v),
					value: v
				}))} />
		</div>

		<div class="mb-6">
			<label for="images" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('images')}</label>
			<button
				type="button"
				on:click={addImage}
				class="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mb-2">
				{$_('add')} +
			</button>
			{#each images as image, i}
				<div class="flex gap-2">
					<input
						value={image}
						on:change={(event) => updateImage(i, event.currentTarget.value)}
						type="text"
						id={`cooking-time-${i}`}
						name={`cooking-time-${i}`}
						placeholder={$_('image-url')}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 my-auto" />
					<button
						type="button"
						on:click={() => deleteImage(i)}
						class="px-5 py-2.5 font-medium bg-red-500 hover:bg-red-400 hover:text-gray-200 transition duration-300 text-white rounded-lg text-sm mb-2 my-auto">
						<i class="fa-solid fa-trash-can" />
					</button>
					<img src={image} alt="" class="w-12 h-auto rounded-lg" />
				</div>
			{/each}
		</div>

		<button
			on:click={onSubmit}
			type="button"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Submit</button>
	</form>
</section>
