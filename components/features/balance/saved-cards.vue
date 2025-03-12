<template>
	<div class="bg-white rounded-lg shadow-lg p-6">
		<h2 class="text-xl font-bold mb-4">Saved Cards</h2>
		<div v-if="isLoading" class="text-center py-4">
			<p class="text-gray-500">{{ t('loading') }}</p>
		</div>
		<div v-else-if="cards.length === 0" class="text-center py-4">
			<p class="text-gray-500">No saved cards</p>
		</div>
		<div v-else class="space-y-4">
			<div 
				v-for="card in cards" 
				:key="card.id"
				class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
				:class="{
					'border-[#128C7E]': card.default,
					'border-blue-500 bg-blue-50': selectedCardId === card.id
				}"
				@click="selectCard(card.id)"
			>
				<div class="flex items-center gap-3">
					<div class="w-10 h-6 flex items-center justify-center">
						<img 
							v-if="getCardType(card.card_hash) === 'mastercard'"
							src="~/assets/icons/mastercard.svg"
							alt="Mastercard"
							class="w-full h-full object-contain"
						/>
						<img 
							v-else-if="getCardType(card.card_hash) === 'visa'"
							src="~/assets/icons/visa.svg"
							alt="Visa"
							class="w-full h-full object-contain"
						/>
						<div v-else class="w-full h-full bg-gray-200 rounded"></div>
					</div>
					<div>
						<p class="font-medium">•••• {{ card.card_hash.slice(-4) }}</p>
						<p class="text-sm text-gray-500">{{ card.card_month }}/{{ card.card_year }}</p>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<div v-if="card.default" class="text-sm text-[#128C7E]">Default</div>
					<div v-if="selectedCardId === card.id" class="text-blue-500">✓</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface SavedCard {
	id: number;
	card_hash: string;
	card_month: string;
	card_year: string;
	default: boolean;
}

const props = defineProps<{
	cards: SavedCard[];
	isLoading: boolean;
	selectedCardId: number | null;
}>();

const emit = defineEmits<{
	(e: 'update:selectedCardId', id: number): void;
}>();

const getCardType = (hash: string) => {
	const firstDigit = hash[0];
	if (firstDigit === '5') return 'mastercard';
	if (firstDigit === '4') return 'visa';
	return 'unknown';
};

const selectCard = (cardId: number) => {
	emit('update:selectedCardId', cardId);
};
</script> 