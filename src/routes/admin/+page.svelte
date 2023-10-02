<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';

	export let data: PageData;

	onMount(() => {});
</script>

<svelte:head>
	<title>Admin</title>
	<meta name="description" content="hôm nay ăn gì" />
	<link
		href="./../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
		rel="stylesheet" />
</svelte:head>

<section id="main" class="p-5 md:px-20 py-5">
	<div class="flex flex-col gap-5 justify-center items-center">
		<div class="flex gap-5">
			<a
				href="/admin/dish"
				class="flex flex-col justify-center items-center gap-5 h-32 text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black opacity-70 hover:opacity-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none transition-all duration-300">
				<i class="fa-solid fa-bowl-food fa-2xl" />
				<span class="font-bold">{$_('dish-management')}</span>
			</a>
		</div>
	</div>
</section>
