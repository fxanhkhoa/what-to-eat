<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	export let labelText = '';
	export let defaultValues: string[] = [];
	export let options: Record<string, { label: string; value: string }[]> = {
		sweet: [{ label: 'Caramel', value: 'Caramel' }],
		savory: [
			{ label: 'Bacon', value: 'Bacon' },
			{ label: 'Rosemary', value: 'Rosemary' }
		]
	};

	const dispatch = createEventDispatcher();

	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		},
		multiple: true,
		onSelectedChange: (result) => {
			dispatch(
				'selectedChange',
				result.next?.map((e) => e.value)
			);
			return result.next;
		},
		defaultSelected: defaultValues.map((e) => ({
			value: e,
			label: e
		}))
	});
</script>

<div class="flex flex-col gap-1">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label class="block text-purple-900 text-sm" use:melt={$label}>{labelText}</label>
	<button
		class="flex h-10 w-auto items-center justify-between rounded-lg bg-white px-3 py-2
    text-gray-700 shadow transition-opacity hover:opacity-90 lowercase text-wrap overflow-auto"
		use:melt={$trigger}
		aria-label="Food">
		{$selectedLabel || $_('please-select')}
		<i class="fa-solid fa-chevron-down size-5" />
	</button>
	{#if $open}
		<div
			class=" z-10 flex max-h-[300px] flex-col
      overflow-y-auto rounded-lg bg-white p-1
      shadow focus:!ring-0"
			use:melt={$menu}>
			{#each Object.entries(options) as [key, arr]}
				<div use:melt={$group(key)}>
					<div
						class="py-1 pl-4 pr-4 font-semibold capitalize text-neutral-500"
						use:melt={$groupLabel(key)}>
						{key}
					</div>
					{#each arr as item}
						<div
							class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-neutral-500
                focus:z-10 focus:text-purple-700
              data-[highlighted]:bg-slate-50 data-[selected]:bg-slate-100
              data-[highlighted]:text-purple-900 data-[selected]:text-purple-900 lowercase"
							use:melt={$option({ value: item.value, label: item.label })}>
							<div class="check {$isSelected(item.value) ? 'block' : 'hidden'}">
								<i class="fa-solid fa-check size-4 " />
							</div>
							{item.label}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.check {
		position: absolute;
		left: theme(spacing.2);
		top: 50%;
		z-index: theme(zIndex.20);
		translate: 0 calc(-50% + 1px);
		color: theme(colors.purple.500);
	}
</style>
