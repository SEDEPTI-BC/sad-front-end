<template>
  <div class="content pt-4">
    <div class="container">
      <h1>Seu evento foi agendado!</h1>
      <h3>
        Verifique seu email para mais informações
      </h3>
      <div id="talk">
        <div class="message">
          <Tick class="tick" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tick from '~/components/Tick.vue'

export default {
  layout: 'public',
  name: 'Sobre',
  components: {
    Tick
  },
  data() {
    return {}
  },
  methods: {
    login() {}
  }
}
</script>

<style scoped>
#talk {
  display: flex;
  background-image: url('../assets/images/talk.png');
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  width: 667px;
  height: 534px;
  margin: 0 auto;
}

.tick {
  max-width: 300px;
  height: 300px;
}

p {
  margin-bottom: 0;
}

strong {
  display: block;
  margin-bottom: 20px;
}

.content {
  padding-top: 10px;
  min-height: 100vh;
  color: #555;
  background: #edf3ff;
}

.container {
  max-width: 900px;
  padding-top: 60px;
  text-align: center;
  padding-bottom: 100px;
}

@media screen and (max-width: 500px) {
  #talk {
    width: 100%;
  }
}
</style>
