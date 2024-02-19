<script lang="ts">
	import { Youtube } from '$lib/utils/youtube';

	export let id: string;
</script>

<iframe
	class="aspect-video w-full"
	src={`https://www.youtube-nocookie.com/embed/${Youtube.getId(id)}`}
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; gyroscope; web-share"
	allowfullscreen />
