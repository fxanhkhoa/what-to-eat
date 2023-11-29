<script lang="ts">
	import { DIFFICULT_LEVELS } from '$lib/enum/dish.enum';
	import { _ } from 'svelte-i18n';

	export let difficultLevel: string;
	export let fontSizeClass: string = 'text-xs';
</script>

{#if difficultLevel === DIFFICULT_LEVELS.EASY}
	<span class="text-green-500 font-semibold {fontSizeClass}">{$_(difficultLevel)}</span>
{/if}
{#if difficultLevel === DIFFICULT_LEVELS.MEDIUM}
	<span class="text-blue-500 font-semibold {fontSizeClass}">{$_(difficultLevel)}</span>
{/if}
{#if difficultLevel === DIFFICULT_LEVELS.HARD}
	<span class="text-red-500 font-semibold {fontSizeClass}">{$_(difficultLevel)}</span>
{/if}
