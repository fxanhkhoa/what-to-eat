<script lang="ts">
	import WheelOfFortune from '$lib/components/wheel-of-fortune/WheelOfFortune.svelte';
	import type { WheelOfFortuneResult } from '$lib/type/wheel-of-fortune.type';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	const onResult = (result: WheelOfFortuneResult) => {};
</script>

<div class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-6">
		<WheelOfFortune
			on:onResult={(result) => {
				onResult(result.detail);
			}} />
	</div>
</div>
