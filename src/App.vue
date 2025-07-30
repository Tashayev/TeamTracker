<template>
  <div class="min-h-screen w-full bg-[url('./assets/workers.png')] bg-cover 
  bg-center bg-no-repeat flex items-center justify-center">
    <div class="bg-white/30 backdrop-blur-sm rounded-xl p-6 w-full 
    max-w-[1400px] mx-auto">
      <EmployeeSearchPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import EmployeeSearchPage from './page/EmployeeSearchPage.vue'
</script>
