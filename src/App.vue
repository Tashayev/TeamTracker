<template>
  <div class="min-h-screen w-full bg-[url('./assets/workers.png')] bg-cover 
  bg-center bg-no-repeat flex flex-col">
    <NavBar/>
    <div class="flex-1 flex items-center justify-center">
      <div class=" p-6 w-full
      max-w-[1400px] mx-auto">
        <router-view /> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';

</script>

