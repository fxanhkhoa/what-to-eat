<script lang="ts">
	import type { MultiLanguage } from '$lib/type/multi-language.type';
	import { initStringMultiLanguage } from '$lib/utils/multi-language';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _, locale } from 'svelte-i18n';
    import vietnamese from '$lib/images/vietnamese.webp';
	import english from '$lib/images/english.webp';

	export let data: PageData;
	const { ingredient } = data;
	let selectedLanguage = 'en';
	let title: MultiLanguage<string>[] = initStringMultiLanguage();

	const init = () => {};

	function setSelectedLanguage(lang: string) {
		locale.set(lang);
		selectedLanguage = lang;
	}

	onMount(() => {
		if (ingredient) {
			init();
		}
	});
</script>

<svelte:head>
	<title>Ingredient: {ingredient?.slug}</title>
	<meta
		name="description"
		content={ingredient?.title.find((t) => t.language === selectedLanguage)?.data} />
</svelte:head>

<section id="main" class="p-5">
	<div class="flex">
		<a
			href="/admin/ingredient"
			class="group text-purple-700 hover:text-purple-500 font-semibold transition-all duration-300 ease-in-out">
			<span
				class="bg-left-bottom bg-gradient-to-r from-purple-500 to-purple-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
				<i class="fa-solid fa-circle-left my-auto" />
				<span class="ml-2">{$_('back')}</span>
			</span>
		</a>
	</div>
	<div class="w-full mt-5">
		<div class="relative right-0">
			<ul
				class="relative flex list-none flex-wrap rounded-xl bg-blue-gray-50/60 p-1 border"
				data-tabs="tabs"
				role="list">
				<li
					class="z-30 flex-auto text-center rounded-xl transition duration-300 ease-in {selectedLanguage ===
						'vi' && 'bg-gray-400'}">
					<button
						on:click={() => setSelectedLanguage('vi')}
						type="button"
						class="text-slate-700 z-30 mb-0 fle gap-2 x w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
						data-tab-target=""
						role="tab"
						aria-selected="true">
						<img class="h-5 w-auto mx-auto" src={vietnamese} alt="vietnamese" />
					</button>
				</li>
				<li
					class="z-30 flex-auto text-center rounded-xl transition duration-300 ease-in {selectedLanguage ===
						'en' && 'bg-gray-400'}">
					<button
						on:click={() => setSelectedLanguage('en')}
						type="button"
						class="text-slate-700 z-30 mb-0 flex gap-2 w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
						data-tab-target=""
						role="tab"
						aria-selected="false">
						<img class="h-5 w-auto mx-auto" src={english} alt="english" />
					</button>
				</li>
			</ul>
		</div>
	</div>
</section>
