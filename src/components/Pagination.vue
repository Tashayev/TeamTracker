<template>
  <div class="flex justify-center mt-6 gap-4 items-center">
    <button       
      class="opacity-70 bg-gray-700 px-3 py-1 border 
      disabled:border-red-900 border-blue-900 rounded hover:bg-gray-100 
      disabled:opacity-50 disabled:cursor-not-allowed"
      @click="currentPage--"
      :disabled="currentPage === 1"
    >
      ←
    </button>
    <span class="text-gray-100">{{ currentPage }} / {{ totalPage }}</span>
    <button      
      class="opacity-70 bg-gray-700 px-3 py-1 border 
      disabled:border-red-900 border-blue-900 rounded hover:bg-gray-100
      disabled:opacity-50 disabled:cursor-not-allowed"
      @click="currentPage++"
      :disabled="currentPage === totalPage"
    >
      →
    </button>
  </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useEmployeeStore();
const {currentPage,  totalPage, } = storeToRefs(store);


</script>
