import { defineStore } from 'pinia';
import type { Employees } from '@/types/Employees';
import type { NewEmployee } from '@/types/NewEmployee';

export const useEmployeeStore = defineStore('employees', {
  state: () => ({
    employees: [] as Employees[],      // текущая страница
    allEmployees: [] as Employees[],   // все сотрудники
    loading: false,
    query: '',
    currentPage: 1,
    totalPage: 1,
  }),

  getters: {
    filteredEmployees(state): Employees[] {
      const q = state.query.toLowerCase();
      return state.allEmployees.filter(e =>
        e.first_name.toLowerCase().includes(q) ||
        e.last_name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
      );
    },    
    totalFilteredPages(state): number {
      const filtered = state.allEmployees.filter(e => {
        const q = state.query.toLowerCase();
        return (
          e.first_name.toLowerCase().includes(q) ||
          e.last_name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q)
        );
      });
      return Math.ceil(filtered.length / 6);
    },
    paginatedEmployees(state): Employees[] {
      const perPage = 6;
      const start = (state.currentPage - 1) * perPage;
      const end = start + perPage;
      const filtered = state.allEmployees.filter(e => {
        const q = state.query.toLowerCase();
        return (
          e.first_name.toLowerCase().includes(q) ||
          e.last_name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q)
        );
      });
      return filtered.slice(start, end);
    }

  },

  actions: {

    async forceReloadEmployees() {
      try {
        this.loading = true;
        let allData: Employees[] = [];
        let page = 1;
        let totalPages = 2; // знаем заранее (или получаем из первого запроса)

        while (page <= totalPages) {
          const response = await fetch(`https://reqres.in/api/users?page=${page}`);
          const result = await response.json();
          const data = result.data || [];

          allData.push(...data);
          totalPages = result.total_pages; // безопасно обновляем
          page++;
        }

        this.allEmployees = allData;
        this.currentPage = 1;
        localStorage.setItem('employees', JSON.stringify(this.allEmployees));
      } catch (error) {
        console.error("Ошибка при загрузке сотрудников:", error);
      } finally {
        this.loading = false;
      }
    },



    async fetchEmployees(page = 1, force = false) {
      this.currentPage = page;

      if (!force) {
        const cached = localStorage.getItem(`employees-page-${page}`);
        if (cached) {
          this.employees = JSON.parse(cached);
          return;
        }
      }

      await this.forceReloadEmployees();
    },

    async createEmployees(newEmployee: NewEmployee) {
      this.loading = true
      try {
        const res = await fetch('https://reqres.in/api/users', {
          method: 'POST',
          headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newEmployee)
        })
        const data = await res.json();
        const newEmp: Employees = {
          id: Number(data.id),
          email: `${newEmployee.name.replace(' ', '.')}@example.com`,
          first_name: newEmployee.name.split(' ')[0],
          last_name: newEmployee.name.split(' ')[1] ?? '',
          avatar: 'https://i.pravatar.cc/150?img=4'
        }
        this.employees.push(newEmp);
        localStorage.setItem('employees', JSON.stringify(this.employees))
      } finally {
        this.loading = false
      }
    },

    fetchAllEmployeesOnce() {
      const saved = localStorage.getItem('employees');
      if (saved) {
        this.allEmployees = JSON.parse(saved);
      } else {
        this.forceReloadEmployees();
      }
    },
    

  }
}) 