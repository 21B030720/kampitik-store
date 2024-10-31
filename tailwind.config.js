/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./error.vue',
	],
	darkMode: 'selector',
	theme: {
		extend: {
			screens: {
				'2xs': '360px',
				xs: '480px',
			},
		},
	},
};
