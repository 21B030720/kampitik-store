<template>
	<div class="container mx-auto px-4 py-8">
		<!-- Shop Header with Centered Image -->
		<div class="flex flex-col items-center mb-12">
			<img
				:src="shop?.image"
				:alt="shop?.name"
				class="w-48 h-48 rounded-full object-cover shadow-lg mb-4"
			>
			<h1 class="text-3xl font-bold text-center">{{ shop?.name }}</h1>
		</div>

		<!-- Product Packs Section -->
		<section class="mb-12">
			<h2 class="text-2xl font-bold mb-6">{{ t('shop.preparedPacks') }}</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div
					v-for="pack in packs"
					:key="pack.id"
					class="bg-white rounded-lg shadow p-4"
				>
					<div class="flex justify-between items-start mb-4">
						<div>
							<h3 class="text-lg font-semibold">{{ pack.name }}</h3>
							<p class="text-gray-600 text-sm">{{ pack.price }}тг.</p>
						</div>
						<button
							class="p-2 hover:bg-gray-100 rounded-full transition-colors"
							@click="addToBasket(pack)"
						>
							<img
								src="~/assets/icons/basket.svg"
								alt="Add to basket"
								class="w-6 h-6"
							>
						</button>
					</div>
					<ul class="space-y-2">
						<li
							v-for="item in pack.items"
							:key="item.id"
							class="flex justify-between text-sm"
						>
							<span>{{ item.name }}</span>
							<span class="text-gray-600">{{ item.quantity }}шт</span>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Single Products Section -->
		<section>
			<h2 class="text-2xl font-bold mb-6">{{ t('shop.products') }}</h2>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				<div
					v-for="product in products"
					:key="product.id"
					class="bg-white rounded-lg shadow p-4"
				>
					<img
						:src="product.image"
						:alt="product.name"
						class="w-full aspect-square object-cover rounded-lg mb-4"
					>
					<div class="flex justify-between items-start">
						<div>
							<h3 class="font-semibold">{{ product.name }}</h3>
							<p class="text-gray-600">{{ product.price }}тг.</p>
						</div>
						<button
							class="p-2 hover:bg-gray-100 rounded-full transition-colors"
							@click="addToBasket(product)"
						>
							<img
								src="~/assets/icons/basket.svg"
								alt="Add to basket"
								class="w-6 h-6"
							>
						</button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';

	const { t } = useI18n();
	const route = useRoute();
	const shopId = parseInt(route.params.id as string);

	interface PackItem {
		id: number;
		name: string;
		quantity: number;
	}

	interface Pack {
		id: number;
		name: string;
		price: number;
		items: PackItem[];
	}

	interface Product {
		id: number;
		name: string;
		price: number;
		image: string;
	}

	const shop = ref({
		id: shopId,
		name: 'Magnum Cash & Carry',
		image: '/images/stores/magnum.jpg',
	});

	const packs = ref<Pack[]>([
		{
			id: 1,
			name: 'Best mother pack',
			price: 5000,
			items: [
				{ id: 1, name: 'Агуша', quantity: 1 },
				{ id: 2, name: 'Сок Нектар солнечный', quantity: 1 },
				{ id: 3, name: 'Сендвич детский', quantity: 1 },
				{ id: 4, name: 'Хлеб бездрож-жевой', quantity: 1 },
			],
		},
		// Add more packs as needed
	]);

	const products = ref<Product[]>([
		{
			id: 1,
			name: 'Gerber сладкая паста 80г со вкусом банана',
			price: 1300,
			image: '/images/products/gerber.jpg',
		},
		// Add more products as needed
	]);

	const addToBasket = (item: Pack | Product) => {
		console.log('Adding to basket:', item);
		// TODO: Implement basket functionality
	};
</script>
