<template>
  <v-row v-bind:class="'recipe-item px-4 ' + size">
    <v-col v-bind:cols="thumbSize">
      <v-img class="elevation-2" aspect-ratio="1.1" v-bind:src="recipe.image" />
    </v-col>
    <v-col v-bind:cols="12 - thumbSize">
      <div class="position-relative fill-height pad-score">
        <!-- Details -->
        <h3 class="single-line" v-if="size == 'md'">{{recipe.title}}</h3>
        <h2 class="single-line mb-2" v-else>{{recipe.title}}</h2>

        <RecipeInfo
          v-bind:size="size"
          v-bind:recipe="recipe"
          v-bind:hideWatched="hideWatchedIndicator"
        />

        <RecipeRating class="rating-container" v-bind:rating="recipe.aggregate_likes" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import RecipeInfo from "@/components/RecipeInfo.vue";
import RecipeRating from "@/components/RecipeRating.vue";
export default {
  name: "RecipeSummary",

  props: [
    "recipe",
    "size",
    "hideWatchedIndicator" // In case all recipes already been seen and we want to hide the indicator
  ],

  components: {
    RecipeInfo,
    RecipeRating
  },

  data: () => ({
    thumbSize: 3
  }),

  mounted() {
    switch (this.$props.size) {
      case "md":
        this.thumbSize = 3;
        break;

      case "lg":
        this.thumbSize = 4;
        break;
    }
  }
};
</script>

<style scoped>
.recipe-item {
  transition: all 100ms ease-in-out;
}
.recipe-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
  transform: scale(1.01);
}

.pad-score {
  padding-right: 4em;
}

.rating-container {
  position: absolute;
  top: 0;
  right: 0;
}
</style>