<script lang="ts">
	import { _ } from 'svelte-i18n';
	import WheelOfFortune from '$lib/components/wheel-of-fortune/WheelOfFortune.svelte';
	import type { WheelOfFortuneResult } from '$lib/type/wheel-of-fortune.type';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import type { PageData } from './$types';
	import DishCard from '$lib/components/dish/dish-card.svelte';
	import type { Dish } from '../../../../gql/graphql';
	import WheelDishPicker from '$lib/components/wheel-of-fortune/WheelDishPicker.svelte';
	import { DishService } from '$lib/services/dish.service';
	import { PUBLIC_ENDPOINT } from '$env/static/public';
	import Spinner from '$lib/components/common/Spinner.svelte';
	import SearchBar from '$lib/components/searchBar.svelte';

	export let data: PageData;
	const { dishes, lang } = data;
	const selectedLanguage = lang === 'en-US' ? 'en' : lang;
	let selectedDish = dishes[dishes.length - 1];
	let actualDishes = dishes;
	let searchedDishes = dishes;
	let loading = false;

	const onResult = (result: WheelOfFortuneResult) => {
		selectedDish = result.result;
	};

	const onDelete = (result: Dish) => {
		actualDishes = [...actualDishes.filter((e) => e._id !== result._id)];
	};

	const getDishes = async (keyword: string) => {
		loading = true;
		const result = await DishService.find(PUBLIC_ENDPOINT, 1, 999999, keyword);
		loading = false;
		searchedDishes = result.data;
	};

	const onItemAdded = (dish: Dish) => {
		actualDishes = [...actualDishes, dish];
	};
</script>

<svelte:head>
	<title>{$_('metadata.wheel-of-fortune.title')}</title>
	<meta name="description" content={$_('metadata.wheel-of-fortune.description')} />
	<meta name="keywords" content="ăn gì, what to eat, eat what, ăn chi" />
	<meta name="robots" content="index,follow" />
</svelte:head>

<div class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-7 p-3 flex flex-col gap-2">
		<WheelOfFortune
			items={actualDishes}
			{selectedLanguage}
			on:onDelete={(result) => {
				onDelete(result.detail);
			}}
			on:onResult={(result) => {
				onResult(result.detail);
			}} />
		<div class="rounded-md bg-blue-50 md:max-w-2xl md:px-8">
			<div class="flex justify-between py-3">
				<div class="flex">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-blue-400"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
						</svg>
					</div>
					<div class="self-center ml-3">
						<span class="text-blue-500 font-semibold"> {$_('info')} </span>
						<div class="text-blue-500">
							<div class="mt-1">{$_('wheel-of-fortune-delete-tips')}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-span-12 md:col-span-5">
		<div class="p-3 flex flex-col gap-2 justify-center h-full">
			<h1 class="text-purple-900 font-bold">{$_('the-result')}</h1>
			<DishCard {selectedLanguage} dish={selectedDish} />
		</div>
	</div>
</div>
<hr />
<div class="p-3 shadow-lg">
	<div class="flex justify-center bg-gray-100 rounded-lg mb-5">
		<SearchBar
			{selectedLanguage}
			on:onResult={(event) => {
				getDishes(event.detail);
			}} />
	</div>
	{#if loading}
		<Spinner />
	{:else}
		<WheelDishPicker
			inWheelDishes={actualDishes}
			dishes={searchedDishes}
			{selectedLanguage}
			on:onItemAdded={(result) => onItemAdded(result.detail)} />
	{/if}
</div>
