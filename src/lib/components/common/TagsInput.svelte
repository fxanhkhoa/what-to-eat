<script lang="ts">
	import { createTagsInput, melt, type Tag } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';

	export let defaultTags: Tag[] = [];

	const dispatch = createEventDispatcher();

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		defaultTags,
		unique: true,
		add(tag) {
			dispatch('add', tag);
			return { id: tag, value: tag };
		},
		update: async (tag) => {
			dispatch('update', { id: tag.id, value: tag.value });
			return { id: tag.id, value: tag.value };
		},
		remove(tag) {
			dispatch('remove', { id: tag.id, value: tag.value });
			return true;
		},
		addOnPaste: true,
	});
</script>

<div class="flex flex-col items-start justify-center gap-2">
	<div
		use:melt={$root}
		class="flex w-full max-h-48 overflow-auto flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-purple-700
      focus-within:ring focus-within:ring-purple-400">
		{#each $tags as t}
			<div
				use:melt={$tag(t)}
				class="flex items-center overflow-hidden rounded-md bg-purple-200 text-purple-900 [word-break:break-word]
        data-[disabled]:bg-purple-300 data-[selected]:bg-purple-400 data-[disabled]:hover:cursor-default
          data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0">
				<span class="flex items-center border-r border-white/10 px-1.5">{t.value}</span>
				<button
					use:melt={$deleteTrigger(t)}
					class="flex h-full items-center px-1 enabled:hover:bg-purple-300">
					<i class="fa-solid fa-x size-3" />
				</button>
			</div>
			<div
				use:melt={$edit(t)}
				class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500" />
		{/each}

		<input
			use:melt={$input}
			type="text"
			placeholder={$_('enter-to-add-tag')}
			class="min-w-[4.5rem] shrink grow basis-0 border-0 text-black outline-none focus:!ring-0 data-[invalid]:text-red-500" />
	</div>
</div>
