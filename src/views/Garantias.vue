<template>
  <v-data-table :headers="headers" :items="lGarantia" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Garantias</v-toolbar-title>
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
                        :items="lOrdem"
                        item-text="id"
                        label="Ordens"
                        v-model="editedItem.ordemDeServico"
                        outlined
                        required
                        :rules="modeloRulesOrdem"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-combobox
                        :items="lStatus"
                        item-text="descricao"
                        label="Status"
                        v-model="editedItem.statusGarantia"
                        outlined
                        required
                        :rules="modeloRulesStatus"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.motivo"
                        label="Motivo"
                        outlined
                        required
                        :counter="150"
                        :rules="modeloRulesMotivo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
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
                            required
                            :counter="10"
                            :rules="modeloRulesData"
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
import GarantiaService from "../service/domain/GarantiaService";
const service = GarantiaService.build();

import OrdemDeServicoService from "../service/domain/OrdemDeServicoService";
const serviceOrdem = OrdemDeServicoService.build();

import StatusGarantiaService from "../service/domain/StatusGarantiaService";
const serviceStatusGarantia = StatusGarantiaService.build();

const textos = {
  novo: "Nova Garantia",
  edicao: "Edição de Garantia",
  exclusao: "Deseja mesmo remover esta Garantia?",
};

export default {
  name: "lGarantia",
  components: {},

  data: () => ({
    dialog: false,
    dialogExcluir: false,
    valid: true,
    modeloRulesOrdem: [(v) => !!v || "Seleção Necessária"],
    modeloRulesStatus: [(v) => !!v || "Seleção Necessária"],
    modeloRulesMotivo: [
      (v) => !!v || "Preenchimento Necessário",
      (v) =>
        (v && v.length <= 150 && v.length >= 5) ||
        "O campo deve ter pelo menos 5 e no maximo 150 letras",
    ],
    modeloRulesData: [
      (v) => !!v || "Preenchimento Necessário",
      (v) =>
        (v && v.length <= 10 && v.length >= 10) ||
        "O campo deve ter pelo menos 10 e no maximo 10 letras",
    ],
    headers: [
      { text: "ID", value: "id" },
      { text: "Ordem De Serviço", value: "ordemDeServico.id" },
      { text: "Motivo", value: "motivo" },
      { text: "Data de Entrada", value: "dataEntrada" },
      { text: "Status", value: "statusGarantia.descricao" },
      { text: "Ações", align: "end", value: "actions", sortable: false },
    ],
    lGarantia: [],
    lOrdem: [],
    lStatus: [],
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
    this.fetchRecords();
    this.fetchRecordsOrdem();
    this.fetchRecordsStatus();
  },

  methods: {
    fetchRecords() {
      service.search({}).then(this.fetchRecodsSuccess);
    },

    fetchRecordsOrdem() {
      serviceOrdem.search({}).then(this.fetchRecodsSuccessOrdem);
    },

    fetchRecordsStatus() {
      serviceStatusGarantia.search({}).then(this.fetchRecodsSuccessStatus);
    },

    fetchRecodsSuccess(response) {
      if (Array.isArray(response.rows)) {
        this.lGarantia = response.rows;
        return;
      }
      this.lGarantia = [];
    },

    fetchRecodsSuccessOrdem(response) {
      if (Array.isArray(response.rows)) {
        this.lOrdem = response.rows;
        return;
      }
      this.lOrdem = [];
    },

    fetchRecodsSuccessStatus(response) {
      if (Array.isArray(response.rows)) {
        this.lStatus = response.rows;
        return;
      }
      this.lStatus = [];
    },

    editItem(item) {
      this.editedIndex = this.lGarantia.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.lGarantia.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogExcluir = true;
    },

    deleteItemComfirm() {
      //const index = this.lGarantia.indexOf(this.editedItem);
      service
        .destroy(this.editedItem)
        .then(this.lGarantia.splice(this.editedIndex, 1));
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
          .then(
            Object.assign(this.lGarantia[this.editedIndex], this.editedItem)
          );
      } else {
        service
          .create(this.editedItem)
          .then((response) => this.lGarantia.push(response));
      }
      this.close();
    },
  },
};
</script>