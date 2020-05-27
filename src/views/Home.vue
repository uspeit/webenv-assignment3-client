<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col v-if="$vuetify.breakpoint.xlOnly" xl="2"></v-col>
      <v-col cols="8" xl="6">
        <RandomRecipes />
      </v-col>
      <v-col cols="4" xl="3">
        <!-- <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col> -->
              <LoginForm />
            <!-- </v-col>
          </v-row>
        </v-container> -->
      </v-col>
      <v-col v-if="$vuetify.breakpoint.xlOnly" xl="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import RandomRecipes from "@/components/RandomRecipes.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Home",
  components: {
    RandomRecipes,
    LoginForm
  }
};
</script>
