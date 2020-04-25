import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _115c42b2 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _534a6886 = () => interopDefault(import('../pages/agendar.vue' /* webpackChunkName: "pages/agendar" */))
const _e255754e = () => interopDefault(import('../pages/sobre.vue' /* webpackChunkName: "pages/sobre" */))
const _9c4ac398 = () => interopDefault(import('../pages/admin/calendario.vue' /* webpackChunkName: "pages/admin/calendario" */))
const _6c911903 = () => interopDefault(import('../pages/admin/equipamentos.vue' /* webpackChunkName: "pages/admin/equipamentos" */))
const _d4b0db64 = () => interopDefault(import('../pages/login/entrar.vue' /* webpackChunkName: "pages/login/entrar" */))
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
    path: "/admin",
    component: _115c42b2,
    name: "admin"
  }, {
    path: "/agendar",
    component: _534a6886,
    name: "agendar"
  }, {
    path: "/sobre",
    component: _e255754e,
    name: "sobre"
  }, {
    path: "/admin/calendario",
    component: _9c4ac398,
    name: "admin-calendario"
  }, {
    path: "/admin/equipamentos",
    component: _6c911903,
    name: "admin-equipamentos"
  }, {
    path: "/login/entrar",
    component: _d4b0db64,
    name: "login-entrar"
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
