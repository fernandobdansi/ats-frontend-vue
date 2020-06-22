<template>
  <v-data-table :headers="headers" :items="feedbacks" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cadastro de FeedBacks</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.ordem" label="Ordem De Serviço" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.comentario" label="Comentário" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-select
                      :items="satisfacaos"
                      item-text="nome"
                      label="Satisfação"
                      v-model="editedItem.satisfacao"
                      outlined
                    ></v-select>
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
      { text: "Ordem de Serviço", align: "start", value: "ordem" },
      { text: "Satisfação", align: "start", value: "satisfacao" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    feedbacks: [],
    satisfacaos: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Cadastrar FeedBack:"
        : "Editar FeedBack:";
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
      (this.satisfacaos = [
        {
          id: 1,
          nome: "Ruim"
        },
        {
          id: 2,
          nome: "Bom"
        },
        {
          id: 3,
          nome: "Muito Bom"
        },
        {
          id: 4,
          nome: "Ótimo"
        },
        {
          id: 5,
          nome: "Exelente"
        }
      ]),
        (this.feedbacks = [
          {
            id: 1,
            ordem: "1234567",
            comentario: "Ficou Muito Bom!",
            satisfacao: "Muito Bom"
          },
          {
            id: 2,
            ordem: "456789",
            comentario: "Parabens Muito Bom!",
            satisfacao: "Ótimo"
          },
          {
            id: 3,
            ordem: "4567849",
            comentario: "Ficou Muito Bom!",
            satisfacao: "Exelente"
          },
          {
            id: 4,
            ordem: "456897",
            comentario: "Top demais",
            satisfacao: "Bom"
          },
          {
            id: 5,
            ordem: "225489",
            comentario: "massa, muito top",
            satisfacao: "Muito Bom"
          }
        ]);
    },

    editItem(item) {
      this.editedIndex = this.feedbacks.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.feedbacks.indexOf(item);
      confirm("Você tem certeza que deseja apagar este item?") &&
        this.feedbacks.splice(index, 1);
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
        Object.assign(this.feedbacks[this.editedIndex], this.editedItem);
      } else {
        this.feedbacks.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>