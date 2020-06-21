<template>
  <v-data-table :headers="headers" :items="garantias" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Garantias</v-toolbar-title>
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
                    <v-text-field
                      v-model="editedItem.itemservico"
                      label="Cod Item Serviço"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="status"
                      item-text="nome"
                      label="Status"
                      v-model="editedItem.status"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.motivo" label="Motivo" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
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
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.dataEntrada" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menuEntrada = false">Cancelar</v-btn>
                        <v-btn text color="primary" @click="$refs.menuEntrada.save(dataEntrada)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-menu
                      ref="menuSaida"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.dataSaida"
                          label="Data de Saida"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.dataSaida" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menuSaida = false">Cancelar</v-btn>
                        <v-btn text color="primary" @click="$refs.menuSaida.save(dataSaida)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
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
      { text: "Item Serviço", align: "start", value: "itemservico" },
      { text: "Status", align: "start", value: "status" },
      { text: "Data de Entrada", align: "start", value: "dataEntrada" },
      { text: "Data de Saida", align: "start", value: "dataSaida" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    garantias: [],
    status: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Cadastrar Garantia:"
        : "Editar Garantia:";
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
      (this.status = [
        {
          id: 1,
          nome: "Aguardando"
        },
        {
          id: 2,
          nome: "Em Análise"
        },
        {
          id: 3,
          nome: "Finalizado"
        },
        {
          id: 4,
          nome: "Aguardando Aprovação"
        },
        {
          id: 5,
          nome: "Recusado"
        }
      ]),
        (this.garantias = [
          {
            id: 1,
            itemservico: "456789",
            motivo: "Sem Carga",
            status: "Finalizado",
            dataEntrada: "2020-06-01",
            dataSaida: "2020-06-02"
          },
          {
            id: 2,
            itemservico: "987456",
            motivo: "Tela Descolada",
            status: "Recusado",
            dataEntrada: "2020-05-15",
            dataSaida: "2020-06-02"
          },
          {
            id: 3,
            itemservico: "445577",
            motivo: "Não Liga",
            status: "Aguardando",
            dataEntrada: "2020-04-01",
            dataSaida: ""
          },
          {
            id: 4,
            itemservico: "456789",
            motivo: "Travando",
            status: "Finalizado",
            dataEntrada: "2020-05-01",
            dataSaida: "2020-05-02"
          }
        ]);
    },

    editItem(item) {
      this.editedIndex = this.garantias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.garantias.indexOf(item);
      confirm("Você tem certeza que deseja apagar este item?") &&
        this.garantias.splice(index, 1);
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
        Object.assign(this.garantias[this.editedIndex], this.editedItem);
      } else {
        this.garantias.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>