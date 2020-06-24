<template>
  <v-container class="fill-height">
    <v-col cols="6" offset="3" xl="2">
      <RecipeList
        hideWatchedIndicator="true"
        size="lg"
        title="My Recipes"
        v-bind:dataSource="loadMyRecipes"
      />
    </v-col>
  </v-container>
</template>

<script>
import RecipeService from "@/services/recipes";
import RecipeList from "@/components/RecipeList.vue";

export default {
  name: "MyRecipes",

  components: {
    RecipeList
  },

  data: () => ({}),

  methods: {
    loadMyRecipes(page) {
      return RecipeService.getMyRecipes(page);
    }
  }
};
</script>
