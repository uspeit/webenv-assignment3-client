<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="elevation-12 d-flex flex-column">
          <v-toolbar class color="primary" dark flat>
            <v-toolbar-title class="d-block text-center text-uppercase"
              ><v-icon large>mdi-pot</v-icon> {{ recipe.title }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="d-flex flex-column card">
            <transition name="fade" mode="out-in">
              <v-row v-if="loading">
                <v-col class="text-center">
                  <v-progress-circular
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col cols="4">
                  <v-img class="elevation-2 mb-2" v-bind:src="recipe.image" />

                  <RecipeInfo
                    class="float-left"
                    hideWatched="true"
                    v-bind:recipe="recipe"
                  />

                  <RecipeRating
                    class="rating-container float-right"
                    v-bind:rating="recipe.aggregate_likes"
                  />
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="multiply"
                    class="ml-5 mt-5 small white--text"
                    color="primary"
                    fab
                    outlined
                    small
                    title="Multiply Counts"
                  >
                    <v-icon dark>mdi-numeric-2-box-multiple-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="8">
                  <div class="position-relative fill-height">
                    <h3 class="mb-2">Ingredients</h3>
                    <ul id="ingredientList">
                      <li
                        :key="ingredient.id"
                        class="text--text"
                        v-for="ingredient in recipe.extended_ingredients"
                      >
                        <span class="ingredient-name">{{
                          ingredient.name
                        }}</span>
                        (<span
                          v-html="$options.filters.fraction(ingredient.amount)"
                        ></span>
                        <span v-if="ingredient.unit"
                          >&nbsp;{{ ingredient.unit }}</span
                        >)
                      </li>
                    </ul>
                    <h3 class="my-2">Instructions</h3>
                    <ol id="instructions">
                      <div
                        v-for="instruction in recipe.instructions"
                        :key="instruction"
                        class="text--text align-center d-inline-flex"
                      >
                        <v-checkbox
                          @change="updateProgress"
                          class="mr-5"
                          light
                          required
                        />
                        <li class="mt-3">
                          {{ instruction }}
                        </li>
                      </div>
                    </ol>
                  </div>
                </v-col>
                <v-progress-linear
                  style="max-width: 49em;"
                  class="ml-7"
                  color="light-green darken-4"
                  :buffer-value="progress + 5"
                  :value="progress"
                  height="10"
                  striped
                  stream
                ></v-progress-linear>
                <v-btn
                  to="/meal"
                  class="ma-3 small white--text"
                  color="success"
                  fab
                  outlined
                  small
                  title="Back To My Meal"
                >
                  <v-icon dark>mdi-keyboard-backspace</v-icon>
                </v-btn>
                <v-btn
                  to="/"
                  class="ma-3 small white--text"
                  color="success"
                  fab
                  outlined
                  small
                  title="Back Home"
                >
                  <v-icon dark>mdi-home</v-icon>
                </v-btn>
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
  name: "RecipeCook",

  components: {
    RecipeInfo,
    RecipeRating
  },

  data: () => ({
    loading: true,
    progress: 0,
    step: 0,
    recipe: {}
  }),

  mounted() {
    let recipeId = this.$route.params.id;

    RecipeService.getRecipe(recipeId).then(response => {
      this.recipe = response.data;
      this.step = 100 / this.recipe.instructions.length;
      console.log(this.step);
      this.loading = false;
      if (!response.watched) {
        this.recipe.watched = true;
        RecipeService.setWatched(recipeId).then();
      }
    });
  },
  methods: {
    multiply() {
      this.recipe.serving *= 2;
      this.recipe.extended_ingredients = this.recipe.extended_ingredients.map(
        i => {
          i.amount *= 2;
          return i;
        }
      );
    },
    updateProgress(action) {
      this.progress = action
        ? (this.progress += this.step)
        : (this.progress -= this.step);
    }
  }
};
</script>

<style scoped>
.ingredient-name {
  text-transform: capitalize;
}

#instructions li {
  margin-bottom: 1em;
}
</style>
