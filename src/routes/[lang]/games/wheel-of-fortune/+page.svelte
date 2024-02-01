<script lang="ts">
	import WheelOfFortune from '$lib/components/wheel-of-fortune/WheelOfFortune.svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	let items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
	let numberOfSpinTimes = 3;
	let rotate = 0;

	const diameter = 350; // px
	const numberOfSlices = items.length;
	const radius = diameter / 2;
	const perimeter = 6.283185307 * radius;
	const sliceHeight = perimeter / numberOfSlices;
	const sliceOffSet = sliceHeight / 2;

	const spin = () => {
		const min = 720;
		const max = Math.floor(numberOfSpinTimes * 360);
		rotate += Math.floor(Math.random() * (max - min) + min);

		console.log(rotate);
		setTimeout(() => {
			const degreeUnit = 360 / items.length;
			const result = Math.ceil(items.length - ((rotate / degreeUnit) % items.length)) - 1;
			console.log(`result: ${items[result]}`);
		}, 3000);
	};
</script>

<div class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-6">
		<WheelOfFortune />
	</div>
</div>
