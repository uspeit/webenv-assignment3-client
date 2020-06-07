<template>
  <v-card class="elevation-12 d-flex flex-column">
    <v-toolbar class color="primary" dark flat>
      <v-toolbar-title class="d-block text-center text-uppercase">{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="d-flex flex-column card">
      <h1 v-if="recipeList.length === 0 && !loading">None</h1>
      <router-link
        v-for="recipe in recipeList"
        v-bind:key="recipe.id"
        v-bind:to="'/recipe/'+recipe.id"
      >
        <RecipeSummary v-bind:size="size" class="flex-grow-1" v-bind:recipe="recipe" />
      </router-link>
    </v-card-text>
    <v-card-actions v-if="refreshButton || loading" class="d-flex flex-column card">
      <v-btn
        :text="loading"
        color="primary"
        :loading="loading"
        class="mb-4 px-12"
        @click="triggerLoad"
      >Refresh recipes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RecipeSummary from "@/components/RecipeSummary.vue";

export default {
  name: "RecipeList",
  props: [
    "dataSource", // Function returning a promise for an array
    "title", //
    "size",
    "refreshButton",
    "manual" // Disables automatic data loading from data source
  ],

  components: {
    RecipeSummary
  },

  data: () => ({
    loading: true,
    recipeList: []
  }),

  mounted() {
    if (!this.manual) this.triggerLoad();
  },

  methods: {
    // Used to load data from data source
    triggerLoad() { 
      this.loading = true;
      this.dataSource().then(response => {
        this.recipeList = response;
        this.loading = false;
        this.$emit("loadFinish", response.length);
      });
    }
  }
};
</script>

<style scoped>
header {
  flex-grow: 0;
}
</style>