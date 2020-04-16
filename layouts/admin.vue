<template>
  <div>
    <NavBar />
    <b-container id="container">
      <transition name="page" mode="out-in">
        <nuxt />
      </transition>
    </b-container>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar'
export default {
  name: 'admin',
  components: { NavBar }
}
</script>

<style scoped>
#container {
  margin-top: 40px;
}
h1 {
  margin-bottom: 40px;
}
</style>
