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
          class="mb-4"
        >
          <b-dropdown-text style="max-width: 300px;">
            <!-- checklist aqui -->
            <b-form-checkbox-group id="checkboxes" v-model="event.equipments">
              <b-form-checkbox
                v-for="(equipment, index) in equipments"
                :key="index"
                :value="equipment"
                style="display: block;"
                >{{ equipment | capitalize }}</b-form-checkbox
              >
            </b-form-checkbox-group>
          </b-dropdown-text>

          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button>Pronto</b-dropdown-item-button>
        </b-dropdown>

        <label for="date-picker">Data do evento</label>
        <b-form-datepicker
          id="date-picker"
          v-model="eventDate.dateBegin"
          :date-disabled-fn="dateDisabled"
          locale="pt"
          :weekdays="weekdays"
          today-variant="danger"
          class="mb-4"
          selected-variant="danger"
          v-bind="labels"
        ></b-form-datepicker>

        <b-row>
          <b-col mb="auto">
            <label for="time_start">Hora de início</label>
            <b-form-input
              id="time_start"
              v-model="eventDate.timeStart"
              type="time"
              locale="pt"
              min="08:00"
              max="21:00"
            ></b-form-input>
          </b-col>
          <b-col mb="auto">
            <label for="time_end">Até às</label>
            <b-form-input
              id="time_end"
              v-model="eventDate.timeEnd"
              type="time"
              locale="pt"
              min="08:00"
              max="21:00"
            ></b-form-input>
          </b-col>
        </b-row>

        <hr class="my-4" />

        <button class="btn btn-danger py-3" @click.prevent="submitForm">
          Confirmar agendamento
        </button>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Agendar',
  layout: 'public',
  data() {
    return {
      event: {
        name: '',
        description: '',
        owner: '',
        email: ''
      },

      equipments: [
        'notebook',
        'quadro interativo',
        'TV',
        'datashow',
        'tablet',
        'piloto'
      ],
      labels: {
        weekdayHeaderFormat: 'long',
        labelPrevDecade: 'Década anterior',
        labelPrevYear: 'Ano anterior',
        labelPrevMonth: 'Mês anterior',
        labelCurrentMonth: 'Mês atual',
        labelNextMonth: 'Mês que vem',
        labelNextYear: 'Mês que vem',
        labelNextDecade: 'Próxima década',
        labelToday: 'Hoje',
        labelSelected: 'Data selecionada',
        labelNoDateSelected: 'Nenhuma data selecionada',
        labelCalendar: 'Calendário',
        labelNav: 'Navegação do calendário',
        labelHelp: 'Use as teclas de seta para navegar pelo calendário'
      },
      weekdays: [
        { value: 0, text: 'Domingo' },
        { value: 1, text: 'Segunda-feira' },
        { value: 2, text: 'Terça-feira' },
        { value: 3, text: 'Quarta-feira' },
        { value: 4, text: 'Quinta-feira' },
        { value: 5, text: 'Sexta-feira' },
        { value: 6, text: 'Sábado' }
      ],
      eventDate: {}
    }
  },

  methods: {
    dateDisabled(ymd, date) {
      const weekday = date.getDay()
      const day = date.getDate()
      return weekday === 0 || weekday === 6 || day === 13
    },
    onContext(ctx) {
      this.context = ctx
    },
    submitForm() {
      const name = this.event.owner.split(' ').length >= 2
      if (!name) {
        alert('Digite seu nome completo')
      } else {
        alert('Evento enviado com sucesso')
      }
    }
  }
}
</script>

<style scoped>
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

input:focus,
textarea:focus {
  border: 1px #343a40;
  box-shadow: 0px 0px 4px #343a40;
}
</style>
