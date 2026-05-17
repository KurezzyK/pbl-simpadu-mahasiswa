import { ref } from 'vue';

export function useMahasiswa() {
  const dataMahasiswa = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDE5ZTE5YTgtMGJkZi03ZWI1LThmOTktOGFjOTJiZTAyODc5IiwiZGV0YWlsX2lkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwicm9sZV9uYW1lIjoiYWRtaW4tbWFoYXNpc3dhIiwidXNlcl9lbWFpbCI6InRpbTNAYWRtaW4uY29tIiwiaXNzIjoiVElNIDEiLCJleHAiOjE3Nzg5Mjc3MDIsImlhdCI6MTc3ODkyNDEwMn0.4y6e9mVQVUGhDrx01gwAdqpee_8uoMO7FeoJa9-JJ0Y";

  const fetchMahasiswa = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://api-mahasiswa-4a.akufarish.my.id:8874/api/mahasiswa', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      
      if (result && result.success && Array.isArray(result.data)) {
        dataMahasiswa.value = result.data.map(item => {
          let namaProdi = 'Tidak Diketahui';
          if (item.prodi_id == 1) namaProdi = 'Teknik Informatika';
          else if (item.prodi_id == 2) namaProdi = 'Sistem Informasi';
          else if (item.prodi_id == 3) namaProdi = 'Teknik Elektro';

          return {
            id: item.id_mahasiswa, // <--- PENTING: Simpan ID asli untuk keperluan Delete/Edit
            nim: item.nim || '-',
            nama: item.nama_mahasiswa || '-',
            prodi: namaProdi,
            angkatan: item.periode_masuk ? item.periode_masuk.toString().substring(0, 4) : '-', 
            status: item.status_mahasiswa || 'Tidak Aktif'
          };
        });
      }
    } catch (err) {
      error.value = err.message;
      dataMahasiswa.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const deleteMahasiswaAPI = async (idMahasiswa) => {
    try {
      const response = await fetch(`https://api-mahasiswa-4a.akufarish.my.id:8874/api/mahasiswa/${idMahasiswa}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Gagal menghapus data. Status: ${response.status}`);
      }

      const result = await response.json();
      return result.success; // Mengembalikan true jika backend sukses menghapus
    } catch (err) {
      console.error('Error saat menghapus data mahasiswa:', err);
      return false;
    }
  };

  return {
    dataMahasiswa,
    isLoading,
    error,
    fetchMahasiswa,
    deleteMahasiswaAPI // <--- Export agar bisa dipakai di component utama
  };
}