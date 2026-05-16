<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import StatCard from '../components/card.vue';

const userName = ref('Admin Mahasiswa');

const isDropdownOpen = ref(false);
const dropdownRef = ref(null);
const selectedJurusan = ref('Semua Jurusan');
const daftarJurusan = ['Semua Jurusan', 'Elektro', 'Mesin', 'Sipil Kebumian', 'Akuntansi', 'Administrasi Bisnis'];

const jurusanList = ref([
  { name: 'Elektro', value: '150' },
  { name: 'Mesin', value: '150' },
  { name: 'Sipil dan Kebumian', value: '150' },
  { name: 'Akuntansi', value: '150' },
  { name: 'Administrasi Bisnis', value: '150' },
]);

const statCards = ref([
  { title: 'Total Mahasiswa', value: '150', icon: 'person', color: 'bg-blue-600' },
  { title: 'Total Dosen', value: '150', icon: 'groups', color: 'bg-green-600' },
  { title: 'Total Mata Kuliah', value: '150', icon: 'menu_book', color: 'bg-purple-600' },
  { title: 'Total Kelas', value: '150', icon: 'door_front', color: 'bg-orange-500' },
]);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const selectJurusan = (jurusan) => {
  selectedJurusan.value = jurusan;
  isDropdownOpen.value = false;
};
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-gray-700 font-medium text-sm">Selamat datang, {{ userName }}!</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard v-for="card in statCards" :key="card.title" v-bind="card" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative">
        <div class="flex justify-between items-start mb-6">
          <h3 class="font-bold text-gray-800">Grafik Mahasiswa Berdasarkan Jurusan</h3>
          
          <div class="relative" ref="dropdownRef">
            <button @click="isDropdownOpen = !isDropdownOpen" class="flex items-center space-x-2 bg-white border border-gray-200 px-3 py-1.5 rounded-xl text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm">
              <span>{{ selectedJurusan }}</span>
              <span class="material-icons text-sm transition-transform" :class="{'rotate-180': isDropdownOpen}">expand_more</span>
            </button>

            <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden">
              <button 
                v-for="item in daftarJurusan" 
                :key="item"
                @click="selectJurusan(item)"
                class="w-full text-left px-4 py-2.5 text-[11px] text-gray-600 hover:bg-blue-50 hover:text-[#1e3a8a] transition"
              >
                {{ item }}
              </button>
            </div>
          </div>
        </div>

        <div class="h-80 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center space-y-2">
          <span class="material-icons text-gray-200 text-7xl">insert_chart</span>
          <p class="text-gray-400 text-xs font-medium">Tampilan Grafik {{ selectedJurusan }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div v-for="jurusan in jurusanList" :key="jurusan.name" class="p-3 rounded-xl border border-gray-50 shadow-sm bg-white">
          <p class="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            Total Mahasiswa Jurusan {{ jurusan.name }}
          </p>
          <p class="text-xl font-black text-gray-900">{{ jurusan.value }}</p>
        </div>
      </div>

    </div>
  </div>
</template>