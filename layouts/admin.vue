<template>
  <div>
    <NavBarAdmin />
    <div class="pages">
      <transition name="page" mode="out-in">
        <nuxt />
      </transition>
    </div>
    <FooterAdmin />
  </div>
</template>

<script>
import NavBarAdmin from '~/components/NavBarAdmin'
import FooterAdmin from '~/components/FooterAdmin'

export default {
  name: 'Admin',
  components: { NavBarAdmin, FooterAdmin },
  data() {
    return {
      user: null
    }
  },
  watch: {
    user() {
      this.getUser()
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$store.dispatch('getUser')
    }
  }
}
</script>

<style scoped>
.pages {
  height: 100vh;
}

h1 {
  margin-bottom: 40px;
}
</style>
