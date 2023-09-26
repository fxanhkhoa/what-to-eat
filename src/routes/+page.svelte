<script>
	import { _ } from 'svelte-i18n';
	import WheelOfFortune from './wheel-of-fortune.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="hôm nay ăn gì" />
	<link
		href="./../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<section id="welcome" class="px-5 md:px-20 flex flex-col justify-center">
	<div class="grid grid-cols-12 place-items-center">
		<div class="col-span-12 md:col-span-6 flex flex-col gap-5">
			<h1 class="text-justify font-bold text-white">{$_('welcome.title')}</h1>
			<span class="text-gray-400 text-justify">{$_('welcome.subtitle')}</span>
			<a
				href="#_"
				class="relative w-48 md:w-96 md:mt-10 px-5 py-3 overflow-hidden font-medium text-gray-600 bg-purple-300 border border-gray-100 rounded-lg shadow-inner group"
			>
				<span
					class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"
				/>
				<span
					class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"
				/>
				<span
					class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"
				/>
				<span
					class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"
				/>
				<span
					class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"
				/>
				<span
					class="relative uppercase transition-colors duration-300 delay-200 group-hover:text-white ease"
					>{$_('build-your-own-menus')}</span
				>
			</a>
		</div>
		<div class="col-span-12 md:col-span-6"><WheelOfFortune /></div>
	</div>
</section>

<section id="category" class="bg-white px-10 md:px-32">
	<div class="flex flex-col gap-5">
		<h1>{$_('categories')}</h1>
		<h4>{$_('category.subtitle')}</h4>
		<div class="grid grid-cols-12">
			<div class="col-span-3 flex gap-3">
				<a
					href="#_"
					class="flex gap-3 relative w-auto px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-gray-300 hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out"
				>
					<i class="fa-solid fa-blender my-auto text-xl text-blue-500" />
					<h5>{$_('milk-and-dairy')}</h5>
				</a>
			</div>
			<div class="col-span-3 flex gap-3">
				<a
					href="#_"
					class="flex gap-3 relative w-auto px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-gray-300 hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out"
				>
					<i class="fa-solid fa-wheat-awn my-auto text-xl text-blue-500" />
					<h5>{$_('grains')}</h5>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		min-height: 90vh;
	}
	#welcome {
		background-image: url('../lib/images/bg-section-welcome.jpg');
		background-size: cover;
	}

	h1 {
		width: 100%;
	}
</style>
