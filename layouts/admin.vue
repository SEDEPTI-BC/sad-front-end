<template>
  <div>
    <NavBar />
    <b-container>
      <transition name="page" mode="out-in">
        <nuxt />
      </transition>
    </b-container>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar'
export default {
  name: 'Admin',
  components: { NavBar }
}
</script>

<style scoped>
h1 {
  margin-bottom: 40px;
}
</style>
