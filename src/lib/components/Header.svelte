<script lang="ts">
	import { _, getLocaleFromNavigator, locale } from 'svelte-i18n';
	import logo from '$lib/images/logo.png';
	import { page } from '$app/stores';
	import { createDropdownMenu, createMenubar, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { lANGUAGES } from '$lib/constant/multi-language';

	export let currentLanguage = 'en-US';
	$: currentPath = $page.url.pathname;
	const lang = currentLanguage;

	const {
		elements: { menubar },
		builders: { createMenu }
	} = createMenubar();

	const {
		elements: { trigger, menu, item }
	} = createMenu();

	const {
		elements: { trigger: triggerA, menu: menuA, item: itemA }
	} = createMenu();

	const {
		elements: { trigger: triggerB, menu: menuB, item: itemB },
		builders: { createSubmenu: createSubmenuB, createMenuRadioGroup: createMenuRadioGroupB }
	} = createMenu();

	const {
		elements: { radioGroup: radioGroupB, radioItem: radioItemB },
		helpers: { isChecked: isCheckedB }
	} = createMenuRadioGroupB({
		defaultValue: currentLanguage,
		onValueChange: (value) => {
			languageChange(value.next ?? 'en-US');
			return value.next;
		}
	});

	const {
		elements: {
			trigger: triggerMobile,
			menu: menuMobile,
			item: itemMobile,
			separator: separatorMobile,
			arrow: arrowMobile
		},
		builders: {
			createSubmenu: createSubmenuMobile,
			createMenuRadioGroup: createMenuRadioGroupMobile,
			createCheckboxItem: createCheckboxItemMobile
		},
		states: { open: openMobile }
	} = createDropdownMenu({
		forceVisible: true,
		loop: true
	});

	const {
		elements: { subMenu: subMenuMobile, subTrigger: subTriggerMobile },
		states: { subOpen: subOpenMobile }
	} = createSubmenuMobile();

	const {
		elements: { subMenu: subMenuMobile1, subTrigger: subTriggerMobile1 },
		states: { subOpen: subOpenMobile1 }
	} = createSubmenuMobile();

	const {
		elements: { subMenu: subMenuMobile2, subTrigger: subTriggerMobile2 },
		states: { subOpen: subOpenMobile2 }
	} = createSubmenuMobile();

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked }
	} = createMenuRadioGroupMobile({
		defaultValue: currentLanguage,
		onValueChange: (value) => {
			if ($page.route.id) {
				languageChange(value.next ?? 'en-US');
			}
			return value.next;
		}
	});

	const languageChange = (lang: string) => {
		let newLocation = '/';
		if ($page.route.id) {
			newLocation = $page.route.id;
			if ($page.params['lang']) {
				newLocation = newLocation.replace('[lang]', lang);
			}
			if ($page.params['slug']) {
				newLocation = newLocation.replace('[slug]', $page.params['slug']);
			}
		}
		location.href = newLocation;
	};
</script>

<header class="bg-white shadow-lg h-24 hidden md:flex" use:melt={$menubar}>
	<a href="/" class="border flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8">
		<img class="h-10 w-auto" src={logo} alt="" />
	</a>
	<nav class="header-links contents font-semibold text-base lg:text-lg">
		<ul class="flex items-center ml-4 xl:ml-8 mr-auto list-none">
			<li class="p-3 xl:p-6 {currentPath === `/${lang}` && 'active'}">
				<a href="/">
					<span>{$_('home')}</span>
				</a>
			</li>
			<li class="p-3 xl:p-6 relative {currentPath.includes('/dish') && 'active'}">
				<button class="flex gap-1 items-center" use:melt={$trigger}>
					<span>{$_('dish')}</span>
					<i class="fa-solid fa-chevron-down text-xs text-gray-400" />
				</button>
				<div
					use:melt={$menu}
					class="w-48 py-2 mt-2 mr-10 bg-white rounded-lg shadow-xl transition-all duration-300 font-bold">
					<a
						use:melt={$item}
						href={`/${lang}/dish`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('all')}
					</a>
					<a
						use:melt={$item}
						href={`/${lang}/dish/breakfast`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('breakfast')}
					</a>
					<a
						use:melt={$item}
						href={`/${lang}/dish/lunch`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('lunch')}
					</a>
					<a
						use:melt={$item}
						href={`/${lang}/dish/brunch`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('brunch')}
					</a>
					<a
						use:melt={$item}
						href={`/${lang}/dish/dinner`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('dinner')}
					</a>
				</div>
			</li>
			<li class="p-3 xl:p-6 {currentPath.includes('/ingredient') && 'active'}">
				<a href={`/${lang}/ingredient`}>
					<span>{$_('ingredients')}</span>
				</a>
			</li>
			<li class="p-3 xl:p-6 relative {currentPath.includes('/games') && 'active'}">
				<button use:melt={$triggerA} class="flex gap-1 items-center">
					<span>{$_('games')}</span>
					<i class="fa-solid fa-chevron-down text-xs text-gray-400" />
				</button>
				<div
					use:melt={$menuA}
					class="w-48 py-2 mt-2 mr-10 bg-white rounded-lg shadow-xl transition-all duration-300 font-bold">
					<a
						use:melt={$itemA}
						href={`/${lang}/games/wheel-of-fortune`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('wheel-of-fortune')}
					</a>
					<a
						use:melt={$itemA}
						href={`/${lang}/games/flipping-cards`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('flipping-cards')}
					</a>
				</div>
			</li>
			<li class="p-3 xl:p-6 relative">
				<button use:melt={$triggerB} class="flex gap-1 items-center">
					<span>{$_('language')}</span>
					<i class="fa-solid fa-chevron-down text-xs text-gray-400" />
				</button>
				<div
					use:melt={$menuB}
					class="w-48 py-2 mt-2 mr-10 bg-white rounded-lg shadow-xl transition-all duration-300 font-bold">
					<div use:melt={$radioGroupB} class="flex flex-col gap-2">
						{#each lANGUAGES as lang}
							<div
								class="px-5 flex gap-2 items-center cursor-pointer transition-all duration-300 hover:bg-purple-400"
								use:melt={$radioItemB({ value: lang })}>
								<div>
									{#if $isCheckedB(lang)}
										<i class="fa-solid fa-circle text-[5px] text-purple-500 my-auto" />
									{/if}
								</div>
								{lang}
							</div>
						{/each}
					</div>
				</div>
			</li>
		</ul>
	</nav>
	<nav class="hidden xl:contents">
		<ul class="flex items-center mr-4 lg:mr-6 xl:mr-8 list-none">
			<li class="p-1">
				<a
					href="https://twitter.com/BuiAnhK49302949"
					class="w-10 h-10 rounded-full border p-2 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
					<i class="fa-brands fa-x-twitter" />
				</a>
			</li>
			<li class="p-1">
				<a
					href="https://www.facebook.com/bui.a.khoa.1/"
					class="w-10 h-10 rounded-full border p-2 px-2.5 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
					<i class="fa-brands fa-facebook-f" />
				</a>
			</li>
			<li class="p-1">
				<a
					href="https://www.linkedin.com/in/khoa-bui-anh-698ab2173/"
					class="w-10 h-10 rounded-full border p-2 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
					<i class="fa-brands fa-linkedin-in" />
				</a>
			</li>
			<li class="p-1">
				<a
					href="https://www.instagram.com/fxanhkhoa/"
					class="w-10 h-10 rounded-full border p-2 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
					<i class="fa-brands fa-instagram" />
				</a>
			</li>
		</ul>
	</nav>
	<div class="border flex items-center px-4 lg:px-6 xl:px-8">
		<a href="/contact" class="mr-4 lg:mr-6 xl:mr-8 flex items-center gap-5">
			<i class="fa-solid fa-magnifying-glass text-3xl text-gray-500" />
			<button
				class="bg-black hover:bg-gray-700 text-white font-bold px-4 xl:px-6 py-2 xl:py-3 rounded"
				>Contact Me</button>
		</a>
	</div>
</header>

<header class="md:hidden bg-white w-full mobile-nav">
	<div class="flex justify-between w-full p-2">
		<a href="/" class="flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8">
			<img class="h-10 w-auto" src={logo} alt="" />
		</a>
		<button
			use:melt={$triggerMobile}
			class="bg-purple-500 hover:bg-purple-700 text-white font-bold p-2 w-10 h-10 rounded-full transition duration-300">
			<i class="fa-solid fa-bars" />
		</button>
	</div>
	{#if $openMobile}
		<nav
			use:melt={$menuMobile}
			transition:fly={{ duration: 150, y: -10 }}
			class="z-50 font-semibold text-base lg:text-lg bg-white p-3 xl:p-6 flex flex-col gap-3">
			<div class={`${currentPath === `/${lang}` && 'active'}`} use:melt={$itemMobile}>
				<a href="/">
					<span>{$_('home')}</span>
				</a>
			</div>
			<div use:melt={$separatorMobile} class="h-0.5 w-[100%] bg-gray-200" />
			<div
				class="flex justify-between {currentPath.includes('/dish') && 'active'}"
				use:melt={$subTriggerMobile}>
				<span>{$_('dish')}</span>
				<div>
					<i class="fa-solid fa-chevron-right" />
				</div>
			</div>
			{#if $subOpenMobile}
				<div
					class="flex flex-col gap-1 bg-white"
					use:melt={$subMenuMobile}
					transition:fly={{ x: -50, duration: 150 }}>
					<a
						href={`/${lang}/dish`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('all')}
					</a>
					<a
						href={`/${lang}/dish/breakfast`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('breakfast')}
					</a>
					<a
						href={`/${lang}/dish/lunch`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('lunch')}
					</a>
					<a
						href={`/${lang}/dish/brunch`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('brunch')}
					</a>
					<a
						href={`/${lang}/dish/dinner`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('dinner')}
					</a>
				</div>
			{/if}
			<div use:melt={$separatorMobile} class="h-0.5 w-[100%] bg-gray-200" />
			<div class={`${currentPath.includes('/ingredient') && 'active'}`} use:melt={$itemMobile}>
				<a href={`/${lang}/ingredient`}>
					<span>{$_('ingredients')}</span>
				</a>
			</div>
			<div use:melt={$separatorMobile} class="h-0.5 w-[100%] bg-gray-200" />
			<div
				class="flex justify-between {currentPath.includes('/games') && 'active'}"
				use:melt={$subTriggerMobile1}>
				<span>{$_('games')}</span>
				<div>
					<i class="fa-solid fa-chevron-right" />
				</div>
			</div>
			{#if $subOpenMobile1}
				<div
					class="flex flex-col gap-1 bg-white"
					use:melt={$subMenuMobile1}
					transition:fly={{ x: -50, duration: 150 }}>
					<a
						href={`/${lang}/games/wheel-of-fortune`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('wheel-of-fortune')}
					</a>
					<a
						href={`/${lang}/games/flipping-cards`}
						class="block px-4 py-2 text-gray-800 hover:bg-purple-500 transition-all duration-300 hover:text-white">
						{$_('flipping-cards')}
					</a>
				</div>
			{/if}
			<div use:melt={$separatorMobile} class="h-0.5 w-[100%] bg-gray-200" />
			<div class="flex justify-between" use:melt={$subTriggerMobile2}>
				<span>{$_('language')}</span>
				<div>
					<i class="fa-solid fa-chevron-right" />
				</div>
			</div>
			{#if $subOpenMobile2}
				<div
					class="flex flex-col gap-1 bg-white"
					use:melt={$subMenuMobile2}
					transition:fly={{ x: -50, duration: 150 }}>
					<div use:melt={$radioGroup} class="flex flex-col gap-2">
						{#each lANGUAGES as lang}
							<div class="px-5 flex gap-2 items-center" use:melt={$radioItem({ value: lang })}>
								<div>
									{#if $isChecked(lang)}
										<i class="fa-solid fa-circle text-[5px] text-purple-500 my-auto" />
									{/if}
								</div>
								{lang}
							</div>
						{/each}
					</div>
				</div>
			{/if}
			<div class="flex justify-around mt-2">
				<div class="p-1">
					<a
						href="https://twitter.com/BuiAnhK49302949"
						class="w-10 h-10 rounded-full border p-2 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
						<i class="fa-brands fa-x-twitter" />
					</a>
				</div>
				<div class="p-1">
					<a
						href="https://www.facebook.com/bui.a.khoa.1/"
						class="w-10 h-10 rounded-full border p-2 px-2.5 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
						<i class="fa-brands fa-facebook-f" />
					</a>
				</div>
				<div class="p-1">
					<a
						href="https://www.linkedin.com/in/khoa-bui-anh-698ab2173/"
						class="w-10 h-10 rounded-full border p-2 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
						<i class="fa-brands fa-linkedin-in" />
					</a>
				</div>
				<div class="p-1">
					<a
						href="https://www.instagram.com/fxanhkhoa/"
						class="w-10 h-10 rounded-full border p-2 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
						<i class="fa-brands fa-instagram" />
					</a>
				</div>
			</div>
		</nav>
	{/if}
</header>

<style>
	.mobile-nav .active {
		/* box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; */
		--tw-bg-opacity: 1 !important;
		background-color: rgb(168 85 247 / var(--tw-bg-opacity)) !important;
		color: white;
		text-decoration: underline;
	}
	.header-links li span {
		position: relative;
		z-index: 0;
	}

	.header-links li span::before {
		content: '';
		position: absolute;
		z-index: -1;
		bottom: 2px;
		left: -4px;
		right: -4px;
		display: block;
		height: 6px;
	}

	.header-links li.active span::before {
		@apply bg-purple-300 translate-y-2;
	}

	.header-links li:not(.active):hover span::before {
		@apply bg-purple-300 translate-y-2;
	}
</style>
