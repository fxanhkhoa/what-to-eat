<script lang="ts">
	import { createLinkPreview, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import type { Dish } from '../../../gql/graphql';

	export let link = '#';
	export let dish: Dish;
	export let selectedLanguage = 'en';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createLinkPreview({
		forceVisible: true,
		openDelay: 1000
	});
</script>

<a class="" href={link} target="_blank" rel="noopener noreferrer" use:melt={$trigger}>
	<slot />
</a>

{#if $open}
	<div
		use:melt={$content}
		transition:fly={{ y: -5, duration: 100 }}
		class=" z-20 rounded-md bg-white shadow-sm">
		<div class="w-[300px] rounded-md bg-white p-5 shadow-sm text-center text-gray-500 max-w-sm">
			<img
				class="w-32 h-32 rounded-full mx-auto"
				src={dish.thumbnail}
				alt={dish.title.find((e) => e?.lang === selectedLanguage)?.data} />
			<div class="text-sm mt-5">
				<span
					class="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out"
					>{dish.title.find((e) => e?.lang === selectedLanguage)?.data}
				</span>
				<div class="flex gap-0.5 justify-center">
					<svg class="h-8 w-8 shrink-0 fill-amber-400" viewBox="0 0 256 256">
						<path
							d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z" />
					</svg>
					<svg class="h-8 w-8 shrink-0 fill-amber-400" viewBox="0 0 256 256">
						<path
							d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z" />
					</svg>
					<svg class="h-8 w-8 shrink-0 fill-amber-400" viewBox="0 0 256 256">
						<path
							d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z" />
					</svg>
					<svg class="h-8 w-8 shrink-0 fill-amber-400" viewBox="0 0 256 256">
						<path
							d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z" />
					</svg>
					<svg class="h-8 w-8 shrink-0 fill-amber-400" viewBox="0 0 256 256">
						<path
							d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z" />
					</svg>
				</div>
			</div>

			<p class="mt-2 text-sm text-gray-900">
				{dish.shortDescription.find((e) => e?.lang === selectedLanguage)?.data}
			</p>
		</div>
		<div use:melt={$arrow} />
	</div>
{/if}
