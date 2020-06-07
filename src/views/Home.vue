<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col v-if="$vuetify.breakpoint.xlOnly" xl="2"></v-col>
      <v-col cols="8" xl="6">
        <RecipeList
          title="Explore these recipes"
          v-bind:data="randomRecipes"
          v-on:requestRefresh="loadRandomRecipes"
          refreshButton="true"
          v-bind:loadingData="loading.random"
          size="lg"
        />
      </v-col>
      <v-col cols="4" xl="3">
        <LoginForm v-if="!isLoggedIn" />
        <RecipeList v-else title="Recently viewed" v-bind:data="recentRecipes" size="md" />
      </v-col>
      <v-col v-if="$vuetify.breakpoint.xlOnly" xl="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeService from "@/services/recipes";
import RecipeList from "@/components/RecipeList.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Home",

  components: {
    RecipeList,
    LoginForm
  },

  mounted() {
    this.loadRandomRecipes();
    if (this.isLoggedIn) this.loadRecentRecipes();
  },

  data: () => ({
    loading: { random: true },
    recentRecipes: [],
    randomRecipes: []
  }),

  methods: {
    loadRandomRecipes() {
      this.loading.random = true;
      RecipeService.getRandomRecipes().then(response => {
        this.randomRecipes = response.data.results;
        this.loading.random = false;
      });
    },

    loadRecentRecipes() {
      RecipeService.getRecentRecipes().then(
        response => (this.recentRecipes = response.data.results)
      );
    }
  },

  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>
