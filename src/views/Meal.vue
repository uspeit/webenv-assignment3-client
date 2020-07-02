<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="8">
        <v-card>
          <!--          <RecipeList-->
          <!--                  hideWatchedIndicator="true"-->
          <!--                  size="md"-->
          <!--                  title="Cook A Meal"-->
          <!--                  v-bind:dataSource="loadMealRecipes"-->
          <!--                  lockHeight="false"-->
          <!--          />-->
          <div
            v-for="(recipe, index) in recipes"
            :key="recipe.id"
            :data-index="index"
          >
            <RecipeSummary
              class="white--text flex-column d-flex"
              style="max-width: 20em"
              :recipe="recipe"
              :size="size"
              :height="height"
              :hideWatchedIndicator="hideWatchedIndicator"
            >
            </RecipeSummary>
            <v-checkbox class="ml-8">cooked?</v-checkbox>
          </div>
          <v-card-text class="white--text">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
              asperiores corporis dicta doloremque esse est harum ipsa itaque
              minima modi nemo nostrum obcaecati pariatur provident, quidem
              reprehenderit soluta ut velit.
            </div>
            <div>
              Consectetur maxime numquam provident quis temporibus. A, accusamus
              ad consectetur consequuntur deleniti exercitationem fugit harum
              maiores molestiae numquam obcaecati officiis perferendis quidem
              quis quod reiciendis, repellendus, sapiente similique tenetur
              voluptatem?
            </div>
          </v-card-text>
          <div class="">
            <br />
            <v-progress-linear
              style="max-width: 45em;"
              class="ml-6"
              color="light-green darken-4"
              :buffer-value="progress + 15"
              :value="progress"
              height="10"
              striped
              stream
            ></v-progress-linear>
            <br />
          </div>
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
          <v-card-actions class=" mt-3 d-flex flex-column col-5 offset-3">
            <v-btn
              class="ma-2 mb-4 align-self-stretch"
              to="/"
              tile
              outlined
              color="success"
            >
              <v-icon left>mdi-home</v-icon>
              Back
            </v-btn>
          </v-card-actions>
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
    height: "5em",
    hideWatchedIndicator: true
  }),

  async mounted() {
    this.recipes = await RecipeService.getMealRecipes();
  },

  methods: {
    clearAll() {
      this.recipes = [];
    }
  }
};
</script>

<style scoped></style>
