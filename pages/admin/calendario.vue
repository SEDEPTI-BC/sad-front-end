<template>
  <section class="container">
    <header>
      <h1>Gerenciar datas e horários</h1>
      <button class="btn btn-secondary">
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
          <div
            v-for="day in disableDays"
            :key="day.id"
            class="card-list-content"
          >
            <header>
              <strong>{{ day.title | capitalize }}</strong>
              <div>
                <button class="btn">
                  <b-icon-trash class="trash" />
                </button>
                <button class="btn">
                  <b-icon-pencil-square class="edit" />
                </button>
              </div>
            </header>
            <p>{{ day.description }}</p>
            <div style="font-size:0.8rem;">
              <div>
                <b>Data</b>:
                {{ new Date(day.date) | dateFormat('DD/MM/YYYY') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { BIconCalendar, BIconPencilSquare, BIconTrash } from 'bootstrap-vue'
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
      disableDays: [
        {
          id: 1,
          user_id: 1,
          date: '2020-01-06 21:00:00',
          title: 'sadpom',
          full_day: true,
          description:
            'Ecu lehom beuf adoer ise okucaker riv caj tokitce vuvveb.',
          created_at: '2020-07-08 16:07:17',
          updated_at: '2020-07-08 16:07:17'
        },
        {
          id: 2,
          user_id: 2,
          date: '2020-11-23 21:00:00',
          title: 'imu',
          full_day: false,
          description:
            'Ni powvur ollu mip ruvmol dugobe hotakode ma najob zirsina.',
          created_at: '2020-07-08 16:07:17',
          updated_at: '2020-07-08 16:07:17'
        },
        {
          id: 3,
          user_id: 3,
          date: '2020-01-10 21:00:00',
          title: 'ubiero',
          full_day: false,
          description: 'Daije con puw uvso nob nuor gaaf se nekub uhiwibhal.',
          created_at: '2020-07-08 16:07:17',
          updated_at: '2020-07-08 16:07:17'
        },
        {
          id: 4,
          user_id: 4,
          date: '2020-05-20 21:00:00',
          title: 'itaeca',
          full_day: false,
          description:
            'Kuspoj egwuc lujerpa owimocwav catu ribu vavhapbi lonelobi ekakos gubgad.',
          created_at: '2020-07-08 16:07:17',
          updated_at: '2020-07-08 16:07:17'
        },
        {
          id: 5,
          user_id: 5,
          date: '2020-10-12 21:00:00',
          title: 'ma',
          full_day: true,
          description:
            'Varmerjok hol uzuzin lowuv ob omebus ajsu noufdab cowe zuros.',
          created_at: '2020-07-08 16:07:18',
          updated_at: '2020-07-08 16:07:18'
        },
        {
          id: 6,
          user_id: 1,
          date: '2020-07-28 21:00:00',
          title: 'feriado até 12h',
          full_day: false,
          description: 'feriadao que todo br gosta',
          created_at: '2020-07-15 11:41:38',
          updated_at: '2020-07-15 11:41:38'
        }
      ],
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
  methods: {
    dateDisabled(ymd, date) {
      const weekday = date.getDay()
      const day = date.getDate()
      return weekday === 0 || weekday === 6 || day === 13
    },
    makeToast,
    onContext(ctx) {
      this.context = ctx
    }
  }
}
</script>

<style scoped>
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
  align-items: center;
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
