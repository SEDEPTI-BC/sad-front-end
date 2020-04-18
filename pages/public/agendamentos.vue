<template>
  <div class="content pt-3 pb-5">
    <h1 class="page-title">Agendar Evento</h1>
    <b-container>
      <b-card
        class="card-form mx-auto"
        title="Agendar Evento"
        sub-title="Preencha o formulário para agendar seu evento"
      >
        <hr class="my-4" />

        <label for="event-name">Nome do evento</label>
        <b-form-input
          id="event-name"
          v-model="event.name"
          placeholder="Nome do evento"
          class="mb-4"
        ></b-form-input>

        <label for="description">Descrição do evento</label>
        <b-form-textarea
          id="description"
          v-model="event.description"
          placeholder="Descrição do evento"
          rows="4"
          max-rows="6"
          class="mb-4"
        ></b-form-textarea>

        <label for="event-owner">Dono do evento</label>
        <b-form-input
          id="event-owner"
          v-model="event.owner"
          placeholder="Nome do proprietário"
          class="mb-4"
        ></b-form-input>

        <label for="event-owner">Email</label>
        <b-form-input
          id="event-owner"
          v-model="event.email"
          placeholder="Email"
          class="mb-4"
          type="email"
          input-type="email"
        ></b-form-input>

        <hr class="my-4" />

        <button class="btn btn-danger">Cancelar</button>
        <button class="btn btn-success" @click.prevent="submitForm">
          Enviar
        </button>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Agendamentos',
  layout: 'public',
  data() {
    return {
      event: { name: '', owner: '', description: '' }
    }
  },
  methods: {
    submitForm() {
      alert(`Evento: ${this.event.name} criado`)
    }
  }
}
</script>

<style>
.card-form {
  color: rgb(50, 50, 50);
  max-width: 500px;
  background: rgb(255, 255, 255, 0.7);
  border: rgb(0, 0, 0, 0.5);
}

.page-title {
  color: #ffff;
  font-weight: bold;
  max-width: 700px;
  margin: 20px auto 60px auto;
  text-align: center;
}

.content {
  height: 100%;
  color: white;
  background-image: linear-gradient(to bottom, rgb(0, 0, 0, 0.5), transparent);
}
</style>
