<template>
  <v-data-table :headers="headers" :items="lFeedback" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de FeedBacks</v-toolbar-title>
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
                        label="Ordems"
                        v-model="editedItem.ordemDeServico"
                        outlined
                        required
                        :rules="modeloRulesOrdem"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="lSatisfacao"
                        item-text="satisfacao"
                        label="Satisfação"
                        v-model="editedItem.satisfacao"
                        outlined
                        required
                        :rules="modeloRulesSatisfacao"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.comentario"
                        label="Comentario"
                        outlined
                        required
                        :counter="100"
                        :rules="modeloRulesComentario"
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
import FeedBackService from "../service/domain/FeedBackService";
const service = FeedBackService.build();

import OrdemDeServicoService from "../service/domain/OrdemDeServicoService";
const serviceOrdem = OrdemDeServicoService.build();

const textos = {
  novo: "Novo FeedBack",
  edicao: "Edição de FeedBack",
  exclusao: "Deseja mesmo remover este FeedBack?",
};

export default {
  name: "lFeedback",
  components: {},

  data: () => ({
    dialog: false,
    dialogExcluir: false,
    valid: true,
    modeloRulesOrdem: [(v) => !!v || "Seleção Necessária"],
    modeloRulesSatisfacao: [(v) => !!v || "Seleção Necessária"],
    modeloRulesComentario: [
      (v) => !!v || "Preenchimento Necessário",
      (v) =>
        (v && v.length <= 100 && v.length >= 5) ||
        "O campo deve ter pelo menos 5 e no maximo 100 letras",
    ],
    headers: [
      { text: "ID", value: "id" },
      { text: "Ordem De Serviço", value: "ordemDeServico.id" },
      { text: "Satisfação", value: "satisfacao" },
      { text: "Comentario", value: "comentario" },
      { text: "Ações", align: "end", value: "actions", sortable: false },
    ],
    lFeedback: [],
    lOrdem: [],
    lSatisfacao: [],
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

    fetchRecords() {
      service.search({}).then(this.fetchRecodsSuccess);
    },

    fetchRecordsOrdem() {
      serviceOrdem.search({}).then(this.fetchRecodsSuccessOrdem);
    },

    fetchRecodsSuccess(response) {
      if (Array.isArray(response.rows)) {
        this.lFeedback = response.rows;
        return;
      }
      this.lFeedback = [];
    },

    fetchRecodsSuccessOrdem(response) {
      if (Array.isArray(response.rows)) {
        this.lOrdem = response.rows;
        return;
      }
      this.lOrdem = [];
    },

    editItem(item) {
      this.editedIndex = this.lFeedback.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.lFeedback.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogExcluir = true;
    },

    deleteItemComfirm() {
      //const index = this.lFeedback.indexOf(this.editedItem);
      service
        .destroy(this.editedItem)
        .then(this.lFeedback.splice(this.editedIndex, 1));
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
            Object.assign(this.lFeedback[this.editedIndex], this.editedItem)
          );
      } else {
        service
          .create(this.editedItem)
          .then((response) => this.lFeedback.push(response));
      }
      this.close();
    },
  },
};
</script>