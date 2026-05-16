<script setup>
defineProps(['show']);
const emit = defineEmits(['close', 'confirm']);
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center transform transition-all">
      
      <div class="flex justify-center mb-4">
        <div class="bg-red-50 p-4 rounded-full">
          <span class="material-icons text-red-500 text-6xl">warning</span>
        </div>
      </div>

      <h3 class="text-xl font-bold text-gray-800 mb-6">Yakin Ingin Keluar?</h3>

      <div class="flex space-x-3">
        <button 
          @click="emit('confirm')" 
          class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-all active:scale-95"
        >
          Yakin
        </button>
        <button 
          @click="emit('close')" 
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2.5 rounded-lg transition-all active:scale-95"
        >
          Kembali
        </button>
      </div>
    </div>
  </div>
</template>