<script lang="ts">
	import { BADGE_COLOR_CLASSES } from '$lib/constant/badge';
	import { _ } from 'svelte-i18n';
	import type { Maybe } from '../../../gql/graphql';

	export let categories: Maybe<string>[];
</script>

<div class="flex flex-wrap gap-3 mt-3">
	{#each categories as category, categoryIndex}
		<span
			class="text-xs inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset {BADGE_COLOR_CLASSES[
				categoryIndex % BADGE_COLOR_CLASSES.length
			]}">{$_(category ?? '')}</span>
	{/each}
</div>
