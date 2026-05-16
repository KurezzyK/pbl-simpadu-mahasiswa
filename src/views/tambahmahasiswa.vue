<script setup>
import { reactive } from 'vue';

const form = reactive({
  nim: '',
  nama: '',
  periode: '',
  kelas: '',
  jalur: '',
  gelombang: '',
  tglMasuk: '',
  tglDaftarUlang: '',
  kebutuhanKhusus: false
});

const handleSubmit = () => {
  console.log('Data Disimpan:', form);
  alert('Data mahasiswa berhasil disimpan!');
};
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="text-xs text-gray-500 mb-1">Manajemen Akademik > Mahasiswa > Tambah Mahasiswa</p>
      <h1 class="text-2xl font-bold text-gray-800">Manajemen Mahasiswa</h1>
      <p class="text-sm text-gray-400">Input Data Mahasiswa</p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 class="text-lg font-bold text-gray-800 mb-6">Data Mahasiswa</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NIM *</label>
              <input v-model="form.nim" type="text" placeholder="Masukkan NIM" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm bg-gray-50/50" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Periode Masuk *</label>
              <select v-model="form.periode" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50/50">
                <option value="" disabled>Pilih Periode Masuk</option>
                <option value="2024/2025 Ganjil">2024/2025 Ganjil</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Jalur Pendaftaran *</label>
              <select v-model="form.jalur" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50/50">
                <option value="" disabled>Pilih Gelombang</option>
                <option value="SNBP">SNBP</option>
                <option value="SNBT">SNBT</option>
                <option value="Mandiri">Mandiri</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Awal Masuk</label>
              <input v-model="form.tglMasuk" type="date" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50/50" />
            </div>

            <div class="flex items-start space-x-3 pt-2">
              <input v-model="form.kebutuhanKhusus" type="checkbox" class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <div>
                <label class="text-sm font-bold text-gray-800 italic">Kebutuhan Khusus</label>
                <p class="text-[10px] text-gray-400">Mahasiswa memiliki kebutuhan khusus</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Mahasiswa *</label>
              <input v-model="form.nama" type="text" placeholder="Masukkan Nama" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50/50" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kelas / Kelompok</label>
              <input v-model="form.kelas" type="text" placeholder="Kelas A" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50/50" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Gelombang *</label>
              <select v-model="form.gelombang" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50/50">
                <option value="" disabled>Pilih Gelombang</option>
                <option value="1">Gelombang 1</option>
                <option value="2">Gelombang 2</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Daftar Ulang</label>
              <input v-model="form.tglDaftarUlang" type="date" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50/50" />
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center pt-8 border-t border-gray-100">
          <button type="button" @click="$router.back()" class="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
            Batal
          </button>
          <button type="submit" class="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg text-sm font-semibold hover:bg-blue-900 shadow-md transition flex items-center space-x-2">
            <span>Simpan Data</span>
            <span class="material-icons text-sm">chevron_right</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>