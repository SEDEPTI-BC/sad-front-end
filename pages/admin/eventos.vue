<template>
  <section v-if="events" class="container">
    <header>
      <h1>Eventos Agendados</h1>
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
            <p>
              <b>Responsável</b>
              : {{ event.owner }}
            </p>
            <p>
              <b>E-mail</b>
              : {{ event.email }}
            </p>
            <p>
              <b>Data</b>
              :
              {{ event.start.split(' ')[0] }}
            </p>
            <p>
              <b>Inicio</b>
              :
              {{ event.start.split(' ')[1] }}
            </p>
            <p>
              <b>Fim</b>
              :
              {{ event.end.split(' ')[1] }}
            </p>
            <p>
              <b>Solicitado em</b>
              :
              {{ event.created_at.split(' ')[0] }}
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
      <div class="fill">
        <b-pagination
          v-model="page"
          align="fill"
          hide-goto-end-buttons
          :total-rows="total"
          :per-page="limit"
          size="lg"
        ></b-pagination>
      </div>
    </div>
  </section>

  <section v-else class="no-events">
    <h1>Sem eventos agendados no momento</h1>
    <CalendarCheck />
  </section>
</template>

<script>
import { makeToast } from '~/plugins/toast.js'
import CalendarCheck from '~/components/CalendarCheck.vue'
export default {
  middleware: 'auth',
  layout: 'admin',
  name: 'Eventos',
  components: {
    CalendarCheck
  },
  data() {
    return {
      all: true,
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
      const { all, limit, page } = this
      const params = { all, limit, page }
      this.$api
        .$get('/events', { params })
        .then(response => {
          this.events = response.events
          this.total = +response.events.total
          this.limit = +response.events.perPage
        })
        .catch(() => {
          this.makeToast('Erro ao carregar eventos', 'danger', true)
        })
    },
    makeToast
  }
}
</script>

<style scoped>
header {
  display: flex;
  flex-wrap: wrap;
  margin: 40px 0;
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

.card-datas div {
  margin-right: 60px;
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
  color: #414b54;
  text-align: center;
}
</style>
