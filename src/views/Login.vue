<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth';
import logoImage from '../assets/logo.png';
import bgImage from '../assets/background.png';

const router = useRouter();
const email = ref(''); 
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref(''); 

const isPasswordVisible = ref(false); 
const togglePassword = () => { isPasswordVisible.value = !isPasswordVisible.value };

const handleLogin = async () => {
  errorMessage.value = '';

  if (!email.value && !password.value) {
    errorMessage.value = 'Email dan password tidak boleh kosong!';
    return;
  }
  if (email.value && !password.value) {
    errorMessage.value = 'Password harus diisi!';
    return;
  }
  if (!email.value && password.value) {
    errorMessage.value = 'Email harus diisi!';
    return;
  }

  isLoading.value = true;
  try {
    const result = await authService.login(email.value, password.value);

    if (result.success) {
      const userRole = result.data.role_name;
      
      console.log("Role yang masuk adalah:", userRole);

      localStorage.setItem('token', result.data.access_token);
      localStorage.setItem('role', userRole);

      if (userRole === 'admin-mahasiswa') {
        router.push('/dashboardadmin');
      } else if (userRole === 'mahasiswa') {
        router.push('/dashboardmahasiswa');
      } else {
        errorMessage.value = 'Role pengguna tidak dikenali. Silahkan hubungi administrator.';
        console.warn("Role tidak dikenali:", userRole);
      }
    }
  } catch (error) {
    errorMessage.value = 'Silahkan cek kembali username dan passwordnya';
    console.error("Detail Error:", error);
  } finally {
    isLoading.value = false;
  }
};

</script>

<template>
  <div 
    class="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat font-['Poppins']"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="absolute inset-0 bg-[#0d47a1]/40 backdrop-blur-[2px]"></div>

    <div class="z-10 w-full h-screen md:h-auto md:max-w-[450px] bg-white p-8 md:p-12 md:rounded-[15px] shadow-2xl flex flex-col justify-center">
      
      <div class="text-center mb-6">
        <img :src="logoImage" alt="Logo" class="w-20 mx-auto mb-4" />
        <h1 class="text-3xl font-bold text-[#0d47a1] mb-1">Selamat Datang</h1>
        <p class="text-gray-500 text-sm">Silahkan Login Untuk Melanjutkan</p>

        <div v-if="errorMessage" class="mt-4">
          <div class="inline-block px-4 py-1 bg-red-100 rounded-md">
            <p class="text-red-600 text-[13px] font-medium italic">
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 ml-1">Email</label>
          <div class="relative group">
            <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-[#0d47a1] text-xl">mail_outline</span>
            <input 
              v-model="email"
              type="text" 
              placeholder="Gmail" 
              class="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0d47a1] outline-none transition-all"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 ml-1">Password</label>
          <div class="relative">
            <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-[#0d47a1] text-xl">lock_outline</span>
            <input 
              v-model="password"
              :type="isPasswordVisible ? 'text' : 'password'" 
              placeholder="Password" 
              class="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0d47a1] outline-none transition-all"
            />
            <button type="button" @click="togglePassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <span class="material-icons text-xl">{{ isPasswordVisible ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-[#0d47a1] hover:bg-blue-900 text-white font-bold py-3 rounded-xl shadow-lg active:scale-[0.97] transition-all disabled:bg-gray-400"
        >
          {{ isLoading ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>
    </div>
  </div>
</template>