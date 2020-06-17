<template>
  <v-data-table :headers="headers" :items="value" light sort-by="name" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Ingredients</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" light>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add Ingredient</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-combobox
                      :items="availableIngredients"
                      :rules="[v => !!v || 'Please select ingredient']"
                      class="flex-grow-1"
                      clearable
                      item-text="name"
                      item-value="name"
                      light
                      outlined
                      required
                      v-model="editedItem.selection"
                      label="Ingredient"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.amount" type="number" label="Amount"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.unit" label="Units"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>No ingredients added</template>
  </v-data-table>
</template>

<script>
import RecipeService from "@/services/recipes";

export default {
  props: ["value"],

  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Ingredient",
        align: "start",
        value: "name"
      },
      { text: "Amount", value: "amount" },
      { text: "Units", value: "unit" }
    ],
    availableIngredients: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      amount: 0,
      unit: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Ingredient" : "Edit Ingredient";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  mounted() {
    RecipeService.ingredientsData().then(response => {
      this.availableIngredients = response;
    });
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.value.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.ingredients.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.value.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.editedItem.name = this.editedItem.selection.name;
      this.editedItem.id = this.editedItem.selection.id;
      delete this.editedItem.selection;

      if (this.editedIndex > -1) {
        Object.assign(this.value[this.editedIndex], this.editedItem);
      } else {
        this.value.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>