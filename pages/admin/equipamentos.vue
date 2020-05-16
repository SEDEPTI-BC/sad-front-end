<template>
  <section class="container">
    <header>
      <h1>Gerenciar Equipamentos</h1>
      <button class="btn btn-secondary">
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
        <b-tr v-for="(equipment, index) in equipments" :key="index">
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
  </section>
</template>

<script>
import { BIconPlusCircle, BIconPencilSquare, BIconTrash } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'
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
      items: [
        {
          name: 'quadro interativo'
        },
        {
          name: 'notebook'
        },
        {
          name: 'datashow'
        },
        {
          name: 'piloto'
        },
        {
          name: 'tv'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      pagedEquipments: 'equipments/equipments'
    }),
    equipments() {
      return this.pagedEquipments.equipments.data
    }
  },
  created() {
    this.getEquipments()
  },
  methods: {
    ...mapActions({ getEquipments: 'equipments/getEquipments' })
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
