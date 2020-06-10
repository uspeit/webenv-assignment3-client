<template>
  <v-card class="elevation-12 d-flex flex-column">
    <v-toolbar class color="primary" dark flat>
      <v-toolbar-title class="d-block text-center text-uppercase">{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="d-flex flex-column card px-0">
      <h1 v-if="recipeList.length === 0 && !loading">None</h1>
      <transition-group
        name="staggered-fade"
        tag="div"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
        <router-link
          v-for="(recipe, index) in recipeList"
          v-bind:key="recipe.id"
          v-bind:to="'/recipe/'+recipe.id"
          v-bind:data-index="index"
          class="d-block"
          style="overflow: hidden"
        >
          <RecipeSummary
            v-bind:size="size"
            v-bind:height="itemHeight"
            class="flex-grow-1"
            v-bind:recipe="recipe"
            v-bind:hideWatchedIndicator="hideWatchedIndicator"
          />
        </router-link>
      </transition-group>
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
import Velocity from "velocity-animate";

export default {
  name: "RecipeList",
  props: [
    "dataSource", // Function returning a promise for an array
    "title", //
    "size",
    "refreshButton",
    "manual", // Disables automatic data loading from data source
    "hideWatchedIndicator" // In case all recipes already been seen and we want to hide the indicator
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
    },
    // These functions replace css animation for the list transition using Velocity.js
    // Seen here: https://vuejs.org/v2/guide/transitions.html#Staggering-List-Transitions
    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function() {
        Velocity(el, { opacity: 1, height: el.getElementsByClassName('recipe-item')[0].offsetHeight }, { complete: done });
      }, delay);
    },
    leave: function(el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function() {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done });
      }, delay);
    }
  },

  computed: {
    itemHeight() {
      let itemHeight = "8em";
      switch (this.$props.size) {
        case "lg":
          itemHeight = "16em";
      }
      return itemHeight;
    }
  }
};
</script>
<style scoped>
header {
  flex-grow: 0;
}
</style>