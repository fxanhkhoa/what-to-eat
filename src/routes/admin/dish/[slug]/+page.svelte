<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Tiptap from '$lib/Tiptap.svelte';
	import vietnamese from '$lib/images/vietnamese.webp';
	import english from '$lib/images/english.webp';
	import type { MultiLanguage } from '$lib/type/multi-language.type';
	import { initStringMultiLanguage } from '$lib/utils/multi-language';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { DIFFICULT_LEVELS, INGREDIENT_CATEGORIES, MEAL_CATEGORIES } from '$lib/enum/dish.enum';
	import Select from 'svelte-select';
	import {
		getContextClient,
		gql,
		queryStore,
		type OperationResultStore,
		type AnyVariables,
		type Pausable,
		mutationStore
	} from '@urql/svelte';
	import type {
		CreateDishInput,
		Dish,
		Ingredient,
		IngredientsInDish,
		UpdateDishInput
	} from '../../../../gql/graphql';
	import { showError, showSuccess } from '$lib/utils/toast';

	export let data: PageData;
	const { slug } = data;

	let editType = 1;
	let title: MultiLanguage<string>[] = initStringMultiLanguage();
	let shortDescription: MultiLanguage<string>[] = initStringMultiLanguage();
	let selectedLanguage = 'en';
	let content: MultiLanguage<string>[] = initStringMultiLanguage();
	let difficultLevel = '';
	let mealCategoriesSelected: { label: string; value: string }[] = [];
	let ingredientCategoriesSelected: { label: string; value: string }[] = [];
	let thumbnail = '';
	let slugInput = '';
	let tagsInput = '';
	let preparationTime = 0;
	let cookingTime = 0;
	let ingredients: IngredientsInDish[] = [];
	let videos: string[] = [];
	let relatedDishes: string[] = [];

	let searching = false;
	let timeout: NodeJS.Timeout;

	let tiptap: Tiptap;
	let dishSearch: OperationResultStore<
		{
			dishes: Dish[];
		},
		AnyVariables
	> &
		Pausable;

	let ingredientsSearch: OperationResultStore<
		{
			ingredients: Ingredient[];
		},
		AnyVariables
	> &
		Pausable;

	function setEditType(index: number) {
		editType = index;
		if (tiptap) {
			tiptap.setContent(content.find((c) => c.lang === selectedLanguage)?.data ?? '');
		}
	}

	function setContent(event: any) {
		content = content.map((t) => {
			if (t.lang === selectedLanguage) {
				return {
					...t,
					data: event.detail
				};
			}
			return t;
		});
	}

	function setSelectedLanguage(lang: string) {
		locale.set(lang);
		selectedLanguage = lang;
		if (tiptap) {
			tiptap.setContent(content.find((c) => c.lang === selectedLanguage)?.data ?? '');
		}
	}

	function setContentInput(event: any) {
		content = content.map((t) => {
			if (t.lang === selectedLanguage) {
				return {
					...t,
					data: event.target.value
				};
			}
			return t;
		});
	}

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

	function setShortDescription(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		shortDescription = shortDescription.map((t) => {
			if (t.lang === selectedLanguage) {
				return {
					...t,
					data: event.currentTarget.value
				};
			}
			return t;
		});
	}

	const addIngredient = () => {
		ingredients = [{ note: '', quantity: 0, slug: '' }, ...ingredients];
	};

	const addVideos = () => {
		videos = ['', ...videos];
	};

	const updateVideo = (index: number, data: string) => {
		videos[index] = data;
	};

	const deleteVideo = (index: number) => {
		const newVideos = videos.filter((e, i) => i !== index);
		videos = [...newVideos];
	};

	const addRelatedDish = () => {
		relatedDishes = ['', ...relatedDishes];
	};

	const updateRelatedDish = (index: number, data: string) => {
		relatedDishes[index] = data;
	};

	const deleteRelatedDish = (index: number) => {
		const newRelatedDishes = relatedDishes.filter((e, i) => i !== index);
		relatedDishes = [...newRelatedDishes];
	};

	const deleteIngredient = (index: number) => {
		const newIngredients = ingredients.filter((e, i) => i !== index);
		ingredients = [...newIngredients];
	};

	const updateSlug = (index: number, data: string) => {
		ingredients[index].slug = data;
	};

	const updateNote = (index: number, data: string) => {
		ingredients[index].note = data;
	};

	const updateQuantity = (index: number, data: number) => {
		ingredients[index].quantity = data;
	};

	const searchIngredient = (filterText: string) => {
		ingredientsSearch = queryStore<{ ingredients: Ingredient[] }>({
			client,
			query: gql`
				query ($keyword: String, $page: Int, $limit: Int) {
					ingredients(keyword: $keyword, page: $page, limit: $limit) {
						_id
						slug
						title {
							lang
							data
						}
					}
				}
			`,
			variables: { keyword: filterText, page: 1, limit: 99999 },
			requestPolicy: 'cache-and-network'
		});
	};

	const searchDish = (filterText: string) => {
		dishSearch = queryStore<{ dishes: Dish[] }>({
			client,
			query: gql`
				query ($keyword: String, $page: Int, $limit: Int) {
					dishes(keyword: $keyword, page: $page, limit: $limit) {
						_id
						slug
						title {
							lang
							data
						}
					}
				}
			`,
			variables: { keyword: filterText, page: 1, limit: 99999 },
			requestPolicy: 'cache-and-network'
		});
	};

	const loadOptions = async (filterText: string) => {
		searching = true;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => searchIngredient(filterText), 300);
		return [];
	};

	const loadDishesOptions = async (filterText: string) => {
		searching = true;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => searchDish(filterText), 300);
		return [];
	};

	async function onSubmit() {
		const tags = tagsInput.split(',').map((item) => {
			return item.trim();
		});
		if (!slug) {
			const dto: CreateDishInput = {
				slug: slugInput,
				title,
				shortDescription,
				content,
				tags,
				preparationTime,
				cookingTime,
				difficultLevel,
				mealCategories: mealCategoriesSelected.map((e) => e.value),
				ingredientCategories: ingredientCategoriesSelected.map((e) => e.value),
				thumbnail,
				ingredients: ingredients,
				videos,
				relatedDishes
			};

			const result = mutationStore({
				client,
				query: gql`
					mutation ($createDishInput: CreateDishInput!) {
						createDish(createDishInput: $createDishInput) {
							_id
							slug
						}
					}
				`,
				variables: { createDishInput: dto }
			});
			result.subscribe((res) => {
				if (!res.fetching && !res.error) {
					showSuccess($_('successfully'), '200');
				} else if (!res.fetching && res.error) {
					showError(`${$_('fail')}: ${res.error.message}`, '500');
				}
			});
		} else {
			const dto: UpdateDishInput = {
				slug: slugInput,
				title,
				shortDescription,
				content,
				tags,
				preparationTime,
				cookingTime,
				difficultLevel,
				mealCategories: mealCategoriesSelected.map((e) => e.value),
				ingredientCategories: ingredientCategoriesSelected.map((e) => e.value),
				thumbnail,
				ingredients: ingredients,
				videos,
				relatedDishes
			};
			const result = mutationStore({
				client,
				query: gql`
					mutation ($updateDishInput: UpdateDishInput!) {
						updateDish(updateDishInput: $updateDishInput) {
							_id
							slug
						}
					}
				`,
				variables: { updateDishInput: dto }
			});
			result.subscribe((res) => {
				if (!res.fetching && !res.error) {
					showSuccess($_('successfully'), '200');
				} else if (!res.fetching && res.error) {
					showError(`${$_('fail')}: ${res.error.message}`, '500');
				}
			});
		}
	}

	const init = (dish?: Dish) => {
		if (dish) {
			slugInput = dish.slug;
			if (dish.title.length > 0) {
				title = dish.title as MultiLanguage<string>[];
			}
			if (dish.shortDescription.length > 0) {
				shortDescription = dish.shortDescription as MultiLanguage<string>[];
			}
			if (dish.content.length > 0) {
				content = dish.content as MultiLanguage<string>[];
				if (tiptap) {
					tiptap.setContent(content.find((c) => c.lang === selectedLanguage)?.data ?? '');
				}
			}
			if (dish.tags) {
				tagsInput = dish.tags.join(', ');
			}
			if (dish.preparationTime) {
				preparationTime = dish.preparationTime;
			}
			if (dish.cookingTime) {
				cookingTime = dish.cookingTime;
			}
			if (dish.difficultLevel) {
				difficultLevel = dish.difficultLevel;
			}
			mealCategoriesSelected = dish.mealCategories.map((e) => ({
				label: $_(e ?? ''),
				value: e ?? ''
			}));
			ingredientCategoriesSelected = dish.ingredientCategories.map((e) => ({
				label: $_(e ?? ''),
				value: e ?? ''
			}));
			if (dish.thumbnail) {
				thumbnail = dish.thumbnail;
			}
			videos = dish.videos as string[];
			if (dish.ingredients) {
				ingredients = dish.ingredients as IngredientsInDish[];
			}
			relatedDishes = dish.relatedDishes as string[];
		}
	};

	$: if (!$dish.fetching) {
		init($dish.data?.dish);
	}

	const client = getContextClient();
	const dish = queryStore<{ dish: Dish }>({
		client,
		query: gql`
			query ($slug: String!) {
				dish(slug: $slug) {
					_id
					title {
						lang
						data
					}
					slug
					shortDescription {
						lang
						data
					}
					content {
						lang
						data
					}
					tags
					preparationTime
					cookingTime
					difficultLevel
					mealCategories
					ingredientCategories
					thumbnail
					videos
					relatedDishes
					ingredients {
						quantity
						slug
						note
					}
				}
			}
		`,
		variables: { slug }
	});

	onMount(() => {});
</script>

<svelte:head>
	<title>{$_('dish')}: {slug ?? $_('create-new')}</title>
	<meta name="description" content="hôm nay ăn gì" />
</svelte:head>

<section id="dish-detail" class="p-5">
	<div class="flex">
		<a
			href="/admin/dish"
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
				value={title.find((t) => t.lang === selectedLanguage)?.data}
				on:change={setTitle}
				type="text"
				id="title"
				name="title"
				placeholder={$_('title')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				required />
		</div>

		<div class="mb-6">
			<label
				for="shortDescription"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('short-description')}</label>
			<input
				value={shortDescription.find((t) => t.lang === selectedLanguage)?.data}
				on:change={setShortDescription}
				type="text"
				id="shortDescription"
				name="shortDescription"
				placeholder={$_('short-description')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				required />
		</div>

		<div class="mb-6">
			<label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('content')}</label>
			<div class="w-full">
				<div class="relative right-0 mb-1">
					<ul
						class="relative flex list-none flex-wrap rounded-xl bg-blue-gray-50/60 p-1 border"
						data-tabs="tabs"
						role="list">
						<li
							class="z-30 flex-auto text-center rounded-xl transition duration-300 ease-in {editType ===
								1 && 'bg-gray-400'}">
							<button
								on:click={() => setEditType(1)}
								type="button"
								class="text-slate-700 z-30 mb-0 fle gap-2 x w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
								data-tab-target=""
								role="tab"
								aria-selected="true">
								<i class="fa-regular fa-newspaper text-gray-300" />
								<span class="ml-1 text-gray-300">{$_('editor')}</span>
							</button>
						</li>
						<li
							class="z-30 flex-auto text-center rounded-xl transition duration-300 ease-in {editType ===
								2 && 'bg-gray-400'}">
							<button
								on:click={() => setEditType(2)}
								type="button"
								class="text-slate-700 z-30 mb-0 flex gap-2 w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
								data-tab-target=""
								role="tab"
								aria-selected="false">
								<i class="fa-solid fa-code text-gray-300" />
								<span class="ml-1 text-gray-300">{$_('raw-html')}</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
			{#if editType === 1}
				<Tiptap
					bind:this={tiptap}
					content={content.find((c) => c.lang === selectedLanguage)?.data}
					on:valueHtml={setContent} />
			{:else if editType === 2}
				<textarea
					value={content.find((c) => c.lang === selectedLanguage)?.data}
					on:change={setContentInput}
					minlength="5"
					id="content"
					name="content"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required />
				<h3 class="text-white py-3">{$_('preview')}</h3>
				<div class="p-5 bg-white rounded-lg overflow-auto h-[60vh]">
					{@html content.find((c) => c.lang === selectedLanguage)?.data}
				</div>
			{/if}
		</div>

		<div class="mb-6">
			<label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('ingredients')}</label>
			<button
				type="button"
				on:click={addIngredient}
				class="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mb-2">
				{$_('add')} +
			</button>
			{#each ingredients as ingredient, i}
				<div class="grid grid-cols-12 gap-5 mb-2">
					<div class="col-span-4">
						<label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Slug</label>
						<Select
							value={ingredient.slug}
							class="rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600 dark:text-white"
							{loadOptions}
							items={$ingredientsSearch?.data?.ingredients.map((e) => ({
								label: e.title.find((t) => t?.lang === selectedLanguage)?.data,
								value: e.slug
							}))}
							on:change={(event) => updateSlug(i, event.detail.value)}
							placeholder={$_('input-text-to-search')} />
					</div>
					<div class="col-span-2">
						<label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>{$_('quantity')}</label>
						<input
							value={ingredient.quantity}
							on:change={(event) => updateQuantity(i, parseFloat(event.currentTarget.value))}
							type="number"
							id={`quantity-${i}`}
							name={`quantity-${i}`}
							placeholder={$_('quantity')}
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div class="col-span-5">
						<label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>{$_('note')}</label>
						<input
							value={ingredient.note}
							on:change={(event) => updateNote(i, event.currentTarget.value)}
							type="text"
							id={`note-${i}`}
							name={`note-${i}`}
							placeholder={$_('note')}
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div class="col-span-1 mt-auto">
						<button
							type="button"
							on:click={() => deleteIngredient(i)}
							class="px-5 py-2.5 font-medium bg-red-500 hover:bg-red-400 hover:text-gray-200 transition duration-300 text-white rounded-lg text-sm">
							<i class="fa-solid fa-trash-can" />
						</button>
					</div>
				</div>
			{/each}
		</div>

		<div class="mb-6">
			<label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Tags</label>
			<input
				bind:value={tagsInput}
				type="text"
				id="tags"
				name="tags"
				placeholder={$_('tags-placeholder')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="mb-6">
			<label
				for="preparation-time"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('preparation-time')}</label>
			<input
				bind:value={preparationTime}
				type="number"
				id="preparation-time"
				name="preparation-time"
				placeholder={$_('in-minute')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="mb-6">
			<label for="cooking-time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('cooking-time')}</label>
			<input
				bind:value={cookingTime}
				type="text"
				id="cooking-time"
				name="cooking-time"
				placeholder={$_('in-minute')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>

		<div class="mb-6">
			<label
				for="difficult-level"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('difficult-level')}</label>
			<select
				bind:value={difficultLevel}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option selected value={null}>{$_('difficult-level')}</option>
				{#each Object.values(DIFFICULT_LEVELS) as level, i}
					<option value={level}>{$_(level)}</option>
				{/each}
			</select>
		</div>

		<div class="mb-6">
			<label
				for="meal-categories"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('meal-categories')}</label>
			<Select
				--multi-item-bg="#29313d"
				--multi-item-outline="#29313d"
				placeholder={$_('meal-categories')}
				multiple
				showChevron
				class="rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600 dark:text-white"
				bind:value={mealCategoriesSelected}
				items={Object.values(MEAL_CATEGORIES).map((v) => ({
					label: $_(v),
					value: v
				}))} />
		</div>

		<div class="mb-6">
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
			<label for="thumbnail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('thumbnail')}</label>
			<input
				bind:value={thumbnail}
				type="text"
				id="thumbnail"
				name="thumbnail"
				placeholder={$_('URL')}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
			<div class="flex my-3">
				{#if thumbnail !== ''}
					<img src={thumbnail} class="w-20 h-auto rounded-lg" alt="thumbnail" />
				{/if}
			</div>
		</div>

		<div class="mb-6">
			<label for="videos" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('videos')}</label>
			<button
				type="button"
				on:click={addVideos}
				class="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mb-2">
				{$_('add')} +
			</button>
			{#each videos as video, i}
				<div class="flex gap-2">
					<input
						value={video}
						on:change={(event) => updateVideo(i, event.currentTarget.value)}
						type="text"
						id={`cooking-time-${i}`}
						name={`cooking-time-${i}`}
						placeholder={$_('youtube-url')}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" />
					<button
						type="button"
						on:click={() => deleteVideo(i)}
						class="px-5 py-2.5 font-medium bg-red-500 hover:bg-red-400 hover:text-gray-200 transition duration-300 text-white rounded-lg text-sm mb-2">
						<i class="fa-solid fa-trash-can" />
					</button>
				</div>
			{/each}
		</div>

		<div class="mb-6">
			<label
				for="relatedDishes"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('related-dishes')}</label>
			<button
				type="button"
				on:click={addRelatedDish}
				class="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mb-2">
				{$_('add')} +
			</button>
			{#each relatedDishes as relatedDish, i}
				<div class="flex gap-2">
					<Select
						value={relatedDish}
						class="rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600 dark:text-white"
						loadOptions={loadDishesOptions}
						items={$dishSearch?.data?.dishes.map((e) => ({
							label: e.title.find((t) => t?.lang === selectedLanguage)?.data,
							value: e.slug
						}))}
						on:change={(event) => updateRelatedDish(i, event.detail.value)}
						placeholder={$_('input-text-to-search')} />
					<button
						type="button"
						on:click={() => deleteRelatedDish(i)}
						class="px-5 py-2.5 font-medium bg-red-500 hover:bg-red-400 hover:text-gray-200 transition duration-300 text-white rounded-lg text-sm mb-2">
						<i class="fa-solid fa-trash-can" />
					</button>
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
