<template>
  <section class="container">
    <header>
      <h1>Gerenciar datas e horários</h1>

      <button
        id="show-btn"
        :class="{ btn: true, 'btn-secondary': !value, 'btn-danger': value }"
        @click="activeDisableButton"
      >
        <b-icon-calendar />
        <span>Desativar dia</span>
      </button>
    </header>
    <div class="body">
      <div class="calendar mb-5">
        <header class="calendar-header">
          <strong>Calendário</strong>
        </header>
        <div class="calendar-body">
          <b-calendar
            v-model="value"
            block
            :date-info-fn="dayDisabled"
            :date-disabled-fn="dateDisabled"
            hide-header
            locale="pt-BR"
            :weekdays="weekdays"
            today-variant="danger"
            selected-variant="danger"
            v-bind="labels"
            @context="onContext"
          ></b-calendar>
        </div>
      </div>
      <div class="card-list">
        <header class="card-list-header">
          <strong>Dias desativados</strong>
        </header>
        <div class="card-list-body">
          <transition name="component" mode="out-in">
            <b-badge
              v-if="disableDays.length < 1"
              variant="secondary mx-2 mt-2"
              style="display:block; "
            >
              <p class="message">Não há dias desativados este mês.</p>
            </b-badge>
          </transition>
          <transition-group name="component" mode="out-in">
            <div
              v-for="disabled in disableDays"
              :key="disabled.id"
              class="card-list-content"
            >
              <header>
                <strong>{{ disabled.title | capitalize }}</strong>
                <div class="buttons">
                  <button class="btn" @click="confirmDeletion(disabled)">
                    <b-icon-trash class="trash" />
                  </button>
                  <button class="btn" @click="editDisableDay(disabled)">
                    <b-icon-pencil-square class="edit" />
                  </button>
                </div>
              </header>
              <p>{{ disabled.description }}</p>
              <div style="font-size:0.8rem;">
                <div>
                  <b>Data</b>:
                  {{
                    disabled.date
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('/')
                  }},
                  <div v-if="disabled.full_day" style="display: inline-block;">
                    O dia inteiro
                  </div>
                  <div v-else style="display: inline-block;">
                    de
                    {{
                      Math.min(
                        ...disabled.schedules.map(schedule => schedule.hour)
                      )
                    }}h00 ás
                    {{
                      Math.max(
                        ...disabled.schedules.map(schedule => schedule.hour)
                      )
                    }}h00
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <div class="modal">
      <b-modal id="bv-modal-disableday" centered hide-footer hide-header>
        <b-form @submit="createDisableDay">
          <div class="d-block">
            <h4 class="mb-4"><strong>Desativar dia</strong></h4>

            <label for="disable-day-title"><b>Título</b></label>
            <b-form-input
              id="disable-day-title"
              v-model="selectedDay.title"
              placeholder="Véspera de Natal"
              class="mb-4 grey-bg"
              type="text"
              input-type="text"
              size="lg"
              autofocus
              required
            ></b-form-input>

            <label for="disable-day-description"><b>Descrição</b></label>
            <b-form-textarea
              id="disable-day-description"
              v-model="selectedDay.description"
              placeholder="Véspera de Natal refere-se à noite ou todo dia que precede o dia de Natal e é amplamente vista como um feriado, total ou parcial."
              rows="4"
              max-rows="6"
              class="mb-4 grey-bg"
              size="lg"
            ></b-form-textarea>

            <label for="disabled-day-date"><b>Data</b></label>
            <b-form-input
              id="disabled-day-date"
              :value="activeFormatted"
              class="mb-4 grey-bg"
              type="text"
              input-type="text"
              size="lg"
              autofocus
              readonly
              required
            ></b-form-input>

            <b-form-checkbox
              v-model="full_day"
              name="full_day"
              size="lg"
              switch
            >
              <p v-if="full_day"><b>O dia inteiro</b></p>
              <p v-else>O dia inteiro</p>
            </b-form-checkbox>

            <transition name="component" mode="out-in">
              <div v-if="!full_day" class="schedules-row">
                <div style="width: 49%;">
                  <label for="schedule-start" style="display: block;"
                    ><b>Começa</b></label
                  >
                  <b-form-select
                    id="schedule-start"
                    v-model="schedule.start"
                    class="grey-bg"
                    :options="options"
                    size="lg"
                  ></b-form-select>
                </div>

                <div style="width: 49%;">
                  <label for="schedule-end" style="display: block;">
                    <b>Termina</b>
                  </label>
                  <b-form-select
                    id="schedule-end"
                    v-model="schedule.end"
                    class="grey-bg"
                    :options="options"
                    size="lg"
                  ></b-form-select>
                </div>
              </div>
            </transition>
          </div>
          <b-button
            v-if="!editingId"
            id="send-disable-day-button"
            class="mt-1"
            block
            size="lg"
            type="submit"
          >
            Desativar
          </b-button>

          <b-button
            v-if="editingId"
            id="send-disable-day-button"
            class="mt-1"
            block
            size="lg"
            @click="updateDiableDay"
          >
            Atualizar
          </b-button>
        </b-form>
      </b-modal>
    </div>
  </section>
</template>

<script>
import { BIconCalendar, BIconPencilSquare, BIconTrash } from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import { makeToast } from '~/plugins/toast.js'

export default {
  middleware: 'auth',
  layout: 'admin',
  name: 'Calendario',
  components: {
    BIconCalendar,
    BIconPencilSquare,
    BIconTrash
  },
  data() {
    return {
      activeFormatted: '',
      confirm: false,
      days: null,
      disableDays: {},
      editingId: null,
      full_day: true,
      value: '',
      context: null,
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
      options: null,
      schedule: {
        start: null,
        end: null
      },
      selectedDay: {
        title: null,
        description: null
      },
      weekdays: [
        { value: 0, text: 'Domingo' },
        { value: 1, text: 'Segunda-feira' },
        { value: 2, text: 'Terça-feira' },
        { value: 3, text: 'Quarta-feira' },
        { value: 4, text: 'Quinta-feira' },
        { value: 5, text: 'Sexta-feira' },
        { value: 6, text: 'Sábado' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      schedules: 'schedules/get'
    })
  },
  watch: {
    context() {
      this.getDisabledDays()
      this.activeFormatted = this.context.activeFormatted
    },

    full_day() {
      this.options = this.schedules.map(schedule => ({
        value: schedule.hour,
        text: `${schedule.hour}h00`
      }))
      this.options.push({ value: null, text: '-- : --' })
    }
  },

  created() {
    this.getDisabledDays()
  },

  methods: {
    activeDisableButton() {
      if (this.value) {
        this.$bvModal.show('bv-modal-disableday')
      } else {
        this.makeToast('Selecione um dia no calendário', 'warning')
      }
    },

    clearForm() {
      this.$bvModal.hide('bv-modal-disableday')
      this.editingId = null
      this.selectedDay.title = ''
      this.selectedDay.description = ''
      this.value = null
      this.schedule.start = null
      this.schedule.end = null
    },

    confirmDeletion(disabled) {
      this.confirm = ''
      this.$bvModal
        .msgBoxConfirm(
          `Você deseja realmente apagar o dia "${disabled.title}"?`,
          {
            title: 'Confirmar deleção',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'Confirmar',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(value => {
          this.confirm = value
          this.deteleDisableDay(disabled.id)
        })
    },

    createDisableDay(evt) {
      evt.preventDefault()

      const data = {
        title: this.selectedDay.title,
        description: this.selectedDay.description,
        full_day: this.full_day,
        date: this.value,
        schedules: [this.schedule.start, this.schedule.end]
      }

      if (this.full_day) {
        this.$api
          .$post('/disable_days', data)
          .then(response => {
            this.makeToast('Dia desativado!', 'success')
            this.getDisabledDays()
            this.$bvModal.hide('bv-modal-disableday')
          })
          .catch(response => {
            this.makeToast('Erro ao desativar dia', 'danger')
          })
      } else if (this.schedule.start && this.schedule.end) {
        this.$api
          .$post('/disable_days', data)
          .then(response => {
            this.makeToast('Dia desativado!', 'success')
            this.getDisabledDays()
            this.$bvModal.hide('bv-modal-disableday')
          })
          .catch(response => {
            this.makeToast('Erro ao desativar dia', 'danger')
          })
      } else {
        this.makeToast('Selecione os horários', 'warning')
      }
    },

    dayDisabled(ymd, date) {
      const day = date.getDate()
      const days = this.days ? this.days : []
      return days.includes(day) ? 'table-secondary' : ''
    },

    dateDisabled(ymd, date) {
      const weekday = date.getDay()
      return weekday === 0 || weekday === 6
    },

    deteleDisableDay(id) {
      if (this.confirm) {
        this.$api
          .$delete(`/disable_days/${id}`)
          .then(() => {
            this.getDisabledDays()
            this.makeToast('Deletado com sucesso!', 'success')
          })
          .catch(() => {
            this.makeToast('Ocorreu um erro ao deletar', 'danger')
          })
      }
    },

    editDisableDay(disabled) {
      const start = Math.min(
        ...disabled.schedules.map(schedule => schedule.hour)
      )
      const end = Math.max(...disabled.schedules.map(schedule => schedule.hour))

      this.editingId = disabled.id
      this.value = disabled.date
      this.selectedDay.title = disabled.title
      this.selectedDay.description = disabled.description || ''
      this.schedule.start = typeof start !== 'number' ? start : 8
      this.schedule.end = typeof end !== 'number' ? end : 12

      this.$bvModal.show('bv-modal-disableday')
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
          this.disableDays = response.disabledDays
          this.days = response.disabledDays.map(
            day => +day.date.split('T')[0].split('-')[2]
          )
        })
    },

    makeToast,

    onContext(ctx) {
      this.context = ctx
    },

    updateDiableDay() {
      const data = {
        title: this.selectedDay.title,
        description: this.selectedDay.description,
        full_day: this.full_day,
        date: this.value,
        schedules: [this.schedule.start, this.schedule.end]
      }

      this.$api
        .$put(`/disable_days/${this.editingId}`, data)
        .then(response => {
          this.makeToast('Atualizado!', 'success')
          this.clearForm()
          this.getDisabledDays()
        })
        .catch(response => {
          this.makeToast('Erro ao atualizar dia', 'danger')
        })
    }
  }
}
</script>

<style scoped>
[mode='out-in'] {
  margin: 0;
  padding: 0;
}

input[type='text'],
select,
textarea {
  outline: none;
  box-shadow: none !important;
  border: none !important;
}

header {
  display: flex;
  flex-wrap: wrap;
  margin: 40px 0;
  justify-content: space-between;
}

span {
  margin-left: 5px;
}

.body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.btn {
  float: right;
}

.buttons {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
}

.calendar {
  height: 350px;
  max-width: 400px;
  /* margin-bottom: 40px;  */
  flex-grow: 2;
}

.calendar-body {
  background: #ddd;
  border-radius: 0 0 4px 4px;
  height: inherit;
  margin: 0;
  padding: 5px;
}

.calendar-header {
  background: #343a40;
  border-radius: 4px 4px 0 0;
  margin: 0;
  padding: 10px 5px;
}

.calendar-header strong {
  margin: 0 auto;
  color: #eee;
}

.card-list {
  height: 350px;
  max-width: 400px;
  margin-bottom: 40px;
  flex-grow: 2;
}

.card-list-body {
  background: #ddd;
  border-radius: 0 0 4px 4px;
  height: inherit;
  margin: 0;
  overflow-y: scroll;
  padding: 0;
}

.card-list-content {
  background: #eee;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: calc(100% - 20px);
  margin: 10px 0 10px 10px;
  padding: 10px 15px;
}

.card-list-content div {
  margin-top: 0px;
}

.card-list-content header {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  margin: 0;
}

.card-list-content header .btn {
  margin: 0 0 0 10px;
  padding: 0;
}

.card-list-content header strong {
  font-size: 1.3rem;
}

.card-list-content p {
  padding: 20px 0;
}

.card-list-header {
  background: #343a40;
  border-radius: 4px 4px 0 0;
  margin: 0;
  padding: 10px 5px;
}

.card-list-header strong {
  margin: 0 auto;
  color: #eee;
}

.container {
  display: grid;
  margin: 0 auto;
  max-width: 900px;
}

.grey-bg {
  background: #dfdfdf;
  width: 100%;
  border: none;
  outline: none;
}

.message {
  margin: 5px;
  padding: 5px;
}

.schedules-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

@media screen and (max-width: 830px) and (min-width: 730px) {
  .calendar-header {
    border-radius: 4px 0 0 0;
  }

  .calendar-body {
    border-radius: 0 0 0 4px;
  }

  .card-list-body {
    border-radius: 0 0 4px 0;
  }

  .card-list-header {
    border-radius: 0 4px 0 0;
  }
}
</style>
