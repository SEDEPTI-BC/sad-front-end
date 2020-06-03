<template>
  <div>
    <NavBarAdmin />
    <transition name="page" mode="out-in">
      <nuxt />
    </transition>
  </div>
</template>

<script>
import NavBarAdmin from '~/components/NavBarAdmin'
export default {
  name: 'Admin',
  components: { NavBarAdmin },
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
h1 {
  margin-bottom: 40px;
}
</style>
