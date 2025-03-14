<template>
	<div class="container mx-auto px-4 py-8">
		<!-- StoreCarousel now handles its own data fetching -->
		<StoreCarousel v-if="!selectedSubtype" />

		<div v-if="error" class="text-red-600 mb-4">
			{{ error }}
		</div>

		<div class="flex flex-col md:flex-row gap-8">
			<!-- Content type filter -->
			<div>
			<ProductFilters
					v-model:selected-type="selectedContentType"
					v-model:selected-subtype="selectedSubtype"
				/>

				<!-- Additional Filters -->
				<AdditionalFilters
					v-if="selectedSubtype"
					:name="filters.name ?? ''"
					:category-name="filters.category_name ?? ''"
					:content-type="selectedContentType"
					:subtype="selectedSubtype"
					@update:name="filters.name = $event"
					@update:category-name="filters.category_name = $event"
					class="mt-6"
				/>
			</div>

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
	import { useRoute } from 'vue-router';
	import AdditionalFilters from '~/components/features/catalog/catalog-additional-filters.vue';
	import type { ProductFilterParams } from '~/services/ShopService';

	const { t } = useI18n();
	const route = useRoute();

	// Store data with proper typing
	const stores = ref<Store[]>([]);
	const products = ref<Product[]>([]);
	const packs = ref<Bundle[]>([]);
	const events = ref<ShopEvent[]>([]);
	const courses = ref<Course[]>([]);
	const services = ref<Service[]>([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	// Initialize filters from URL params with proper type checking
	const selectedContentType = ref<ContentType>(
		(route.query.type as ContentType) || ContentType.MENU
	);

	const selectedSubtype = ref<string | null>(
		// If we have a valid subtype in URL, use it
		route.query.subtype as string || null
	);

	// Add filters state with default values
	const filters = ref<ProductFilterParams>({
		name: '',
		category_name: ''
	});

	// Debounce filter changes
	const debouncedFilters = computed(() => ({
		name: filters.value.name,
		category_name: filters.value.category_name
	}));

	// Watch URL changes to update filters
	watch(
		() => route.query,
		(query) => {
			// Only update type if it's a valid ContentType
			if (query.type && Object.values(ContentType).includes(query.type as ContentType)) {
				selectedContentType.value = query.type as ContentType;
			}
			
			// Only update subtype if it exists in query
			if ('subtype' in query) {
				selectedSubtype.value = query.subtype as string;
			}
		}
	);

	// Watch for filter changes
	watch(
		[() => selectedContentType.value, () => selectedSubtype.value, debouncedFilters],
		async ([type, subtype, currentFilters]) => {
			isLoading.value = true;
			error.value = null;

			try {
				if (type === ContentType.MENU) {
					if (!subtype || subtype === MenuSubtype.PRODUCTS) {
						const productsData = await ShopService.getAllProducts(currentFilters);
						products.value = productsData.map(product => ({
							...product,
							nutrition_characteristics: product.nutrition_characteristics || {
								nutritional_value: 0,
								fats: 0,
								proteins: 0,
								carbohydrates: 0
							}
						}));
					} else if (subtype === MenuSubtype.PACKS) {
						packs.value = await ShopService.getAllPacks(currentFilters);
					}
				} 
				else if (type === ContentType.ACTIVITIES) {
					if (subtype === ActivitiesSubtype.EVENTS) {
						events.value = await ShopService.getAllEvents(currentFilters);
					} else if (subtype === ActivitiesSubtype.COURSES) {
						courses.value = await ShopService.getAllCourses(currentFilters);
					}
				}
				else if (type === ContentType.SERVICES) {
					if (subtype === ServicesSubtype.SERVICES) {
						services.value = await ShopService.getAllServices(currentFilters);
					}
				}
			} catch (err) {
				console.error('Failed to fetch data:', err);
				error.value = t('catalog.fetchError');
			} finally {
				isLoading.value = false;
			}
		},
		{ immediate: true }
	);

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
