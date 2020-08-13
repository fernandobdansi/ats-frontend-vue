<template>
  <v-data-table :headers="headers" :items="orcamentos" order-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de Orçamentos</v-toolbar-title>
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
                      :items="clientes"
                      item-text="nome"
                      label="Cliente"
                      v-model="editedItem.cliente"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="dispositivos"
                      item-text="dispositivo"
                      label="Dispositivos"
                      v-model="editedItem.dispositivo"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <TabelaOrdemServicoItem />
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.descricao" label="Descrição" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="tecnicos"
                      item-text="tecnico"
                      label="Tecnico"
                      v-model="editedItem.tecnico"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.valorTotal" label="Valor Total" outlined></v-text-field>
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
import TabelaOrdemServicoItem from "@/components/TabelaOrdemServicoItem.vue";

export default {
  components: {
    TabelaOrdemServicoItem
  },
  data: () => ({
    dialog: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "Cliente", value: "cliente" },
      { text: "Dispositivo", align: "start", value: "dispositivo" },
      { text: "Tecnico", value: "tecnico" },
      { text: "Valor Total", value: "valorTotal" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    orcamentos: [],
    tecnicos: [],
    dispositivos: [],
    clientes: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Cadastrar Orçamento:"
        : "Editar Orçamento:";
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
      (this.orcamentos = [
        {
          id: 1,
          dispositivo: "55648754",
          tecnico: "José Da Costa",
          valorTotal: "150",
          descricao: "Azul",
          cliente: "José da Silva"
        },
        {
          id: 2,
          dispositivo: "6549879",
          tecnico: "José Da Costa",
          valorTotal: "200",
          descricao: "Verde",
          cliente: "Francisco Roberto"
        },
        {
          id: 3,
          dispositivo: "566447",
          tecnico: "José Da Costa",
          valorTotal: "300",
          descricao: "Cinza",
          cliente: "Roberto Miranda"
        },
        {
          id: 4,
          dispositivo: "4567894",
          tecnico: "José Da Costa",
          valorTotal: "500",
          descricao: "Branco",
          cliente: "Maria Lucia"
        }
      ]),
        (this.dispositivos = [
          {
            id: 1,
            dispositivo: "4567894"
          },
          {
            id: 2,
            dispositivo: "566447"
          },
          {
            id: 3,
            dispositivo: "6549879"
          },
          {
            id: 4,
            dispositivo: "22123154"
          },
          {
            id: 5,
            dispositivo: "55648754"
          },
          {
            id: 6,
            dispositivo: "23164978"
          }
        ]),
        (this.tecnicos = [
          {
            id: 1,
            tecnico: "José Da Costa"
          },
          {
            id: 2,
            tecnico: "Matter Zomms"
          },
          {
            id: 3,
            tecnico: "Piter Jack"
          },
          {
            id: 4,
            tecnico: "Steve Dogrs"
          },
          {
            id: 5,
            tecnico: "Alberts Lindebeerg"
          },
          {
            id: 6,
            tecnico: "Jotesr Huberts"
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
      this.editedIndex = this.orcamentos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.orcamentos.indexOf(item);
      confirm("Você tem certeza que deseja apagar este item?") &&
        this.orcamentos.splice(index, 1);
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
        Object.assign(this.orcamentos[this.editedIndex], this.editedItem);
      } else {
        this.orcamentos.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>