<template>
	<section>
		<h2 class="text-2xl font-bold mb-6">{{ t('shop.products') }}</h2>
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			<div
				v-for="product in products"
				:key="product.id"
				class="bg-white rounded-lg shadow p-4 flex flex-col"
			>
				<img
					:src="product.image || placeholderImage"
					:alt="product.name"
					class="w-full aspect-square object-cover rounded-lg mb-4"
					@error="handleImageError"
				>
				<div class="flex flex-col flex-grow">
					<div class="flex-grow">
						<h3 class="font-semibold mb-1">{{ product.name }}</h3>
						<p class="text-sm text-gray-600 mb-2">{{ product.description }}</p>
						<div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
							<span
								>{{ product.from_age }}-{{ product.to_age }}
								{{ t('shop.years') }}</span
							>
							<span>•</span>
							<span>{{ product.category_name }}</span>
						</div>
						<div class="mb-4">
							<p class="font-semibold">
								{{ product.price }}тг/{{ product.measure }}
							</p>
							<div
								class="flex items-center gap-1"
								v-if="product.rating !== null"
							>
								<span class="text-yellow-400">★</span>
								<span class="text-sm">{{ product.rating }}</span>
							</div>
						</div>
					</div>

					<!-- Add to Basket Button at the bottom -->
					<div class="pt-4 border-t">
						<AddToBasketButton :product="product" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { Product } from '~/types/product';
	import AddToBasketButton from '~/components/shared/add-to-basket-button.vue';

	const { t } = useI18n();

	defineProps<{
		products: Product[];
	}>();

	defineEmits<{
		(e: 'add-to-basket', product: Product): void;
	}>();

	const placeholderImage = new URL(
		'@/assets/images/placeholder-product.png',
		import.meta.url,
	).href;

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = placeholderImage;
	};
</script>
