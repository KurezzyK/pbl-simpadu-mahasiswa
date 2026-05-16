import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';
import DashboardLayout from '../views/dashboardadmin.vue';
import StatistikView from '../views/statistik.vue';
import MahasiswaView from '../views/mahasiswa.vue';
import TambahMahasiswaView from '../views/tambahmahasiswa.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboardadmin',
    component: DashboardLayout,
    children: [
      {
        path: '', 
        name: 'dashboard',
        component: StatistikView
      },
      {
        path: 'mahasiswa', 
        name: 'mahasiswa',
        component: MahasiswaView
      },
      {
        path: 'mahasiswa/tambah', 
        name: 'tambah-mahasiswa',
        component: TambahMahasiswaView
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;