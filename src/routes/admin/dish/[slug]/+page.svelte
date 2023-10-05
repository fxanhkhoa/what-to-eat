<script lang="ts">
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';

	export let data: PageData;
	let editType = 1;

	function setEditType(index: number) {
		editType = index;
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
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="mi-y"
				required />
		</div>

		<div class="mb-6">
			<label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Title</label>
			<input
				type="text"
				id="title"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				required />
		</div>

		<div class="mb-6">
			<label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Content</label>
			<div class="w-full">
				<div class="relative right-0">
					<ul
						class="relative flex list-none flex-wrap rounded-xl bg-blue-gray-50/60 p-1"
						data-tabs="tabs"
						role="list">
						<li class="z-30 flex-auto text-center rounded-xl transition duration-300 ease-in {editType === 1 && 'bg-gray-400'}">
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
						<li class="z-30 flex-auto text-center rounded-xl transition duration-300 ease-in {editType === 2 && 'bg-gray-400'}">
							<button
								on:click={() => setEditType(2)}
								type="button"
								class="text-slate-700 z-30 mb-0 flex gap-2 w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
								data-tab-target=""
								role="tab"
								aria-selected="false">
								<i class="fa-solid fa-code text-gray-300"></i>
								<span class="ml-1 text-gray-300">{$_('raw-html')}</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
			<input
				type="text"
				id="content"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				required />
		</div>

		<button
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Submit</button>
	</form>
</section>