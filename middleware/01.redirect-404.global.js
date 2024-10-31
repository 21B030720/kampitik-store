export default defineNuxtRouteMiddleware(async (to) => {
	const localePath = useLocalePath();

	if (to.matched.length === 0 && to.path !== localePath('/not-found')) {
		return navigateTo(localePath('/not-found'));
	}
});
