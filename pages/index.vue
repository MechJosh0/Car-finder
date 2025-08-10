<script setup>
// Page meta
definePageMeta({
  title: "Hello World - My Nuxt App",
});

// Optional: Add some reactive data
const message = ref("Hello from Vue Composition API!");

// Optional: Simple counter to test reactivity
const count = ref(0);
const increment = () => count.value++;
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Hello World! 🚀</h1>
      <p class="text-lg text-gray-600 mb-8">
        Welcome to your Nuxt + Vue + TanStack + Prisma app
      </p>

      <div
        class="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto"
      >
        <h2 class="text-xl font-semibold text-blue-800 mb-2">
          Tech Stack Ready:
        </h2>
        <ul class="text-blue-600 space-y-1">
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
