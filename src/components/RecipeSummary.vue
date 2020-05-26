<template>
  <v-row>
    <v-col cols="4">
      <v-img aspect-ratio="1" v-bind:src="recipeData.imgUrl" />
    </v-col>
    <v-col cols="8">
      <h1>{{recipeData.title}}</h1>
      <span>{{recipeData.prepTime | timeString}}</span>
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
.v-card__text h1,
.v-card__text span {
  color: rgb(18, 18, 18) !important;
}
</style>

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