<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="primary" dense>
      <v-icon class="mx-4" large>mdi-pot-mix</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Soupify</span>
      </v-toolbar-title>

      <v-tabs color="accent" dark style="max-width: 650px" fixed-tabs>
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
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-trending-up", text: "Most Popular" },
      { icon: "mdi-youtube-subscription", text: "Subscriptions" },
      { icon: "mdi-history", text: "History" },
      { icon: "mdi-playlist-play", text: "Playlists" },
      { icon: "mdi-clock", text: "Watch Later" }
    ],
    items2: [
      { picture: 28, text: "Joseph" },
      { picture: 38, text: "Apple" },
      { picture: 48, text: "Xbox Ahoy" },
      { picture: 58, text: "Nokia" },
      { picture: 78, text: "MKBHD" }
    ]
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
