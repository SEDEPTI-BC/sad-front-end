<template>
  <div>
    <NavBar :nav-items="optionsNav" nav-color="danger" />
    <transition name="page" mode="out-in">
      <div class="bg-image">
        <nuxt />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Public',
  components: {
    NavBar: () => import('~/components/NavBar')
  },
  data() {
    return {
      optionsNav: ['agendar', 'sobre']
    }
  }
}
</script>

<style>
/* .background {
  height: 100vh;
} */

.bg-image {
  height: 100vh;
  background: #222;
  background-image: url('../assets/images/img-bg.png');
  background-size: cover;
}
</style>
