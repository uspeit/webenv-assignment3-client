import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import AuthService from '../services/auth';

Vue.use(Vuex);

function loadSavedUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch (e) {
    return undefined;
  }
}

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    currentUser: loadSavedUser(),
  },
  mutations: {
    authenticated(state, { token }) {
      state.token = token;
    },
    logged_in(state, { user }) {
      state.currentUser = user;
    },
    logout(state) {
      state.token = '';
      state.currentUser = undefined;
    },
  },
  actions: {
    authenticate({ commit }, userCredentials) {
      return new Promise((resolve, reject) => {
        AuthService.authenticate(userCredentials)
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem('token', token);

            axios.defaults.headers.common['Authorization'] = token;
            commit('authenticated', { token });
            resolve(token)
          })
          .catch(err => {
            localStorage.removeItem('token');
            reject(err);
          })
      })
    },
    updateUser({ commit }, userInfo) {
      return new Promise((resolve) => {
        commit('logged_in', { user: userInfo });
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        resolve();
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      })
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token && !!state.currentUser,
    token: state => state.token,
    currentUser: state => state.currentUser
  }
});
