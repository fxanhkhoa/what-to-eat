/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';

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
				},
				flipInHorBottom: {
					'0%': {
						transform: 'rotateX(80deg)',
						opacity: 0
					},
					'100%': {
						transform: 'rotateX(0)',
						opacity: 1
					}
				}
			},
			animation: {
				hFlip: 'flipHorizontal 0.5s ease-in-out',
				hFlipBack: 'flipHorizontalBack 0.5s ease-in-out',
				flipInHorBottom: 'flipInHorBottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both'
			},
			fontFamily: {
				sans: [
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Oxygen',
					'Ubuntu',
					'Cantarell',
					'Fira Sans',
					'Droid Sans',
					'Helvetica Neue',
					'Arial',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol'
				],
				mono: [
					'ui-monospace',
					'SFMono-Regular',
					'SF Mono',
					'Menlo',
					'Consolas',
					'Liberation Mono',
					'monospace'
				]
			}
		}
	},
	plugins: [
		typography,
		plugin(function ({ addVariant, matchUtilities, theme }) {
			addVariant('hocus', ['&:hover', '&:focus']);
			// Square utility
			matchUtilities(
				{
					square: (value) => ({
						width: value,
						height: value
					})
				},
				{ values: theme('spacing') }
			);
		})
	],
	corePlugins: {},
	important: true
};
