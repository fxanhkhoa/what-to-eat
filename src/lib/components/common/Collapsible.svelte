<script lang="ts">
	import { createCollapsible, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	export let title = '';
	export let containerStyle =
		'bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 rounded-lg w-full';

	const {
		elements: { root, content, trigger },
		states: { open }
	} = createCollapsible({
		forceVisible: true
	});
</script>

<div use:melt={$root} class={containerStyle}>
	<!-- Title Part -->
	<div class="flex items-center justify-between">
		<span class="text-sm font-semibold">
			{title}
		</span>
		<button
			use:melt={$trigger}
			class="relative h-6 w-6 place-items-center rounded-md bg-white text-sm
          text-purple-800 shadow hover:opacity-75 data-[disabled]:cursor-not-allowed
          data-[disabled]:opacity-75"
			aria-label="Toggle">
			<div class="my-auto">
				{#if $open}
					<i class="fa-solid fa-chevron-up" />
				{:else}
					<i class="fa-solid fa-chevron-down" />
				{/if}
			</div>
		</button>
	</div>

	<div>
		{#if $open}
			<div use:melt={$content} transition:slide>
				<slot />
			</div>
		{/if}
	</div>
</div>
