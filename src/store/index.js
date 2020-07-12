import Vue from "vue";
import Vuex from "vuex";
import AuthService from "../services/auth";
import mealModule from "./modules/meal";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    currentUser: null
  },
  mutations: {
    authenticated(state, { token }) {
      state.token = token;
    },
    logged_in(state, { user }) {
      state.currentUser = user;
    },
    logout(state) {
      state.token = "";
      state.currentUser = undefined;
    }
  },
  actions: {
    authenticate({ commit }, userCredentials) {
      return new Promise((resolve, reject) => {
        AuthService.authenticate(userCredentials)
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem("token", token);
            commit("authenticated", { token });
            resolve(token);
          })
          .catch(err => {
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    updateUser({ commit }, userInfo) {
      return new Promise(resolve => {
        commit("logged_in", { user: userInfo });
        resolve();
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        resolve();
      });
    }
  },
  modules: {
    meal: mealModule
  },
  getters: {
    tokenPresent: state => !!state.token,
    userDataPresent: state => !!state.currentUser,
    token: state => state.token,
    currentUser: state => state.currentUser
  }
});
