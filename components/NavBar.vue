<template>
  <div>
    <b-navbar toggleable="lg" type="dark" :variant="navColor" :sticky="true">
      <b-container>
        <b-navbar-brand to="/">
          <img src="~/static/sad-logo.png" :alt="title" style="height:48px" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              v-for="(item, index) in navItems"
              :key="index"
              active-class="active"
              :to="`${item}`"
            >
              <b>{{ item | capitalize }}</b>
            </b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="page" variant="light">
              Área administrativa
              <BIconPersonFill />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { BIconPersonFill } from 'bootstrap-vue'
export default {
  name: 'NavBar',
  components: {
    BIconPersonFill
  },
  props: {
    title: {
      type: String,
      default: 'SAD-BC'
    },
    navItems: {
      type: Array,
      default: () => {
        return ['agendar', 'sobre']
      }
    },
    navColor: {
      type: String,
      default: 'danger'
    }
  },
  data() {
    return {
      page: { name: 'login' }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  async created() {
    await this.$store.dispatch('getUser')
    if (this.user) {
      this.page = { name: 'admin' }
    }
  }
}
</script>

<style>
.active {
  color: #f6cace;
}
</style>
