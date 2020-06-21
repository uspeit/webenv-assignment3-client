<template>
  <div class="mt-1">
    <!-- Ready in -->
    <v-icon class="mr-1" color="text" style="top: -1.5px" v-bind:size="iconSize"
    >mdi-alarm
    </v-icon
    >
    <span v-bind:class="size">{{
      recipe["ready_in_minutes"] | timeString
    }}</span>
    <br/>
    <!-- Serves -->
    <v-icon class="mr-1" color="text" style="top: -1.5px" v-bind:size="iconSize"
    >mdi-bowl
    </v-icon
    >
    <span v-bind:class="size">{{ recipe["serving"] }} servings</span>
    <br/>

    <!-- Icons -->
    <div class="mt-1" style="left: -3px; position: relative;">
      <v-icon
              v-bind:size="iconSize"
              v-bind:color="
          recipe['gluten_free'] ? 'noRestriction' : 'hasRestriction'
        "
              class="mr-1"
      >mdi-barley
      </v-icon
      >
      <v-icon
              v-bind:size="iconSize"
              v-bind:color="
          recipe.vegan
            ? 'noRestriction'
            : recipe.vegetarian
            ? 'partialRestriction'
            : 'hasRestriction'
        "
              class="mr-1"
      >mdi-leaf
      </v-icon
      >
      <v-icon
              v-bind:size="iconSize"
              v-bind:color="recipe.watched ? 'primary' : 'inactive'"
              class="mr-1"
              v-if="isLoggedIn && !hideWatched"
      >mdi-eye
      </v-icon
      >
      <v-icon
              v-bind:size="iconSize"
              v-bind:color="recipe.saved ? 'saved' : 'inactive'"
              v-on:click.stop.prevent="toggleSave()"
              class="save-icon mr-1"
              v-if="isLoggedIn"
      >mdi-heart
      </v-icon
      >
    </div>
  </div>
</template>

<script>
  import RecipeService from "@/services/recipes";

  export default {
    name: "RecipeInfo",

    props: ["recipe", "size", "hideWatched"],

    methods: {
      toggleSave() {
        const recipe = this.$props.recipe;
        // Change value
        const original = recipe.saved;
        recipe.saved = !original;
      // Update server
      RecipeService.setSaved(recipe.id, recipe.saved)
        .then(res => (recipe.saved = res.data.favs.includes(recipe.id))) // Validate with result
        .catch(err => {
          console.log(err);
          recipe.saved = original;
        });
    }
  },

  computed: {
    isLoggedIn: function() {
      return this.$store.getters.tokenPresent;
    },

    iconSize: function() {
      switch (this.$props.size) {
        case "md":
          return 18;
        default:
        case "lg":
          return 28;
      }
    }
  }
};
</script>

<style scoped>
span {
  color: var(--v-text-base) !important;
  font-size: 1.2em;
}

span.lg {
  position: relative;
  top: 1px;
}

span.md {
  font-size: 1em;
}

.save-icon:hover {
  color: var(--v-saved-lighten3) !important;
}

.save-icon.saved--text:hover {
  color: var(--v-saved-base) !important;
}

.save-icon::after {
  display: none;
}
</style>
