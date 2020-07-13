<template>
  <section v-if="events" class="container">
    <header>
      <h1>Eventos Agendados</h1>
      <b-dropdown class="p-1">
        <template v-slot:button-content>
          <BIconEye />
          Visualizar
        </template>
        <b-dropdown-item id="future" active href="#" @click="toggleEvents"
          ><BIconClock />
          Eventos Futuros
        </b-dropdown-item>
        <b-dropdown-item id="past" href="#" @click="toggleEvents"
          ><BIconCalendarCheck />
          Eventos Ocorridos
        </b-dropdown-item>
      </b-dropdown>
    </header>
    <div>
      <div v-for="event in events.data" :key="event.id" class="event-card">
        <div>
          <h3>{{ event.title }}</h3>
          <strong>Descrição</strong>

          <p>{{ event.description }}</p>
        </div>
        <div class="card-datas">
          <div>
            <strong>Dados</strong>

            <p><b>Responsável</b>: {{ event.owner }}</p>
            <p><b>E-mail</b>: {{ event.email }}</p>
            <p>
              <b>Data</b>:
              {{ new Date(event.date) | dateFormat('DD/MM/YYYY') }}
            </p>
            <p><b>Inicio</b>: {{ `${event.schedules[0].hour}h00` }}</p>
            <p>
              <b>Fim</b>:
              {{
                `${+event.schedules[event.schedules.length - 1].hour + 1}h00`
              }}
            </p>
            <p>
              <b>Solicitado em</b>:
              {{ new Date(event.created_at) | dateFormat('DD/MM/YYYY') }}
            </p>
          </div>
          <div>
            <strong>Equipamentos</strong>

            <ul>
              <li v-for="(equipamento, index) in event.equipments" :key="index">
                {{ equipamento.name | capitalize }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="total > 3">
        <b-pagination
          v-model="page"
          align="center"
          hide-goto-end-buttons
          :total-rows="total"
          :per-page="limit"
          size="lg"
        ></b-pagination>
      </div>
      <transition name="component" mode="out-in">
        <div v-if="total < 1" class="no-events">
          <CalendarCheck />
          <h2>Sem eventos agendados no momento</h2>
        </div>
      </transition>
    </div>
  </section>
  <section v-else class="no-events">
    <h1>Sem eventos agendados no momento</h1>
    <CalendarCheck />
  </section>
</template>

<script>
import { BIconEye, BIconClock, BIconCalendarCheck } from 'bootstrap-vue'
import { makeToast } from '~/plugins/toast.js'
import CalendarCheck from '~/components/CalendarCheck.vue'
export default {
  middleware: 'auth',
  layout: 'admin',
  name: 'Eventos',
  components: {
    BIconCalendarCheck,
    BIconClock,
    BIconEye,
    CalendarCheck
  },
  data() {
    return {
      all: false,
      page: 1,
      events: null,
      limit: 3,
      total: 1
    }
  },
  watch: {
    page() {
      this.getEvents()
    }
  },
  created() {
    this.getEvents()
  },
  methods: {
    getEvents() {
      const { limit, page } = this
      const all = this.all ? this.all : ''
      const order = 'asc'
      const params = { all, limit, page, order }

      this.$api
        .$get('/events', { params })
        .then(response => {
          this.events = response.events
          this.total = +response.events.total
          this.limit = +response.events.perPage
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
        .catch(() => {
          this.makeToast('Erro ao carregar eventos', 'danger', true)
        })
    },
    makeToast,
    toggleEvents() {
      this.all = !this.all
      this.page = 1
      this.getEvents()
      document.getElementById('future').classList.toggle('active')
      document.getElementById('past').classList.toggle('active')
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

strong {
  font-size: 1.1rem;
}

.container {
  display: grid;
  margin: 0 auto;
  max-width: 900px;
}

.card-datas {
  display: flex;
  flex-wrap: wrap;
}

@media screen and (min-width: 500px) {
  .card-datas div {
    margin-right: 60px;
  }
}

.event-card {
  background: #ddd;
  display: grid;
  min-height: 200px;
  margin-bottom: 30px;
  padding: 40px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.no-events {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  color: #a0a0a0;
  text-align: center;
}

.no-events h1 {
  margin-bottom: 30px;
}
</style>
