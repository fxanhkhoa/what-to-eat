<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';
	import { _, getLocaleFromNavigator } from 'svelte-i18n';
	import {
		Client,
		cacheExchange,
		fetchExchange,
		mapExchange,
		setContextClient
	} from '@urql/svelte';
	import { PUBLIC_ENDPOINT } from '$env/static/public';
	import { addToast } from '$lib/components/common/Toaster.svelte';
	import { retryExchange } from '@urql/exchange-retry';

	const options = {
		initialDelayMs: 1000,
		maxDelayMs: 15000,
		randomDelay: true,
		maxNumberAttempts: 2,
		retryIf: (err: any) => err && err.networkError
	};
	export let data: LayoutData;

	const client = new Client({
		url: `${PUBLIC_ENDPOINT}/query`,
		exchanges: [
			mapExchange({
				async onError(error, operation) {
					console.log(`The operation ${operation.key} has errored with:`, error);
					console.log(error.networkError?.message);
					if (error.networkError?.message === 'Unauthorized') {
						const response = await fetch(`/api/token`, {
							method: 'POST'
						});
						if (response.status === 200) {
							location.reload()
						}
					}
				}
			}),
			retryExchange(options),
			cacheExchange,
			fetchExchange
		],
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
			console.log('clear')
			localStorage.clear();
			addToast({
				data: {
					title: '401',
					description: $_('please-login-again'),
					color: 'bg-red-500'
				}
			});
			setTimeout(() => {
				goto(`${getLocaleFromNavigator() ?? 'vi'}/login`);
			}, 2000);
		}
		return {};
	});
</script>

<div class="app bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	<main>
		<slot />
	</main>
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
