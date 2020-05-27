<template>
  <v-card class="elevation-12 d-flex flex-column">
    <v-toolbar class color="primary" dark flat>
      <v-toolbar-title class="d-block text-center text-uppercase">Explore these recipes</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="d-flex flex-column card">
      <router-link
        v-for="recipe in recipeList"
        v-bind:key="recipe.id"
        v-bind:to="'/recipe/'+recipe.id"
      >
        <RecipeSummary class="flex-grow-1" v-bind:recipeData="recipe" />
      </router-link>
    </v-card-text>
    <v-card-actions class="d-flex flex-column card">
      <v-btn color="primary" class="mb-4 align-self-stretch" @click="reloadRecipes">Refresh recipes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RecipeSummary from "@/components/RecipeSummary.vue";
import RecipeService from "../core/recipe.service";

export default {
  name: "RandomRecipes",

  components: {
    RecipeSummary
  },

  data: () => ({
    recipeList: []
  }),

  mounted() {
    this.reloadRecipes();
  },

  methods: {
    reloadRecipes() {
      RecipeService
        .getRandomRecipes()
        .then(response => (this.recipeList = response.data));
    }
  }
};
</script>

<style scoped>
header {
  flex-grow: 0;
}
</style>