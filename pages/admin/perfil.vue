<template>
  <section class="container">
    <header class="header">
      <h1>Seus Dados</h1>
      <button v-if="!edit" class="btn btn-secondary" @click="toEdit">
        <BIconPencilSquare />
        <span>Editar Dados</span>
      </button>

      <button v-else class="btn btn-success" @click="updateProfile">
        <BIconPersonCheck />
        <span>Atualizar Dados</span>
      </button>
    </header>
    <div class="body">
      <b-card class="card-data mx-auto py-4">
        <label for="user-name">Nome</label>
        <b-form-input
          id="user-name"
          disabled
          class="fields"
          placeholder="Seu nome"
          size="lg"
          :value="user.username"
        ></b-form-input>

        <label for="user-email">Email</label>
        <b-form-input
          id="user-email"
          disabled
          class="fields"
          type="email"
          input-type="email"
          size="lg"
          :value="user.email"
        ></b-form-input>

        <label for="password">Nova senha</label>
        <b-form-input
          id="password"
          disabled
          placeholder="Sua senha super secreta"
          class="fields"
          type="password"
          input-type="email"
          size="lg"
        ></b-form-input>
      </b-card>
    </div>
  </section>
</template>

<script>
import { BIconPencilSquare, BIconPersonCheck } from 'bootstrap-vue'
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  layout: 'admin',
  name: 'Perfil',
  components: {
    BIconPencilSquare,
    BIconPersonCheck
  },
  data() {
    return {
      edit: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    toEdit() {
      this.edit = true
      const inputs = document.getElementsByClassName('fields')
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute('disabled')
      }
    },
    updateProfile() {
      this.edit = false
      const inputs = document.getElementsByClassName('fields')
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true
      }
    }
  }
}
</script>

<style scoped>
.body {
  max-width: 700px;
  margin: 0 auto;
}

input:focus {
  border: solid 2px #c5737b;
  box-shadow: 0px 0px 4px rgb(230, 141, 150);
}

.card-data {
  color: rgb(50, 50, 50);
  background: rgb(0, 0, 0, 0.2);
  border: rgb(0, 0, 0, 0.5);
  text-align: left;
}

.fields {
  margin-bottom: 30px;
}

header {
  display: flex;
  flex-wrap: wrap;
  margin: 40px auto;
  justify-content: space-between;
  max-width: 700px;
}
</style>
