<template>
  <div class="content pt-5">
    <div class="container">
      <div class="title">
        <img src="../assets/images/Logo_SEDEPTI.jpg" alt="logo sedepti" />
        <h2 class="my-5">
          Serviço de Desenvolvimento de Produtos Tecnológicos Informacionais
        </h2>
      </div>

      <p>Responsáveis pelo desenvolvimento e manuntenção do SAD</p>

      <h4>Direção</h4>
      <hr />
      <ul>
        <li v-for="(director, index) in direction" :key="index">
          <a v-if="director.link" :href="director.link">{{ director.name }}</a>
          <span v-else>{{ director.name }}</span>
        </li>
      </ul>

      <h4>Designers</h4>
      <hr />
      <ul>
        <li v-for="(designer, index) in designers" :key="index">
          <a v-if="designer.link" :href="designer.link">{{ designer.name }}</a>
          <span v-else>{{ designer.name }}</span>
        </li>
      </ul>

      <h4>Desenvolvedores</h4>
      <hr />
      <ul>
        <li v-for="(developer, index) in developers" :key="index">
          <a v-if="developer.link" :href="developer.link">{{
            developer.name
          }}</a>
          <span v-else>{{ developer.name }}</span>
        </li>
      </ul>

      <h4>RH</h4>
      <hr />
      <ul>
        <li v-for="(value, index) in rh" :key="index">
          <a v-if="value.link" :href="value.link">{{ value.name }}</a>
          <span v-else>{{ value.name }}</span>
        </li>
      </ul>

      <strong>Contato</strong>
      <b>Email</b>: sedepti@ufpa.br
    </div>
  </div>
</template>

<script>
export default {
  layout: 'public',
  name: 'Sedepti',
  data() {
    return {
      direction: [
        {
          name: 'Diego Barros',
          link: ''
        }
      ],
      designers: [
        {
          name: 'Teoian Quaresma',
          link: 'https://github.com/quaresmateo'
        }
      ],
      developers: [
        {
          name: 'Teoian Quaresma',
          link: 'https://github.com/quaresmateo'
        },
        {
          name: 'Carlos Augusto',
          link: 'https://github.com/carlosag16'
        }
      ],
      rh: [
        {
          name: 'Edisângela',
          link: ''
        },
        {
          name: 'Aline',
          link: ''
        }
      ]
    }
  }
}
</script>

<style scoped>
p {
  text-align: center;
  margin-bottom: 100px;
}

strong {
  display: block;
  margin: 40px 0 20px 0;
}

ul {
  margin-bottom: 100px;
}

.content {
  padding-bottom: 100px;
  min-height: 100vh;
  color: #555;
  background: #edf3ff;
}

.container {
  max-width: 900px;
}

.title {
  text-align: center;
}

.title > img {
  height: 40px;
  padding-bottom: 0;
  margin-bottom: -30px;
}
</style>
