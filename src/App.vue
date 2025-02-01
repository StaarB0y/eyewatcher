<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Eye Care Assistant</h1>
          <p class="text-lg text-gray-600">Monitor your screen time and eye health</p>
        </div>
      </div>
      <Timer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Timer from './components/Timer.vue'
</script>