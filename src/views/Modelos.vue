<template>
  <v-data-table :headers="headers" :items="modelos" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Modelos</v-toolbar-title>
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
                      :items="marcas"
                      item-text="marca"
                      label="Marcas"
                      v-model="editedItem.marca"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.modelo" label="Modelo" outlined></v-text-field>
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
      { text: "Modelo", align: "start", value: "modelo" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    modelos: [],
    marcas: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar Modelo:" : "Editar Modelo:";
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
      (this.marcas = [
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
      ]),
        (this.modelos = [
          {
            id: 1,
            marca: "LG",
            modelo: "LG-K10"
          },
          {
            id: 2,
            marca: "Motorola",
            modelo: "Moto G6"
          },
          {
            id: 3,
            marca: "Xiaomi",
            modelo: "Note 8"
          },
          {
            id: 4,
            marca: "Apple",
            modelo: "11 Max"
          },
          {
            id: 5,
            marca: "Samsung",
            modelo: "S9 Plus"
          },
          {
            id: 6,
            marca: "Nokia",
            modelo: "B360"
          }
        ]);
    },

    editItem(item) {
      this.editedIndex = this.modelos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.modelos.indexOf(item);
      confirm("Você tem certeza que deseja apagar este item?") &&
        this.modelos.splice(index, 1);
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
        Object.assign(this.modelos[this.editedIndex], this.editedItem);
      } else {
        this.modelos.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>