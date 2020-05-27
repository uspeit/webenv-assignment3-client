<template>
  <div>
    <v-icon size="18" color="text" class="mr-1" style="top: -1.5px">mdi-alarm</v-icon>
    <span>{{recipe.prepTime | timeString}}</span>
    <br />

    <!-- Icons -->
    <v-icon
      v-bind:color="recipe.restrictions.glutenFree ? 'noRestriction' : 'hasRestriction'"
      class="mr-1"
    >mdi-barley</v-icon>
    <v-icon
      v-bind:color="recipe.restrictions.vegan ? 'noRestriction' : recipe.restrictions.vegetarian ? 'partialRestriction' : 'hasRestriction'"
      class="mr-1"
    >mdi-leaf</v-icon>
    <v-icon v-bind:color="!recipe.novelty ? 'primary' : 'inactive'" class="mr-1">mdi-eye</v-icon>
    <v-icon v-bind:color="recipe.saved ? 'saved' : 'inactive'" class="mr-1">mdi-heart</v-icon>
  </div>
</template>

<script>
export default {
  name: "RecipeInfo",
  props: ["recipe"],
};
</script>

<style scoped>

span {
  color: var(--v-text-base) !important;
}
</style>