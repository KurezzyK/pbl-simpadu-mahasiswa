<script setup>
const emit = defineEmits(['toggle-sidebar']);
defineProps(['adminName', 'logo']);
</script>

<template>
  <header class="bg-[#1e3a8a] text-white h-16 w-full px-6 flex justify-between items-center shadow-md relative z-10">
    
    <div class="flex items-center space-x-6">
      <div class="flex items-center space-x-3">
        <img :src="logo" alt="Logo" class="h-9 w-auto object-contain" />
        <span class="text-2xl font-bold tracking-tight">Sabar</span>
      </div>
      
      <button @click.prevent="emit('toggle-sidebar')" class="p-1 hover:bg-white/10 rounded transition ml-2">
        <span class="material-icons text-2xl">menu</span>
      </button>
    </div>
    
    <div class="flex items-center space-x-6">
      
      <div class="flex items-center space-x-3 cursor-pointer group px-2 py-1 rounded-lg hover:bg-white/5 transition">
        <div class="w-8 h-8 rounded-full border border-white/40 overflow-hidden shadow-sm">
           <img 
            :src="`https://ui-avatars.com/api/?name=${adminName}&background=random&color=fff`" 
            class="w-full h-full object-cover" 
          />
        </div>
        
        <div class="flex items-center space-x-1">
          <span class="text-[13px] font-medium tracking-wide">{{ adminName }}</span>
        </div>
      </div>

    </div>
  </header>
</template>

<style scoped>
header {
  font-family: 'Poppins', sans-serif;
}

.material-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>