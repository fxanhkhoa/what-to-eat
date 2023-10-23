<script lang="ts">
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';

	export let data: PageData;
</script>

<svelte:head>
	<title>{$_('metadata.dish.title')}</title>
	<meta name="description" content={$_('metadata.dish.description')} />
</svelte:head>

<section>
	<div class="banner h-64 flex flex-col gap-2 justify-center items-center text-gray-200">
		<h1 class="drop-shadow-lg font-bold uppercase">{$_('metadata.dish.title')}</h1>
        <h5 class="text-gray-400">{$_('metadata.dish.description')}</h5>
		<div class="flex gap-2 mt-3">
			<a class="group text-gray-400 hover:text-white font-semibold transition-all duration-300 ease-in-out" href="/">
				<span
					class="bg-left-bottom bg-gradient-to-r from-purple-500 to-purple-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
					{$_('home')}
				</span>
			</a>
			<span>/</span>
			<span class="text-gray-400 font-semibold">{$_('dish')}</span>
		</div>
	</div>
</section>

<style>
	.banner {
		background-image: url($lib/images/dish-page-banner.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		backdrop-filter: blur(5px);
	}
</style>
