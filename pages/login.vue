<template>
	<div
		class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
	>
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
				{{ isLogin ? t('auth.loginTitle') : t('auth.signupTitle') }}
			</h2>
		</div>

		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<form class="space-y-6" @submit.prevent="handleSubmit">
					<!-- Name field (signup only) -->
					<div v-if="!isLogin">
						<label for="name" class="block text-sm font-medium text-gray-700">
							{{ t('auth.name') }}
						</label>
						<div class="mt-1">
							<input
								id="name"
								v-model="form.name"
								type="text"
								required
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							>
						</div>
					</div>

					<!-- Username field (signup only) -->
					<div v-if="!isLogin">
						<label
							for="username"
							class="block text-sm font-medium text-gray-700"
						>
							{{ t('auth.username') }}
						</label>
						<div class="mt-1">
							<input
								id="username"
								v-model="form.username"
								type="text"
								required
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							>
						</div>
					</div>

					<!-- Email field -->
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">
							{{ isLogin ? t('auth.usernameOrEmail') : t('auth.email') }}
						</label>
						<div class="mt-1">
							<input
								id="email"
								v-model="form.email"
								:type="isLogin ? 'text' : 'email'"
								required
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							>
						</div>
					</div>

					<!-- Phone field (signup only) -->
					<div v-if="!isLogin">
						<label for="phone" class="block text-sm font-medium text-gray-700">
							{{ t('auth.phone') }}
						</label>
						<div class="mt-1">
							<input
								id="phone"
								v-model="form.phone"
								type="tel"
								required
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							>
						</div>
					</div>

					<!-- Password field -->
					<div>
						<label
							for="password"
							class="block text-sm font-medium text-gray-700"
						>
							{{ t('auth.password') }}
						</label>
						<div class="mt-1">
							<input
								id="password"
								v-model="form.password"
								type="password"
								required
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							>
						</div>
					</div>

					<!-- Error message -->
					<div v-if="error" class="text-red-600 text-sm">
						{{ error }}
					</div>

					<!-- Submit button -->
					<button
                        type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#128C7E] hover:bg-[#0E7265] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        :disabled="isLoading"
                    >
                        <BaseSpinner v-if="isLoading" class="mr-2" />
                        <span>{{ isLogin ? t('auth.login') : t('auth.signup') }}</span>
                    </button>

					<!-- Toggle login/signup -->
					<div class="text-sm text-center">
						<button
							type="button"
							class="font-medium text-[#128C7E] hover:text-[#0E7265]"
							@click="toggleMode"
						>
							{{ isLogin ? t('auth.needAccount') : t('auth.haveAccount') }}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { useAuthStore } from '~/stores/useAuthStore';
	import BaseSpinner from '~/components/shared/base-spinner.vue';

	const { t } = useI18n();
	const router = useRouter();
	const localePath = useLocalePath();
	const authStore = useAuthStore();

	const isLogin = ref(true);
	const isLoading = ref(false);
	const error = ref('');

	const form = reactive({
		username: '',
		name: '',
		email: '',
		phone: '',
		password: '',
	});

	const handleSubmit = async () => {
		isLoading.value = true;
		error.value = '';

		try {
			if (isLogin.value) {
				await authStore.login({
					usernameOrEmail: form.email,
					password: form.password,
				});
			} else {
				await authStore.signup({
					username: form.username,
					name: form.name,
					email: form.email,
					phone: form.phone,
					password: form.password,
				});
			}

			// Redirect to home page after successful login/signup
			router.push(localePath('/'));
		} catch (err) {
			error.value = t('auth.error');
		} finally {
			isLoading.value = false;
		}
	};

	const toggleMode = () => {
		isLogin.value = !isLogin.value;
		error.value = '';
		// Reset form when toggling
		Object.assign(form, {
			username: '',
			name: '',
			email: '',
			phone: '',
			password: '',
		});
	};
</script>
