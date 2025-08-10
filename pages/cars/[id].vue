<script setup lang="ts">
import { validateParamNumber } from "~/utils/helpers";
import useCar from "~/composables/useCar";

const carId = computed(() => validateParamNumber(useRoute().params.id));

const { data: car, isLoading, isError, error } = useCar(carId);
</script>

<template>
  <div>
    <div v-if="isLoading">Loading car...</div>
    <div v-else-if="isError">An error occurred: {{ error?.message }}</div>
    <div v-else-if="car?.data">
      <h1>{{ car.data.make }}</h1>
      <p>{{ car.data.model }}</p>
      <p>{{ car.data.user?.full_name }}</p>
    </div>
  </div>
</template>
