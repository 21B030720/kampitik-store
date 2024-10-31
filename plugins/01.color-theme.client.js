export default defineNuxtPlugin((nuxt) => {
	const themeCookie = useCookie('theme', { path: '/', sameSite: 'strict' });

	const isDarkMode = ref(themeCookie.value === 'dark');

	const setLightMode = () => {
		themeCookie.value = 'light';
		isDarkMode.value = false;
		document.documentElement.classList.remove('dark');
	};

	const setDarkMode = () => {
		themeCookie.value = 'dark';
		isDarkMode.value = true;
		document.documentElement.classList.add('dark');
	};

	const toggleMode = () => {
		if (isDarkMode.value) setLightMode();
		else setDarkMode();
	};

	const respectOSPreference = () => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setDarkMode();
		} else {
			setLightMode();
		}
	};

	nuxt.hooks.hook('app:beforeMount', () => {
		if (themeCookie.value) {
			if (themeCookie.value === 'dark') {
				setDarkMode();
			} else {
				setLightMode();
			}
		} else {
			respectOSPreference();
		}
	});

	return {
		provide: {
			isDarkMode,
			setLightMode,
			setDarkMode,
			toggleMode,
			respectOSPreference,
		},
	};
});
