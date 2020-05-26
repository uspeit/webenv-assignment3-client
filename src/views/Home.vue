<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col cols="8">
        <RandomRecipes msg="Welcome to Soupify!" />
      </v-col>
      <v-col cols="4">
        <!-- <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col> -->
              <LoginForm />
            <!-- </v-col>
          </v-row>
        </v-container> -->
      </v-col>
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
