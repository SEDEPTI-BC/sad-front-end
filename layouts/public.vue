<template>
  <div>
    <NavBar :user="$store.state.user" />
    <div class="bg-public">
      <transition name="page" mode="out-in">
        <nuxt />
      </transition>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar'
import Footer from '~/components/Footer'

export default {
  name: 'Public',
  components: {
    NavBar,
    Footer
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
