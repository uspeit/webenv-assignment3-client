<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="primary" dense>
      <router-link class="d-flex white--text" to="/">
        <v-avatar>
          <img
            class="mb-1"
            src="https://res.cloudinary.com/serfati/image/upload/v1591970948/soupify_zrbnbo.png"
            style="height: 35px;width: 35px"
          />
        </v-avatar>
        <v-toolbar-title class="ml-2 mt-2 mr-12 align-center">
          <span>Soupify™</span>
        </v-toolbar-title>
      </router-link>

      <MenuLink route="/">Home</MenuLink>
      <MenuLink route="/search">Search</MenuLink>
      <MenuLink route="/about">About</MenuLink>

      <v-menu bottom eager offset-y>
        <template v-slot:activator="{ on }">
          <MenuLink
            :activator="on"
            disableNav="true"
            route="/personal"
            v-show="currentUser"
          >
            <v-badge color="teal " icon="mdi-vuetify" :content="badge"
              >Personal
            </v-badge>
          </MenuLink>
        </template>
        <v-list>
          <v-list-item
            :key="index"
            @click="navigate(item.route)"
            v-for="(item, index) in personalLinks"
          >
            <v-list-item-title> {{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <MenuLink route="/create" v-show="currentUser">Create</MenuLink>
      <v-spacer></v-spacer>

      <div v-if="isLoggedIn">
        <!-- Logged in -->
        <transition name="fade-in">
          <span style="cursor: pointer" @click="navigate('/profile/')">
            <span id="profile" class="mx-4 mt-1"
              >Hello {{ currentUser.fullname }}</span
            >
            <v-avatar size="2.5em" class="mr-3" color="#c8e2f1">
              <v-img :src="currentUser.avatar" v-if="currentUser.avatar" />
              <v-icon v-else dense>mdi-account-circle</v-icon>
            </v-avatar>
          </span>
        </transition>
        <v-btn
          @click="logout"
          class="primary--text mx-2"
          color="accent"
          outlined
          >Logout
        </v-btn>
      </div>
      <div v-else>
        <!-- Not logged in -->
        <v-icon dense>mdi-account-circle</v-icon>
        <span class="mx-4">Hello Guest</span>
        <router-link to="/login">
          <v-btn class="primary--text mx-2" color="accent" depressed
            >Login
          </v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn class="mx-2" outlined>Register</v-btn>
        </router-link>
      </div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AuthService from "@/services/auth";
import RecipeService from "@/services/recipes";
import MenuLink from "@/components/MenuLink.vue";
import recipes from "./services/recipes";

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
      },
      {
        text: "Edit Profile",
        route: "/profile"
      },
      {
        text: "Cook A Meal",
        route: "/meal"
      }
    ],
    badge: ""
  }),

  async mounted() {
    // Loads user data when app starts
    AuthService.fetchUserData().then();
    this.badge = await RecipeService.getMealRecipes().then(i => {
      console.log(i)
      return i.Pagination.total;
    });
  },

  computed: {
    isLoggedIn: function() {
      return this.$store.getters.tokenPresent;
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
