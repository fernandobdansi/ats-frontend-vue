<template>
  <v-data-table :headers="headers" :items="lCliente" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Clientes</v-toolbar-title>
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
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.nome"
                        label="Nome"
                        outlined
                        required
                        :counter="200"
                        :rules="clienteRulesNomeEndereco"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-mask="{mask:'###.###.###-##'}"
                        v-model="editedItem.cpf"
                        label="CPF"
                        outlined
                        required
                        :rules="clienteRulesCpf"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-mask="{mask:'(##) ####-####'}"
                        v-model="editedItem.telefone"
                        label="Telefone"
                        outlined
                        required
                        :rules="clienteRulesTelefone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.endereco"
                        label="Endereço"
                        outlined
                        required
                        :counter="200"
                        :rules="clienteRulesNomeEndereco"
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
import ClienteService from "../service/domain/ClienteService";
import { mask } from "@titou10/v-mask";

const service = ClienteService.build();

const textos = {
  novo: "Novo Cliente",
  edicao: "Edição de Cliente",
  exclusao: "Deseja mesmo remover este Cliente?"
};

export default {
  name: "lCliente",
  components: {},
  directives: { mask },

  data: () => ({
    dialog: false,
    dialogExcluir: false,

    valid: true,
    clienteRulesNomeEndereco: [
      v => !!v || "Preenchimento Necessário",
      v =>
        (v && v.length <= 200 && v.length >= 10) ||
        "O campo deve ter pelo menos 10 e no maximo 200 letras"
    ],
    clienteRulesCpf: [
      v => !!v || "Preenchimento Necessário",
      v =>
        (v && v.length <= 14 && v.length >= 14) || "O campo deve ter 11 digitos"
    ],
    clienteRulesTelefone: [
      v => !!v || "Preenchimento Necessário",
      v =>
        (v && v.length <= 14 && v.length >= 14) || "O campo deve ter 10 digitos"
    ],
    headers: [
      { text: "ID", value: "id" },
      { text: "Nome", align: "start", value: "nome" },
      { text: "CPF", value: "cpf" },
      { text: "Telefone", value: "telefone" },
      { text: "Endereço", value: "endereco" },
      { text: "Ações", align: "end", value: "actions", sortable: false }
    ],
    lCliente: [],
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
  },

  methods: {
    fetchRecords() {
      service.search({}).then(this.fetchRecodsSuccess);
    },

    fetchRecodsSuccess(response) {
      if (Array.isArray(response.rows)) {
        this.lCliente = response.rows;
        return;
      }
      this.lCliente = [];
    },

    editItem(item) {
      this.editedIndex = this.lCliente.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.lCliente.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogExcluir = true;
    },

    deleteItemComfirm() {
      //const index = this.lCliente.indexOf(this.editedItem);
      service.destroy(this.editedItem).then(this.lCliente.splice(this.editedIndex, 1));
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
            Object.assign(this.lCliente[this.editedIndex], this.editedItem)
          );
      } else {
        service
          .create(this.editedItem)
          .then(response => this.lCliente.push(response));
      }
      this.close();
    }
  }
};
</script>