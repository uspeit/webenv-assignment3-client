<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="elevation-12 d-flex flex-column">
          <v-toolbar class color="primary" dark flat>
            <v-toolbar-title class="d-block text-center text-uppercase">Instructions</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="d-flex flex-column card">
            <v-row v-if="recipe.title">
              <v-col cols="4">
                <v-img class="elevation-2 mb-2" v-bind:src="recipe.imgUrl" />

                <RecipeInfo v-bind:recipe="recipe" class="float-left" hideWatched="true" />

                <RecipeRating class="rating-container float-right" v-bind:rating="recipe.likes" />
              </v-col>
              <v-col cols="8">
                <div class="position-relative fill-height">
                  <!-- Details -->
                  <h1 class="text--text mb-2">{{recipe.title}}</h1>
                  <p
                    class="text--text"
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeService from "@/services/recipes";
import RecipeInfo from "@/components/RecipeInfo.vue";
import RecipeRating from "@/components/RecipeRating.vue";

export default {
  name: "RecipePage",

  components: {
    RecipeInfo,
    RecipeRating
  },

  data: () => ({
    recipe: {}
  }),

  mounted() {
    let recipeId = this.$route.params.id;

    RecipeService.getRecipe(recipeId).then(response => {
      this.recipe = response.data;

      if (!response.data.watched) {
        this.recipe.watched = true;
        RecipeService.setWatched(recipeId).then();
      }
    });
  }
};
</script>
