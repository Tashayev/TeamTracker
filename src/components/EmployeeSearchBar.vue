<template>
  <form @submit.prevent="hendleSearch" class="flex flex-col justify-center sm:flex-row
   gap-4 w-full mb-3">
    <div class="relative sm:w-96">
      <input type="text" class="pl-10 py-2 w-full rounded-lg
       outline-none hover:opacity-100 opacity-90 bg-cyan-50"
        placeholder="Введите имя сотрудника" v-model="searchText" />
      <FontAwesomeIcon :icon="['fas', 'magnifying-glass']"
        class="absolute left-3 top-1/2 transform -translate-y-1/2
         text-blue-400" />
    </div>
    <button type="submit" class="text-blue-900 bg-cyan-50 rounded-lg
     px-4 py-2 hover:opacity-100 opacity-90 w-auto">
      Найти сотрудника
    </button>
  </form>
</template>
<script setup lang="ts">

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useEmployeeStore } from '@/stores/store';

import { ref } from 'vue';

library.add(faMagnifyingGlass);
const store = useEmployeeStore();
const searchText = ref('');

function hendleSearch() {
 store.setSearchQuery(searchText.value);
}

</script>