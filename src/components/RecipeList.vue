<template>
  <v-card class="elevation-12 d-flex flex-column">
    <v-toolbar class color="primary" dark flat>
      <v-toolbar-title class="d-block text-center text-uppercase">{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="d-flex flex-column card">
      <router-link
        v-for="recipe in data"
        v-bind:key="recipe.id"
        v-bind:to="'/recipe/'+recipe.id"
      >
        <RecipeSummary v-bind:size="size" class="flex-grow-1" v-bind:recipe="recipe" />
      </router-link>
    </v-card-text>
    <v-card-actions v-if="refreshButton" class="d-flex flex-column card">
      <v-btn color="primary" class="mb-4 align-self-stretch" @click="emitRefreshEvent">Refresh recipes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RecipeSummary from "@/components/RecipeSummary.vue";

export default {
  name: "RecipeList",
  props: ["data", "title", "size", "refreshButton"],

  components: {
    RecipeSummary
  },

  methods: {
    emitRefreshEvent() {
      this.$emit('requestRefresh')
    }
  }
};
</script>

<style scoped>
header {
  flex-grow: 0;
}
</style>