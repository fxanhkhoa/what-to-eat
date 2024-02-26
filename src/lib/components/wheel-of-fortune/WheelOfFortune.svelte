<script lang="ts">
	import { COLOR_PALETTE } from '$lib/constant/color';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Dish } from '../../../gql/graphql';
	import DishPreview from '../dish/DishPreview.svelte';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';

	export let items: Dish[] = [];
	export let numberOfSpinTimes = 3;
	export let selectedLanguage = 'en';
	let rotate = 0;

	let diameter = 500; // px
	let numberOfSlices = items.length;
	let radius = diameter / 2;
	let perimeter = 6.283185307 * radius;
	let sliceHeight = perimeter / numberOfSlices;
	let sliceOffSet = sliceHeight / 2;

	let draggingItem: Dish | null;
	let originX = 0;
	let originY = 0;
	let x = 0;
	let y = 0;
	let deleteMode = false;

	const dispatch = createEventDispatcher();

	const spin = () => {
		const min = 720;
		const max = Math.floor(numberOfSpinTimes * 360);
		rotate += Math.floor(Math.random() * (max - min) + min);

		setTimeout(() => {
			const degreeUnit = 360 / items.length;
			let result = items.length - Math.round((rotate / degreeUnit) % items.length);
			if (result - 1 < 0) {
				result = items.length;
			}
			dispatch('onResult', {
				result: items[result - 1],
				position: result
			});
		}, 3000);
	};

	const calculateWheel = () => {
		numberOfSlices = items.length;
		radius = diameter / 2;
		perimeter = 6.283185307 * radius;
		sliceHeight = perimeter / numberOfSlices;
		sliceOffSet = sliceHeight / 2;
	};

	onMount(() => {
		diameter = (document.getElementById('wheel-container')?.clientWidth ?? 500) / 1.2;
		calculateWheel();
	});

	const onDragStart = (
		event: DragEvent & {
			currentTarget: EventTarget & HTMLLIElement;
		},
		item: Dish
	) => {
		originX = event.x;
		originY = event.y;
		draggingItem = item;
		event.dataTransfer?.setData('text/plain', JSON.stringify(item));
	};

	const onDragEnd = (
		event: DragEvent & {
			currentTarget: EventTarget & HTMLLIElement;
		}
	) => {
		if (event.x - originX > 100 || event.y - originY > 100) {
			dispatch('onDelete', draggingItem);
			setTimeout(() => {
				calculateWheel();
			}, 500);
		}
		x = 0;
		y = 0;
		originX = 0;
		originY = 0;
		draggingItem = null;
	};

	const onDrag = (
		event: DragEvent & {
			currentTarget: EventTarget & HTMLLIElement;
		}
	) => {
		if (event.x - originX > 100 || event.y - originY > 100) {
			deleteMode = true;
		} else {
			deleteMode = false;
		}
		if (draggingItem) {
			x = event.x - originX;
			y = event.y - originY;
		}
	};
</script>

<div class="container" id="wheel-container">
	<div class="board">
		<div class="spinner-table" style={`--diameter:${diameter - 2}px;`}>
			<ul
				class="dial transition-all duration-[3000ms] ease-out"
				style={`transform: rotate(${rotate}deg); width: ${diameter}px; height: ${diameter}px;`}>
				{#each items as item, i (i)}
					<li
						id={item._id}
						draggable="true"
						on:dragstart={(event) => onDragStart(event, item)}
						on:dragend={onDragEnd}
						on:drag={onDrag}
						class="slice"
						style={`transform: rotate(${(i + 1) * (360 / items.length)}deg) ${
							draggingItem?._id === item._id
								? ' translate(' + x + 'px,' + y + 'px); z-index: 40;'
								: ''
						}; --sliceOffSet:${sliceOffSet}px; --sliceColor:${
							COLOR_PALETTE[i % COLOR_PALETTE.length]
						}; --sliceHeight:${sliceHeight}px; --sliceBorderWidth:${
							sliceHeight / 2 + 4
						}px; --radius:${radius}px; 
						}`}>
						<DishPreview
							{selectedLanguage}
							dish={item}
							link={`/${selectedLanguage}/dish/${item.slug}`}>
							<div class="hidden lg:block label text-truncate text-wrap">
								{item.title.find((e) => e?.lang === selectedLanguage)?.data?.slice(0, 20)}...
							</div>
							<div class="lg:hidden label">
								{item.title.find((e) => e?.lang === selectedLanguage)?.data?.slice(0, 10)}...
							</div>
						</DishPreview>
					</li>
				{/each}
				{#if !deleteMode}
					<button
						on:click={spin}
						class="absolute z-20 left-[50%] -translate-x-5 top-[50%] -translate-y-5 align-middle select-none font-sans font-bold text-center uppercase disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs w-10 h-10 rounded-full bg-purple-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none border-2 border-white"
						type="button">
						<i class="fa-solid fa-arrows-rotate" />
					</button>
				{:else}
					<button
						class="absolute z-20 left-[50%] -translate-x-5 top-[50%] -translate-y-5 align-middle select-none font-sans font-bold text-center uppercase disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs w-10 h-10 rounded-full bg-red-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none border-2 border-white"
						type="button">
						<i class="fa-solid fa-trash-can" />
					</button>
				{/if}
			</ul>
		</div>
		<div class="arrow" style={`--diameter:${diameter - 10}px`}>
			<span class="pointer" />
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		max-width: 800px;
		@apply mx-auto pt-20;
	}

	.spinner-table {
		height: var(--diameter);
		width: var(--diameter);
		border-radius: 100%;
		overflow: hidden;
	}

	.dial {
		height: 100%;
		/* transition: all 5s ease-out;
		animation-fill-mode: forwards;
		animation-timing-function: linear; */

		&:before {
			content: '';
			text-align: center;
			display: block;
			line-height: 60px;
			position: absolute;
			height: 40px;
			width: 40px;
			background: white;
			box-shadow: 0 0 5px 5px rgba(#000, 0.1);
			top: 50%;
			left: 50%;
			margin-top: -20px;
			margin-left: -20px;
			border-radius: 100%;
			z-index: 20;
		}

		.slice {
			z-index: 10;
			position: absolute;
			top: calc(50% - var(--sliceOffSet));
			height: var(--sliceHeight);
			left: 50%;
			width: 50%;
			color: white;
			text-align: right;
			padding-right: 10px;
			display: block;
			transform-origin: left center;

			&:before,
			&:after {
				content: '';
				display: block;
				width: 0;
				height: 0;
				border-style: solid;
			}

			&:before {
				margin-bottom: -1px;
				margin-top: -2px;
				border-width: 0 0 var(--sliceBorderWidth) var(--radius);
				border-color: transparent transparent var(--sliceColor) transparent;
			}

			&:after {
				margin-top: -1px;
				margin-bottom: -2px;
				border-width: 0 var(--radius) var(--sliceBorderWidth) 0;
				border-color: transparent var(--sliceColor) transparent transparent;
			}

			a {
				.label {
					position: absolute;
					top: 0;
					bottom: 0;
					width: 90%;
					line-height: var(--sliceHeight);
					padding-top: 1px;
					padding-bottom: 1px;
					font-size: 16px;
					text-align: right;
					padding-left: 20px;
				}
			}
		}
	}

	.arrow {
		position: absolute;
		height: 30px;
		width: 50px;
		left: var(--diameter);
		z-index: 10;
		display: block;
		top: 50%;
		margin-top: -15px;
		transform-origin: center right;
	}

	.pointer {
		z-index: 50;
		display: block;
		height: 30px;
		width: 50px;

		&:before {
			content: '';
			display: block;
			position: absolute;
			right: 0;
			top: 0;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 0 0 15px 50px;
			border-color: transparent transparent #c27028 transparent;
		}
		&:after {
			content: '';
			display: block;
			position: absolute;
			right: 0;
			bottom: 0;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 0 50px 15px 0;
			border-color: transparent #c27028 transparent transparent;
		}
	}

	.board {
		position: relative;
		background: white;
		@apply py-10;
	}
</style>
