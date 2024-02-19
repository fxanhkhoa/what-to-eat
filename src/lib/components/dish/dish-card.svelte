<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { DIFFICULT_LEVELS } from '$lib/enum/dish.enum';
	import type { Dish } from '../../../gql/graphql';
	import DifficultyLevel from '../utility/difficulty-level.svelte';

	export let dish: Dish;
	export let selectedLanguage: string;
</script>

<div
	class="col-span-12 md:col-span-6 xl:col-span-6 2xl:col-span-4 grid grid-cols-12 shadow-lg rounded-3xl">
	<div class="col-span-5 pr-5">
		<img src={dish.thumbnail} alt={dish.slug} class="object-cover object-center rounded-l-lg w-full h-full" />
	</div>
	<div class="col-span-5 flex flex-col gap-2 py-5 pr-5">
		<DifficultyLevel difficultLevel={dish.difficultLevel ?? DIFFICULT_LEVELS.EASY} />

		<h4 class="font-bold">
			{dish.title?.find((t) => t?.lang === selectedLanguage)?.data}
		</h4>
		<span class="hidden md:block text-gray-400 text-left"
			>{dish.shortDescription?.find((s) => s?.lang === selectedLanguage)?.data?.substring(0, 100) ??
				''}</span>
		<span class="md:hidden text-gray-400 text-left"
		>{dish.shortDescription?.find((s) => s?.lang === selectedLanguage)?.data?.substring(0, 30) ??
			''}...</span>
		<div class="flex gap-1">
			<i class="fa-solid fa-stopwatch my-auto" />
			<span class="ml-1">{(dish?.preparationTime ?? 0) + (dish?.cookingTime ?? 0)}</span>
			<span>{$_('minute')}</span>
		</div>
	</div>
	<div class="col-span-2 relative">
		<a
			href={`/${selectedLanguage}/dish/${dish.slug}`}
			class="relative w-full h-full inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-l rounded-r-3xl group border-gray-100">
			<span
				class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full group-hover:bg-purple-500 group-hover:translate-x-0 ease">
				<i class="fa-solid fa-arrow-right" />
			</span>
			<span
				class="absolute hidden md:flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease"
				>{$_('discover')}</span>
			<span
				class="absolute flex md:hidden items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease"
				><i class="fa-solid fa-right-long" /></span>
			<span class="relative invisible">{$_('discover')}</span>
		</a>
	</div>
</div>
