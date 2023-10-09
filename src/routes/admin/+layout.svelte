<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { authStore } from '../../stores/authStore';
	import { goto } from '$app/navigation';
	import { auth } from '../../firebase/firebase-server';

	export let data: LayoutData;

	onMount(() => {
		const authUnsubscribe = authStore.subscribe((curr) => {
			if (!curr.currentUser) {
				goto('/login');
			}
			auth.updateCurrentUser(curr.currentUser);
			try {
				auth.currentUser?.reload().then();
			} catch (error) {
				auth.signOut();
				goto('/login');
			}
		});
		return { authUnsubscribe };
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
