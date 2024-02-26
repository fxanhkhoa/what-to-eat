<script lang="ts">
	import { BADGE_COLORS } from '$lib/constant/badge';
	import { _ } from 'svelte-i18n';
	import type { Maybe } from '../../../gql/graphql';

	export let categories: Maybe<string>[];
</script>

<div class="flex flex-wrap gap-3 mt-3">
	{#each categories as category, categoryIndex}
		<span
			class="text-xs inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset {Object.values(
				BADGE_COLORS
			)[categoryIndex % Object.keys(BADGE_COLORS).length]}">{$_(category ?? '')}</span>
	{/each}
</div>
