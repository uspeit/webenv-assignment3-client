<template>
  <v-card class="elevation-12 d-flex flex-column" height="100%">
    <v-toolbar class color="primary" dark flat>
      <v-toolbar-title class="d-block text-center text-uppercase">Explore these recipes</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="flex-grow-1 d-flex flex-column card">
      <RecipeSummary class="flex-grow-1" v-for="recipe in randomRecipes" v-bind:key="recipe.id" v-bind:recipeData="recipe" />
    </v-card-text>
    <v-card-actions class="d-flex flex-column card">
      <v-btn color="primary" class="mb-4 align-self-stretch" @click="reloadRecipes">Refresh recipes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RecipeSummary from "@/components/RecipeSummary.vue";

export default {
  name: "RandomRecipes",

  components: {
    RecipeSummary
  },

  data: () => ({
    randomRecipes: [
      {
        id: 1,
        imgUrl:
          "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/a1b309fa5bd84f21a645882c566b9e49/FB_05.jpg?output-quality=100&resize=900:*",
        title: "Garlic Parmesan Grilled Corn",
        prepTime: 60,
        likes: 12,
        restrictions: {
          vegan: true,
          vegetarian: true,
          glutenFree: true
        },
        novelty: true,
        saved: false
      },
      {
        id: 2,
        imgUrl:
          "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/184242.jpg?output-quality=100&resize=900:*",
        title: "Low-Carb Eggplant Lasagna",
        prepTime: 180,
        likes: 14,
        restrictions: {
          vegan: false,
          vegetarian: true,
          glutenFree: false
        },
        novelty: true,
        saved: false
      },
      {
        id: 3,
        imgUrl:
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_760,h_1064/k%2Farchive%2Fabd338f6b7c142c9d03b060e88bb5e5d99ad1ca4",
        title: "Savoury Spaghetti With Meatballs",
        prepTime: 45,
        likes: 12,
        restrictions: {
          vegan: false,
          vegetarian: false,
          glutenFree: false
        },
        novelty: true,
        saved: false
      }
    ]
  }),

  methods: {
    reloadRecipes() {}
  }
};
</script>

<style scoped>
header {
  flex-grow: 0;
}
</style>