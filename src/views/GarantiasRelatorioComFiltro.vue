<template>
  <v-data-table :headers="headers" :items="lGarantia" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <h2>Selecione um Status Para Buscar!</h2>
      <v-combobox
        :items="lStatusGarantia"
        item-text="descricao"
        label="Status"
        v-model="statusSelecionado"
        @change="buscarOrdens"
        outlined
        required
      ></v-combobox>
      <v-toolbar>
        <v-toolbar-title>Relatorio Garantia: Filtro Satisfação</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Resetar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import GarantiaService from "../service/domain/GarantiaService";
const sGarantia = GarantiaService.build();

import StatusGarantiaService from "../service/domain/StatusGarantiaService";
const sStatusGarantia = StatusGarantiaService.build();

export default {
  name: "lGarantia",
  components: {},
  directives: {},

  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Ordem De Serviço", value: "ordemDeServico.id" },
      { text: "Motivo", value: "motivo" },
      { text: "Data de Entrada", value: "dataEntrada" },
      { text: "Status", value: "statusGarantia.descricao" },
    ],

    statusSelecionado: null,
    lGarantia: [],
    lStatusGarantia: [],
  }),

  computed: {},

  watch: {},

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.fetchRecordsStatusGarantia();
    },

    fetchRecordsGarantia(query) {
      sGarantia.search(query).then(this.fetchRecodsSuccessGarantia);
    },

    fetchRecordsStatusGarantia() {
      sStatusGarantia.search({}).then(this.fetchRecodsSuccessStatusGarantia);
    },

    fetchRecodsSuccessGarantia(response) {
      if (Array.isArray(response.rows)) {
        this.lGarantia = response.rows;
        return;
      }
      this.lGarantia = [];
    },

    fetchRecodsSuccessStatusGarantia(response) {
      if (Array.isArray(response.rows)) {
        this.lStatusGarantia = response.rows;
        return;
      }
      this.lStatusGarantia = [];
    },

    buscarOrdens() {
      const query = this.getQueryUrlBuscaOrdensPorStatus();
      this.resetSelecaoDispositivo();
      this.fetchRecordsGarantia(query);
    },

    getQueryUrlBuscaOrdensPorStatus() {
      return `findByStatusGarantia/${this.statusSelecionado.id}`;
    },

    resetSelecaoDispositivo() {
      this.lGarantia = [];
    },
  },
};
</script>