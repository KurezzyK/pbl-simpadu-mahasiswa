<script setup>
import { ref } from 'vue';
import Sidebar from '../components/sidebar.vue';
import Navbar from '../components/navbar.vue';
import logoImage from '../assets/logo.png'; 

const isSidebarOpen = ref(true);
const userName = ref('Admin Mahasiswa');

const handleToggle = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div class="h-screen flex flex-col font-['Poppins'] bg-[#f8fafc] overflow-hidden">
    
    <Navbar @toggle-sidebar="handleToggle" :adminName="userName" :logo="logoImage" />

    <div class="flex flex-1 overflow-hidden">
      
      <div 
        :class="[
          'h-full transition-all duration-500 ease-in-out overflow-hidden flex flex-col bg-[#dbeafe] shadow-inner',
          isSidebarOpen ? 'w-64' : 'w-0'
        ]"
      >
        <Sidebar :isOpen="isSidebarOpen" class="h-full" />
      </div>

      <main class="flex-1 overflow-y-auto p-8">
        <div class="max-w-7xl mx-auto">
          <router-view />
        </div>
      </main>

    </div>
  </div>
</template>