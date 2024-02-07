import mod from 'astro/zod'
import { ModuleDetectionKind } from 'typescript'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode:'media', // or 'media' or 'class
	theme: {
	  },
	  plugins: [
		require('@tailwindcss/typography'),
		// ...
	  ],
}
