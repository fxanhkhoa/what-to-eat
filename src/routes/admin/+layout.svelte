<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import { _ } from 'svelte-i18n';
	import { Client, cacheExchange, fetchExchange, setContextClient } from '@urql/svelte';
	import { PUBLIC_ENDPOINT } from '$env/static/public';

	// Optionally set default options here
	const options = {};
	export let data: LayoutData;

	const client = new Client({
		url: `${PUBLIC_ENDPOINT}/query`,
		exchanges: [cacheExchange, fetchExchange],
		fetchOptions: () => {
			const token = data.token;
			return {
				headers: {
					authorization: token ? `Bearer ${token}` : '',
					'content-type': 'application/json'
				}
			};
		}
	});

	setContextClient(client);

	onMount(() => {
		if (!data.token) {
			localStorage.clear();
			toast.push($_('please-login-again'), {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': '#d40202',
					'--toastBarBackground': '#b30000'
				}
			});
			setTimeout(() => {
				goto('/login');
			}, 2000);
		}
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
