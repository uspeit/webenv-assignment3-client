<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="8">
        <v-card class="elevation-12 d-flex flex-column">
          <v-toolbar class color="primary" dark flat>
            <v-toolbar-title class="d-block text-center text-uppercase">{{recipe.title}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="d-flex flex-column card"></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeService from "../core/recipe.service";
export default {
  name: "RecipeDetails",

  data: () => ({
    recipe: {}
  }),

  mounted() {
    let recipeId = this.$route.params.id;

    RecipeService.getRecipe(recipeId).then(
      response => (this.recipe = response.data)
    );
  }
};
</script>
