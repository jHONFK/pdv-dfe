import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue';
import Vendas from '../views/Vendas.vue';
import Produtos from '../views/Produtos.vue';
import Clientes from '../views/Clientes.vue';
import Relatorios from '../views/Relatorios.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/vendas', name: 'Vendas', component: Vendas },
    { path: '/produtos', name: 'Produtos', component: Produtos },
    { path: '/clientes', name: 'Clientes', component: Clientes },
    { path: '/relatorios', name: 'Relatorios', component: Relatorios }
  ]
})

export default router
