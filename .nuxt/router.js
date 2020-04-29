import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _da56701e = () => interopDefault(import('../pages/agendar.vue' /* webpackChunkName: "pages/agendar" */))
const _250c4e98 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _01b68384 = () => interopDefault(import('../pages/sobre.vue' /* webpackChunkName: "pages/sobre" */))
const _ad8531ae = () => interopDefault(import('../pages/admin/calendario.vue' /* webpackChunkName: "pages/admin/calendario" */))
const _166578b8 = () => interopDefault(import('../pages/admin/equipamentos.vue' /* webpackChunkName: "pages/admin/equipamentos" */))
const _66f051ee = () => interopDefault(import('../pages/admin/eventos.vue' /* webpackChunkName: "pages/admin/eventos" */))
const _185cca91 = () => interopDefault(import('../pages/admin/perfil.vue' /* webpackChunkName: "pages/admin/perfil" */))
const _23d2359d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/agendar",
    component: _da56701e,
    name: "agendar"
  }, {
    path: "/login",
    component: _250c4e98,
    name: "login"
  }, {
    path: "/sobre",
    component: _01b68384,
    name: "sobre"
  }, {
    path: "/admin/calendario",
    component: _ad8531ae,
    name: "admin-calendario"
  }, {
    path: "/admin/equipamentos",
    component: _166578b8,
    name: "admin-equipamentos"
  }, {
    path: "/admin/eventos",
    component: _66f051ee,
    name: "admin-eventos"
  }, {
    path: "/admin/perfil",
    component: _185cca91,
    name: "admin-perfil"
  }, {
    path: "/",
    component: _23d2359d,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
