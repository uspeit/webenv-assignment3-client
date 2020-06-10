<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="elevation-12 d-flex flex-column">
          <v-toolbar class color="primary" dark flat>
            <v-toolbar-title class="d-block text-center text-uppercase">Instructions</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="d-flex flex-column card">
            <transition name="fade" mode="out-in">
              <v-row v-if="loading">
                <v-col class="text-center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col cols="4">
                  <v-img class="elevation-2 mb-2" v-bind:src="recipe.image" />

                  <RecipeInfo v-bind:recipe="recipe" class="float-left" hideWatched="true" />

                  <RecipeRating
                    class="rating-container float-right"
                    v-bind:rating="recipe.aggregate_likes"
                  />
                </v-col>
                <v-col cols="8">
                  <div class="position-relative fill-height">
                    <!-- Details -->
                    <h2 class="text--text">{{recipe.title}}</h2>
                    <h3 class="mt-2">Ingredients</h3>
                    <ul id="ingredientList">
                      <li
                        v-for="ingredient in recipe.extended_ingredients"
                        :key="ingredient.id"
                        class="text--text"
                      >
                        <span class="ingredient-name">{{ingredient.name}}</span>
                        {{ingredientAmountString(ingredient)}}
                      </li>
                    </ul>
                    <h3 class="mt-2">Instructions</h3>
                    <p class="text--text" v-html="recipe.instructions"></p>
                  </div>
                </v-col>
              </v-row>
            </transition>
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
    loading: true,
    recipe: {}
  }),

  mounted() {
    let recipeId = this.$route.params.id;

    RecipeService.getRecipe(recipeId).then(response => {
      this.recipe = response;
      this.loading = false;

      if (!response.watched) {
        this.recipe.watched = true;
        RecipeService.setWatched(recipeId).then();
      }
    });
  },

  methods: {
    ingredientAmountString(ingredient) {
      let unit = ingredient.unit;
      if (ingredient.amount > 1) unit += "s";
      return `(${ingredient.amount} ${unit})`;
    }
  }
};
</script>

<style scoped>
.ingredient-name {
  text-transform: capitalize;
}
</style>