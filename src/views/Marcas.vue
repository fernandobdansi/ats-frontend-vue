<template>
  <v-data-table :headers="headers" :items="marcas" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Marcas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
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
                    <v-text-field v-model="editedItem.Marca" label="Marca" outlined></v-text-field>
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
      { text: "Marca", align: "start", value: "marca" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    marcas: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar Marca:" : "Editar Marca:";
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
      this.marcas = [
        {
          id: 1,
          marca: "LG"
        },
        {
          id: 2,
          marca: "Motorola"
        },
        {
          id: 3,
          marca: "Xiaomi"
        },
        {
          id: 4,
          marca: "Apple"
        },
        {
          id: 5,
          marca: "Samsung"
        },
        {
          id: 6,
          marca: "Nokia"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.marcas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.marcas.indexOf(item);
      confirm("Você tem certeza que deseja apagar este item?") &&
        this.marcas.splice(index, 1);
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
        Object.assign(this.marcas[this.editedIndex], this.editedItem);
      } else {
        this.marcas.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>