<template>
  <div>
    <NavBar />
    <b-container id="container">
      <nuxt />
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

<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Mono&display=swap');
* {
  font-family: 'PT Mono', monospace;
}

#container {
  margin-top: 40px;
}
h1 {
  margin-bottom: 40px;
}
</style>