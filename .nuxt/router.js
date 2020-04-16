import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ad8531ae = () => interopDefault(import('../pages/admin/calendario.vue' /* webpackChunkName: "pages/admin/calendario" */))
const _166578b8 = () => interopDefault(import('../pages/admin/equipamentos.vue' /* webpackChunkName: "pages/admin/equipamentos" */))
const _72d66182 = () => interopDefault(import('../pages/public/agendamentos.vue' /* webpackChunkName: "pages/public/agendamentos" */))
const _e16594d0 = () => interopDefault(import('../pages/public/sobre.vue' /* webpackChunkName: "pages/public/sobre" */))
const _1bcbad2f = () => interopDefault(import('../pages/public/login/entrar.vue' /* webpackChunkName: "pages/public/login/entrar" */))
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
    path: "/admin/calendario",
    component: _ad8531ae,
    name: "admin-calendario"
  }, {
    path: "/admin/equipamentos",
    component: _166578b8,
    name: "admin-equipamentos"
  }, {
    path: "/public/agendamentos",
    component: _72d66182,
    name: "public-agendamentos"
  }, {
    path: "/public/sobre",
    component: _e16594d0,
    name: "public-sobre"
  }, {
    path: "/public/login/entrar",
    component: _1bcbad2f,
    name: "public-login-entrar"
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
