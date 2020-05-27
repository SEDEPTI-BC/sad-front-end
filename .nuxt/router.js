import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f066c0fc = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _3789ad56 = () => interopDefault(import('../pages/agendar.vue' /* webpackChunkName: "pages/agendar" */))
const _3082d359 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _44bf7e29 = () => interopDefault(import('../pages/sobre.vue' /* webpackChunkName: "pages/sobre" */))
const _2233c364 = () => interopDefault(import('../pages/admin/calendario.vue' /* webpackChunkName: "pages/admin/calendario" */))
const _2b35b233 = () => interopDefault(import('../pages/admin/equipamentos.vue' /* webpackChunkName: "pages/admin/equipamentos" */))
const _27db46a4 = () => interopDefault(import('../pages/admin/eventos.vue' /* webpackChunkName: "pages/admin/eventos" */))
const _936f0768 = () => interopDefault(import('../pages/admin/perfil.vue' /* webpackChunkName: "pages/admin/perfil" */))
const _66db3042 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _f066c0fc,
    name: "admin"
  }, {
    path: "/agendar",
    component: _3789ad56,
    name: "agendar"
  }, {
    path: "/login",
    component: _3082d359,
    name: "login"
  }, {
    path: "/sobre",
    component: _44bf7e29,
    name: "sobre"
  }, {
    path: "/admin/calendario",
    component: _2233c364,
    name: "admin-calendario"
  }, {
    path: "/admin/equipamentos",
    component: _2b35b233,
    name: "admin-equipamentos"
  }, {
    path: "/admin/eventos",
    component: _27db46a4,
    name: "admin-eventos"
  }, {
    path: "/admin/perfil",
    component: _936f0768,
    name: "admin-perfil"
  }, {
    path: "/",
    component: _66db3042,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
