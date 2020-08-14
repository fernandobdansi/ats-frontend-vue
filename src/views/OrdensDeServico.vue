<template>
  <v-data-table :headers="headers" :items="lOrdem" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Ordens De Servico</v-toolbar-title>
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
                        :rules="OrdemRulesStatusOrdemTecnicoCliente"
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
                        :rules="OrdemRulesStatusOrdemTecnicoCliente"
                      ></v-combobox>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-combobox
                        :items="lTecnico"
                        item-text="nome"
                        label="Tecnico"
                        v-model="editedItem.tecnico"
                        outlined
                        required
                        :rules="OrdemRulesStatusOrdemTecnicoCliente"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-combobox
                        :items="lStatusOrdem"
                        item-text="descricao"
                        label="Status"
                        v-model="editedItem.statusOrdemDeServico"
                        outlined
                        required
                        :rules="OrdemRulesStatusOrdemTecnicoCliente"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-menu
                        ref="menuEntrada"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.dataEntrada"
                            label="Data de Entrada"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.dataEntrada" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menuEntrada = false">Cancelar</v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menuEntrada.save(dataEntrada)"
                          >OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-menu
                        ref="menuSaida"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.dataSaida"
                            label="Data de Saida"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.dataSaida" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menuSaida = false">Cancelar</v-btn>
                          <v-btn text color="primary" @click="$refs.menuSaida.save(dataSaida)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedItem.descricaoProblema"
                        label="Descrição"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field v-model="editedItem.valorTotal" label="Valor Total" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="lPagamento"
                        item-text="pagamento"
                        label="Pago?"
                        v-model="editedItem.pagamento"
                        outlined
                        required
                        :rules="OrdemRulesStatusOrdemTecnicoCliente"
                      ></v-select>
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
import OrdemDeServicoService from "../service/domain/OrdemDeServicoService";
const sOrdem = OrdemDeServicoService.build();

import DispositivoService from "../service/domain/DispositivoService";
const sDispositivo = DispositivoService.build();

import TecnicoService from "../service/domain/TecnicoService";
const sTecnico = TecnicoService.build();

import StatusOrdemService from "../service/domain/StatusOrdemService";
const sStatusOrdem = StatusOrdemService.build();

import ClienteService from "../service/domain/ClienteService";
const sCliente = ClienteService.build();

const textos = {
  novo: "Nova Ordem",
  edicao: "Edição de Ordem",
  exclusao: "Deseja mesmo remover esta Ordem?",
};

export default {
  name: "lOrdem",
  components: {},

  data: () => ({
    dialog: false,
    dialogExcluir: false,

    valid: true,
    OrdemRulesStatusOrdemTecnicoCliente: [(v) => !!v || "Seleção Necessária"],
    OrdemRulesNumSerie: [
      (v) => !!v || "Preenchimento Necessário",
      (v) =>
        (v && v.length <= 9 && v.length >= 5) ||
        "O campo deve ter pelo menos 5 e no maximo 9 letras",
    ],
    OrdemRulesDescricao: [
      (v) => !!v || "Preenchimento Necessário",
      (v) =>
        (v && v.length <= 150 && v.length >= 5) ||
        "O campo deve ter pelo menos 5 e no maximo 150 letras",
    ],
    headers: [
      { text: "ID", value: "id" },
      { text: "Cliente", value: "cliente.nome" },
      { text: "Dispositivo", value: "dispositivo.numSerie" },
      { text: "Tecnico", value: "tecnico.nome" },
      { text: "Status", value: "statusOrdemDeServico.descricao" },
      { text: "Pago?", value: "pagamento" },
      { text: "Valor Total", value: "valorTotal" },
      { text: "Ações", align: "end", value: "actions", sortable: false },
    ],

    lDispositivo: [],
    lOrdem: [],
    lCliente: [],
    lTecnico: [],
    lStatusOrdem: [],
    lPagamento: [],

    clienteSelecionado: null,

    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? textos.novo : textos.edicao;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.fetchRecordsOrdem();
      this.fetchRecordsStatusOrdem();
      this.fetchRecordsCliente();
      this.fetchRecordsTecnico();
      this.lPagamento = [
        {
          pagamento: "Sim",
        },
        {
          pagamento: "Nao",
        },
      ];
    },

    fetchRecordsOrdem() {
      sOrdem.search({}).then(this.fetchRecodsSuccessOrdem);
    },

    fetchRecordsDispositivo(query) {
      sDispositivo.search(query).then(this.fetchRecodsSuccessDispositivo);
    },

    fetchRecordsStatusOrdem() {
      sStatusOrdem.search({}).then(this.fetchRecodsSuccessStatusOrdem);
    },

    fetchRecordsTecnico() {
      sTecnico.search({}).then(this.fetchRecodsSuccessTecnico);
    },

    fetchRecordsCliente() {
      sCliente.search({}).then(this.fetchRecodsSuccessCliente);
    },

    fetchRecodsSuccessOrdem(response) {
      if (Array.isArray(response.rows)) {
        this.lOrdem = response.rows;
        return;
      }
      this.lOrdem = [];
    },

    fetchRecodsSuccessDispositivo(response) {
      if (Array.isArray(response.rows)) {
        this.lDispositivo = response.rows;
        return;
      }
      this.lDispositivo = [];
    },

    fetchRecodsSuccessStatusOrdem(response) {
      if (Array.isArray(response.rows)) {
        this.lStatusOrdem = response.rows;
        return;
      }
      this.lStatusOrdem = [];
    },

    fetchRecodsSuccessTecnico(response) {
      if (Array.isArray(response.rows)) {
        this.lTecnico = response.rows;
        return;
      }
      this.lTecnico = [];
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
      this.editedIndex = this.lOrdem.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.clienteSelecionado = null;

      Object.entries(this.editedItem).forEach(([key, value]) => {
        if (key === "dispositivo") {
          this.clienteSelecionado = value.cliente;
        }
      });

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.lOrdem.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogExcluir = true;
    },

    deleteItemComfirm() {
      //const index = this.lOrdem.indexOf(this.editedItem);
      sOrdem
        .destroy(this.editedItem)
        .then(this.lOrdem.splice(this.editedIndex, 1));
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
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        sOrdem
          .update(this.editedItem)
          .then(Object.assign(this.lOrdem[this.editedIndex], this.editedItem));
      } else {
        sOrdem
          .create(this.editedItem)
          .then((response) => this.lOrdem.push(response));
      }
      this.close();
    },
  },
};
</script>