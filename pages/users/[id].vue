<script setup lang="ts">
import { validateParamNumber } from "~/utils/helpers";
import useUser from "~/composables/useUser";

const userId = computed(() => validateParamNumber(useRoute().params.id));

const { data: user, isLoading, isError, error } = useUser(userId);
</script>

<template>
  <div>
    <div v-if="isLoading">Loading user...</div>
    <div v-else-if="isError">An error occurred: {{ error?.message }}</div>
    <div v-else-if="user?.data">
      <h1>{{ user.data.full_name }}</h1>
      <p>{{ user.data.email }}</p>
      <h3>Cars</h3>
      <ul>
        <li v-for="car in user.data.cars" :key="car.id">
          <p>{{ car.make }} - {{ car.model }} ({{ car.year }})</p>
        </li>
      </ul>
    </div>
  </div>
</template>
