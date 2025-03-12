<template>
	<div class="bg-white rounded-lg shadow-lg p-6">
		<h1 class="text-2xl font-bold mb-6">
			{{ t('balance.replenishmentTitle') }}
		</h1>

		<!-- Current Balance -->
		<div class="mb-6 p-4 bg-gray-50 rounded-lg">
			<p class="text-sm text-gray-600">{{ t('balance.currentBalance') }}</p>
			<p class="text-2xl font-bold">{{ wallet?.balance || '0' }}тг</p>
		</div>

		<!-- Replenishment Form -->
		<form @submit.prevent="handleSubmit" class="space-y-6">
			<!-- Amount Input -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					{{ t('balance.amount') }}
				</label>
				<div class="relative">
					<input
						:value="modelValue"
						@input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
						type="number"
						min="2000"
						max="10000"
						step="100"
						required
						class="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
						:placeholder="t('balance.enterAmount')"
					>
					<span class="absolute right-3 top-2 text-gray-500">тг</span>
				</div>
				<p class="text-sm text-gray-500 mt-1">
					{{ t('balance.limitNote') }}
				</p>
			</div>

			<!-- Quick Amount Buttons -->
			<div class="grid grid-cols-3 gap-2">
				<button
					v-for="quickAmount in quickAmounts"
					:key="quickAmount"
					type="button"
					class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
					@click="$emit('update:modelValue', quickAmount)"
				>
					{{ quickAmount }}тг
				</button>
			</div>

			<!-- Submit Button -->
			<button
				type="submit"
				class="w-full bg-[#128C7E] text-white py-3 rounded-lg hover:bg-[#0E7265] transition-colors"
				:disabled="isLoading || !isValidAmount"
			>
				{{ t('balance.replenish') }}
			</button>

			<!-- Error Message -->
			<p v-if="error" class="text-red-600 text-sm text-center">
				{{ error }}
			</p>
		</form>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Wallet } from '~/types/wallet';

const { t } = useI18n();

const props = defineProps<{
	modelValue: number;
	wallet: Wallet | null;
	isLoading: boolean;
	error: string;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void;
	(e: 'submit'): void;
}>();

const quickAmounts = [2000, 5000, 10000];

const isValidAmount = computed(() => {
	return props.modelValue >= 2000 && props.modelValue <= 10000;
});

const handleSubmit = () => {
	if (isValidAmount.value) {
		emit('submit');
	}
};
</script> 