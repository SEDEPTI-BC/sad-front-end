<template>
  <div class="contentRed">
    <b-container>
      <b-row align-h="center">
        <h1>Sistema de Agendamento de Auditório</h1>
      </b-row>

      <b-row align-h="center">
        <h4>Da Biblioteca Central da UFPA</h4>
      </b-row>

      <b-row align-h="center">
        <nuxt-link tag="button" to="agendar" class="btn large-btn mb-5"
          >Agendar evento</nuxt-link
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'public',
  components: {}
}
</script>

<style scoped>
.contentRed {
  padding-top: 10%;
  text-align: center;
  min-height: 100vh;
  color: white;
  background: linear-gradient(to bottom, #dc3545, transparent);
}
</style>
