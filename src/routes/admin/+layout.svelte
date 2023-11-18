<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import {_} from "svelte-i18n";

	// Optionally set default options here
	const options = {};

	onMount(() => {
		// if (!isLoggedIn()) {
		// 	localStorage.clear();
		// 	toast.push($_('please-login-again'), {
		// 		theme: {
		// 			'--toastColor': 'mintcream',
		// 			'--toastBackground': '#d40202',
		// 			'--toastBarBackground': '#b30000'
		// 		}
		// 	});
		// 	goto('/login');
		// }
		return {};
	});
</script>

<div class="app bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	<main>
		<slot />
	</main>

	<SvelteToast {options} />
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
</style>
