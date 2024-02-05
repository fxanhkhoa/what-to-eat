<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	onMount(() => {});
</script>

<svelte:head>
	<title>Admin</title>
	<meta name="description" content="hôm nay ăn gì" />
</svelte:head>

<section id="main" class="p-5 md:px-20 py-5">
	<div class="grid grid-cols-12 gap-5 justify-center items-center">
		<div class="col-span-6 md:col-span-4 flex gap-5">
			<a
				href="/admin/dish"
				class="w-full flex flex-col justify-center items-center gap-5 h-32 text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black opacity-70 hover:opacity-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none transition-all duration-300">
				<i class="fa-solid fa-bowl-food fa-2xl" />
				<span class="font-bold">{$_('dish-management')}</span>
			</a>
		</div>
		<div class="col-span-6 md:col-span-4 flex gap-5">
			<a
				href="/admin/ingredient"
				class="w-full flex flex-col justify-center items-center gap-5 h-32 text-white bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 opacity-70 hover:opacity-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none transition-all duration-300">
				<i class="fa-solid fa-pepper-hot fa-2xl" />
				<span class="font-bold">{$_('ingredient-management')}</span>
			</a>
		</div>
	</div>
</section>
