<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { locale } from 'svelte-i18n';

	export let data: PageData;
	const { dish } = data;
	let selectedLanguage = 'en';

	onMount(() => {
		const sub = locale.subscribe((lang) => {
			if (lang === 'en-US') {
				locale.set('en');
				return;
			}
			if (lang) {
				selectedLanguage = lang;
			}
		});
		return sub;
	});
</script>

<section id="banner">
	<img src={dish.thumbnail} alt={dish.slug} class="w-full h-5/6 object-cover" />
</section>

<section id="main" class="p-5 md:p-10">
	<div class="grid grid-cols-12 gap-2">
		<div class="col-span-6">
			<h1 class="font-bold drop-shadow-lg">{dish.title.find((t) => t.language === selectedLanguage)?.data}</h1>
		</div>
		<div class="col-span-6">
			<h5 class="text-gray-400">
				{dish.shortDescription.find((t) => t.language === selectedLanguage)?.data}
			</h5>
		</div>
	</div>
	<div class="grid grid-cols-12">

	</div>
</section>
