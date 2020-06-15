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
          <b-td>{{ equipment.name | capitalize }}</b-td>
          <b-td>
            <button class="btn">
              <BIconTrash class="trash" />
            </button>
            <button class="btn">
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
          ></b-form-input>
        </div>
        <b-button class="mt-1" @click="$bvModal.hide('bv-modal-equipment')"
          >Adicionar</b-button
        >
      </b-modal>
    </div>
  </section>
</template>

<script>
import { BIconPlusCircle, BIconPencilSquare, BIconTrash } from 'bootstrap-vue'
import { mapGetters } from 'vuex'
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

.table-sm th,
.table-sm td {
  padding: 1rem;
}
</style>
