<template>
  <v-data-table :headers="headers" :items="lOrdem" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <h2>Selecione um Status Para Buscar!</h2>
      <v-combobox
        :items="lStatusOrdem"
        item-text="descricao"
        label="Status"
        v-model="statusSelecionado"
        @change="buscarOrdens"
        outlined
        required
      ></v-combobox>
      <v-toolbar>
        <v-toolbar-title>Relatorio Ordens: Filtro Status</v-toolbar-title>
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

import StatusOrdemService from "../service/domain/StatusOrdemService";
const sStatusOrdem = StatusOrdemService.build();

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

    statusSelecionado: null,
    lOrdem: [],
    lStatusOrdem: [],
  }),

  computed: {},

  watch: {},

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.fetchRecordsStatusOrdem();
    },

    fetchRecordsOrdem(query) {
      sOrdem.search(query).then(this.fetchRecodsSuccessOrdem);
    },

    fetchRecordsStatusOrdem() {
      sStatusOrdem.search({}).then(this.fetchRecodsSuccessStatusOrdem);
    },

    fetchRecodsSuccessOrdem(response) {
      if (Array.isArray(response.rows)) {
        this.lOrdem = response.rows;
        return;
      }
      this.lOrdem = [];
    },

    fetchRecodsSuccessStatusOrdem(response) {
      if (Array.isArray(response.rows)) {
        this.lStatusOrdem = response.rows;
        return;
      }
      this.lStatusOrdem = [];
    },

    buscarOrdens() {
      const query = this.getQueryUrlBuscaOrdensPorStatus();
      this.resetSelecaoDispositivo();
      this.fetchRecordsOrdem(query);
    },

    getQueryUrlBuscaOrdensPorStatus() {
      return `findByStatusOrdemDeServico/${this.statusSelecionado.id}`;
    },

    resetSelecaoDispositivo() {
      this.lOrdem = [];
    },
  },
};
</script>