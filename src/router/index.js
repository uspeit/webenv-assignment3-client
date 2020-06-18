import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/recipe/:id",
    name: "Recipe Details",
    component: () => import("../views/RecipePage.vue")
  },
  {
    path: "/personal/create",
    name: "Recipe Creation",
    component: () => import("../views/RecipeCreate.vue")
  },
  {
    path: "/personal/recipes",
    name: "My Recipes",
  },
  {
    path: "/personal/favorites",
    name: "Favorite Recipes",
  },
  {
    path: "/personal/family",
    name: "Family Recipes",
  }
];

const router = new VueRouter({
  routes
});

export default router;
