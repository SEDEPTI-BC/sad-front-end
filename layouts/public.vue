<template>
  <div>
    <NavBar />
    <div class="bg-public">
      <transition name="page" mode="out-in">
        <nuxt />
      </transition>
    </div>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar'

export default {
  name: 'Public',
  components: {
    NavBar
  }
}
</script>

<style>
.bg-public {
  height: 100%;
  background: #222;
  background-image: url('../assets/images/img-bg.png');
  background-size: cover;
}
</style>
