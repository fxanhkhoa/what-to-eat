<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const sectors = [
		{ color: '#f82', label: 'Stack' },
		{ color: '#0bf', label: '10' },
		{ color: '#fb0', label: '200' },
		{ color: '#0fb', label: '50' },
		{ color: '#b0f', label: '100' },
		{ color: '#f0b', label: '5' },
		{ color: '#bf0', label: '500' }
	];

	const rand = (m: number, M: number) => Math.random() * (M - m) + m;
	let tot = sectors.length;
	let spinEl: HTMLCanvasElement | null;
	let ctx: CanvasRenderingContext2D | null | undefined;
	let dia: number | undefined;
	let rad: number;
	const PI = Math.PI;
	const TAU = 2 * PI;
	const arc = TAU / sectors.length;

	const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
	let angVel = 0; // Angular velocity
	let ang = 0; // Angle in radians

    let rid: number;

	if (browser) {
		spinEl = document.querySelector<HTMLCanvasElement>('#spin');
		ctx = document.querySelector<HTMLCanvasElement>('#wheel')?.getContext('2d');
		dia = ctx?.canvas.width;
		rad = (dia ?? 1) / 2;
	}

	const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

	function drawSector(sector: any, i: number) {
		const ang = arc * i;
		if (ctx) {
			ctx.save();
			// COLOR
			ctx.beginPath();
			ctx.fillStyle = sector.color;
			ctx.moveTo(rad, rad);
			ctx.arc(rad, rad, rad, ang, ang + arc);
			ctx.lineTo(rad, rad);
			ctx.fill();
			// TEXT
			ctx.translate(rad, rad);
			ctx.rotate(ang + arc / 2);
			ctx.textAlign = 'right';
			ctx.fillStyle = '#fff';
			ctx.font = 'bold 30px sans-serif';
			ctx.fillText(sector.label, rad - 10, 10);
			//
			ctx.restore();
		}
	}

	function rotate() {
		if (ctx && spinEl) {
			const sector = sectors[getIndex()];
			ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
			spinEl.textContent = !angVel ? 'SPIN' : sector.label;
			spinEl.style.background = sector.color;
		}
	}

	function frame() {
		if (!angVel) return;
		angVel *= friction; // Decrement velocity by friction
		if (angVel < 0.002) angVel = 0; // Bring to stop
		ang += angVel; // Update angle
		ang %= TAU; // Normalize angle
		rotate();
	}

	function engine() {
		frame();
		rid = requestAnimationFrame(engine);
	}

	function init() {
		sectors.forEach(drawSector);
		rotate(); // Initial rotation
		engine(); // Start engine
		spinEl?.addEventListener('click', () => {
			if (!angVel) angVel = rand(0.25, 0.45);
		});
	}

	onMount(() => {
		init();

        return () => cancelAnimationFrame(rid);
	});
</script>

<div id="wheelOfFortune">
	<canvas id="wheel" width="300" height="300" />
	<div id="spin">SPIN</div>
</div>

<style>
	#wheelOfFortune {
		display: inline-block;
		position: relative;
		overflow: hidden;
	}

	#wheel {
		display: block;
	}

	#spin {
		font: 1.5em/0 sans-serif;
		user-select: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 30%;
		height: 30%;
		margin: -15%;
		background: #fff;
		color: #fff;
		box-shadow: 0 0 0 8px currentColor, 0 0px 15px 5px rgba(0, 0, 0, 0.6);
		border-radius: 50%;
		transition: 0.8s;
	}

	#spin::after {
		content: '';
		position: absolute;
		top: -17px;
		border: 10px solid transparent;
		border-bottom-color: currentColor;
		border-top: none;
	}
</style>
