import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9c4ac398 = () => interopDefault(import('../pages/admin/calendario.vue' /* webpackChunkName: "pages/admin/calendario" */))
const _6c911903 = () => interopDefault(import('../pages/admin/equipamentos.vue' /* webpackChunkName: "pages/admin/equipamentos" */))
const _35dd3854 = () => interopDefault(import('../pages/public/agendamentos.vue' /* webpackChunkName: "pages/public/agendamentos" */))
const _54c4abba = () => interopDefault(import('../pages/public/sobre.vue' /* webpackChunkName: "pages/public/sobre" */))
const _e9d7d378 = () => interopDefault(import('../pages/public/login/entrar.vue' /* webpackChunkName: "pages/public/login/entrar" */))
const _9e1e111c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _9c4ac398,
    name: "admin-calendario"
  }, {
    path: "/admin/equipamentos",
    component: _6c911903,
    name: "admin-equipamentos"
  }, {
    path: "/public/agendamentos",
    component: _35dd3854,
    name: "public-agendamentos"
  }, {
    path: "/public/sobre",
    component: _54c4abba,
    name: "public-sobre"
  }, {
    path: "/public/login/entrar",
    component: _e9d7d378,
    name: "public-login-entrar"
  }, {
    path: "/",
    component: _9e1e111c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
