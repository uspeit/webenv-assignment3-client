<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="primary" dense>

      <router-link class="d-flex white--text" to="/">
        <v-avatar>
          <img src="https://res.cloudinary.com/serfati/image/upload/v1591970948/soupify_zrbnbo.png"
               style="height: 35px;width: 35px">
        </v-avatar>
        <v-toolbar-title class="ml-2 mt-3 mr-12 align-center">
          <span>Soupify™</span>
        </v-toolbar-title>
      </router-link>

      <MenuLink route="/">Home</MenuLink>
      <MenuLink route="/search">Search</MenuLink>
      <MenuLink route="/about">About</MenuLink>

      <v-menu bottom eager offset-y>
        <template v-slot:activator="{ on }">
          <MenuLink :activator="on" disableNav="true" route="/personal" v-show="currentUser">Personal
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
      <MenuLink route="/personal/add" v-show="currentUser">Add</MenuLink>
      <v-spacer></v-spacer>

      <div v-if="isLoggedIn">
        <!-- Logged in -->
        <transition name="fade-in">
          <span class="mx-4" v-if="currentUser">Hello {{currentUser.fullname}}</span>
        </transition>
        <v-btn @click="logout" class="primary--text mx-2" color="accent" outlined>Logout</v-btn>
      </div>
      <div v-else>
        <!-- Not logged in -->
        <span class="mx-4">Hello Guest</span>
        <router-link to="/login">
          <v-btn class="primary--text mx-2" color="accent" depressed>Login</v-btn>
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
  import MenuLink from "@/components/MenuLink.vue";

  export default {
    name: "App",

    components: {MenuLink},

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
      ]
    }),

    mounted() {
      // Loads user data when app starts
      AuthService.fetchUserData().then();
    },

    computed: {
      isLoggedIn: function () {
        return this.$store.getters.tokenPresent;
      },
      currentUser: function () {
        return this.$store.getters.currentUser;
      }
    },

    methods: {
      navigate: function (route) {
        this.$router.push(route);
      },
      logout: function () {
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/login");
        });
      }
    }
  };
</script>