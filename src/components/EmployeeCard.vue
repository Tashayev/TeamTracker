<template>
  <button @click="store.forceReloadEmployees()" class="px-4 py-2 bg-yellow-100 rounded mt-4">
    <FontAwesomeIcon :icon="['fas', 'arrows-rotate']" />
  </button>

  <div v-if="store.loading">Loading...</div>

  <div v-else class="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 xl:grid-cols-4 h-full justify-center">
    <div
      class="lg:w-50 md:w-60 w-90 rounded-lg bg-gray-200 h-50 p-5 space-y-3"
      v-for="employee in paginatedFilteredEmployees"
      :key="employee.id"
    >
      <img class="w-12 h-12 rounded-full" :src="employee.avatar" alt="employee" />
      <h3 class="overflow-hidden">{{ employee.first_name }} {{ employee.last_name }}</h3>
      <p class="text-gray-600 text-sm overflow-hidden">{{ employee.email }}</p>
    </div>
  </div>

  <div class="flex justify-center gap-4 mt-6">
    <button
      :disabled="store.currentPage === 1"
      @click="store.currentPage--"
      class="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      ←
    </button>

    <span>{{ store.currentPage }} / {{ totalFilteredPages }}</span>

    <button
      :disabled="!hasNextPage"
      @click="store.currentPage++"
      class="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      →
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useEmployeeStore } from '@/stores/store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import type { Employees } from '@/types/Employees';

const store = useEmployeeStore();
const props = defineProps<{ filterKey: string }>();

onMounted(() => {
  if (store.allEmployees.length === 0) {
    store.forceReloadEmployees();
  }
});

const perPage = 6;

function matchQuery(e: Employees, q: string): boolean {
  return (
    e.first_name.toLowerCase().includes(q.toLowerCase()) ||
    e.last_name.toLowerCase().includes(q.toLowerCase()) ||
    e.email.toLowerCase().includes(q.toLowerCase())
  );
}

const filteredEmployees = computed(() =>
  store.allEmployees.filter(e => matchQuery(e, props.filterKey || ''))
);

const totalFilteredEmployees = computed(() => filteredEmployees.value.length);

const totalFilteredPages = computed(() =>
  Math.max(1, Math.ceil(totalFilteredEmployees.value / perPage))
);

const hasNextPage = computed(() => store.currentPage < totalFilteredPages.value);

const paginatedFilteredEmployees = computed(() => {
  const start = (store.currentPage - 1) * perPage;
  return filteredEmployees.value.slice(start, start + perPage);
});

watch(filteredEmployees, () => {
  if (store.currentPage > totalFilteredPages.value) {
    store.currentPage = 1;
  }
});

library.add(faArrowsRotate);
</script>
