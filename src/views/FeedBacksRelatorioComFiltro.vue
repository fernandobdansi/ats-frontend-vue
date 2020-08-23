<template>
  <v-data-table :headers="headers" :items="lFeedBack" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <h2>Selecione uma Satisfação Para Buscar!</h2>
      <v-select
        :items="lSatisfacao"
        item-text="satisfacao"
        label="Satisfação"
        v-model="satisfacaoSelecionado"
        @change="buscarFeedBacks"
        outlined
        required
      ></v-select>
      <v-toolbar>
        <v-toolbar-title>Relatorio FeedBacks: Filtro Satisfação</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Resetar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import FeedBackService from "../service/domain/FeedBackService";
const sFeedBack = FeedBackService.build();

export default {
  name: "lFeedBack",
  components: {},
  directives: {},

  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Ordem De Serviço", value: "ordemDeServico.id" },
      { text: "Satisfação", value: "satisfacao" },
      { text: "Comentario", value: "comentario" },
    ],

    satisfacaoSelecionado: null,
    lFeedBack: [],
    lSatisfacao: [],
  }),

  computed: {},

  watch: {},

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.lSatisfacao = [
        {
          satisfacao: "Ruim",
        },
        {
          satisfacao: "Bom",
        },
        {
          satisfacao: "Muito Bom",
        },
        {
          satisfacao: "Ótimo",
        },
        {
          satisfacao: "Exelente",
        },
      ];
    },

    fetchRecordsFeedBack(query) {
      sFeedBack.search(query).then(this.fetchRecodsSuccessFeedBack);
    },

    fetchRecodsSuccessFeedBack(response) {
      if (Array.isArray(response.rows)) {
        this.lFeedBack = response.rows;
        return;
      }
      this.lFeedBack = [];
    },

    buscarFeedBacks() {
      const query = this.getQueryUrlBuscaFeedBacksPorSatisfacao();
      this.resetSelecaoFeedBack();
      this.fetchRecordsFeedBack(query);
    },

    getQueryUrlBuscaFeedBacksPorSatisfacao() {
      return `findBySatisfacao/${this.satisfacaoSelecionado}`;
    },

    resetSelecaoFeedBack() {
      this.lFeedBack = [];
    },
  },
};
</script>