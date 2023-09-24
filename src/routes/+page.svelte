<script>
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="hôm nay ăn gì" />
</svelte:head>

<section id="welcome">
	<div class="grid grid-cols-12">
		<div class="col-span-12 md:col-span-6 flex flex-col gap-5">
			<h1 class="text-left">{$_('welcome.title')}</h1>
			<h4>{$_('welcome.subtitle')}</h4>
			<a
				href="#_"
				class="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
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
				<span class="relative uppercase transition-colors duration-300 delay-200 group-hover:text-white ease"
					>{$_('build-your-own-menus')}</span
				>
			</a>
		</div>
		<div class="col-span-12 md:col-span-6" />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
