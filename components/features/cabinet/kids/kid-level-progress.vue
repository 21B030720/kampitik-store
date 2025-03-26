<template>
  <div class="mt-2">
    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        class="h-full bg-primary-600 transition-all"
        :style="{ width: `${kidLevel.current_progress}%` }"
      />
    </div>
    <div class="flex justify-between text-xs text-gray-500 mt-1">
      <span>{{ kidLevel.from_xp }} XP</span>
      <span>{{ kidLevel.to_xp }} XP</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  kidLevel: {
    current_progress: number;
    from_xp: number;
    to_xp: number;
  };
}>();
</script>