import type { Employees } from '@/types/Employees';


export interface EmployeeState {  
  allEmployees: Employees[];     
  loading: boolean;
  query: string;
  currentPage: number;  
  perPage: number;
  localEmployees: Employees[],  
}

export interface EmployeeGetters {
  [key: string]: any;
  filteredEmployees(state: EmployeeState): Employees[];
  paginatedEmployees(state: EmployeeState): Employees[];
}

export interface EmployeeActions {  
  forceReloadEmployees: () => Promise<void>;
  createEmployees: (newEmployee: any) => Promise<void>;
  setSearchQuery: (query: string) => void;
  initStore:()=>void;
}

