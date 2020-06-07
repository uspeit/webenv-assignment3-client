<template>
  <v-card class="elevation-12 d-flex flex-column">
    <v-toolbar class color="primary" dark flat>
      <v-toolbar-title class="d-block text-center text-uppercase">{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="d-flex flex-column card">
      <router-link v-for="recipe in recipeList" v-bind:key="recipe.id" v-bind:to="'/recipe/'+recipe.id">
        <RecipeSummary v-bind:size="size" class="flex-grow-1" v-bind:recipe="recipe" />
      </router-link>
    </v-card-text>
    <v-card-actions v-if="refreshButton" class="d-flex flex-column card">
      <v-btn
        :text="loading"
        color="primary"
        :loading="loading"
        class="mb-4 align-self-stretch"
        @click="loadData"
      >Refresh recipes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RecipeSummary from "@/components/RecipeSummary.vue";

export default {
  name: "RecipeList",
  props: ["dataSource", "title", "size", "refreshButton"],

  components: {
    RecipeSummary
  },

  data: () => ({
    loading: true,
    recipeList: []
  }),

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      this.loading = true;
      this.dataSource().then(response => {
        this.recipeList = response.data.results;
        this.loading = false;
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