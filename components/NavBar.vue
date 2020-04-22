<template>
  <div>
    <b-navbar toggleable="lg" type="dark" :variant="navColor" :sticky="true">
      <!-- <b-navbar-brand href="#">{{title}}</b-navbar-brand> -->
      <b-container>
        <b-navbar-brand href="#">
          <img
            src="~/static/sad-logo.png"
            alt="Sistema de Agendamento de Eventos"
            style="height:48px"
          />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <nuxt-link
              v-for="(item, index) in navItems"
              :key="index"
              :to="`public/${item}`"
            >
              <b-nav-item>
                <b>{{ item | capitalize }}</b>
              </b-nav-item>
            </nuxt-link>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->

              <template v-slot:button-content>
                {{ user.name | capitalize }}
                <b-icon icon="person-fill"></b-icon>
              </template>
              <b-dropdown-item href="#">Perfil</b-dropdown-item>

              <b-dropdown-item href="#">
                Sair
                <b-icon icon="power"></b-icon>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
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
        return { name: 'administrador' }
      }
    },
    navColor: {
      type: String,
      default: 'dark'
    }
  }
}
</script>

<style></style>
