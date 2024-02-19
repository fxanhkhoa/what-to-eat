<script lang="ts">
	import type { Dish } from '../../../gql/graphql';
	import { _ } from 'svelte-i18n';
	import Category from '../utility/category.svelte';
	import { createEventDispatcher } from 'svelte';

	export let dishes: Dish[] = [];
	export let inWheelDishes: Dish[] = [];
	export let selectedLanguage = 'en';

	const dispatch = createEventDispatcher();

	const addItemToWheel = (item: Dish) => {
		dispatch('onItemAdded', item);
	};
</script>

<div class="grid grid-cols-12 gap-5 animate-flipInHorBottom">
	{#each dishes as dish}
		<div class="col-span-12 md:col-span-4 xl:col-span-3 flex justify-center md:max-h-screen px-2">
			<div class="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
				<div class="max-w-md mx-auto h-full flex flex-col">
					<div
						class="h-[236px]"
						style={`background-image:url(${dish.thumbnail});background-size:cover;background-position:center`} />
					<div class="p-4 sm:p-6 flex flex-col justify-between max-h-full flex-1">
						<div>
							<p class="flex justify-between mb-1">
								<span class="font-bold text-gray-700 text-[22px] leading-7">
									{dish.title.find((e) => e?.lang === selectedLanguage)?.data}
								</span>
								<input
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 my-auto"
									type="checkbox"
									disabled
									checked={inWheelDishes.find((e) => e._id === dish._id) ? true : false} />
							</p>
							<Category categories={dish.mealCategories} />
							<p class="text-[#7C7C80] font-[15px] mt-6">
								{dish.shortDescription
									.find((e) => e?.lang === selectedLanguage)
									?.data?.slice(0, 90)}...
							</p>
						</div>

						<div class="flex flex-col">
							<button
								on:click={() => addItemToWheel(dish)}
								class="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-purple-500 rounded-[14px] hover:bg-purple-700 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80 text-white">
								<i class="fa-solid fa-plus" />
								{$_('add-to-wheel')}
							</button>
							<a
								target="_blank"
								href={`/${selectedLanguage}/dish/${dish.slug}`}
								class="block mt-1.5 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80 text-gray-500">
								{$_('discover')}
								<i class="fa-solid fa-right-long" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
