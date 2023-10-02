<script lang="ts">
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';

	export let data: PageData;
</script>

<section id="dish" class="p-5">
	<div class="flex justify-between">
		<h1>{$_('dish-management')}</h1>
		<div class="flex">
			<a
				href="/admin/dish/null"
				class="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
				<span
					class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700" />
				<span
					class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease" />
				<span class="relative text-white">+ {$_('add')}</span>
			</a>
		</div>
	</div>
	<div class="grid grid-cols-12 gap-5">
		<div class="col-span-12 md:col-span-6 lg:col-span-4" />
	</div>
</section>
