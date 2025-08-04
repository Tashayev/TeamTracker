<template>
  <div v-if="employees.length === 0"></div>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <EmployeeCard
      v-for="employee in employees"
      :key="employee.id"
      :employee="employee"
    />
  </div>
</template>

<script setup lang="ts">
import EmployeeCard from '@/components/EmployeeCard.vue';
import type { Employees } from '@/types/Employees';

defineProps<{
  employees: Employees[];
}>();

</script>
