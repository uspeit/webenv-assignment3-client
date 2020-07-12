<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="7">
        <v-card class="card">
          <v-toolbar color="primary" class="mb-5">
            <v-avatar color="black-grey">
              <v-icon>mdi-food</v-icon>
            </v-avatar>
            <v-toolbar-title
              class="ml-2 font-weight-bold d-block text-center text-uppercase"
            >Cook A Meal</v-toolbar-title>
          </v-toolbar>

          <v-data-table
            v-if="!loading"
            :headers="dataTable.headers"
            :items="recipes"
            :single-expand="dataTable.singleExpand"
            :expanded.sync="dataTable.expanded"
            item-key="id"
            show-expand
            light
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="text-center" style="color: darkslategray;">
                <RecipeSummary
                  class="white--text"
                  style
                  :recipe="item"
                  size="md"
                  :height="height"
                  hideTitle="true"
                  disableAnimation="true"
                  :hideWatchedIndicator="hideWatchedIndicator"
                />
              </td>
            </template>
            <template v-slot:item.cooked="{ item }">
              <v-checkbox v-model="item.cooked" @change="updateCookedValue(item)"></v-checkbox>
            </template>
          </v-data-table>

          <!-- <div v-for="(recipe, index) in recipes.data" :key="recipe.id" :data-index="index">
            <router-link :to="'/recipe/' + recipe.id">
              <div class="d-flex text-center" style="color: darkslategray;">
                <span class="ma-3 mt-8" style="text-decoration: underline">
                  {{
                  index + 1
                  }}
                </span>
                <RecipeSummary
                  class="white--text"
                  style
                  :recipe="recipe"
                  :size="size"
                  :height="height"
                  :hideWatchedIndicator="hideWatchedIndicator"
                />
                <v-checkbox class inheritance style="-webkit-text-fill-color: darkslategray">cooked?</v-checkbox>
              </div>
            </router-link>
          </div>-->
          <div class>
            <br />
            <v-progress-linear
              style="max-width: 38em;"
              class="ml-6"
              color="light-green darken-4"
              :buffer-value="progress + 5"
              :value="progress"
              height="10"
              striped
              stream
            ></v-progress-linear>
            <br />
          </div>
          <v-btn
            to="/"
            class="ma-3 small white--text"
            color="success"
            fab
            outlined
            small
            title="Back Homw"
          >
            <v-icon dark>mdi-keyboard-backspace</v-icon>
          </v-btn>
          <v-btn
            @click="clearAll"
            class="ml-3 small white--text"
            color="success"
            fab
            outlined
            small
            title="Clear All"
          >
            <v-icon dark>mdi-delete-empty</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeService from "@/services/recipes";
import RecipeSummary from "../components/RecipeSummary";

export default {
  components: {
    RecipeSummary
  },

  data: () => ({
    loading: true,
    progress: 0,
    recipes: [],
    height: "1em",
    hideWatchedIndicator: true,
    dataTable: {
      headers: [
        {
          text: "Dish",
          align: "start",
          sortable: false,
          value: "title"
        },
        { text: "Preparation time (min)", value: "ready_in_minutes" },
        { text: "Servings", value: "serving" },
        { text: "Dietary accommodations", value: "accommodations" },
        { text: "Cooked", value: "cooked" },
        { text: "", value: "data-table-expand" }
      ],
      expanded: [],
      singleExpand: true
    }
  }),

  async mounted() {
    this.recipes = (await RecipeService.getMealRecipes()).data;
    this.progress = 0;

    this.updateProgress();

    this.loading = false;
  },

  methods: {
    clearAll() {
      this.recipes = [];
      this.progress = -15;
    },

    updateCookedValue(item) {
      this.$store.dispatch("setCookedStatus", {
        recipeId: item.id,
        cooked: item.cooked
      });

      this.updateProgress();
    },

    updateProgress() {
      // Calculate precentage of cooked recipes of total recipes by preparation time
      let cooked = 0,
        total = 0;
      this.recipes.forEach(recipe => {
        total += recipe.ready_in_minutes;
        if (recipe.cooked) cooked += recipe.ready_in_minutes;
      });

      this.progress = (cooked / total) * 100;
    }
  }
};
</script>

<style scoped></style>
