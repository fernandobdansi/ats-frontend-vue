<template>
  <v-data-table :headers="headers" :items="ordemServicoItem" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Serviços</v-toolbar-title>
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
                    <v-select
                      :items="servicos"
                      item-text="servico"
                      label="Serviços"
                      v-model="editedItem.servico"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.valor" label="Valor" outlined></v-text-field>
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
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "Serviço", align: "start", value: "servico" },
      { text: "Valor", value: "valor" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    ordemServicoItem: [],
    servicos: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar Serviço:" : "Editar Serviço:";
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
      (this.ordemServicoItem = [
        {
          id: 1,
          servico: "Trocar Tela",
          valor: "100"
        },
        {
          id: 2,
          servico: "Trocar Bateria",
          valor: "150"
        },
        {
          id: 3,
          servico: "Formatar SO",
          valor: "20"
        },
        {
          id: 4,
          servico: "Limpeza Geral",
          valor: "20"
        }
      ]),
        (this.servicos = [
          {
            id: 1,
            servico: "Trocar Bateria"
          },
          {
            id: 2,
            servico: "Limpeza Geral"
          },
          {
            id: 3,
            servico: "Trocar Tela"
          },
          {
            id: 4,
            servico: "Formatar SO"
          },
        ]);
    },

    editItem(item) {
      this.editedIndex = this.ordemServicoItem.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.ordemServicoItem.indexOf(item);
      confirm("Você tem certeza que deseja apagar este item?") &&
        this.ordemServicoItem.splice(index, 1);
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
        Object.assign(this.ordemServicoItem[this.editedIndex], this.editedItem);
      } else {
        this.ordemServicoItem.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>