<template>
  <v-container class=" fill-height">
    <v-row justify="center" align="center">
      <v-col cols="7">
        <v-card class="card">
          <v-toolbar color="primary">
            <v-avatar color="black-grey">
              <v-icon>mdi-food</v-icon>
            </v-avatar>
            <v-toolbar-title class="ml-2 font-weight-bold d-block text-center text-uppercase"
            >Cook A Meal
            </v-toolbar-title>
          </v-toolbar>
          <div
            v-for="(recipe, index) in recipes.data"
            :key="recipe.id"
            :data-index="index"
          >
            <router-link :to="'/recipe/'+recipe.id">
            <div class="d-flex text-center" style="color: darkslategray;">

                <span class="ma-3 mt-8" style="text-decoration: underline">{{index+1}}</span>
                <RecipeSummary
                        class="white--text"
                        style=""
                        :recipe="recipe"
                        :size="size"
                        :height="height"
                        :hideWatchedIndicator="hideWatchedIndicator"
                />
              <v-checkbox class="" inheritance style="-webkit-text-fill-color: darkslategray">cooked?</v-checkbox>
            </div>
            </router-link>

          </div>
          <div class="">
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
    progress: 45,
    recipes: [],
    size: "md",
    height: "1em",
    hideWatchedIndicator: true
  }),

  async mounted() {
    this.recipes = await RecipeService.getMealRecipes();
    this.progress=0;
  },

  methods: {
    clearAll() {
      this.recipes = [];
      this.progress=-15;
    }
  }
};
</script>

<style scoped></style>
