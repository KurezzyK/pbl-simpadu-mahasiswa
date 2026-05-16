<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import LogoutModal from './logout.vue';

defineProps(['isOpen']);
const router = useRouter();
const route = useRoute();

const isModalVisible = ref(false);
// State untuk mengontrol buka-tutup dropdown Manajemen Mahasiswa
const isDropdownOpen = ref(true); 

const navigasiKe = (routeName) => {
  router.push({ name: routeName });
};

const handleLogout = () => {
  localStorage.clear();
  router.push('/');
};
</script>

<template>
  <aside class="w-64 min-w-[16rem] h-full bg-[#dbeafe] flex flex-col shadow-inner">
    
    <nav class="flex-none px-4 py-6 space-y-2">
      <button 
        @click="navigasiKe('dashboard')"
        :class="[
          'w-full flex items-center space-x-3 p-3 rounded-xl transition shadow-sm',
          route.name === 'dashboard' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-gray-700 hover:bg-blue-200/50'
        ]"
      >
        <span class="material-icons text-xl">dashboard</span>
        <span class="font-medium text-sm">Dashboard</span>
      </button>
      
      <div class="space-y-1">
        <button 
          @click="isDropdownOpen = !isDropdownOpen"
          class="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-blue-200/50 rounded-lg text-sm transition"
        >
          <div class="flex items-center space-x-3">
            <span class="material-icons text-lg">groups</span>
            <span class="font-medium">Manajemen Mahasiswa</span>
          </div>
          <span 
            class="material-icons text-sm transition-transform duration-300"
            :class="{ 'rotate-180': isDropdownOpen }"
          >
            expand_more
          </span>
        </button>

        <div v-show="isDropdownOpen" class="space-y-1 overflow-hidden">
          <button @click="navigasiKe('mahasiswa')" :class="['w-full flex items-center space-x-3 p-3 rounded-lg text-sm transition','pl-11', route.name === 'mahasiswa' ? 'bg-[#1e3a8a] text-white font-semibold' : 'text-gray-600 hover:bg-blue-200']">
            <span class="material-icons text-lg">person</span>
            <span>Mahasiswa</span>
          </button>
        </div>
      </div>
    </nav>

    <div class="mt-auto p-5 border-t border-blue-200">
      <button 
        @click="isModalVisible = true" 
        class="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition w-full p-2 text-sm group"
      >
        <span class="material-icons group-hover:scale-110 transition-transform text-xl">logout</span>
        <span class="font-semibold text-base">Keluar</span>
      </button>
    </div>

    <LogoutModal 
      :show="isModalVisible" 
      @close="isModalVisible = false" 
      @confirm="handleLogout" 
    />
  </aside>
</template>