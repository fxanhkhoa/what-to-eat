<script>
	import { _ } from 'svelte-i18n';
	import WheelOfFortune from './wheel-of-fortune.svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css'
	import breakfast from '$lib/images/meal-category/breakfast.jpg'
	import appetize from '$lib/images/meal-category/appetize.jpg'
	import brunch from '$lib/images/meal-category/brunch.webp'
	import burger from '$lib/images/meal-category/burger.webp'
	import dessert from '$lib/images/meal-category/dessert.jpg'
	import dinner from '$lib/images/meal-category/dinner.png'
	import hotpot from '$lib/images/meal-category/hotpot.jpg'
	import lunch from '$lib/images/meal-category/lunch.jpg'
	import salad from '$lib/images/meal-category/salad.webp'
	import soup from '$lib/images/meal-category/soup.jpg'
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="hôm nay ăn gì" />
</svelte:head>

<section id="welcome" class="px-5 md:px-20 flex flex-col justify-center">
	<div class="grid grid-cols-12 place-items-center">
		<div class="col-span-12 md:col-span-6 flex flex-col gap-5">
			<h1 class="text-left font-bold text-white">{$_('welcome.title')}</h1>
			<span class="text-gray-400 text-justify">{$_('welcome.subtitle')}</span>
			<a
				href="/"
				class="relative w-48 md:w-96 md:mt-10 px-5 py-3 overflow-hidden font-medium text-gray-600 bg-purple-300 border border-gray-100 rounded-lg shadow-inner group">
				<span
					class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease" />
				<span
					class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease" />
				<span
					class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease" />
				<span
					class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease" />
				<span
					class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100" />
				<span
					class="relative uppercase transition-colors duration-300 delay-200 group-hover:text-white ease font-semibold"
					>{$_('build-your-own-menus')}</span>
			</a>
		</div>
		<div class="col-span-12 md:col-span-6"><WheelOfFortune /></div>
	</div>
</section>

<section
	id="meal-category"
	class="bg-white px-10 md:px-32 relative flex flex-col"
	style="min-height: 20vh;">
	<div
		class="relative grid grid-cols-12 gap-5 -translate-y-20 bg-white rounded-lg p-5 md:p-10 shadow-lg drop-shadow-xl max-h-[600px] md:max-h-44 hover:max-h-[600px] meal-category-height transition-all duration-300 ease-in-out overflow-hidden">
		<div
			class="col-span-4 md:col-span-3 flex flex-col justify-center items-center gap-1 cursor-pointer group">
			<div class="p-3 bg-gray-100 rounded-full group-hover:bg-gray-300 duration-300 ease-in-out">
				<img
					alt="breakfast"
					src={breakfast}
					class="object-cover rounded-full w-16 h-16" />
			</div>
			<h4 class="font-bold">{$_('breakfast')}</h4>
		</div>

		<div
			class="col-span-4 md:col-span-3 flex flex-col justify-center items-center gap-1 cursor-pointer group">
			<div class="p-3 bg-gray-100 rounded-full group-hover:bg-gray-300 duration-300 ease-in-out">
				<img
					alt="lunch"
					src={lunch}
					class="object-cover rounded-full w-16 h-16" />
			</div>
			<h4 class="font-bold">{$_('lunch')}</h4>
		</div>

		<div
			class="col-span-4 md:col-span-3 flex flex-col justify-center items-center gap-1 cursor-pointer group">
			<div class="p-3 bg-gray-100 rounded-full group-hover:bg-gray-300 duration-300 ease-in-out">
				<img
					alt="brunch"
					src={brunch}
					class="object-cover rounded-full w-16 h-16" />
			</div>
			<h4 class="font-bold">{$_('brunch')}</h4>
		</div>

		<div
			class="col-span-4 md:col-span-3 flex flex-col justify-center items-center gap-1 cursor-pointer group">
			<div class="p-3 bg-gray-100 rounded-full group-hover:bg-gray-300 duration-300 ease-in-out">
				<img
					alt="dinner"
					src={dinner}
					class="object-cover rounded-full w-16 h-16" />
			</div>
			<h4 class="font-bold">{$_('dinner')}</h4>
		</div>

		<div
			class="col-span-4 md:col-span-3 flex flex-col justify-center items-center gap-1 cursor-pointer group">
			<div class="p-3 bg-gray-100 rounded-full group-hover:bg-gray-300 duration-300 ease-in-out">
				<img
					alt="salad"
					src={salad}
					class="object-cover rounded-full w-16 h-16" />
			</div>
			<h4 class="font-bold">{$_('salad')}</h4>
		</div>

		<div
			class="col-span-4 md:col-span-3 flex flex-col justify-center items-center gap-1 cursor-pointer group">
			<div class="p-3 bg-gray-100 rounded-full group-hover:bg-gray-300 duration-300 ease-in-out">
				<img
					alt="burger"
					src={burger}
					class="object-cover rounded-full w-16 h-16" />
			</div>
			<h4 class="font-bold">{$_('burger')}</h4>
		</div>

		<div
			class="col-span-4 md:col-span-3 flex flex-col justify-center items-center gap-1 cursor-pointer group">
			<div class="p-3 bg-gray-100 rounded-full group-hover:bg-gray-300 duration-300 ease-in-out">
				<img
					alt="soup"
					src={soup}
					class="object-cover rounded-full w-16 h-16" />
			</div>
			<h4 class="font-bold">{$_('soup')}</h4>
		</div>

		<div
			class="col-span-4 md:col-span-3 flex flex-col justify-center items-center gap-1 cursor-pointer group">
			<div class="p-3 bg-gray-100 rounded-full group-hover:bg-gray-300 duration-300 ease-in-out">
				<img
					alt="appetize"
					src={appetize}
					class="object-cover rounded-full w-16 h-16" />
			</div>
			<h4 class="font-bold">{$_('appetize')}</h4>
		</div>

		<div
			class="col-span-4 md:col-span-3 flex flex-col justify-center items-center gap-1 cursor-pointer group">
			<div class="p-3 bg-gray-100 rounded-full group-hover:bg-gray-300 duration-300 ease-in-out">
				<img
					alt="dessert"
					src={dessert}
					class="object-cover rounded-full w-16 h-16" />
			</div>
			<h4 class="font-bold">{$_('dessert')}</h4>
		</div>

		<div
			class="col-span-4 md:col-span-3 flex flex-col justify-center items-center gap-1 cursor-pointer group">
			<div class="p-3 bg-gray-100 rounded-full group-hover:bg-gray-300 duration-300 ease-in-out">
				<img
					alt="hotpot"
					src={hotpot}
					class="object-cover rounded-full w-16 h-16" />
			</div>
			<h4 class="font-bold">{$_('hot-pot')}</h4>
		</div>
	</div>
	<div class="flex justify-center">
		<button class="-translate-y-24 text-center bg-gray-300 p-3 w-12 h-12 rounded-full"
			><i class="fa-solid fa-angles-down" /></button>
	</div>
</section>

<section id="food-category" class="bg-white px-10 md:px-32 pt-10">
	<div class="flex flex-col gap-5 md:gap-10">
		<h1 class="text-center font-bold text-black">{$_('categories')}</h1>
		<h5 class="text-justify text-gray-500">{$_('category.subtitle')}</h5>
		<div class="grid grid-cols-12 gap-5">
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-blender my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('milk-and-dairy')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-wheat-awn my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('grains')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-glass-water my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('beverages-nonalcoholic')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-drumstick-bite my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('protein-foods')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-cookie-bite my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('snacks-and-sweets')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-wine-glass my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('alcoholic-beverages')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-bottle-water my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('water')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-burger my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('fats-and-oils')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-bowl-food my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('mixed-dishes')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-apple-whole my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('fruit')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-pepper-hot my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('condiments-and-sauces')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-cubes-stacked my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('sugars')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-seedling my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('vegetables')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-baby my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('infant-formula-and-baby-food')}</h5>
				</a>
			</div>
			<div class="col-span-4 md:col-span-3 flex gap-3">
				<a
					href="/"
					class="flex flex-wrap gap-3 justify-center relative w-full px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-white hover:text-black hover:bg-purple-200 transition duration-300 ease-in-out">
					<i class="fa-solid fa-comment-dots my-auto text-xl text-blue-500" />
					<h5 class="my-auto">{$_('other')}</h5>
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
</style>
