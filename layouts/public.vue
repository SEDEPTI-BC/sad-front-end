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
  name: 'public',
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

<style></style>
