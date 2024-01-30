<script lang="ts">
	import { COLOR_PALETTE } from '$lib/constant/color';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	let items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
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
			let result = items.length - Math.round((rotate / degreeUnit) % items.length);
            console.log(Math.round((rotate / degreeUnit) % items.length))
            if (result - 1 < 0) {
                result = items.length;
            }
			console.log(`result: ${items[result - 1]}, position: ${result}`);
		}, 3000);
	};
</script>

<div class="container">
	<div class="board">
		<div class="spinner-table" style={`--diameter:${diameter - 2}px;`}>
			<div
				class="dial transition-all duration-[3000ms] ease-out"
				style={`transform: rotate(${rotate}deg); width: ${diameter}px; height: ${diameter}px;`}>
				{#each items as item, i}
					<div
						class="slice"
						style={`transform: rotate(${
							(i + 1) * (360 / items.length)
						}deg); --sliceOffSet:${sliceOffSet}px; --sliceColor:${
							COLOR_PALETTE[i % COLOR_PALETTE.length]
						}; --sliceHeight:${sliceHeight}px; --sliceBorderWidth:${
							sliceHeight / 2 + 4
						}px; --radius:${radius}px;`}>
						<div class="label">
							{item}
						</div>
					</div>
				{/each}
				<button
					on:click={spin}
					class="absolute z-50 left-[50%] -translate-x-5 top-[50%] -translate-y-5 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs w-10 h-10 rounded-full bg-purple-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none border-2 border-white"
					type="button">
					<i class="fa-solid fa-arrows-rotate" />
				</button>
			</div>
		</div>
		<div class="arrow" style={`--diameter:${diameter + 30}px`}>
			<span class="pointer" />
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;
		max-width: 800px;
		margin: 2rem auto;
	}

	.spinner-table {
		height: var(--diameter);
		width: var(--diameter);
		position: relative;
		border-radius: 100%;
		overflow: hidden;
	}

	.dial {
		height: 100%;
		transition: all 5s ease-out;
		animation-fill-mode: forwards;
		animation-timing-function: linear;

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

			.label {
				position: absolute;
				top: 0;
				bottom: 0;
				width: 70%;
				line-height: var(--sliceHeight);
				padding-top: 1px;
				padding-bottom: 1px;
				font-size: 16px;
				text-align: right;
				padding-left: 20px;
			}
		}
	}

	.arrow {
		position: absolute;
		height: 30px;
		width: 50px;
		left: var(--diameter);
		z-index: 50;
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
		padding: 50px;
	}
</style>
