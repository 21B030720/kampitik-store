import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ContentType, MenuSubtype, ActivitiesSubtype, ServicesSubtype } from '~/types/content-type';

export const useNavigationLogic = () => {
  const route = useRoute();
  const router = useRouter();

  const selectedContentType = computed({
    get: () => (route.query.type as ContentType) || null,
    set: (value: ContentType) => {
      router.push({
        query: {
          ...route.query,
          type: value,
          subtype: null // Clear subtype when changing type
        }
      });
    }
  });

  const selectedSubtype = computed({
    get: () => route.query.subtype as MenuSubtype | ActivitiesSubtype | ServicesSubtype | null || null,
    set: (value: MenuSubtype | ActivitiesSubtype | ServicesSubtype | null) => {
      router.push({
        query: {
          ...route.query,
          subtype: value || undefined // Remove subtype from URL if null
        }
      });
    }
  });

  const shouldShowCarousel = computed(() => {
    return !selectedContentType.value && !selectedSubtype.value;
  });

  return {
    selectedContentType,
    selectedSubtype,
    shouldShowCarousel
  };
};