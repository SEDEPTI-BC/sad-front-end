<template>
  <div class="content pt-5 pb-3">
    <h1 class="page-title">Log in</h1>
    <b-container>
      <b-card class="card-login mx-auto py-4">
        <label for="event-email">Email</label>
        <b-form-input
          id="event-email"
          v-model="login.email"
          placeholder="sad.admin@ufpa.br"
          class="mb-4"
          type="email"
          input-type="email"
          size="lg"
        ></b-form-input>

        <label for="password">Senha</label>
        <b-form-input
          id="password"
          v-model="login.password"
          placeholder="Sua senha super secreta"
          class="mb-4"
          type="password"
          input-type="email"
          size="lg"
        ></b-form-input>

        <b-button block variant="danger" size="lg" @click.prevent="loginUser"
          >Login</b-button
        >
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { makeToast } from '~/plugins/toast.js'

export default {
  layout: 'public',
  name: 'Login',
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser() {
      this.$store
        .dispatch('logonUser', this.login)
        .then(() => {
          this.$router.push('/admin')
        })
        .catch(() => {
          this.makeToast('Email ou senha incorretos!', 'danger', true)
        })
    },
    makeToast
  }
}
</script>

<style scoped>
input:focus {
  border: solid 2px #c5737b;
  box-shadow: 0px 0px 4px rgb(230, 141, 150);
}

.card-login {
  color: rgb(50, 50, 50);
  background: rgb(255, 255, 255, 0.7);
  border: rgb(0, 0, 0, 0.5);
  max-width: 500px;
  text-align: left;
}

.content {
  padding-top: 10px;
  text-align: center;
  min-height: 100vh;
  color: white;
  background-image: linear-gradient(to bottom, rgb(0, 0, 0, 0.5), transparent);
}

.page-title {
  color: #ffff;
  font-weight: bold;
  max-width: 700px;
  margin: 20px auto 60px auto;
  text-align: center;
}
</style>
