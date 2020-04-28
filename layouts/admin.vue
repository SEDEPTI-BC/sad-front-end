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
  components: { NavBarAdmin }
}
</script>

<style scoped>
h1 {
  margin-bottom: 40px;
}
</style>
