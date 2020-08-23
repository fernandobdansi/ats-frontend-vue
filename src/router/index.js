import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ordensdeservico',
    name: 'Ordens de Serviço',
    component: () => import(/* webpackChunkName: "ordensdeservico" */ '../views/OrdensDeServico.vue')
  },
  {
    path: '/ordensdeservicorelatorio',
    name: 'Ordens: Relatorio',
    component: () => import(/* webpackChunkName: "ordensdeservicorelatorio" */ '../views/OrdensDeServicoRelatorio.vue')
  },
  {
    path: '/ordensdeservicorelatoriocomfiltro',
    name: 'Ordens: Relatorio Com Filtro',
    component: () => import(/* webpackChunkName: "ordensdeservicorelatoriocomfiltro" */ '../views/OrdensDeServicoRelatorioComFiltro.vue')
  },
  {
    path: '/orcamentos',
    name: 'Orçamentos',
    component: () => import(/* webpackChunkName: "orcamentos" */ '../views/Orcamentos.vue')
  },
  {
    path: '/feedbacks',
    name: 'FeedBacks',
    component: () => import(/* webpackChunkName: "feedbacks" */ '../views/FeedBacks.vue')
  },
  {
    path: '/feedbacksrelatoriocomfiltro',
    name: 'FeedBacks: Relatorio Com Filtro',
    component: () => import(/* webpackChunkName: "feedbacksrelatoriocomfiltro" */ '../views/FeedBacksRelatorioComFiltro.vue')
  },
  {
    path: '/garantias',
    name: 'Garantias',
    component: () => import(/* webpackChunkName: "garantias" */ '../views/Garantias.vue')
  },
  {
    path: '/garantiasrelatoriocomfiltro',
    name: 'Garantias: Relatorio Com Filtro',
    component: () => import(/* webpackChunkName: "garantiasrelatoriocomfiltro" */ '../views/GarantiasRelatorioComFiltro.vue')
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
  {
    path: '/statusgarantia',
    name: 'Status Garantia',
    component: () => import(/* webpackChunkName: "statusgarantia" */ '../views/StatusGarantia.vue')
  },
  {
    path: '/statusordem',
    name: 'Status Ordem De Serviço',
    component: () => import(/* webpackChunkName: "statusordem" */ '../views/StatusOrdem.vue')
  },
  {
    path: '/servicos',
    name: 'Serviços',
    component: () => import(/* webpackChunkName: "servico" */ '../views/Servicos.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
