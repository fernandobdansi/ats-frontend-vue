<template>
  <v-data-table :headers="headers" :items="dispositivos" sort-by="calories" class="elevation-1">
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
                    <v-select
                      :items="marcas"
                      item-text="marca"
                      label="Marcas"
                      v-model="editedItem.marca"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="modelos"
                      item-text="modelo"
                      label="Modelo"
                      v-model="editedItem.modelo"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-select
                      :items="clientes"
                      item-text="nome"
                      label="Cliente"
                      v-model="editedItem.cliente"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.num_serie" label="Número de Série" outlined></v-text-field>
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
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "Marca", align: "start", value: "marca" },
      { text: "Modelo", value: "modelo" },
      { text: "Num Série", value: "num_serie" },
      { text: "Descrição", value: "descricao" },
      { text: "Cliente", value: "cliente" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    dispositivos: [],
    modelos: [],
    marcas: [],
    clientes: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Cadastrar Dispositivo:"
        : "Editar Dispositivo:";
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
      (this.dispositivos = [
        {
          id: 1,
          marca: "LG",
          modelo: "K-10",
          num_serie: "123456",
          descricao: "Azul",
          cliente: "José da Silva"
        },
        {
          id: 2,
          marca: "Motorola",
          modelo: "Moto G6",
          num_serie: "456789",
          descricao: "Verde",
          cliente: "Francisco Roberto"
        },
        {
          id: 3,
          marca: "Nokia",
          modelo: "B360",
          num_serie: "77456789",
          descricao: "Cinza",
          cliente: "Roberto Miranda"
        },
        {
          id: 4,
          marca: "Apple",
          modelo: "11 Max",
          num_serie: "4561231",
          descricao: "Branco",
          cliente: "Maria Lucia"
        }
      ]),
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
        ]),
        (this.clientes = [
          {
            id: 1,
            nome: "José da Silva"
          },
          {
            id: 2,
            nome: "Francisco Roberto"
          },
          {
            id: 3,
            nome: "Roberto Miranda"
          },
          {
            id: 4,
            nome: "Maria Lucia"
          },
          {
            id: 5,
            nome: "Ana Luzia"
          },
          {
            id: 6,
            nome: "Fernando Bueno"
          }
        ]);
    },

    editItem(item) {
      this.editedIndex = this.dispositivos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.dispositivos.indexOf(item);
      confirm("Você tem certeza que deseja apagar este item?") &&
        this.dispositivos.splice(index, 1);
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
        Object.assign(this.dispositivos[this.editedIndex], this.editedItem);
      } else {
        this.dispositivos.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>