/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'media', // or 'media' or 'class
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Outfit', 'sans-serif'],
			},
			colors: {
				primary: {
					DEFAULT: '#F97316', // orange-500
					50: '#FFF7ED',
					100: '#FFEDD5',
					200: '#FED7AA',
					300: '#FDBA74',
					400: '#FB923C',
					500: '#F97316',
					600: '#EA580C',
					700: '#C2410C',
					800: '#9A3412',
					900: '#7C2D12',
				},
				surface: {
					DEFAULT: '#1E293B', // slate-800
					dark: '#0F172A',    // slate-900
					light: '#334155',   // slate-700
				}
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
