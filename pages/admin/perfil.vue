<template>
  <section class="container" @click="cancelEdit">
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
          v-model="newPassword"
          disabled
          placeholder="Sua senha super secreta"
          class="fields"
          type="password"
          input-type="email"
          size="lg"
        ></b-form-input>

        <transition name="component" mode="out-in">
          <div v-if="edit">
            <label for="password">Senha Atual</label>
            <b-form-input
              id="old-password"
              v-model="currentPassword"
              placeholder="Confirme sua senha atual"
              class="fields"
              type="password"
              input-type="email"
              size="lg"
            ></b-form-input>
          </div>
        </transition>
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
      edit: false,
      newPassword: '',
      currentPassword: ''
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
      const username = document.getElementById('user-name').value
      const email = document.getElementById('user-email').value
      this.$api
        .$put('/user', {
          username,
          email,
          newPassword: this.newPassword,
          currentPassword: this.currentPassword
        })
        .then(response => {
          this.edit = false
          const inputs = document.getElementsByClassName('fields')
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true
          }
          this.$store.dispatch('getUser')
          // alterar depois
          alert(response.message)
        })
        .catch(response => {
          // alterar depois
          alert(
            'Falha ao atualizar dados. Verifique se os campos estão corretos.'
          )
        })
    },

    cancelEdit({ target, currentTarget }) {
      if (target === currentTarget) {
        this.edit = false
      }
    }
  }
}
</script>

<style scoped>
.body {
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 30px;
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
  margin-bottom: 20px;
}

header {
  display: flex;
  flex-wrap: wrap;
  margin: 40px auto;
  justify-content: space-between;
  max-width: 700px;
}
</style>
