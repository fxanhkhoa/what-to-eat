<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../styles.css';
	import '../../app.scss';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import type { PageData } from './$types';
	import { locale } from 'svelte-i18n';

	export let data: PageData;
	locale.set(data.lang);
</script>

<div class="app">
	<Header currentLanguage={data.lang} />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
