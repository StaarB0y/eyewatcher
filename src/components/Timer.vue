<template>
  <div class="card p-6 w-full max-w-sm mx-auto bg-white shadow-lg animate-fade">
    <div class="flex flex-col items-center space-y-4">
      <Eye class="w-12 h-12 text-primary" />
      <h2 class="text-2xl font-semibold text-gray-800">Screen Time Timer</h2>
      <div class="text-4xl font-bold text-primary">{{ formattedTime }}</div>
      <div class="flex gap-2 w-full">
        <button 
          @click="toggleTimer"
          class="flex-1 flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          <component :is="isActive ? PauseCircle : PlayCircle" class="w-5 h-5" />
          <span>{{ isActive ? 'Stop' : 'Start' }}</span>
        </button>
        <button 
          @click="resetTimer"
          class="flex items-center justify-center space-x-2 border border-input bg-background hover:bg-accent px-4 py-2 rounded"
        >
          <RotateCcw class="w-5 h-5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Dialog -->
  <Teleport to="body">
    <div v-if="showDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold mb-4">Timer Started! 👁️</h2>
        <p class="text-gray-600 mb-6">Your eyes will be monitored for the next 20 minutes</p>
        <div class="flex justify-center p-6">
          <div class="relative w-32 h-32">
            <div 
              class="absolute w-32 h-32 rounded-full transition-colors duration-1000"
              :style="{
                background: seconds % 1200 === 0 ? 'red' : 'white',
                border: '4px solid #666'
              }"
            >
              <div 
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full transition-colors duration-1000"
                :style="{
                  background: seconds % 1200 === 0 ? '#ff3333' : '#333'
                }"
              >
                <div 
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-colors duration-1000"
                  :style="{
                    background: seconds % 1200 === 0 ? '#ff0000' : '#000'
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onUnmounted, computed } from 'vue'
import { Eye, PauseCircle, PlayCircle, RotateCcw } from 'lucide-vue-next'

const seconds = ref(0)
const isActive = ref(false)
const showDialog = ref(false)

const formattedTime = computed(() => {
  const hours = Math.floor(seconds.value / 3600)
  const minutes = Math.floor((seconds.value % 3600) / 60)
  const secs = seconds.value % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
})

let intervalId: number | null = null

const toggleTimer = () => {
  if (!isActive.value) {
    showDialog.value = true
  }
  isActive.value = !isActive.value

  if (isActive.value) {
    intervalId = setInterval(() => {
      seconds.value++
      if (seconds.value % 1200 === 0) {
        alert('Time for an Eye Break! 👀\nLook at something 20 feet away for 20 seconds')
      }
    }, 1000)
  } else if (intervalId) {
    clearInterval(intervalId)
  }
}

const resetTimer = () => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  isActive.value = false
  seconds.value = 0
  showDialog.value = false
}

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
</style>