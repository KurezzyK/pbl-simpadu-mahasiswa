<script setup>
import { ref, computed, onMounted } from 'vue';
import DeleteModal from '../components/delete.vue'; 
import { useMahasiswa } from '../services/useMahasiswa.js';

const { dataMahasiswa, isLoading, error, fetchMahasiswa, deleteMahasiswaAPI } = useMahasiswa();

const searchQuery = ref('');
const filterProdi = ref('');
const filterAngkatan = ref('');
const filterStatus = ref('');

onMounted(() => {
  fetchMahasiswa();
});

const filteredMahasiswa = computed(() => {
  return dataMahasiswa.value.filter((mhs) => {
    const matchesSearch = mhs.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          mhs.nim.includes(searchQuery.value);
    const matchesProdi = filterProdi.value === '' || mhs.prodi === filterProdi.value;
    const matchesAngkatan = filterAngkatan.value === '' || mhs.angkatan === filterAngkatan.value;
    const matchesStatus = filterStatus.value === '' || mhs.status === filterStatus.value;

    return matchesSearch && matchesProdi && matchesAngkatan && matchesStatus;
  });
});

const resetFilters = () => {
  searchQuery.value = '';
  filterProdi.value = '';
  filterAngkatan.value = '';
  filterStatus.value = '';
};

const isDeleteModalOpen = ref(false);
const selectedStudent = ref(null);

const openDeleteModal = (student) => {
  selectedStudent.value = student;
  isDeleteModalOpen.value = true;
};

const handleDeleteConfirm = async () => {
  if (!selectedStudent.value?.id) {
    alert('ID Mahasiswa tidak ditemukan.');
    return;
  }

  const success = await deleteMahasiswaAPI(selectedStudent.value.id);

  if (success) {
    dataMahasiswa.value = dataMahasiswa.value.filter(
      (m) => m.id !== selectedStudent.value.id
    );
    alert('Data mahasiswa berhasil dihapus dari sistem!');
  } else {
    alert('Gagal menghapus data dari server. Silakan periksa koneksi atau token admin.');
  }

  isDeleteModalOpen.value = false;
  selectedStudent.value = null;
};
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="text-[10px] text-gray-400 mb-1">Manajemen Akademik > Mahasiswa</p>
      <h1 class="text-xl font-bold text-gray-800">Manajemen Mahasiswa</h1>
      <p class="text-[11px] text-gray-400">Kelola data mahasiswa</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      
      <div class="p-4 flex flex-wrap items-center justify-between gap-3">
        
        <div class="flex flex-wrap items-center gap-2 flex-1">
          <div class="relative w-full max-w-[200px]">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Cari Mahasiswa..." 
              class="w-full pl-3 pr-8 py-1.5 border border-gray-200 rounded text-[12px] focus:outline-none focus:border-blue-400 placeholder:text-gray-300" 
            />
            <span class="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
          </div>
          
          <select v-model="filterProdi" class="border border-gray-200 rounded px-2 py-1.5 text-[12px] text-gray-500 focus:outline-none bg-white min-w-[110px]">
            <option value="">Semua Prodi</option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Teknik Bangunan Rawa">Teknik Bangunan Rawa</option>
            <option value="Teknologi Rekayasa Geomatika dan Survei">Teknik Geodesi</option>
            <option value="Teknik Pertambangan">Teknik Pertambangan</option>
            <option value="Teknik Rekayasa Konstruksi Jalan dan Jembatan">Teknik Rekayasa Konstruksi Jalan dan Jembatan</option>
            <option value="Tata Operasi dan Pemeliharaan Prediktif Alat Berat">Tata Operasi dan Pemeliharaan Prediktif Alat Berat</option>
            <option value="Teknik Mesin">Teknik Mesin</option>
            <option value="Teknologi Rekayasa Otomotif">Teknik Rekayasa Otomotif</option>
            <option value="Alat Berat">Alat Berat</option>
            <option value="Teknologi Rekayasa Pemeliharaan Alat Berat">Teknologi Rekayasa Pemeliharaan Alat Berat</option>
            <option value="Teknologi Rekayasa Otomasi">Teknologi Rekayasa Otomasi</option>
            <option value="Teknik Listrik">Teknik Listrik</option>
            <option value="Elektronika">Elektronika</option>
            <option value="Teknik Informatika">Teknik Informatika</option>
            <option value="Sistem Informasi Kota Cerdas">Sistem Informasi Kota Cerdas</option>
            <option value="Teknik Rekayasa Pembangkit Energi">Teknik Rekayasa Pembangkit Energi</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Sistem Informasi Akuntansi">Sistem Informasi Akuntansi</option>
            <option value="Akuntansi Lembaga Keuangan Syariah">Akuntansi Lembaga Keuangan Syariah</option>
            <option value="Teknik Elektro">Administrasi Bisnis</option>
            <option value="Manajemen Informatika">Manajemen Informatika</option>
            <option value="Bisnis Digital">Bisnis Digital</option>
          </select>

          <select v-model="filterAngkatan" class="border border-gray-200 rounded px-2 py-1.5 text-[12px] text-gray-500 focus:outline-none bg-white min-w-[100px]">
            <option value="">Semua Angkatan</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          <select v-model="filterStatus" class="border border-gray-200 rounded px-2 py-1.5 text-[12px] text-gray-500 focus:outline-none bg-white min-w-[100px]">
            <option value="">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
          
          <button @click="resetFilters" class="flex items-center space-x-1 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition">
            <span class="material-icons text-[14px] text-gray-400">restore</span>
            <span class="text-[12px] text-gray-600">Reset</span>
          </button>
        </div>

        <div class="flex-shrink-0">
          <router-link to="/dashboardadmin/mahasiswa/tambah" class="bg-[#1e3a8a] text-white px-3 py-1.5 rounded flex items-center space-x-1 hover:bg-blue-900 transition text-[11px] font-medium shadow-sm">
            <span class="material-icons text-[14px]">add</span>
            <span>Tambah Mahasiswa</span>
          </router-link>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#f8fafc] border-y border-gray-100">
              <th class="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase text-center">No</th>
              <th class="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase">NIM</th>
              <th class="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase">Nama</th>
              <th class="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase">Prodi</th>
              <th class="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase text-center">Angkatan</th>
              <th class="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase text-center">Status</th>
              <th class="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(item, index) in filteredMahasiswa" :key="item.nim" class="hover:bg-gray-50/50 transition">
              <td class="px-4 py-3 text-[11px] text-gray-500 text-center">{{ index + 1 }}</td>
              <td class="px-4 py-3 text-[11px] font-bold text-gray-800">{{ item.nim }}</td>
              <td class="px-4 py-3 text-[11px] text-gray-600 font-medium">{{ item.nama }}</td>
              <td class="px-4 py-3 text-[11px] text-gray-500">{{ item.prodi }}</td>
              <td class="px-4 py-3 text-[11px] text-gray-500 text-center">{{ item.angkatan }}</td>
              <td class="px-4 py-3 text-center">
                <span :class="[
                  'px-3 py-0.5 rounded-full text-[9px] font-bold',
                  item.status === 'Aktif' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-400'
                ]">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-center space-x-1">
                  <button class="p-1 text-gray-400 hover:text-blue-600 border border-transparent hover:border-blue-100 rounded transition">
                    <span class="material-icons text-[16px]">visibility</span>
                  </button>
                  <button class="p-1 text-gray-400 hover:text-blue-600 border border-transparent hover:border-blue-100 rounded transition">
                    <span class="material-icons text-[16px]">edit_note</span>
                  </button>
                  <button @click="openDeleteModal(item)" class="p-1 text-gray-400 hover:text-red-500 border border-transparent hover:border-red-100 rounded transition">
                    <span class="material-icons text-[16px]">delete_outline</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredMahasiswa.length === 0">
              <td colspan="7" class="px-4 py-10 text-center text-gray-400 text-[11px] italic">
                Data tidak ditemukan
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-4 border-t border-gray-50 flex items-center justify-end bg-white">
        <div class="flex items-center space-x-1">
          <button class="text-[10px] text-gray-400 hover:text-gray-600 px-2 flex items-center">
            <span class="material-icons text-[12px] mr-1">chevron_left</span> Previous
          </button>
          <button class="w-6 h-6 rounded flex items-center justify-center text-[10px] bg-[#1e3a8a] text-white shadow-sm font-bold">1</button>
          <button class="w-6 h-6 rounded flex items-center justify-center text-[10px] text-gray-500 hover:bg-gray-50">2</button>
          <button class="w-6 h-6 rounded flex items-center justify-center text-[10px] text-gray-500 hover:bg-gray-50">3</button>
          <span class="text-gray-300 px-1 text-[10px]">...</span>
          <button class="w-6 h-6 rounded flex items-center justify-center text-[10px] text-gray-500 hover:bg-gray-50">67</button>
          <button class="w-6 h-6 rounded flex items-center justify-center text-[10px] text-gray-500 hover:bg-gray-50">68</button>
          <button class="text-[10px] text-[#1e3a8a] font-bold hover:text-blue-900 px-2 flex items-center">
            Next <span class="material-icons text-[12px] ml-1">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <DeleteModal 
      :show="isDeleteModalOpen" 
      :studentData="selectedStudent"
      @close="isDeleteModalOpen = false"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>