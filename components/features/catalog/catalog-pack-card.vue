<template>
  <NuxtLink
    :to="localePath(`/bundles/${pack.id}`)"
    class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
  >
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-2">{{ pack.name }}</h3>
      <p v-if="pack.description" class="text-gray-600 text-sm mb-4">
        {{ pack.description }}
      </p>
      <div class="flex justify-between items-center">
        <p class="text-lg font-bold">{{ pack.price }}₸</p>
        <p v-if="pack.discount !== '0.00'" class="text-green-600">
          -{{ pack.discount }}₸
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Bundle } from '~/types/bundle';

const localePath = useLocalePath();

defineProps<{
  pack: Bundle;
}>();
</script> 