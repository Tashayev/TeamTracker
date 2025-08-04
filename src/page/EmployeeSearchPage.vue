<template>
  <div class="flex flex-col mt-8 items-center pb-8 gap-6 py-8 h-full w-full bg-white/30 backdrop-blur-xs rounded-xl">
    <EmployeeSearchBar />
    <div v-if="loading">Загруска...</div>
    <EmployeeList :employees="paginatedEmployees"/>
    <Pagination />
  </div>
</template>

<script setup lang="ts">
import EmployeeList from '@/components/EmployeeList.vue'
import EmployeeSearchBar from '@/components/EmployeeSearchBar.vue'
import Pagination from '@/components/Pagination.vue';
import { useEmployeeStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useEmployeeStore();
const {loading, paginatedEmployees } = storeToRefs(store);
onMounted(() => {
  if (!store.allEmployees.length) {
    store.forceReloadEmployees();
  }
});

</script>
