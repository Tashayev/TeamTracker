import { createRouter, createWebHistory } from 'vue-router';
import EmployeeSearchPage from '@/page/EmployeeSearchPage.vue';
import CreateEmployeeView from '@/page/CreateEmployeeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: EmployeeSearchPage
  },
  {
    path: '/create',
    name: 'CreateEmployee',
    component: CreateEmployeeView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
