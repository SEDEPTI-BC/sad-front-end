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
          placeholder="Palestra Sobre Sustentabilidade"
          class="mb-4"
        ></b-form-input>

        <label for="description">Descrição do evento</label>
        <b-form-textarea
          id="description"
          v-model="event.description"
          placeholder="Sustentabilidade é a capacidade de sustentação ou conservação de um processo ou sistema."
          rows="4"
          max-rows="6"
          class="mb-4"
        ></b-form-textarea>

        <label for="event-owner">Nome completo</label>
        <b-form-input
          id="event-owner"
          v-model="event.owner"
          placeholder="Paula K. Spencer"
          class="mb-4"
        ></b-form-input>

        <label for="event-email">Email</label>
        <b-form-input
          id="event-email"
          v-model="event.email"
          placeholder="PaulaKSpencer@teleworm.us"
          class="mb-4"
          type="email"
          input-type="email"
        ></b-form-input>

        <label for="dropdown-check">Equipamentos</label>
        <b-dropdown
          id="dropdown-check"
          text="Selecionar equipamentos"
          style="width: 100%; "
        >
          <b-dropdown-text style="max-width: 300px;">
            <!-- checklist aqui -->
            <b-form-checkbox-group id="checkboxes" v-model="event.equipments">
              <b-form-checkbox
                v-for="(equipment, index) in equipments"
                :key="index"
                :value="equipment"
                >{{ equipment | capitalize }}</b-form-checkbox
              >
            </b-form-checkbox-group>
          </b-dropdown-text>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button>Pronto</b-dropdown-item-button>
        </b-dropdown>

        <hr class="my-4" />

        <button class="btn btn-danger py-3" @click.prevent="submitForm">
          Enviar agendamento
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
      event: { name: '', owner: '', description: '' },
      equipments: ['notebook', 'quadro interativo', 'TV', 'datashow']
    }
  },
  methods: {
    submitForm() {
      alert(`Evento: ${this.event.equipments} criado`)
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
