<template>
  <div class=" h-45 sm:h-27 bg-gradient-to-r from-cyan-900 to-blue-900 fixed w-full  flex  py-3 justify-center sm:justify-start"> 
    <form class="flex sm:ms-20  space-y-3 flex-col sm:flex-row mt-3 ">
      <div class="h-fit relative ">
        <input type="text" class=" h-15 ps-12 w-90 bg-cyan-50 rounded-lg outline-none relative hover:opacity-100 opacity-90">
        <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" class="text-blue-400 relative right-86 top-0" />
      </div>
      <button class="text-blue-900 bg-cyan-50 rounded-lg  w-90 sm:w-50 h-15 hover:opacity-100 opacity-90 ">Найти сотрудника</button>
    </form>
    
  </div>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
  import { library } from '@fortawesome/fontawesome-svg-core';

  library.add(faMagnifyingGlass);
</script>

