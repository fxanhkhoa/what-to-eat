<script lang="ts">
	import { DISH_DIFFICULTY_BADGE } from '$lib/constant/dish';
	import { INGREDIENT_CATEGORIES, MEAL_CATEGORIES } from '$lib/enum/dish.enum';
	import type { DishFilter } from '$lib/type/dish.type';
	import { createEventDispatcher } from 'svelte';
	import Badge from '../common/Badge.svelte';
	import Multiselect from '../common/Multiselect.svelte';
	import RangeSlider from '../common/RangeSlider.svelte';
	import Tooltip from '../common/Tooltip.svelte';
	import SearchBar from '../searchBar.svelte';
	import { _ } from 'svelte-i18n';

	export let selectedLanguage = 'en';
	export let filter: DishFilter = {};

	const dispatch = createEventDispatcher();
	const mealCategoriesOptions: Record<string, { label: string; value: string }[]> = {
		'-': Object.values(MEAL_CATEGORIES).map((e) => ({
			label: $_(e),
			value: e
		}))
	};

	const ingredientCategoriesOptions: Record<string, { label: string; value: string }[]> = {
		'-': Object.values(INGREDIENT_CATEGORIES).map((e) => ({
			label: $_(e),
			value: e
		}))
	};

	const onKeyword = (keyword: string) => {
		console.log(keyword);
		filter.keyword = keyword;
	};

	const onPreparationTime = (values: number[]) => {
		filter.preparationTimeFrom = values[0];
		filter.preparationTimeTo = values[1];
	};

	const onCookingTIme = (values: number[]) => {
		filter.cookingTimeFrom = values[0];
		filter.cookingTimeTo = values[1];
	};

	const onSelectDifficulty = (difficulty: string) => {
		if (!filter.difficultLevels) {
			filter.difficultLevels = [];
		}
		if (filter.difficultLevels?.includes(difficulty)) {
			filter.difficultLevels = filter.difficultLevels.filter((e) => e !== difficulty);
		} else {
			filter.difficultLevels = [...filter.difficultLevels, difficulty];
		}
	};

	const onMealCategoriesChange = (values: string[]) => {
		filter.mealCategories = values;
	};

	const onIngredientCategoriesChange = (values: string[]) => {
		filter.ingredientCategories = values;
	};

	const onSearch = () => {
		dispatch('search', filter);
	};
</script>

<div class="flex flex-col gap-2 p-1 pb-3 from-slate-50 to-slate-100 bg-gradient-to-br rounded-lg">
	<div class="mt-3">
		<SearchBar
			{selectedLanguage}
			on:textChange={(result) => {
				onKeyword(result.detail);
			}}
			on:onResult={(result) => onKeyword(result.detail)}
			value={filter.keyword ?? ''} />
	</div>

	<hr />

	<h6 class="mb-0.5 font-medium text-purple-900 px-3 text-sm">
		<Tooltip text={$_('in-minute')}>
			<i class="fa-solid fa-hourglass-end my-auto" />
			<span>{$_('preparation-time')}</span>
		</Tooltip>
	</h6>
	<div class="px-5">
		<RangeSlider
			min={1}
			max={240}
			on:valueChange={(result) => onPreparationTime(result.detail)}
			defaultValue={[filter.preparationTimeFrom ?? 1, filter.preparationTimeTo ?? 60]} />
	</div>

	<h6 class="mb-0.5 font-medium text-purple-900 px-3 text-sm">
		<Tooltip text={$_('in-minute')}>
			<i class="fa-regular fa-clock my-auto" />
			<span>{$_('cooking-time')}</span>
		</Tooltip>
	</h6>
	<div class="px-5">
		<RangeSlider
			min={1}
			max={240}
			on:valueChange={(result) => onCookingTIme(result.detail)}
			defaultValue={[filter.cookingTimeFrom ?? 1, filter.cookingTimeTo ?? 60]} />
	</div>

	<hr />

	<div class="flex gap-2 mt-0.5 pl-2">
		{#each DISH_DIFFICULTY_BADGE as difficulty}
			<button
				on:click={() => onSelectDifficulty(difficulty.name)}
				class="hover:drop-shadow-lg transition-all duration-300 rounded-lg"
				class:drop-shadow-lg={filter.difficultLevels?.includes(difficulty.name)}
				class:border-2={filter.difficultLevels?.includes(difficulty.name)}
				class:border-purple-400={filter.difficultLevels?.includes(difficulty.name)}>
				<Badge color={difficulty.color}>{$_(difficulty.name)}</Badge>
			</button>
		{/each}
	</div>

	<hr />

	<div class="px-2">
		<Multiselect
			labelText={$_('meal-categories')}
			options={mealCategoriesOptions}
			defaultValues={filter.mealCategories ?? []}
			on:selectedChange={(result) => {
				onMealCategoriesChange(result.detail);
			}} />
	</div>

	<div class="px-2">
		<Multiselect
			labelText={$_('ingredient-categories')}
			options={ingredientCategoriesOptions}
			defaultValues={filter.ingredientCategories ?? []}
			on:selectedChange={(result) => {
				onIngredientCategoriesChange(result.detail);
			}} />
	</div>

	<div class="flex px-2 mt-2">
		<button
			on:click={onSearch}
			class="w-full px-5 py-2.5 font-medium bg-purple-100 hover:bg-purple-200 hover:text-purple-600 text-purple-500 rounded-lg text-sm transition-all duration-300">
			<i class="fa fa-search" />
			<span class="font-semibold">
				{$_('search')}
			</span>
		</button>
	</div>
</div>
