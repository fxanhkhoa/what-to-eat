<script lang="ts">
	import type { Ingredient } from '../../../gql/graphql';
	import Category from '../utility/category.svelte';
	import bg from '$lib/images/purple-background.jpeg';
	import { _ } from 'svelte-i18n';

	export let ingredient: Ingredient;
	export let selectedLanguage: string;

	let flip = false;
</script>

<button
	on:click={() => {
		flip = !flip;
	}}
	class="w-full h-auto relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-10 max-w-sm mx-auto mt-24 {flip
		? 'animate-hFlip gap-3'
		: 'animate-hFlipBack'}">
	{#if !flip}
		<img
			src={ingredient.images[0]}
			alt={ingredient.title.find((i) => i?.lang === selectedLanguage)?.data}
			class="absolute inset-0 h-full w-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
		<h3 class="z-10 mt-3 text-3xl font-bold text-white">
			{ingredient.title.find((i) => i?.lang === selectedLanguage)?.data}
		</h3>
		<div class="z-10 gap-y-1 overflow-hidden text-sm leading-6">
			<Category categories={ingredient.ingredientCategory} />
		</div>
	{:else}
		<img
			src={bg}
			alt="Ingredient information"
			class="absolute inset-0 h-full w-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
		<div class="z-10 grid grid-cols-4 gap-2">
			{#each ingredient.images as src}
				<div class="col-span-1">
					<img alt="" {src} class="rounded-lg w-auto" />
				</div>
			{/each}
		</div>
		<div class="z-10 flex gap-2 text-gray-400">
			<span class="text-md font-bold drop-shadow-lg"
				>{$_('reference-over')} {ingredient.weight} {ingredient.measure}</span>
		</div>
		<div class="z-10 grid grid-cols-12 gap-2 text-white">
			<div class="col-span-6 md:col-span-6 text-left">
				{$_('calories')}: {ingredient.calories}
			</div>
			<div class="col-span-6 md:col-span-6 text-left">
				{$_('carbohydrate')}: {ingredient.carbohydrate}
			</div>
			<div class="col-span-6 md:col-span-6 text-left">
				{$_('fat')}: {ingredient.fat}
			</div>
			<div class="col-span-6 md:col-span-6 text-left">
				{$_('protein')}: {ingredient.protein}
			</div>
			<div class="col-span-6 md:col-span-6 text-left">
				{$_('cholesterol')}: {ingredient.cholesterol}
			</div>
			<div class="col-span-6 md:col-span-6 text-left">
				{$_('sodium')}: {ingredient.sodium}
			</div>
		</div>
		<!-- <h3 class="z-10 mt-3 text-3xl font-bold text-white">
			{ingredient.title.find((i) => i?.lang === selectedLanguage)?.data}
		</h3>
		<div class="z-10 gap-y-1 overflow-hidden text-sm leading-6">
			<Category categories={ingredient.ingredientCategory} />
		</div> -->
	{/if}
</button>
