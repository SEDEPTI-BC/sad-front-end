<template>
  <section class="container">
    <header>
      <h1>Gerenciar Equipamentos</h1>
      <button
        id="show-btn"
        class="btn btn-secondary"
        @click="$bvModal.show('bv-modal-equipment')"
      >
        <b-icon-plus-circle />
        <span>Adicionar novo</span>
      </button>
    </header>
    <b-table-simple
      hover
      small
      caption-top
      responsive
      striped
      class="rounded shadow-sm"
    >
      <b-thead head-variant="dark" class="text-center">
        <b-tr>
          <b-th colspan="5" class="py-3">Equipamentos</b-th>
        </b-tr>
      </b-thead>

      <b-tbody style="background:#eee; ">
        <b-tr v-for="(equipment, index) in equipments.data" :key="index">
          <b-td
            ><input
              :id="equipment.id"
              type="text"
              class="input-edit"
              :value="equipment.name | capitalize"
              disabled
              @keyup.enter="updateEquipment(equipment.id)"
          /></b-td>
          <b-td>
            <button class="btn" @click="deteleEquipment(equipment.id)">
              <BIconTrash class="trash" />
            </button>
            <button
              :id="`edit${equipment.id}`"
              class="btn"
              @click="edit(equipment.id)"
            >
              <BIconPencilSquare class="edit" />
            </button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <div class="modal">
      <b-modal
        id="bv-modal-equipment"
        centered
        hide-footer
        hide-header
        style="border: none;"
      >
        <div class="d-block">
          <h4 class="mb-4"><strong>Adicionar novo equipamento</strong></h4>
          <b-form-input
            id="equipment-name"
            v-model="equipmentName"
            placeholder="Digite o nome do equipamento"
            class="mb-4"
            type="text"
            input-type="text"
            size="lg"
            autofocus
            @keyup.enter="createEquipment"
          ></b-form-input>
        </div>
        <b-button
          id="send-equipment-button"
          class="mt-1"
          @click="createEquipment"
          >Adicionar</b-button
        >
      </b-modal>
    </div>
  </section>
</template>

<script>
import { BIconPlusCircle, BIconPencilSquare, BIconTrash } from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import { makeToast } from '~/plugins/toast.js'
export default {
  middleware: 'auth',

  layout: 'admin',
  name: 'Equipamentos',
  components: {
    BIconPlusCircle,
    BIconPencilSquare,
    BIconTrash
  },
  data() {
    return {
      equipmentName: ''
    }
  },
  computed: {
    ...mapGetters({
      equipments: 'equipments/get'
    })
  },
  methods: {
    createEquipment() {
      const name = this.equipmentName
      const sendButton = document.getElementById('send-equipment-button')
      sendButton.disabled = true
      this.$api
        .$post('/equipments', {
          name
        })
        .then(response => {
          sendButton.disabled = false
          this.$store.dispatch('equipments/getEquipments')
          this.$bvModal.hide('bv-modal-equipment')
          this.makeToast('Equipamento Adicionado!', 'success')
        })
        .catch(response => {
          sendButton.disabled = false
          this.makeToast('Erro ao adicionar equipamento', 'danger')
        })
    },
    deteleEquipment(id) {
      this.$api
        .$delete(`/equipments/${id}`)
        .then(response => {
          this.$store.dispatch('equipments/getEquipments')
          this.makeToast('Equipamento deletado!', 'success')
        })
        .catch(response => {
          this.makeToast('Erro ao deletar equipamento', 'danger')
        })
    },

    edit(id) {
      const equipmentNameInput = document.getElementById(id)

      this.$store.dispatch('equipments/getEquipments')

      equipmentNameInput.disabled = !equipmentNameInput.disabled
      equipmentNameInput.focus()
      document.getElementById(`edit${id}`).classList.toggle('edit-active')
    },

    updateEquipment(id) {
      const name = document.getElementById(id).value
      this.$api
        .$put(`/equipments/${id}`, {
          name
        })
        .then(response => {
          this.edit(id)
          this.$store.dispatch('equipments/getEquipments')
          this.makeToast('Equipamento atualizado!', 'success')
        })
        .catch(response => {
          this.makeToast('Erro ao atualizar equipamento', 'danger')
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
  justify-content: space-between;
}

span {
  margin-left: 5px;
}
#equipment-name {
  background: #cfcfcf;
}

.btn {
  float: right;
}

.container {
  display: grid;
  margin: 0 auto;
  max-width: 900px;
}

.edit-active {
  color: blue;
}

.input-edit {
  border: none;
  background: none;
  width: 100%;
  outline: none;
}

.table-sm th,
.table-sm td {
  padding: 1rem;
}
</style>
