<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="primary" dense>
      <router-link to="/" class="d-flex white--text">
        <v-icon class="mx-4" large>mdi-pot-mix</v-icon>
        <v-toolbar-title class="mr-12 align-center">
          <span class="title">Soupify</span>
        </v-toolbar-title>
      </router-link>

      <v-tabs color="accent" dark style="max-width: 600px" fixed-tabs>
        <v-tab to="/">Home</v-tab>
        <v-tab to="/search">Search</v-tab>
        <v-tab to="/about">About</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <router-link to="/login">
        <v-btn depressed color="accent" class="primary--text mx-2">Login</v-btn>
      </router-link>
      <router-link to="/register">
        <v-btn outlined class="mx-2">Register</v-btn>
      </router-link>
      <span class="mx-4">Hello Guest</span>
    </v-app-bar>

    <v-content>
      <v-container fluid class="fill-height">
            <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
  }),
  created() {}
};
</script>
