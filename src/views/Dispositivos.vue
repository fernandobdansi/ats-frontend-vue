<template>
  <v-data-table :headers="headers" :items="lDispositivo" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Dispositivos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Novo Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-combobox
                      :items="lMarca"
                      item-text="marca.nomeMarca"
                      label="Marcas"
                      v-model="editedItem.modelo"
                      outlined
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-combobox
                      :items="lModelo"
                      item-text="nomeModelo"
                      label="Modelo"
                      v-model="editedItem.modelo"
                      outlined
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-combobox
                      :items="lCliente"
                      item-text="nome"
                      label="Cliente"
                      v-model="editedItem.cliente"
                      outlined
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.numSerie" label="Número de Série" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.descricao" label="Descrição" outlined></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
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
    this.fetchRecordsDispositivo();
    this.fetchRecordsMarca();
    this.fetchRecordsModelo();
    this.fetchRecordsCliente();
  },

  methods: {
    fetchRecordsDispositivo() {
      sDispositivo.search({}).then(this.fetchRecodsSuccessDispositivo);
    },

    fetchRecordsMarca() {
      sMarca.search({}).then(this.fetchRecodsSuccessMarca);
    },

    fetchRecordsModelo() {
      sModelo.search({}).then(this.fetchRecodsSuccessModelo);
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
      this.editedIndex = this.lModelo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.lModelo.indexOf(item);
      if (confirm(textos.exclusao)) {
        sDispositivo.destroy(item).then(this.lModelo.splice(index, 1));
      }
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
          .then(Object.assign(this.lModelo[this.editedIndex], this.editedItem));
      } else {
        sDispositivo
          .create(this.editedItem)
          .then(response => this.lModelo.push(response));
      }
      this.close();
    }
  }
};
</script>