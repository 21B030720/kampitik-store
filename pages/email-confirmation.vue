<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="text-center">
          <img
            src="@/assets/icons/email.svg"
            alt="Email Confirmation"
            class="mx-auto h-16 w-16"
          >
          <h2 class="mt-6 text-3xl font-bold text-gray-900">
            {{ t('auth.emailConfirmationTitle') }}
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            {{ t('auth.emailConfirmationMessage', { email: email }) }}
          </p>
        </div>
        <div class="mt-6">
          <button
            @click="goToHome"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#128C7E] hover:bg-[#0E7265] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {{ t('auth.goToHome') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const email = route.query.email;

const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.bg-gray-50 {
  background-color: #f9fafb;
}

.bg-[#128C7E] {
  background-color: #128C7E;
}

.bg-[#0E7265] {
  background-color: #0E7265;
}

.focus\:ring-primary-500 {
  --tw-ring-color: #128C7E;
}
</style>