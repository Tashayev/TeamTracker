<template>
  <div class="max-w-xl mx-auto flex items-center  mt-10 p-4 bg-white/30 backdrop-blur-sm rounded-xl h-full flex-col ">
    <h2 class="text-xl font-bold mb-4 text-white">Создание сотрудника</h2>
    <div class="bg-gray-400 h-30 w-30   my-10 rounded-full">
      <img src="../assets/emploee.jpg" alt="employee pic" 
      class="   rounded-full opacity-80 ">
    </div>
       
    <EmployeeForm @submit="handleCreate" />
  </div>
</template>

<script setup lang="ts">
import EmployeeForm from '@/components/EmployeeForm.vue';
import { useEmployeeStore } from '@/stores/store';
import { useRouter } from 'vue-router';

const store = useEmployeeStore();
const router = useRouter();

async function handleCreate(data: { name: string; job: string }) {
  await store.createEmployees(data);

  // Очищаем поиск и переходим на первую страницу
  store.setSearchQuery('');
  store.currentPage = 1;

  router.push('/');
}


</script>
