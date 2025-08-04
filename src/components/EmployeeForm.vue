<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-4 w-full p-5 outline-none">
    <input
      v-model="form.name"
      type="text"
      placeholder="Имя и фамилия сотрудника"
      class="p-3 rounded outline-none hover:opacity-100 opacity-90 bg-cyan-50"
      required
    />
    <input
      v-model="form.job"
      type="text"
      placeholder="Должность"
      class="p-3 rounded outline-none hover:opacity-100 opacity-90 bg-cyan-50"
      required
    />
    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Создать
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { useEmployeeStore } from '@/stores/store';

const emit = defineEmits<{
  (e: 'submit', payload: { name: string; job: string }): void;
}>();

const store = useEmployeeStore();

const form = ref({
  name: '',
  job: ''
});

function validateFullName(fullName: string): string | true {
  const trimmed = fullName.trim();

  if (!trimmed.includes(' ')) {
    return 'Введите имя и фамилию через пробел';
  }

  const [firstName, lastName] = trimmed.split(' ');

  if (!firstName || !lastName) {
    return 'Укажите и имя, и фамилию';
  }

  if (firstName.length < 3 || lastName.length < 3) {
    return 'Имя и фамилия должны быть не короче 3 букв';
  }

  if (firstName.toLowerCase() === lastName.toLowerCase()) {
    return 'Имя и фамилия не должны совпадать';
  }

  return true;
}

function isDuplicate(fullName: string): boolean {
  const [first, last] = fullName.trim().split(' ');
  return store.allEmployees.some(emp =>
    emp.first_name.toLowerCase() === first.toLowerCase() &&
    emp.last_name.toLowerCase() === last.toLowerCase()
  );
}

function submitForm() {
  const validation = validateFullName(form.value.name);
  if (validation !== true) {
    alert(validation);
    return;
  }

  if (isDuplicate(form.value.name)) {
    alert('Такой сотрудник уже существует');
    return;
  }

  emit('submit', form.value);
}
</script>

