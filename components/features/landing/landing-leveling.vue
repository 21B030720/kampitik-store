<template>
  <div :style="componentStyle" class="flex flex-col items-center p-6 rounded-2xl shadow-lg">
    <h2 class="text-4xl font-bold mt-16 mb-2 text-[#333333]">GAMIFICATION OF PARENTING</h2>
    <p class="text-center text-xl mb-6 text-[#333333]">
      Make caring into the game. Proctor does your child is get enough attention
    </p>

    <!-- Level Selector -->
    <div class="relative w-full mb-4" v-if="selectedIndex === null">
      <!-- Line behind dots -->
      <div class="absolute inset-x-0 bottom-12 z-0">
        <div class="w-full h-2 bg-[#D6D6D6] rounded-full"></div>
      </div>

      <!-- Level Images and Dots -->
      <div class="flex justify-between items-end relative z-10">
        <div
          v-for="(src, index) in imageSources"
          :key="index"
          class="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
          @click="selectLevel(index)"
        >
          <img
            :src="src"
            :alt="`Growth stage ${index + 1}`"
            :style="imageStyle(index)"
            class="object-contain rounded-lg mb-2"
          >

          <!-- Dot -->
          <div class="w-10 h-10 bg-[#FB9500] rounded-full border-2 border-[#FB9500] mb-2" />

          <span class="text-black font-bold">{{ levels[index] }}</span>
        </div>
      </div>
    </div>

    <!-- Selected Level and Bundles -->
    <div v-else class="mt-8 w-full flex justify-center relative">
      <!-- Back button -->
      <button
        @click="selectedIndex = null"
        class="absolute top-6 left-6 px-4 py-2 bg-white text-[#333] border border-gray-300 rounded-xl shadow hover:bg-gray-100 transition"
      >
        ← Back
      </button>

      <div class="flex flex-col md:flex-row items-center gap-6">
        <!-- Selected Image -->
        <img :src="imageSources[selectedIndex]" class="h-32 rounded-xl" />

        <!-- Bundle Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(bundle, index) in bundles[selectedIndex]" :key="index" class="bg-white p-6 rounded-xl shadow-md">
            <div :style="titleStyle" class="p-4 rounded-xl mb-4">
              <h3 class="text-xl font-bold text-[#333] mb-2">{{ bundle.title }}</h3>
            </div>
            <p class="text-2xl font-bold">{{ bundle.price }} ₸ <span class="text-sm font-normal">per month</span></p>
            <ul class="list-disc pl-5 mt-2 text-sm text-[#555]">
              <li v-for="(item, itemIndex) in bundle.features" :key="itemIndex">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import imageSrc1 from '@/assets/images/level/level_1(1).png'
import imageSrc2 from '@/assets/images/level/level_2(1).png'
import imageSrc3 from '@/assets/images/level/level_3(2).png'
import imageSrc4 from '@/assets/images/level/level_4(1).png'
import imageSrc5 from '@/assets/images/level/level_5.png'
import imageSrc6 from '@/assets/images/level/level_6(1).png'

const imageSources = [imageSrc1, imageSrc2, imageSrc3, imageSrc4, imageSrc5, imageSrc6]
const levels = ['0–1', '1–2', '2–3', '3–4', '4–5', '5+']
const selectedIndex = ref<number | null>(null)

const selectLevel = (index: number) => {
  selectedIndex.value = index
}

const imageStyle = (index: number) => {
  const baseSize = 80 // Base size in pixels
  const increment = 20 // Increment size in pixels
  const size = baseSize + index * increment
  return {
    width: `${size}px`,
    height: `${size}px`
  }
}

const backgroundColors = ['#DDEBF4', '#DDEBE0', '#E8E4F1', '#C67162', '#F5E6CC', '#B0E0E6']

const componentStyle = computed(() => {
  const backgroundColor = selectedIndex.value !== null ? backgroundColors[selectedIndex.value] : '#DDEBF4'
  return {
    backgroundColor
  }
})

const titleStyle = computed(() => {
  const backgroundColor = selectedIndex.value !== null ? backgroundColors[selectedIndex.value] : '#DDEBF4'
  return {
    backgroundColor
  }
})

const bundles = [
  [
    {
      title: 'Newborns',
      price: '41,250',
      features: [
        'Analyze of needs',
        'Food, diapers and clothes',
        'Permanent delivery to the home',
        'Support and short contact with professional'
      ]
    },
    {
      title: 'Newborns Plus',
      price: '50,000',
      features: [
        'All features of Newborns',
        'Additional toys and accessories',
        'Extended support hours'
      ]
    }
  ],
  [
    {
      title: 'Babies',
      price: '33,337',
      features: [
        'Variety of chosen needs',
        'Permanent delivery to the home',
        'Food, diapers and clothes'
      ]
    },
    {
      title: 'Babies Plus',
      price: '40,000',
      features: [
        'All features of Babies',
        'Additional educational toys',
        'Extended delivery options'
      ]
    }
  ],
  [
    {
      title: 'Toddlers',
      price: '29,999',
      features: [
        'Educational toys',
        'Healthy snacks',
        'Clothing and shoes',
        'Monthly check-ups'
      ]
    },
    {
      title: 'Toddlers Plus',
      price: '35,000',
      features: [
        'All features of Toddlers',
        'Additional outdoor play equipment',
        'Extended health check-ups'
      ]
    }
  ],
  [
    {
      title: 'Preschoolers',
      price: '27,500',
      features: [
        'Learning materials',
        'Outdoor play equipment',
        'Seasonal clothing',
        'Bi-weekly check-ups'
      ]
    },
    {
      title: 'Preschoolers Plus',
      price: '32,000',
      features: [
        'All features of Preschoolers',
        'Additional learning materials',
        'Extended outdoor activities'
      ]
    }
  ],
  [
    {
      title: 'School Age',
      price: '25,000',
      features: [
        'School supplies',
        'Sports equipment',
        'Daily meals',
        'Monthly health check-ups'
      ]
    },
    {
      title: 'School Age Plus',
      price: '30,000',
      features: [
        'All features of School Age',
        'Additional tutoring services',
        'Extended sports programs'
      ]
    }
  ],
  [
    {
      title: 'Teens',
      price: '22,000',
      features: [
        'Tutoring services',
        'Fitness programs',
        'Fashionable clothing',
        'Bi-monthly health check-ups'
      ]
    },
    {
      title: 'Teens Plus',
      price: '27,000',
      features: [
        'All features of Teens',
        'Additional fitness programs',
        'Extended tutoring hours'
      ]
    }
  ]
]
</script>

<style scoped>
.transition-transform {
  transition: transform 0.3s ease-in-out;
}
</style>