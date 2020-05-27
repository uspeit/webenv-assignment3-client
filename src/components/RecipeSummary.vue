<template>
  <v-row v-bind:class="'recipe-item ' + size">
    <v-col v-bind:cols="thumbSize">
      <v-img class="elevation-2" aspect-ratio="1.1" v-bind:src="recipe.imgUrl" />
    </v-col>
    <v-col v-bind:cols="12 - thumbSize">
      <div class="position-relative fill-height">
        <!-- Details -->
        <h2 v-if="size == 'md'">{{recipe.title}}</h2>
        <h1 class="mb-2" v-else>{{recipe.title}}</h1>

        <RecipeInfo v-bind:size="size" v-bind:recipe="recipe" />

        <RecipeRating class="rating-container" v-bind:rating="recipe.likes" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import RecipeInfo from "@/components/RecipeInfo.vue";
import RecipeRating from "@/components/RecipeRating.vue";
export default {
  name: "RecipeSummary",

  props: ["recipe", "size"],

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

.v-card__text h1,
.v-card__text h2,
.v-card__text span {
  color: var(--v-text-base) !important;
}

.rating-container {
  position: absolute;
  top: 0;
  right: 0;
}

.recipe-item.md .rating-container {
  top: unset;
  bottom: 0;
}
</style>