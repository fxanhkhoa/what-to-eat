<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Tiptap from '$lib/Tiptap.svelte';
	import { DIFFICULT_LEVELS, INGREDIENT_CATEGORIES, MEAL_CATEGORIES } from '$lib/constant/dish';
	import MultiSelect from 'svelte-multiselect';
	import type { Dish } from '$lib/type/dish.type';
	import { database } from '../../../../firebase/firebase-server';
	import { collection, getDocs } from 'firebase/firestore';

	let editType = 1;
	let content = '';
	let difficultLevel = '';
	let mealCategoriesSelected: string[] = [];
	let ingredientCategoriesSelected: string[] = [];
	let thumbnail = '';

	function setEditType(index: number) {
		editType = index;
	}

	function handleValueChange(event: any) {
		content = event.detail;
	}

	async function onSubmit() {
		const dto: Dish = {
			slug: '',
			title: '',
			content: '',
			tags: [],
			preparationTime: 0,
			cookingTime: 0,
			difficultLevel: '',
			mealCategories: [],
			ingredientCategories: [],
			thumbnail: ''
		};

		const querySnapshot = await getDocs(collection(database, 'meal'));
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`);
			console.log(doc.data())
		});
	}
</script>

<svelte:head>
	<link
		href="./../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
		rel="stylesheet" />
</svelte:head>

<section id="dish-detail" class="p-5">
	<form class="shadow-lg p-5">
		<div class="mb-6">
			<label for="slug" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Slug</label>
			<input
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
				type="text"
				id="title"
				name="title"
				placeholder="Mì Ý"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				required />
		</div>

		<div class="mb-6">
			<label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>{$_('content')}</label>
			<div class="w-full">
				<div class="relative right-0">
					<ul
						class="relative flex list-none flex-wrap rounded-xl bg-blue-gray-50/60 p-1"
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
				<Tiptap {content} on:valueHtml={handleValueChange} />
			{:else if editType === 2}
				<input
					value={content}
					type="text"
					id="content"
					name="content"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required />
				<h3 class="text-white py-3">{$_('preview')}</h3>
				<div class="p-5 bg-white rounded-lg">{@html content}</div>
			{/if}

			<div class="my-6">
				<label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Tags</label>
				<input
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
					{#each DIFFICULT_LEVELS as level, i}
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
					options={MEAL_CATEGORIES} />
			</div>

			<div class="my-6">
				<label
					for="ingredient-categories"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>{$_('ingredient-categories')}</label>
				<MultiSelect
					ulSelectedClass="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					bind:selected={ingredientCategoriesSelected}
					options={INGREDIENT_CATEGORIES} />
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
