import { defineStore } from 'pinia';
import type { EmployeeState, EmployeeGetters, EmployeeActions } from '@/types/GetEmployees';
import type { NewEmployee } from '@/types/NewEmployee';
import type { Employees } from '@/types/Employees';

export const useEmployeeStore = defineStore<
  'employees',            
  EmployeeState,          
  EmployeeGetters,        
  EmployeeActions         
>('employees', {
  state: () => ({    
    allEmployees: [],
    localEmployees: [],    
    loading: false,
    query: '',
    currentPage: 1,    
    perPage: 6
  }),

  getters: {
    filteredEmployees(state) {
      const q = state.query.toLowerCase().trim();
      return state.allEmployees.filter(emp =>
        emp.first_name.toLowerCase().includes(q) ||
        emp.last_name.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q)
      );
    },

    totalPage(state): number {
      return Math.ceil(this.filteredEmployees.length / state.perPage) || 1;
    },

    paginatedEmployees(state): typeof state.allEmployees {
      const start = (state.currentPage - 1) * state.perPage;
      const end = start + state.perPage;
      return this.filteredEmployees.slice(start, end);
    },

  },

  actions: {
    initStore() {
      const local = localStorage.getItem("localEmployees");
      if (local) {
        try{
          this.localEmployees = JSON.parse(local);
        }catch(e){
          console.error("Ошибка чтения localEmployees:", e);
          this.localEmployees = []
        }
      }  
    },
    
    async forceReloadEmployees() {
      try {
        this.loading = true;
        this.initStore()
        const serverEmployees = [];
        let page = 1;
        let totalPages = 2;

        while (page <= totalPages) {
          const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
            headers: {
              'x-api-key': 'reqres-free-v1'
            }
          });
          const result = await response.json();

          const data = result.data || [];
          serverEmployees.push(...data);
          totalPages = result.total_pages;
          page++;
        }

        this.allEmployees = [...this.localEmployees, ...serverEmployees];
        this.currentPage = 1;

        localStorage.setItem('employees', JSON.stringify(this.allEmployees));
      } catch (error) {
        console.error("Ошибка при загрузке сотрудников:", error);
      } finally {
        this.loading = false;
      }
    },  

    async createEmployees(newEmployee: NewEmployee) {
      const res = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'x-api-key': 'reqres-free-v1',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      });

      const data = await res.json();
      const [firstName, lastName] = data.name.split(' ');
      const email = data.email || 'demo@example.com';
      const avatar = 'https://i.pravatar.cc/150?u=' + data.name;

      const exists = this.localEmployees.some((emp: Employees) =>
        emp.first_name === firstName &&
        emp.last_name === (lastName || '') &&
        emp.email === email
      );

      if (exists) return;

      const newEmp = {
        id: Date.now(),
        first_name: firstName,
        last_name: lastName || '',
        email,
        avatar
      };

      this.localEmployees.unshift(newEmp);
      this.allEmployees = [newEmp, ...this.allEmployees];
      localStorage.setItem('localEmployees', JSON.stringify(this.localEmployees));

    },

    setSearchQuery(query: string) {
      this.query = query;
      this.currentPage = 1;
    },

  }
})

