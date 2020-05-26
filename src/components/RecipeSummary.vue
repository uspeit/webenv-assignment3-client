<template>
  <v-row class="recipe-item">
    <v-col cols="4">
      <v-img class="elevation-2" aspect-ratio="1" v-bind:src="recipeData.imgUrl" />
    </v-col>
    <v-col cols="8" class="position-relative">
      <div class="float-left">
        <!-- Details -->
        <h3>{{recipeData.title}}</h3>
        <span>Preperation time: {{recipeData.prepTime | timeString}}</span>

        <br />

        <!-- Icons -->
        <v-icon
          v-bind:color="recipeData.restrictions.glutenFree ? 'noRestriction' : 'hasRestriction'"
        >mdi-barley</v-icon>
        <span class="mx-1"></span>
        <v-icon
          v-bind:color="recipeData.restrictions.vegan ? 'noRestriction' : recipeData.restrictions.vegetarian ? 'partialRestriction' : 'hasRestriction'"
        >mdi-leaf</v-icon>
        <span class="mx-1"></span>
        <v-icon v-bind:color="!recipeData.novelty ? 'primary' : 'inactive'">mdi-eye</v-icon>
        <span class="mx-1"></span>
        <v-icon v-bind:color="recipeData.saved ? 'saved' : 'inactive'">mdi-heart</v-icon>
      </div>

      <!-- Rating -->
      <div class="rating-container d-flex align-center">
        <span>{{recipeData.likes}}</span>
        <span class="mx-1"></span>
        <v-icon>mdi-star</v-icon>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RecipeSummary",
  props: ["recipeData"]
};
</script>
<style scoped>
.recipe-item {
  cursor: pointer;
  transition: all 100ms ease-in-out;
}
.recipe-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
  transform: scale(1.01);
}

.v-card__text h3,
.v-card__text span {
  color: rgb(18, 18, 18) !important;
}

.rating-container {
  float: right;

  font-size: 1.5em;
  line-height: 1.5em;
  font-weight: 400;
}

.rating-container span,
.rating-container .v-icon {
  color: var(--v-rating-base) !important;
}
</style>