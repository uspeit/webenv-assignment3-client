<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-row>
          <v-col>
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
                      class="search-button"
                      uppercase
                      large
                      depressed
                      @click="searchRecipes"
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
                      multiple
                      chips
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
        <v-row v-if="results && results.length > 0">
          <v-col>
            <RecipeList title="Results" v-bind:data="results" size="lg" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeList from "@/components/RecipeList.vue";
import RecipeService from "@/core/recipe.service";
import filterData from "@/assets/filterData.json";

export default {
  name: "Search",

  components: {
    RecipeList
  },

  data: () => ({
    searching: false,
    query: "",
    selectedFilters: {},
    filters: filterData,
    results: []
  }),

  methods: {
    searchRecipes() {
      this.searching = true;
      RecipeService.searchRecipes(this.query, this.selectedFilters).then(response => {
        this.searching = false;
        this.results = response.data;
      });
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
