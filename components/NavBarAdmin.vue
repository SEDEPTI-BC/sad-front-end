<template>
  <div>
    <b-navbar toggleable="lg" type="dark" :variant="navColor" :sticky="true">
      <b-container>
        <b-navbar-brand href="/">
          <img src="~/static/sad-logo.png" :alt="title" style="height:48px" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              v-for="(item, index) in navItems"
              :key="index"
              active-class="active"
              :to="generateRoute(item)"
            >
              <b>{{ item | capitalize }}</b>
            </b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->

              <template v-slot:button-content>
                {{ user.name | capitalize }}
                <BIconPersonFill />
              </template>
              <b-dropdown-item to="/admin/perfil">
                Perfil
              </b-dropdown-item>

              <b-dropdown-item href="/">
                Sair
                <BIconPower />
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { BIconPersonFill, BIconPower } from 'bootstrap-vue'
export default {
  name: 'NavBarAdmin',
  components: {
    BIconPersonFill,
    BIconPower
  },
  props: {
    title: {
      type: String,
      default: 'SAD-BC'
    },
    navItems: {
      type: Array,
      default: () => {
        return ['eventos', 'equipamentos', 'calendário']
      }
    },
    user: {
      type: Object,
      default: () => {
        return { name: 'Administrador' }
      }
    },
    navColor: {
      type: String,
      default: 'dark'
    }
  },
  methods: {
    generateRoute(item) {
      item = item === 'calendário' ? 'calendario' : item
      return `/admin/${item}`
    }
  }
}
</script>

<style>
.active {
  color: #f6cace;
}
</style>
