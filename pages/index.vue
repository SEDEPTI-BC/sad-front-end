<template>
  <div class="bg-image">
    <div class="content ">
      <b-container>
        <b-row align-h="center">
          <h1>Sistema de Agendamento de Auditório</h1>
        </b-row>

        <b-row align-h="center">
          <h4>Da Biblioteca Central da UFPA</h4>
        </b-row>

        <b-row align-h="center">
          <nuxt-link tag="button" to="public/agendamentos" class="btn  agendar">
            Agendar evento
          </nuxt-link>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script scoped>
export default {
  layout: 'public',
  components: {}
}
</script>

<style>
.agendar {
  margin-top: 50px;
  padding: 20px 30px 20px 30px;
  background: #f6cace;
}
.content {
  padding-top: 10%;
  text-align: center;
  height: 100%;
  color: white;
  background-image: linear-gradient(to bottom, #dc3545, transparent);
}
</style>
