<template>
	<div class="container mx-auto px-4 py-8">
		<StoreCarousel :stores="stores" />

		<div v-if="error" class="text-red-600 mb-4">
			{{ error }}
		</div>

		<div class="flex flex-col md:flex-row gap-8">
			<!-- Content type filter -->
			<ProductFilters
				v-model:selected-type="selectedContentType"
				v-model:selected-subtype="selectedSubtype"
			/>

			<!-- Content display -->
			<div class="flex-1">
				<div v-if="isLoading" class="flex justify-center items-center">
					<p class="text-gray-500">{{ t('loading') }}</p>
				</div>
				<template v-else>
					<!-- Menu Content -->
					<template v-if="selectedContentType === ContentType.MENU">
						<ProductGrid
							v-if="!selectedSubtype || selectedSubtype === MenuSubtype.PRODUCTS"
							:products="products"
							@add-to-basket="addToBasket"
						/>
						<PackGrid
							v-else-if="selectedSubtype === MenuSubtype.PACKS"
							:packs="packs"
						/>
					</template>

					<!-- Activities Content -->
					<template v-else-if="selectedContentType === ContentType.ACTIVITIES">
						<EventGrid
							v-if="selectedSubtype === ActivitiesSubtype.EVENTS"
							:events="events"
						/>
						<CourseGrid
							v-else-if="selectedSubtype === ActivitiesSubtype.COURSES"
							:courses="courses"
						/>
						<p v-else class="text-gray-500">
							{{ t('catalog.selectActivityType') }}
						</p>
					</template>

					<!-- Services Content -->
					<template v-else-if="selectedContentType === ContentType.SERVICES">
						<ServiceGrid
							v-if="selectedSubtype === ServicesSubtype.SERVICES"
							:services="services"
						/>
						<p v-else class="text-gray-500">
							{{ t('catalog.selectServiceType') }}
						</p>
					</template>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, watch } from 'vue';
	import { ShopService } from '~/services/ShopService';
	import { ContentType, MenuSubtype, ActivitiesSubtype, ServicesSubtype } from '~/types/content-type';
	import type { Store } from '~/types/store';
	import type { Product } from '~/types/product';
	import type { Bundle } from '~/types/bundle';
	import type { Event as ShopEvent } from '~/types/event';
	import type { Course } from '~/types/course';
	import type { Service } from '~/types/service';
	import StoreCarousel from '~/components/features/catalog/catalog-store-carousel.vue';
	import ProductFilters from '~/components/features/catalog/catalog-product-filters.vue';
	import ProductGrid from '~/components/features/catalog/catalog-product-grid.vue';
	import PackGrid from '~/components/features/catalog/catalog-pack-grid.vue';
	import EventGrid from '~/components/features/catalog/catalog-event-grid.vue';
	import CourseGrid from '~/components/features/catalog/catalog-course-grid.vue';
	import ServiceGrid from '~/components/features/catalog/catalog-service-grid.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	// Store data with proper typing
	const stores = ref<Store[]>([]);
	const products = ref<Product[]>([]);
	const packs = ref<Bundle[]>([]);
	const events = ref<ShopEvent[]>([]);
	const courses = ref<Course[]>([]);
	const services = ref<Service[]>([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	// Filter state
	const selectedContentType = ref<ContentType>(ContentType.MENU);
	const selectedSubtype = ref<string | null>(null);

	// Watch for filter changes
	watch(
		[selectedContentType, selectedSubtype],
		async () => {
			isLoading.value = true;
			error.value = null;

			try {
				// For Menu type, show products by default
				if (selectedContentType.value === ContentType.MENU) {
					if (!selectedSubtype.value || selectedSubtype.value === MenuSubtype.PRODUCTS) {
						const productsData = await ShopService.getAllProducts();
						// Transform products to ensure nutrition_characteristics is never null
						products.value = productsData.map(product => ({
							...product,
							nutrition_characteristics: product.nutrition_characteristics || {
								nutritional_value: 0,
								fats: 0,
								proteins: 0,
								carbohydrates: 0
							}
						}));
					} else if (selectedSubtype.value === MenuSubtype.PACKS) {
						packs.value = await ShopService.getAllPacks();
					}
				} 
				// For Activities type, require subtype selection
				else if (selectedContentType.value === ContentType.ACTIVITIES) {
					if (selectedSubtype.value === ActivitiesSubtype.EVENTS) {
						events.value = await ShopService.getAllEvents();
					} else if (selectedSubtype.value === ActivitiesSubtype.COURSES) {
						courses.value = await ShopService.getAllCourses();
					}
				}
				// For Services type
				else if (selectedContentType.value === ContentType.SERVICES) {
					if (selectedSubtype.value === ServicesSubtype.SERVICES) {
						services.value = await ShopService.getAllServices();
					}
				}
			} catch (err) {
				console.error('Failed to fetch data:', err);
				error.value = t('catalog.fetchError');
			} finally {
				isLoading.value = false;
			}
		},
		{ immediate: true } // This makes the watch run immediately when component mounts
	);

	// Simplified onMounted to only fetch stores
	onMounted(async () => {
		try {
			stores.value = await ShopService.getShops();
		} catch (err) {
			console.error('Failed to fetch stores:', err);
			error.value = 'Failed to load stores. Please try again later.';
		}
	});

	// Import images
	const magnumImage =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlMDAh7DttznnRGKvt2KTAMeM0a9RqeqpcAQ&s';
	const store6Image =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlMDAh7DttznnRGKvt2KTAMeM0a9RqeqpcAQ&s';
	const agushaImage =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7sW3JRTOWjhUZgJYHUM_Xj1nYKX_lTZcNw&s';

	// Add to basket functionality
	const addToBasket = (product: Product) => {
		// TODO: Implement basket functionality
		console.log('Adding to basket:', product);
	};
</script>

<style scoped>
	.aspect-video {
		aspect-ratio: 16 / 9;
	}

	/* Hide scrollbar but keep functionality */
	.overflow-x-hidden::-webkit-scrollbar {
		display: none;
	}
	.overflow-x-hidden {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
