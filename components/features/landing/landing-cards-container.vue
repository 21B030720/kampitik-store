<template>
  <div class="cards-container">
    <VarietyCard />
    <ServicesCard />
    <PaymentCard />
  </div>
</template>

<script setup lang="ts">
import VarietyCard from '~/components/features/landing/cards/landing-variety-card.vue';
import ServicesCard from '~/components/features/landing/cards/landing-services-card.vue';
import PaymentCard from '~/components/features/landing/cards/landing-payment-card.vue';
</script>

<style scoped>
.cards-container {
  display: flex;
  gap: 100px;
  padding: 100px; /* Add padding to create distance from the window borders */
}
</style>