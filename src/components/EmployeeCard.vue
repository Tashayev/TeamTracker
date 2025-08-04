
<template>  
  <div class="bg-gray-200 p-4 rounded shadow">
    <img :src="employee.avatar"  alt="emplyee ava" 
    class="w-16 h-16 rounded-full mb-2">
    <h3 class="overflow-hidden">
      {{ employee.first_name }} {{ employee.last_name }}
    </h3>
    <p class="text-sm text-gray-600 overflow-hidden">{{ employee.email }}</p>
  </div>  
</template>

<script setup lang="ts">

  import type { Employees } from '@/types/Employees';

  defineProps<{
    employee:Employees;
  }>();

</script>




























