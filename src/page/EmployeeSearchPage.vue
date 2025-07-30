<template>
  <div class="flex flex-col items-center gap-6 py-8 w-full">
    <form @submit.prevent="handleSearch" class="flex flex-col justify-center sm:flex-row gap-4 w-full mb-3">
      <div class="relative sm:w-96">
        <input
          type="text"
          class="pl-10 py-2 w-full bg-cyan-50 rounded-lg outline-none hover:opacity-100 opacity-90"
          placeholder="Введите имя сотрудника"
          v-model="searchQuery"
        />
        <FontAwesomeIcon
          :icon="['fas', 'magnifying-glass']"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
        />
      </div>
      <button
        type="submit"
        class="text-blue-900 bg-cyan-50 rounded-lg px-4 py-2 hover:opacity-100 opacity-90 w-auto"
      >
        Найти сотрудника
      </button>
    </form>

    <EmployeeCard :filter-key="searchKey" />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { ref } from 'vue'
import EmployeeCard from '@/components/EmployeeCard.vue'

library.add(faMagnifyingGlass)

const searchQuery = ref('')
const searchKey = ref('')

function handleSearch() {
  searchKey.value = searchQuery.value.trim().toLowerCase()
}
</script>
