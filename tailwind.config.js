/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				flipHorizontal: {
					'100%': { transform: 'rotateY(180deg)' }
				},
				flipHorizontalBack: {
					'0%': { transform: 'rotateY(180deg)' }
				}
			},
			animation: {
				hFlip: 'flipHorizontal 0.5s ease-in-out',
				hFlipBack: 'flipHorizontalBack 0.5s ease-in-out'
			}
		}
	},
	plugins: [],
	corePlugins: {},
	important: true
};
