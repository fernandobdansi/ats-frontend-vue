import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import(/* webpackChunkName: "clientes" */ '../views/Clientes.vue')
  },
  {
    path: '/tecnicos',
    name: 'Tecnicos',
    component: () => import(/* webpackChunkName: "tecnicos" */ '../views/Tecnicos.vue')
  },
  {
    path: '/marcas',
    name: 'Marcas',
    component: () => import(/* webpackChunkName: "marcas" */ '../views/Marcas.vue')
  },
  {
    path: '/modelos',
    name: 'Modelos',
    component: () => import(/* webpackChunkName: "modelos" */ '../views/Modelos.vue')
  },
  {
    path: '/dispositivos',
    name: 'Dispositivos',
    component: () => import(/* webpackChunkName: "dispositivos" */ '../views/Dispositivos.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
