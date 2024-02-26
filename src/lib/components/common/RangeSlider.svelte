<script lang="ts">
	import { createSlider, melt } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import Tooltip from './Tooltip.svelte';

	export let max = 100;
	export let min = 0;
    export let defaultValue: number[] = [20, 80];

	const dispatch = createEventDispatcher();

	const {
		elements: { root, range, thumbs }
	} = createSlider({
		defaultValue,
		max,
		min,
		onValueChange: (args) => {
			dispatch('valueChange', args.next);
			return args.next;
		}
	});
</script>

<span use:melt={$root} class="relative flex h-[20px] w-[auto] items-center">
	<span class="h-[3px] w-full bg-black/40">
		<span use:melt={$range} class="h-[3px] bg-purple-300" />
	</span>

	{#each $thumbs as thumb}
		<div
			use:melt={thumb}
			class="h-7 w-7 rounded-full bg-white focus:ring-4 focus:!ring-black/40 flex flex-col justify-center items-center group">
			<span class="text-center cursor-default text-sm text-gray-400">
				{thumb['data-value']}
			</span>
		</div>
	{/each}
</span>
