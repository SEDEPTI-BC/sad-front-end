<template>
  <div id="loading">
    <LoadingDots />
  </div>
</template>

<script>
import LoadingDots from '@/components/LoadingDots.vue'
export default {
  name: 'Loading',
  components: {
    LoadingDots
  }
}
</script>

<style>
#loading {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
