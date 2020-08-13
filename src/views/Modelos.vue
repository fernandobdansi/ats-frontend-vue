<template>
  <v-data-table :headers="headers" :items="lModelo" order-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Modelos</v-toolbar-title>
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
                        v-model="editedItem.marca"
                        outlined
                        required
                        :rules="modeloRulesMarca"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.nomeModelo"
                        label="Modelo"
                        outlined
                        required
                        :counter="20"
                        :rules="modeloRulesNome"
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
import ModeloService from "../service/domain/ModeloService";
const service = ModeloService.build();

import MarcaService from "../service/domain/MarcaService";
const serviceMarca = MarcaService.build();

const textos = {
  novo: "Novo Modelo",
  edicao: "Edição de Modelo",
  exclusao: "Deseja mesmo remover este Modelo?"
};

export default {
  name: "lModelo",
  components: {},

  data: () => ({
    dialog: false,
    dialogExcluir: false,
    valid: true,
    modeloRulesMarca: [v => !!v || "Seleção Necessária"],
    modeloRulesNome: [
      v => !!v || "Preenchimento Necessário",
      v =>
        (v && v.length <= 20 && v.length >= 3) ||
        "O campo deve ter pelo menos 3 e no maximo 20 letras"
    ],
    headers: [
      { text: "ID", value: "id" },
      { text: "Nome", value: "nomeModelo" },
      { text: "Marca", value: "marca.nomeMarca" },
      { text: "Ações", align: "end", value: "actions", sortable: false }
    ],
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
    this.fetchRecords();
    this.fetchRecordsMarca();
  },

  methods: {
    fetchRecords() {
      service.search({}).then(this.fetchRecodsSuccess);
    },

    fetchRecordsMarca() {
      serviceMarca.search({}).then(this.fetchRecodsSuccessMarca);
    },

    fetchRecodsSuccess(response) {
      if (Array.isArray(response.rows)) {
        this.lModelo = response.rows;
        return;
      }
      this.lModelo = [];
    },

    fetchRecodsSuccessMarca(response) {
      if (Array.isArray(response.rows)) {
        this.lMarca = response.rows;
        return;
      }
      this.lMarca = [];
    },

    editItem(item) {
      this.editedIndex = this.lModelo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.lModelo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogExcluir = true;
    },

    deleteItemComfirm() {
      //const index = this.lModelo.indexOf(this.editedItem);
      service.destroy(this.editedItem).then(this.lModelo.splice(this.editedIndex, 1));
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
        service
          .update(this.editedItem)
          .then(Object.assign(this.lModelo[this.editedIndex], this.editedItem));
      } else {
        service
          .create(this.editedItem)
          .then(response => this.lModelo.push(response));
      }
      this.close();
    }
  }
};
</script>