<template>
  <section class="container">
    <header>
      <h1>Eventos Agendados</h1>
    </header>
    <div v-for="event in events" :key="event.id" class="event-card">
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
            {{ event.start.split(' ')[0] }}
          </p>
          <p>
            <b>Inicio</b>:
            {{ event.start.split(' ')[1] }}
          </p>
          <p>
            <b>Fim</b>:
            {{ event.end.split(' ')[1] }}
          </p>
          <p>
            <b>Solicitado em</b>:
            {{ event.createdAt }}
          </p>
        </div>
        <div>
          <strong>Equipamentos</strong>
          <ul>
            <li v-for="(equipamento, index) in event.equipments" :key="index">
              {{ equipamento | capitalize }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'admin',
  name: 'Eventos',
  data() {
    return {
      events: [
        {
          id: 1,
          title: 'Evento sobre o meio ambiente',
          description:
            'O meio ambiente é um assunto pra ser tratado com seriedade, sendo assim essa palestra visa conscientizar as pessoas dentro do campus da universidade',
          owner: 'Luiz Flavio Bezerra',
          email: 'luizinho@hotmail.com',
          start: '2020-05-14 8:00:00',
          end: '2020-05-14 10:00:00',
          equipments: ['notebook', 'quadro interativo'],
          createdAt: '2020-04-30 9:43:00'
        },
        {
          id: 2,
          title: 'Evento sobre trabalho remoto',
          description:
            'Após a pandemia de covid-19, o termo trabalho remoto se tronou popular e por isso essa palestra aborda...',
          owner: 'Wilson Marlon Melo',
          email: 'wmm@gmail.com',
          start: '2020-05-28 12:00:00',
          end: '2020-05-28 14:00:00',
          equipments: ['notebook', 'quadro interativo', 'piloto'],
          createdAt: '2020-05-03 3:43:00'
        }
      ]
    }
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
</style>
