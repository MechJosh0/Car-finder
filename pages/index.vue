<script setup>
import { onMounted } from "vue";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

// Page meta
definePageMeta({
  title: "Hello World - My Nuxt App",
});

// Optional: Add some reactive data
const message = ref("Hello from Vue Composition API!");

// Optional: Simple counter to test reactivity
const count = ref(0);
const increment = () => count.value++;
onMounted(() => {
  createChat({
    webhookUrl:
      "http://localhost:5678/webhook/e02e9876-e50c-4941-bc12-7c960fc75b68/chat",
  });
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center">
      <h1 class="mb-4 text-4xl font-bold text-gray-800">Hello World! 🚀</h1>
      <p class="mb-8 text-lg text-gray-600">
        Welcome to your Nuxt + Vue + TanStack + Prisma app
      </p>

      <div
        class="mx-auto max-w-md rounded-lg border border-blue-200 bg-blue-50 p-6"
      >
        <h2 class="mb-2 text-xl font-semibold text-blue-800">
          Tech Stack Ready:
        </h2>
        <ul class="space-y-1 text-blue-600">
          <li>✅ Vue 3</li>
          <li>✅ Nuxt 3</li>
          <li>✅ TanStack Query</li>
          <li>✅ Prisma (setup required)</li>
          <li>✅ TypeScript</li>
        </ul>
      </div>
      <button @click="increment()">Count ({{ count }})</button>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
