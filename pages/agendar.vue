<template>
  <div class="content pt-3 pb-5">
    <div v-if="loading" class="loading-background">
      <Loading />
    </div>
    <h1 class="page-title">Agendar Evento</h1>
    <b-container>
      <b-form v-if="show" @submit="submitForm" @reset="onReset">
        <b-card
          class="card-form mx-auto"
          title="Agendar Evento"
          sub-title="Preencha o formulário para agendar seu evento"
        >
          <hr class="my-4" />

          <label for="event-name">Nome do evento</label>
          <b-form-input
            id="event-name"
            v-model="event.title"
            placeholder="Palestra Sobre Sustentabilidade"
            class="mb-4"
            required
          ></b-form-input>

          <label for="description">Descrição do evento</label>
          <b-form-textarea
            id="description"
            v-model="event.description"
            placeholder="Sustentabilidade é a capacidade de sustentação ou conservação de um processo ou sistema."
            rows="4"
            max-rows="6"
            class="mb-4"
            required
          ></b-form-textarea>

          <label for="event-owner">Nome completo</label>
          <b-form-input
            id="event-owner"
            v-model="event.owner"
            placeholder="Paula K. Spencer"
            class="mb-4"
            required
          ></b-form-input>

          <label for="event-email">Email</label>
          <b-form-input
            id="event-email"
            v-model="event.email"
            placeholder="PaulaKSpencer@teleworm.us"
            class="mb-4"
            type="email"
            input-type="email"
            required
          ></b-form-input>

          <label for="dropdown-check">Equipamentos</label>
          <b-dropdown
            id="dropdown-check"
            text="Selecionar equipamentos"
            style="width: 100%; "
            class="mb-3"
          >
            <b-dropdown-text style="max-width: 300px;">
              <b-form-checkbox-group id="checkboxes" v-model="event.equipments">
                <b-form-checkbox
                  v-for="equipment in equipments.data"
                  :key="equipment.id"
                  :value="equipment.name"
                  style="display: block;"
                  >{{ equipment.name | capitalize }}</b-form-checkbox
                >
              </b-form-checkbox-group>
            </b-dropdown-text>

            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button>Pronto</b-dropdown-item-button>
          </b-dropdown>

          <b-form-input
            id="time_start"
            :value="equipmentsList"
            type="text"
            class="mb-4"
            readonly
          >
          </b-form-input>

          <label for="date-picker">Data do evento</label>
          <b-form-datepicker
            id="date-picker"
            v-model="event.date"
            :date-disabled-fn="dateDisabled"
            :min="min"
            hide-header
            locale="pt"
            :weekdays="weekdays"
            today-variant="danger"
            class="mb-4"
            selected-variant="danger"
            v-bind="labels"
            @context="onContext"
          ></b-form-datepicker>

          <b-row>
            <b-col>
              <label for="start">Começa</label>
              <b-form-select
                id="start"
                v-model="start"
                :options="options"
                size="lg"
              ></b-form-select>
            </b-col>

            <b-col>
              <label for="end">Termina</label>
              <b-form-select
                id="end"
                v-model="end"
                :options="options"
                size="lg"
              ></b-form-select>
            </b-col>
          </b-row>

          <hr class="my-4" />

          <b-button class="btn btn-primary py-3" type="submit"
            >Confirmar</b-button
          >
          <b-button class="btn btn-danger py-3" type="reset">Cancelar</b-button>
        </b-card>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { makeToast } from '~/plugins/toast.js'
import Loading from '~/components/Loading.vue'

export default {
  name: 'Agendar',
  layout: 'public',
  components: {
    Loading
  },
  data() {
    const now = new Date()
    const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return {
      context: null,
      disabledDays: [],
      end: null,
      event: {
        title: '',
        description: '',
        owner: '',
        email: '',
        date: '',
        equipments: [],
        schedules: []
      },
      labels: {
        weekdayHeaderFormat: 'short',
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
      loading: false,
      min: minDate,
      options: null,
      weekdays: [
        { value: 0, text: 'Domingo' },
        { value: 1, text: 'Segunda-feira' },
        { value: 2, text: 'Terça-feira' },
        { value: 3, text: 'Quarta-feira' },
        { value: 4, text: 'Quinta-feira' },
        { value: 5, text: 'Sexta-feira' },
        { value: 6, text: 'Sábado' }
      ],
      show: true,
      start: null
    }
  },
  computed: {
    ...mapGetters({
      equipments: 'equipments/get'
    }),

    equipmentsList() {
      if (this.event.equipments.length > 0) {
        return this.event.equipments.join(', ')
      }
      return 'Sem equipamentos selecionados'
    }
  },
  watch: {
    context() {
      this.getDisabledDays()

      this.getAvailableSchedules()
    }
  },
  created() {
    this.getDisabledDays()
  },

  methods: {
    dateDisabled(ymd, date) {
      const weekday = date.getDay()
      const day = date.getDate()
      return weekday === 0 || weekday === 6 || this.disabledDays.includes(day)
    },

    getDisabledDays() {
      const month = this.context
        ? this.context.activeYMD.split('-')[1]
        : new Date().getMonth() + 1

      const year = this.context
        ? this.context.activeYMD.split('-')[0]
        : new Date().getFullYear()

      const params = { month, year }

      this.$api
        .$get('/disable_days_current_month', { params })
        .then(response => {
          const days = response.disabledDays
            .filter(day => day.full_day)
            .map(day => {
              return +day.date.split('T')[0].split('-')[2]
            })
          this.disabledDays = days
        })
    },

    getAvailableSchedules() {
      const date = this.context.selectedYMD
      const params = { date }
      if (date) {
        this.$api.$get('/disabled_schedules', { params }).then(response => {
          this.options = response.schedules.map(schedule => {
            if (schedule.available) {
              return {
                value: schedule.hour,
                text: `${schedule.hour}h00`
              }
            } else {
              return {
                value: schedule.hour,
                text: `${schedule.hour}h00 horário indisponível`,
                disabled: true
              }
            }
          })

          this.options.push({ value: null, text: '-- : --' })
        })
      }
    },

    makeToast,

    onContext(ctx) {
      this.context = ctx
    },

    submitForm(evt) {
      this.loading = true

      evt.preventDefault()
      const event = this.event

      event.schedules.push(this.start, this.end)

      event.schedules = event.schedules.sort((a, b) => a - b)

      if (this.event.date && this.event.schedules.length > 0) {
        this.$api
          .$post('/events', {
            ...event
          })
          .then(response => {
            this.loading = false
            this.$router.push('/agendamento-confirmado')
          })
          .catch(response => {
            this.loading = false
            this.makeToast('Erro ao criar evento', 'danger')
          })
      } else if (!this.event.date) {
        this.loading = false
        this.makeToast('Selecione a data do evento', 'warning')
      } else if (this.event.schedules.length < 1) {
        this.loading = false
        this.makeToast('Selecione o horário do evento', 'warning')
      }
    },

    onReset(evt) {
      evt.preventDefault()
      this.event.title = ''
      this.event.description = ''
      this.event.owner = ''
      this.event.email = ''
      this.event.date = ''
      this.event.equipments = []
      this.event.schedules = []
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
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

.content {
  height: 100%;
  color: white;
  background-image: linear-gradient(to bottom, rgb(0, 0, 0, 0.5), transparent);
}

.loading-background {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000000;
  top: 0;
  height: 100vh;
  width: 100vw;
}

.page-title {
  color: #ffff;
  font-weight: bold;
  max-width: 700px;
  margin: 20px auto 60px auto;
  text-align: center;
}

input:focus,
textarea:focus {
  border: 1px #343a40;
  box-shadow: 0px 0px 4px #343a40;
}
</style>
