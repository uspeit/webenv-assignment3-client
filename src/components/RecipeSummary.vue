<template>
  <v-row v-bind:class="'recipe-item ' + size">
    <v-col v-bind:cols="thumbSize">
      <v-img class="elevation-2" aspect-ratio="1.1" v-bind:src="recipeData.imgUrl" />
    </v-col>
    <v-col v-bind:cols="12 - thumbSize">
      <div class="position-relative fill-height">
        <!-- Details -->
        <h3>{{recipeData.title}}</h3>

        <v-icon size="18" color="text" class="mr-1" style="top: -1.5px">mdi-alarm</v-icon>
        <span>{{recipeData.prepTime | timeString}}</span>
        <br />

        <!-- Icons -->
        <v-icon
          v-bind:color="recipeData.restrictions.glutenFree ? 'noRestriction' : 'hasRestriction'"
          class="mr-1"
        >mdi-barley</v-icon>
        <v-icon
          v-bind:color="recipeData.restrictions.vegan ? 'noRestriction' : recipeData.restrictions.vegetarian ? 'partialRestriction' : 'hasRestriction'"
          class="mr-1"
        >mdi-leaf</v-icon>
        <v-icon v-bind:color="!recipeData.novelty ? 'primary' : 'inactive'" class="mr-1">mdi-eye</v-icon>
        <v-icon v-bind:color="recipeData.saved ? 'saved' : 'inactive'" class="mr-1">mdi-heart</v-icon>

        <!-- Rating -->
        <div class="rating-container d-flex align-center">
          <span>{{recipeData.likes}}</span>
          <v-icon class="ml-1" style="top: -1.5px">mdi-star</v-icon>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RecipeSummary",
  props: ["recipeData", "size"],

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

.v-card__text h3,
.v-card__text span {
  color: var(--v-text-base) !important;
}

.rating-container {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.5em;
  line-height: 1.5em;
  font-weight: 400;
}

.recipe-item.md .rating-container {
  top: unset;
  bottom: 0;
}

.rating-container span,
.rating-container .v-icon {
  color: var(--v-rating-base) !important;
}
</style>