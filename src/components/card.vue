<script setup>
defineProps(['title', 'value', 'icon', 'color']);
</script>

<template>
  <div class="bg-white p-6 rounded-3xl shadow-sm flex items-center space-x-5 border border-gray-50 hover:shadow-lg transition-shadow">
    <div :class="color" class="p-4 rounded-2xl text-white flex items-center justify-center">
      <span class="material-icons text-2xl">{{ icon }}</span>
    </div>
    <div>
      <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">{{ title }}</p>
      <p class="text-3xl font-extrabold text-gray-900">{{ value }}</p>
    </div>
  </div>
</template>