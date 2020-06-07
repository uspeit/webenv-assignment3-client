<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="primary" dense>
      <router-link to="/" class="d-flex white--text">
        <v-icon class="mx-4" large>mdi-pot-mix</v-icon>
        <v-toolbar-title class="mr-12 align-center">
          <span class="title">Soupify</span>
        </v-toolbar-title>
      </router-link>

      <MenuLink route="/">Home</MenuLink>
      <MenuLink route="/search">Search</MenuLink>
      <MenuLink route="/about">About</MenuLink>

      <v-menu eager bottom offset-y>
        <template v-slot:activator="{ on }">
          <MenuLink :activator="on" route="/personal" disableNav="true">Personal</MenuLink>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in personalLinks"
            :key="index"
            @click="navigate(item.route)"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>

      <div v-if="isLoggedIn">
        <!-- Logged in -->
        <span class="mx-4">Hello {{currentUser.fullName}}</span>
        <v-btn @click="logout" outlined color="accent" class="primary--text mx-2">Logout</v-btn>
      </div>
      <div v-else>
        <!-- Not logged in -->
        <span class="mx-4">Hello Guest</span>
        <router-link to="/login">
          <v-btn depressed color="accent" class="primary--text mx-2">Login</v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn outlined class="mx-2">Register</v-btn>
        </router-link>
      </div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import MenuLink from "@/components/MenuLink.vue";

export default {
  name: "App",

  components: { MenuLink },

  data: () => ({
    personalLinks: [
      {
        text: "Favorite Recipes",
        route: "/personal/favorite"
      },
      {
        text: "My Recipes",
        route: "/personal/recipes"
      },
      {
        text: "Family Recipes",
        route: "/personal/family"
      }
    ]
  }),

  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    currentUser: function() {
      return this.$store.getters.currentUser;
    }
  },

  methods: {
    navigate: function(route) {
      this.$router.push(route);
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
