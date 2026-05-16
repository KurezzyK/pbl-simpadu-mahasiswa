<script setup>
defineProps(['show', 'studentData']);
const emit = defineEmits(['close', 'confirm']);
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden transform transition-all">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 class="font-bold text-gray-800">Hapus Data Mahasiswa</h3>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 transition">
          <span class="material-icons">close</span>
        </button>
      </div>

      <div class="p-6 space-y-4">
        <div class="flex items-center space-x-3 text-amber-600 bg-amber-50 p-3 rounded-lg">
          <span class="material-icons text-2xl">warning</span>
          <p class="text-xs font-medium">Apakah anda yakin ingin menghapus data mahasiswa berikut?</p>
        </div>

        <div class="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4 border border-gray-100">
          <div>
            <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">NIM</p>
            <p class="text-sm font-bold text-gray-800">{{ studentData?.nim }}</p>
          </div>
          <div>
            <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Nama</p>
            <p class="text-sm font-bold text-gray-800">{{ studentData?.nama }}</p>
          </div>
        </div>

        <p class="text-[10px] text-red-500 italic font-medium">Data yang dihapus tidak dapat dikembalikan.</p>
      </div>

      <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
        <button 
          @click="emit('close')" 
          class="px-5 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-white transition"
        >
          Batal
        </button>
        <button 
          @click="emit('confirm')" 
          class="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 shadow-md transition"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
</template>