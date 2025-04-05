<template>
  <div class="flex items-center h-12 w-full" @click.prevent.stop>
    <template v-if="quantity > 0">
      <!-- Delete Button (only shown when quantity > 1) -->
      <button
        v-if="quantity > 1"
        class="h-full px-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors text-lg md:text-xl font-medium mr-2"
        @click.prevent.stop="removeItem"
      >
        ×
      </button>
      <!-- Quantity Controls -->
      <button
        class="h-full px-4 border-2 border-[#128C7E] text-[#128C7E] rounded-l-lg hover:bg-[#128C7E] hover:text-white transition-colors text-lg md:text-xl font-medium"
        @click.prevent.stop="decreaseQuantity"
      >
        -
      </button>
      <div class="relative flex flex-col items-center border-y-2 border-[#128C7E] bg-white flex-grow h-full cursor-pointer" @click="showInput = !showInput">
        <span class="h-6 min-w-[48px] px-auto flex items-center justify-center text-lg md:text-xl text-[#128C7E]">
          {{ quantity }}
        </span>
        <span class="text-xs md:text-sm text-gray-600 pb-1">
          {{ totalPrice }}тг
        </span>
        <div v-if="showInput" class="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul class="max-h-40 overflow-y-auto">
            <li
              v-for="n in 20"
              :key="n"
              class="px-4 py-2 cursor-pointer hover:bg-gray-200"
              @click="updateQuantity(n)"
            >
              {{ n }}
            </li>
          </ul>
        </div>
      </div>
      <button
        class="h-full px-4 border-2 border-[#128C7E] text-[#128C7E] rounded-r-lg hover:bg-[#128C7E] hover:text-white transition-colors text-lg md:text-xl font-medium"
        @click.prevent.stop="increaseQuantity"
      >
        +
      </button>
    </template>
    <button
      v-else
      class="group h-full w-full rounded-lg border-2 border-[#128C7E] text-[#128C7E] hover:bg-[#128C7E] transition-colors flex items-center justify-center relative"
      @click.prevent.stop="addToBasket"
    >
      <!-- Basket Icon (shown by default) -->
      <img
        src="~/assets/icons/basket.svg"
        alt="Add to basket"
        class="w-7 h-7 transition-opacity group-hover:opacity-0 absolute"
      >
      <!-- Plus Icon (shown on hover) -->
      <span class="group-hover:text-white text-2xl md:text-3xl font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute">
        +
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBasketStore } from '~/stores/useBasketStore';
import type { Product } from '~/types/product';
import type { Bundle } from '~/types/bundle';
import type { BasketItemType } from '~/stores/useBasketStore';

type ItemWithType = (Product | Bundle) & { type: BasketItemType };

const props = defineProps<{
  item: ItemWithType;
}>();

const { t } = useI18n();
const basketStore = useBasketStore();

const quantity = computed(() => {
  return basketStore.getItemQuantity(props.item.id, props.item.type);
});

const totalPrice = computed(() => {
  return (parseFloat(props.item.price) * quantity.value).toFixed(0);
});

const showInput = ref(false);

const addToBasket = () => {
  basketStore.addItem(props.item);
};

const increaseQuantity = () => {
  basketStore.updateQuantity(props.item.id, quantity.value + 1, props.item.type);
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    basketStore.updateQuantity(props.item.id, quantity.value - 1, props.item.type);
  } else {
    basketStore.removeItem(props.item.id, props.item.type);
  }
};

const removeItem = () => {
  basketStore.removeItem(props.item.id, props.item.type);
};

const updateQuantity = (newQuantity: number) => {
  basketStore.updateQuantity(props.item.id, newQuantity, props.item.type);
  showInput.value = false;
};
</script>

<style scoped>
button:hover img {
  filter: invert(1);
}
</style>