<template>
  <v-data-table :headers="headers" :items="lDispositivo" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Dispositivos</v-toolbar-title>
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
                        :items="lMarca"
                        item-text="nomeMarca"
                        label="Marcas"
                        v-model="marcaSelecionada"
                        @change="buscarModelos"
                        outlined
                        required
                        :rules="dispositivoRulesMarcaModeloCliente"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-combobox
                        :items="lModelo"
                        item-text="nomeModelo"
                        label="Modelo"
                        v-model="editedItem.modelo"
                        outlined
                        required
                        :rules="dispositivoRulesMarcaModeloCliente"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-combobox
                        :items="lCliente"
                        item-text="nome"
                        label="Cliente"
                        v-model="editedItem.cliente"
                        outlined
                        required
                        :rules="dispositivoRulesMarcaModeloCliente"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.numSerie"
                        label="Número de Série"
                        outlined
                        required
                        :counter="9"
                        :rules="dispositivoRulesNumSerie"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.descricao"
                        label="Descrição"
                        outlined
                        required
                        :counter="150"
                        :rules="dispositivoRulesDescricao"
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
import DispositivoService from "../service/domain/DispositivoService";
const sDispositivo = DispositivoService.build();

import ModeloService from "../service/domain/ModeloService";
const sModelo = ModeloService.build();

import MarcaService from "../service/domain/MarcaService";
const sMarca = MarcaService.build();

import ClienteService from "../service/domain/ClienteService";
const sCliente = ClienteService.build();

const textos = {
  novo: "Novo Dispositivo",
  edicao: "Edição de Dispositivo",
  exclusao: "Deseja mesmo remover este Dispositivo?"
};

export default {
  name: "lDispositivo",
  components: {},

  data: () => ({
    dialog: false,
    dialogExcluir: false,

    valid: true,
    dispositivoRulesMarcaModeloCliente: [v => !!v || "Seleção Necessária"],
    dispositivoRulesNumSerie: [
      v => !!v || "Preenchimento Necessário",
      v =>
        (v && v.length <= 9 && v.length >= 5) ||
        "O campo deve ter pelo menos 5 e no maximo 9 letras"
    ],
    dispositivoRulesDescricao: [
      v => !!v || "Preenchimento Necessário",
      v =>
        (v && v.length <= 150 && v.length >= 5) ||
        "O campo deve ter pelo menos 5 e no maximo 150 letras"
    ],
    headers: [
      { text: "ID", value: "id" },
      { text: "Nome", value: "modelo.nomeModelo" },
      { text: "Marca", value: "modelo.marca.nomeMarca" },
      { text: "Num Serie", value: "numSerie" },
      { text: "Descrição", value: "descricao" },
      { text: "Cliente", value: "cliente.nome" },
      { text: "Ações", align: "end", value: "actions", sortable: false }
    ],

    lDispositivo: [],
    lCliente: [],
    lModelo: [],
    lMarca: [],

    marcaSelecionada: null,

    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? textos.novo : textos.edicao;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.fetchRecordsDispositivo();
      this.fetchRecordsMarca();
      this.fetchRecordsCliente();
    },

    fetchRecordsDispositivo() {
      sDispositivo.search({}).then(this.fetchRecodsSuccessDispositivo);
    },

    fetchRecordsMarca() {
      sMarca.search({}).then(this.fetchRecodsSuccessMarca);
    },

    fetchRecordsModelo(query) {
      sModelo.search(query).then(this.fetchRecodsSuccessModelo);
    },

    fetchRecordsCliente() {
      sCliente.search({}).then(this.fetchRecodsSuccessCliente);
    },

    fetchRecodsSuccessDispositivo(response) {
      if (Array.isArray(response.rows)) {
        this.lDispositivo = response.rows;
        return;
      }
      this.lDispositivo = [];
    },

    fetchRecodsSuccessMarca(response) {
      if (Array.isArray(response.rows)) {
        this.lMarca = response.rows;
        return;
      }
      this.lMarca = [];
    },

    fetchRecodsSuccessModelo(response) {
      if (Array.isArray(response.rows)) {
        this.lModelo = response.rows;
        return;
      }
      this.lModelo = [];
    },

    fetchRecodsSuccessCliente(response) {
      if (Array.isArray(response.rows)) {
        this.lCliente = response.rows;
        return;
      }
      this.lCliente = [];
    },

    buscarModelos() {
      const query = this.getQueryUrlBuscaModelosPorMarca();
      this.resetSelecaoModelo();
      this.fetchRecordsModelo(query);
    },

    getQueryUrlBuscaModelosPorMarca() {
      return `findByMarca/${this.marcaSelecionada.id}`;
    },

    resetSelecaoModelo() {
      this.lModelo = [];
      this.editedItem.modelo = null;
    },

    editItem(item) {
      this.editedIndex = this.lDispositivo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.marcaSelecionada = null;

      Object.entries(this.editedItem).forEach(([key, value]) => {
        if (key === "modelo") {
          this.marcaSelecionada = value.marca;
        }
      });

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.lDispositivo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogExcluir = true;
    },

    deleteItemComfirm() {
      //const index = this.lDispositivo.indexOf(this.editedItem);
      sDispositivo.destroy(this.editedItem).then(this.lDispositivo.splice(this.editedIndex, 1));
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
        sDispositivo
          .update(this.editedItem)
          .then(
            Object.assign(this.lDispositivo[this.editedIndex], this.editedItem)
          );
      } else {
        sDispositivo
          .create(this.editedItem)
          .then(response => this.lDispositivo.push(response));
      }
      this.close();
    }
  }
};
</script>