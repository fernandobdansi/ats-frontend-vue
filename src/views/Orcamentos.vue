<template>
  <v-data-table :headers="headers" :items="lOrcamento" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Orçamento</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Novo Item</v-btn>
          </template>
          <v-card>
            <v-form ref="form" v-model="valid">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-combobox
                        :items="lCliente"
                        item-text="nome"
                        label="Cliente"
                        v-model="clienteSelecionado"
                        @change="buscarDispositivos"
                        outlined
                        required
                        :rules="OrcamentoRulesStatusOrcamentoTecnicoCliente"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-combobox
                        :items="lDispositivo"
                        item-text="numSerie"
                        label="Dispositivo"
                        v-model="editedItem.dispositivo"
                        outlined
                        required
                        :rules="OrcamentoRulesStatusOrcamentoTecnicoCliente"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.descricaoProblema"
                        label="Descrição"
                        outlined
                        required
                        :counter="150"
                        :rules="modeloRulesDescricao"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-data-table
                        :headers="headersItens"
                        :items="lOrcamentoServicosItem"
                        class="elevation-1"
                      >
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>Serviços</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog2" max-width="800px">
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="primary"
                                  dark
                                  class="mb-2"
                                  v-bind="attrs"
                                  v-on="on"
                                >Novo Item</v-btn>
                              </template>
                              <v-card>
                                <v-form ref="form" v-model="valid2">
                                  <v-card-title>
                                    <span class="headline">{{ formTitle2 }}</span>
                                  </v-card-title>

                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-combobox
                                            :items="lServico"
                                            item-text="descricao"
                                            label="Serviços"
                                            v-model="editedItem2.servicos"
                                            outlined
                                            required
                                            :rules="OrcamentoRulesStatusOrcamentoTecnicoCliente"
                                          ></v-combobox>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field
                                            v-model="editedItem2.valor"
                                            v-mask="{mask:'#######################'}"
                                            label="Valor"
                                            prefix="R$"
                                            outlined
                                            required
                                            :rules="OrcamentoRulesValorItem"
                                          ></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close2">Cancelar</v-btn>
                                    <v-btn
                                      :disabled="!valid2"
                                      color="blue darken-1"
                                      text
                                      @click="save2"
                                    >Salvar</v-btn>
                                  </v-card-actions>
                                </v-form>
                              </v-card>
                            </v-dialog>
                          </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                          <v-icon small @click="deleteItem2(item)">mdi-delete</v-icon>
                        </template>
                      </v-data-table>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-combobox
                        :items="lTecnico"
                        item-text="nome"
                        label="Tecnico"
                        v-model="editedItem.tecnico"
                        outlined
                        required
                        :rules="OrcamentoRulesStatusOrcamentoTecnicoCliente"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.valorTotal"
                        label="Valor Total"
                        prefix="R$"
                        outlined
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn :disabled="!valid" color="blue darken-1" text @click="save">Salvar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogExcluir" max-width="430px">
          <v-card>
            <v-card-title class="headline">Deseja mesmo remover este Item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeExcluir">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemComfirm">Sim</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Resetar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import OrcamentoService from "../service/domain/OrcamentoService";
const sOrcamento = OrcamentoService.build();

import DispositivoService from "../service/domain/DispositivoService";
const sDispositivo = DispositivoService.build();

import TecnicoService from "../service/domain/TecnicoService";
const sTecnico = TecnicoService.build();

import ServicoService from "../service/domain/ServicoService";
const sServico = ServicoService.build();

import ClienteService from "../service/domain/ClienteService";
const sCliente = ClienteService.build();

import { mask } from "@titou10/v-mask";

const textos = {
  novo: "Nova Orcamento",
  edicao: "Edição de Orcamento",
  novo2: "Novo Servico",
  edicao2: "Edição de Servico",
  exclusao: "Deseja mesmo remover este Orcamento?",
};

export default {
  name: "lOrcamento",
  components: {},
  directives: { mask },

  data: () => ({
    dialog: false,
    dialog2: false,
    dialogExcluir: false,
    totalvalor: 0,

    valid: true,
    valid2: true,
    OrcamentoRulesStatusOrcamentoTecnicoCliente: [
      (v) => !!v || "Seleção Necessária",
    ],
    OrcamentoRulesNumSerie: [
      (v) => !!v || "Preenchimento Necessário",
      (v) =>
        (v && v.length <= 9 && v.length >= 5) ||
        "O campo deve ter pelo menos 5 e no maximo 9 letras",
    ],

    OrcamentoRulesValorItem: [
      (v) => !!v || "Preenchimento Necessário",
      (v) =>
        (v && v.length <= 100 && v.length >= 2) ||
        "O campo deve ter pelo menos 2 e no maximo 100 Digitos",
    ],
    modeloRulesDescricao: [
      (v) => !!v || "Preenchimento Necessário",
      (v) =>
        (v && v.length <= 150 && v.length >= 10) ||
        "O campo deve ter pelo menos 10 e no maximo 150 letras",
    ],
    headers: [
      { text: "ID", value: "id" },
      { text: "Cliente", value: "dispositivo.cliente.nome" },
      { text: "Dispositivo", value: "dispositivo.numSerie" },
      { text: "Tecnico", value: "tecnico.nome" },
      { text: "Valor Total", value: "valorTotal" },
      { text: "Ações", align: "end", value: "actions", sortable: false },
    ],

    headersItens: [
      { text: "Descrição", value: "servicos.descricao" },
      { text: "Valor", value: "valor" },
      { text: "Ações", align: "end", value: "actions", sortable: false },
    ],

    lDispositivo: [],
    lOrcamento: [],
    lCliente: [],
    lServico: [],
    lTecnico: [],
    lOrcamentoServicosItem: [],

    clienteSelecionado: null,

    editedIndex: -1,
    editedItem: {},
    defaultItem: {},

    editedIndex2: -1,
    editedItem2: {},
    defaultItem2: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? textos.novo : textos.edicao;
    },
    formTitle2() {
      return this.editedIndex2 === -1 ? textos.novo2 : textos.edicao2;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogExcluir(val) {
      val || this.closeExcluir();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.fetchRecordsOrcamento();
      this.fetchRecordsCliente();
      this.fetchRecordsTecnico();
      this.fetchRecordsServico();
    },

    fetchRecordsOrcamento() {
      sOrcamento.search({}).then(this.fetchRecodsSuccessOrcamento);
    },

    fetchRecordsDispositivo(query) {
      sDispositivo.search(query).then(this.fetchRecodsSuccessDispositivo);
    },

    fetchRecordsTecnico() {
      sTecnico.search({}).then(this.fetchRecodsSuccessTecnico);
    },

    fetchRecordsServico() {
      sServico.search({}).then(this.fetchRecodsSuccessServico);
    },

    fetchRecordsCliente() {
      sCliente.search({}).then(this.fetchRecodsSuccessCliente);
    },

    fetchRecodsSuccessOrcamento(response) {
      if (Array.isArray(response.rows)) {
        this.lOrcamento = response.rows;
        return;
      }
      this.lOrcamento = [];
    },

    fetchRecodsSuccessDispositivo(response) {
      if (Array.isArray(response.rows)) {
        this.lDispositivo = response.rows;
        return;
      }
      this.lDispositivo = [];
    },

    fetchRecodsSuccessTecnico(response) {
      if (Array.isArray(response.rows)) {
        this.lTecnico = response.rows;
        return;
      }
      this.lTecnico = [];
    },

    fetchRecodsSuccessServico(response) {
      if (Array.isArray(response.rows)) {
        this.lServico = response.rows;
        return;
      }
      this.lServico = [];
    },

    fetchRecodsSuccessCliente(response) {
      if (Array.isArray(response.rows)) {
        this.lCliente = response.rows;
        return;
      }
      this.lCliente = [];
    },

    buscarDispositivos() {
      const query = this.getQueryUrlBuscaDispositivosPorCliente();
      this.resetSelecaoDispositivo();
      this.fetchRecordsDispositivo(query);
    },

    getQueryUrlBuscaDispositivosPorCliente() {
      return `findByCliente/${this.clienteSelecionado.id}`;
    },

    resetSelecaoDispositivo() {
      this.lDispositivo = [];
      this.editedItem.dispositivo = null;
    },

    editItem(item) {
      this.editedIndex = this.lOrcamento.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.clienteSelecionado = null;
      this.lOrcamentoServicosItem = this.editedItem.orcamentoServicoItem;

      Object.entries(this.editedItem).forEach(([key, value]) => {
        if (key === "dispositivo") {
          this.clienteSelecionado = value.cliente;
        }
      });

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.lOrcamento.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogExcluir = true;
    },

    deleteItem2(item) {
      const index = this.lOrcamentoServicosItem.indexOf(item);
      this.lOrcamentoServicosItem.splice(index, 1);
      this.totalvalor = 0;
      this.lOrcamentoServicosItem.forEach((element) => {
        this.totalvalor =
          parseFloat(this.totalvalor) + parseFloat(element.valor);
      });
      this.editedItem.valorTotal = this.totalvalor;
    },

    deleteItemComfirm() {
      //const index = this.lOrcamento.indexOf(this.editedItem);
      sOrcamento
        .destroy(this.editedItem)
        .then(this.lOrcamento.splice(this.editedIndex, 1));
      this.closeExcluir();
    },

    closeExcluir() {
      this.dialogExcluir = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.lOrcamentoServicosItem = [];
      });
    },

    close2() {
      this.dialog2 = false;
      this.$nextTick(() => {
        this.editedItem2 = Object.assign({}, this.defaultItem2);
        this.editedIndex2 = -1;
      });
    },

    save2() {
      if (this.editedIndex2 > -1) {
        Object.assign(
          this.lOrcamentoServicosItem[this.editedIndex2],
          this.editedItem2
        );
      } else {
        this.lOrcamentoServicosItem.push(this.editedItem2);
      }
      this.totalvalor = 0;
      this.lOrcamentoServicosItem.forEach((element) => {
        this.totalvalor =
          parseFloat(this.totalvalor) + parseFloat(element.valor);
      });
      this.editedItem.valorTotal = this.totalvalor;
      this.close2();
    },

    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        sOrcamento
          .update(this.editedItem)
          .then(
            Object.assign(this.lOrcamento[this.editedIndex], this.editedItem)
          );
      } else {
        this.editedItem.orcamentoServicoItem = this.lOrcamentoServicosItem;
        sOrcamento
          .create(this.editedItem)
          .then((response) => this.lOrcamento.push(response));
      }
      this.close();
    },
  },
};
</script>