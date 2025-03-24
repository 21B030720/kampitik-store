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
			<TypeFilters
					v-model:selected-type="selectedContentType"
					v-model:selected-subtype="selectedSubtype"
				/>
			</div>

			<!-- Content display -->
			<div class="flex-1">
				<!-- Additional Filters -->
				<AdditionalFilters
					:content-type="selectedContentType"
				:categories="categories"
					@update:filters="updateFilters"
				/>

				<div v-if="isLoading" class="flex justify-center items-center">
					<p class="text-gray-500">{{ t('loading') }}</p>
				</div>
				<template v-else>
					<!-- Menu Content -->
					<template v-if="selectedContentType === ContentType.MENU">
						<ProductGrid
							v-if="!selectedSubtype || selectedSubtype === MenuSubtype.PRODUCTS"
							:filters="filters"
							v-model:products="products"
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
	import type { Product, ProductFilterParams } from '~/types/product';
	import type { Bundle } from '~/types/bundle';
	import type { Event as ShopEvent } from '~/types/event';
	import type { Course } from '~/types/course';
	import type { Service } from '~/types/service';
	import StoreCarousel from '~/components/features/catalog/catalog-store-carousel.vue';
	import TypeFilters from '~/components/features/catalog/catalog-type-filters.vue';
	import ProductGrid from '~/components/features/catalog/catalog-product-grid.vue';
	import PackGrid from '~/components/features/catalog/catalog-pack-grid.vue';
	import EventGrid from '~/components/features/catalog/catalog-event-grid.vue';
	import CourseGrid from '~/components/features/catalog/catalog-course-grid.vue';
	import ServiceGrid from '~/components/features/catalog/catalog-service-grid.vue';
	import { useI18n } from 'vue-i18n';
	import { useRoute } from 'vue-router';
	import AdditionalFilters from '~/components/features/catalog/catalog-additional-filters.vue';
	import { PER_PAGE } from '~/composables/usePagination';
	import type { PaginatedResponse, Category } from '~/types/category';
	

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
	const totalItems = ref(0);
	const categories = ref<Category[]>([]);

	// Initialize filters from URL params with proper type checking
	const selectedContentType = ref<ContentType>(
		(route.query.type as ContentType) || ContentType.MENU
	);

	const selectedSubtype = ref<MenuSubtype | ActivitiesSubtype | ServicesSubtype | null>(null);

	// Initialize filters with null values for age fields
	const filters = ref<ProductFilterParams>({
		name: '',
		category_name: '',
		from_age: null,
		to_age: null,
		page: 1,
		per_page: PER_PAGE,
		from_price: null,
		to_price: null
	});

	// Update debouncedFilters to include age filters
	const debouncedFilters = computed(() => ({
		name: filters.value.name,
		category_name: filters.value.category_name,
		from_age: filters.value.from_age,
		to_age: filters.value.to_age,
		from_price: filters.value.from_price,
		to_price: filters.value.to_price,
	}));

	// Watch URL changes to update filters(params from url like type and so on)
	watch(
		() => route.query,
		(query) => {
			// Only update type if it's a valid ContentType
			if (query.type && Object.values(ContentType).includes(query.type as ContentType)) {
				selectedContentType.value = query.type as ContentType;
			}
			
			// Only update subtype if it exists in query
			if ('subtype' in query) {
				selectedSubtype.value = query.subtype as MenuSubtype | ActivitiesSubtype | ServicesSubtype | null;
			}
		}
	);

	// Add a function to fetch categories based on content type
	const fetchCategories = async (type: ContentType, subtype: string | null) => {
		try {
			switch (type) {
				case ContentType.MENU:
					if (!subtype || subtype === MenuSubtype.PRODUCTS) {
						categories.value = await ShopService.getProductCategories();
					} else if (subtype === MenuSubtype.PACKS) {
						categories.value = await ShopService.getBundleCategories();
					}
					break;
				case ContentType.ACTIVITIES:
					if (subtype === ActivitiesSubtype.EVENTS) {
						categories.value = await ShopService.getEventCategories();
					} else if (subtype === ActivitiesSubtype.COURSES) {
						categories.value = await ShopService.getCourseCategories();
					}
					break;
				case ContentType.SERVICES:
					if (subtype === ServicesSubtype.SERVICES) {
						categories.value = await ShopService.getServiceCategories();
					}
					break;
			}
		} catch (err) {
			console.error('Failed to fetch categories:', err);
		}
	};

	// Update the watch to include category fetching
	watch(
		[() => selectedContentType.value, () => selectedSubtype.value],
		async ([type, subtype]) => {
			await fetchCategories(type, subtype);
		},
		{ immediate: true }
	);

	// Watch for filter changes(params from url like type and so on)
	watch(
		[() => selectedContentType.value, () => selectedSubtype.value, debouncedFilters],
		async ([type, subtype, currentFilters]) => {
			isLoading.value = true;
			error.value = null;

			try {
				if (type === ContentType.MENU) {
					if (!subtype || subtype === MenuSubtype.PRODUCTS) {
						const response = await ShopService.getAllProducts(currentFilters);
						products.value = response.results;
						totalItems.value = response.count;
					} else if (subtype === MenuSubtype.PACKS) {
						const response = await ShopService.getAllBundles(currentFilters);
						packs.value = response.results;
						totalItems.value = response.count;
					}
				} 
				else if (type === ContentType.ACTIVITIES) {
					if (subtype === ActivitiesSubtype.EVENTS) {
						const response = await ShopService.getAllEvents(currentFilters);
						events.value = response.results;
						totalItems.value = response.count;
					} else if (subtype === ActivitiesSubtype.COURSES) {
						const response = await ShopService.getAllCourses(currentFilters);
						courses.value = response.results;
						totalItems.value = response.count;
					}
				}
				else if (type === ContentType.SERVICES) {
					if (subtype === ServicesSubtype.SERVICES) {
						const response = await ShopService.getAllServices(currentFilters);
						services.value = response.results;
						totalItems.value = response.count;
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

	const updateFilters = (newFilters: ProductFilterParams) => {
		filters.value = {
			...filters.value,
			...newFilters
		};
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
