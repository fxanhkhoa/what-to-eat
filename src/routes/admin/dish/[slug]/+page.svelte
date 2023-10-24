<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Tiptap from '$lib/Tiptap.svelte';
	import MultiSelect from 'svelte-multiselect';
	import type { Dish } from '$lib/type/dish.type';
	import { database } from '../../../../firebase/firebase-server';
	import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
	import { toast } from '@zerodevx/svelte-toast';
	import vietnamese from '$lib/images/vietnamese.webp';
	import english from '$lib/images/english.webp';
	import type { MultiLanguage } from '$lib/type/multi-language.type';
	import { initStringMultiLanguage } from '$lib/utils/multi-language';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { DIFFICULT_LEVELS, INGREDIENT_CATEGORIES, MEAL_CATEGORIES } from '$lib/enum/dish.enum';

	export let data: PageData;
	const { slug } = data;

	let editType = 1;
	let title: MultiLanguage<string>[] = initStringMultiLanguage();
	let shortDescription: MultiLanguage<string>[] = initStringMultiLanguage();
	let selectedLanguage = 'en';
	let content: MultiLanguage<string>[] = initStringMultiLanguage();
	let difficultLevel = '';
	let mealCategoriesSelected: string[] = [];
	let ingredientCategoriesSelected: string[] = [];
	let thumbnail = '';
	let slugInput = '';
	let tagsInput = '';
	let preparationTime = 0;
	let cookingTime = 0;

	let tiptap: Tiptap;

	function setEditType(index: number) {
		editType = index;
		tiptap.setContent(content.find((c) => c.language === selectedLanguage)?.data ?? '');
	}

	function setContent(event: any) {
		content = content.map((t) => {
			if (t.language === selectedLanguage) {
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
		tiptap.setContent(content.find((c) => c.language === selectedLanguage)?.data ?? '');
	}

	function setContentInput(event: any) {
		content = content.map((t) => {
			if (t.language === selectedLanguage) {
				return {
					...t,
					data: event.target.value
				};
			}
			return t;
		});
	}

	function setTitle(event: any) {
		title = title.map((t) => {
			if (t.language === selectedLanguage) {
				return {
					...t,
					data: event.target.value
				};
			}
			return t;
		});
	}

	function setShortDescription(event: any) {
		shortDescription = shortDescription.map((t) => {
			if (t.language === selectedLanguage) {
				return {
					...t,
					data: event.target.value
				};
			}
			return t;
		});
	}

	async function onSubmit() {
		const tags = tagsInput.split(',').map((item) => {
			return item.trim();
		});
		const dto: Dish = {
			slug: slugInput,
			title,
			shortDescription,
			content,
			tags,
			preparationTime,
			cookingTime,
			difficultLevel,
			mealCategories: mealCategoriesSelected,
			ingredientCategories: ingredientCategoriesSelected,
			thumbnail,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};
		try {
			const dishesRef = collection(database, 'dishes');
			const docRef = await setDoc(doc(dishesRef, dto.slug), dto);
			console.log('Document written with ID: ', docRef);
			toast.push($_('successfully'), {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
		} catch (e) {
			console.error('Error adding document: ', e);
			toast.push($_('fail'), {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': '#d40202',
					'--toastBarBackground': '#b30000'
				}
			});
		}
	}

	const getDish = async () => {
		if (!slug) {
			return;
		}
		const docRef = doc(database, 'dishes', slug);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const dish: Dish = docSnap.data() as Dish;
			slugInput = dish.slug;
			title = dish.title;
			shortDescription = dish.shortDescription;
			content = dish.content;
			tiptap.setContent(content.find((c) => c.language === selectedLanguage)?.data ?? '');
			tagsInput = dish.tags.join(',');
			preparationTime = dish.preparationTime;
			cookingTime = dish.cookingTime;
			difficultLevel = dish.difficultLevel;
			mealCategoriesSelected = dish.mealCategories;
			ingredientCategoriesSelected = dish.ingredientCategories;
			thumbnail = dish.thumbnail;
		} else {
			// docSnap.data() will be undefined in this case
			goto('/admin/dish');
		}
	};

	onMount(() => {
		if (slug) {
			getDish();
		}
	});
</script>

<svelte:head>
	<title>Dish: {slug}</title>
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
			<label
				for="shortDescription"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('short-description')}</label>
			<input
				value={shortDescription.find((t) => t.language === selectedLanguage)?.data}
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
					content={content.find((c) => c.language === selectedLanguage)?.data}
					on:valueHtml={setContent} />
			{:else if editType === 2}
				<textarea
					value={content.find((c) => c.language === selectedLanguage)?.data}
					on:change={setContentInput}
					minlength="5"
					id="content"
					name="content"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required />
				<h3 class="text-white py-3">{$_('preview')}</h3>
				<div class="p-5 bg-white rounded-lg">
					{@html content.find((c) => c.language === selectedLanguage)?.data}
				</div>
			{/if}

			<div class="my-6">
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

			<div class="my-6">
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

			<div class="my-6">
				<label
					for="cooking-time"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>{$_('cooking-time')}</label>
				<input
					bind:value={cookingTime}
					type="text"
					id="cooking-time"
					name="cooking-time"
					placeholder={$_('in-minute')}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
			</div>

			<div class="my-6">
				<label
					for="difficult-level"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>{$_('difficult-level')}</label>
				<select
					bind:value={difficultLevel}
					class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
					<option selected value={null}>{$_('difficult-level')}</option>
					{#each Object.values(DIFFICULT_LEVELS) as level, i}
						<option value={level}>{level}</option>
					{/each}
				</select>
			</div>

			<div class="my-6">
				<label
					for="meal-categories"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>{$_('meal-categories')}</label>
				<MultiSelect
					ulSelectedClass="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					bind:selected={mealCategoriesSelected}
					options={Object.values(MEAL_CATEGORIES)} />
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

			<div class="my-6">
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
		</div>

		<button
			on:click={onSubmit}
			type="button"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Submit</button>
	</form>
</section>
