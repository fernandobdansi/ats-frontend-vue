<template>
  <v-data-table :headers="headers" :items="tecnicos" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Tecnicos</v-toolbar-title>
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
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.nome" label="Nome" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.cpf" label="CPF" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.telefone" label="Telefone" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.endereco" label="Endereço" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.login" label="Login" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.senha" label="Senha" outlined></v-text-field>
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
      { text: "Nome", align: "start", value: "nome" },
      { text: "CPF", value: "cpf" },
      { text: "Telefone", value: "telefone" },
      { text: "Endereço", value: "endereco" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    tecnicos: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar Tecnico:" : "Editar Tecnico:";
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
      this.tecnicos = [
        {
          id: 1,
          nome: "Pedro Alberto",
          cpf: "123.123.123-12",
          telefone: "(28) 99953-3872",
          endereco: "Vargem Alta - ES - Brasil",
          login: "josetec",
          senha: "jose123",
          ativo: false
        },
        {
          id: 2,
          nome: "Marcia Francisca",
          cpf: "123.123.123-13",
          telefone: "(28) 99953-6345",
          endereco: "Vargem Alta - ES - Brasil",
          login: "mariatec",
          senha: "maria123",
          ativo: true
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.tecnicos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.tecnicos.indexOf(item);
      confirm("Você tem certeza que deseja apagar este item?") &&
        this.tecnicos.splice(index, 1);
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
        Object.assign(this.tecnicos[this.editedIndex], this.editedItem);
      } else {
        this.tecnicos.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>