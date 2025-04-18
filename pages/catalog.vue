<template>
  <div class="container mx-auto px-4 py-8">
    <transition name="fade-slide">
      <ShopCarousel v-if="showCarousel" />
    </transition>

    <div v-if="error" class="text-red-600 mb-4">
      {{ error }}
    </div>

    <div class="flex flex-col md:flex-row gap-8">
      <div>
        <TypeFilters v-model:selected-type="selectedType" />
        <AdditionalFilters
          :content-type="selectedType"
          :categories="categories"
          @update:filters="updateFilters"
        />
      </div>

      <div class="flex-1">
        <div v-if="isLoading" class="flex flex-col justify-center items-center">
          <img :src="loadingGif" alt="Loading..." class="w-16 h-16 mb-4" />
          <p class="text-gray-500">{{ t('loading') }}</p>
        </div>
        <template v-else>
          <ProductGrid
            v-if="selectedType === ContentType.PRODUCT"
            :filters="filters"
            v-model:products="products"
          />
          <PackGrid
            v-else-if="selectedType === ContentType.BUNDLE"
            :filters="filters"
            v-model:packs="packs"
          />
          <EventGrid
            v-else-if="selectedType === ContentType.EVENT"
            :filters="filters"
            v-model:events="events"
          />
          <CourseGrid
            v-else-if="selectedType === ContentType.COURSE"
            :filters="filters"
            v-model:courses="courses"
          />
          <ServiceGrid
            v-else-if="selectedType === ContentType.SERVICE"
            :filters="filters"
            v-model:services="services"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ShopService } from '~/services/ShopService';
import { ContentType } from '~/types/content-type';
import type { Shop } from '~/types/shop';
import type { Product, ProductFilterParams } from '~/types/product';
import type { Bundle } from '~/types/bundle';
import type { Event as ShopEvent } from '~/types/event';
import type { Course } from '~/types/course';
import type { Service } from '~/types/service';
import ShopCarousel from '~/components/features/catalog/catalog-shop-carousel.vue';
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
const stores = ref<Shop[]>([]);
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
const selectedType = ref<ContentType>(ContentType.PRODUCT);
const showCarousel = computed(() => selectedType.value === ContentType.PRODUCT || selectedType.value === ContentType.BUNDLE);

// Initialize filters with null values for age fields
const filters = ref<ProductFilterParams>({
  name: '',
  category_name: '',
  from_age: null,
  to_age: null,
  page: 1,
  per_page: PER_PAGE,
  from_price: null,
  to_price: null,
  commodity_group_category_id: null,
  commodity_group_id: null,
  sort: ''
});

// Update debouncedFilters to include age filters
const debouncedFilters = computed(() => ({
  name: filters.value.name,
  category_name: filters.value.category_name,
  from_age: filters.value.from_age,
  to_age: filters.value.to_age,
  from_price: filters.value.from_price,
  to_price: filters.value.to_price,
  commodity_group_category_id: filters.value.commodity_group_category_id,
  commodity_group_id: filters.value.commodity_group_id,
  sort: filters.value.sort
}));

// Watch URL changes to update filters(params from url like type and so on)
const fetchCategories = async (type: ContentType) => {
  try {
    switch (type) {
      case ContentType.PRODUCT:
        categories.value = await ShopService.getProductCategories();
        break;
      case ContentType.BUNDLE:
        categories.value = await ShopService.getBundleCategories();
        break;
      case ContentType.EVENT:
        categories.value = await ShopService.getEventCategories();
        break;
      case ContentType.COURSE:
        categories.value = await ShopService.getCourseCategories();
        break;
      case ContentType.SERVICE:
        categories.value = await ShopService.getServiceCategories();
        break;
    }
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }
};

watch(
  [() => selectedType.value, debouncedFilters],
  async ([type, currentFilters]) => {
    isLoading.value = true;
    error.value = null;

    try {
      if (type !== ContentType.BUNDLE) {
        await fetchCategories(type);
      }

      switch (type) {
        case ContentType.PRODUCT: {
          const productResponse = await ShopService.getAllProducts(currentFilters);
          products.value = productResponse.results;
          totalItems.value = productResponse.count;
          break;
        }
        case ContentType.BUNDLE: {
          const bundleResponse = await ShopService.getAllBundles(currentFilters);
          packs.value = bundleResponse.results;
          totalItems.value = bundleResponse.count;
          break;
        }
        case ContentType.EVENT: {
          const eventResponse = await ShopService.getAllEvents(currentFilters);
          events.value = eventResponse.results;
          totalItems.value = eventResponse.count;
          break;
        }
        case ContentType.COURSE: {
          const courseResponse = await ShopService.getAllCourses(currentFilters);
          courses.value = courseResponse.results;
          totalItems.value = courseResponse.count;
          break;
        }
        case ContentType.SERVICE: {
          const serviceResponse = await ShopService.getAllServices(currentFilters);
          services.value = serviceResponse.results;
          totalItems.value = serviceResponse.count;
          break;
        }
        default: {
          console.error('Unknown content type:', type);
          error.value = t('catalog.unknownContentType');
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

// Reference to the loading GIF image
const loadingGif = new URL('@/assets/gifs/loading/loading_1.gif', import.meta.url).href;
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

/* Fade and slide transition styles */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>