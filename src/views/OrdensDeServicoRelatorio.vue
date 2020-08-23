<template>
  <v-data-table :headers="headers" :items="lOrdem" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Relatorio Ordens: Fechadas e Não Pagas</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Resetar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import OrdemDeServicoService from "../service/domain/OrdemDeServicoService";
const sOrdem = OrdemDeServicoService.build();

export default {
  name: "lOrdem",
  components: {},
  directives: {},

  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Cliente", value: "dispositivo.cliente.nome" },
      { text: "Dispositivo", value: "dispositivo.numSerie" },
      { text: "Tecnico", value: "tecnico.nome" },
      { text: "Status", value: "statusOrdemDeServico.descricao" },
      { text: "Pago?", value: "pagamento" },
      { text: "Valor Total", value: "valorTotal" },
    ],

    lOrdem: [],
  }),

  computed: {},

  watch: {},

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.fetchRecordsOrdem();
    },

    fetchRecordsOrdem() {
      sOrdem
        .search(`findOrdemFechadasNaoPagas`)
        .then(this.fetchRecodsSuccessOrdem);
    },

    fetchRecodsSuccessOrdem(response) {
      if (Array.isArray(response.rows)) {
        this.lOrdem = response.rows;
        return;
      }
      this.lOrdem = [];
    },
  },
};
</script>