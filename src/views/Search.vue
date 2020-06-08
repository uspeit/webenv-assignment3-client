<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="elevation-12 d-flex flex-column">
          <v-toolbar class color="primary" dark flat>
            <v-toolbar-title class="d-block text-center text-uppercase">Search</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="d-flex flex-column card">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="query"
                  hide-details
                  placeholder="Type here to search"
                  light
                  v-bind:loading="searching"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn
                  color="success"
                  class="search-button text--card"
                  uppercase
                  large
                  depressed
                  @click="performSearch"
                >Search</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-for="filter in filters" v-bind:key="filter.name">
                <v-select
                  v-model="selectedFilters[filter.name]"
                  :label="'Filter ' + filter.name"
                  :items="filter.values"
                  :menu-props="{ light: true }"
                  persistent-hint
                  light
                  clearable
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" v-show="!searching && resultsCount > 0">
      <v-col cols="8">
        <RecipeList
          ref="searchResults"
          size="lg"
          title="Results"
          v-on:loadFinish="searchComplete"
          v-bind:dataSource="searchRecipes"
          manual="true"
        />
      </v-col>
    </v-row>

    <v-row justify="center" v-if="!searching && resultsCount === 0">
      <v-col cols="8">
        <v-card class="elevation-12 d-flex flex-column">
          <v-card-text align="center" class="d-flex flex-column card">
            <h1 class="text--text py-5">No results found</h1>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeList from "@/components/RecipeList.vue";
import RecipeService from "@/services/recipes";
import filterData from "@/assets/filterData.json";

export default {
  name: "Search",

  components: {
    RecipeList
  },

  data: () => ({
    searching: false,
    resultsCount: -1,
    query: "",
    selectedFilters: {},
    filters: filterData
  }),

  methods: {
    searchRecipes() {
      return RecipeService.searchRecipes(this.query, this.selectedFilters);
    },

    performSearch() {
      this.searching = true;
      this.$refs.searchResults.triggerLoad();
    },

    searchComplete(resultsCount) {
      this.searching = false;
      this.resultsCount = resultsCount;
    }
  }
};
</script>

<style scoped>
.search-button {
  width: 100%;
  height: 100% !important;
}
</style>
