import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import AuthService from '../core/auth.service';
import jwt_decode from 'jwt-decode';

const auth = new AuthService();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    claims: localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : '',    
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, { token }) {
      state.status = 'success'
      state.token = token
      state.claims = jwt_decode(token)
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.claims = {}
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')

        auth.login(user)
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('token', token)
            
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', { token })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')

        auth.register(user)
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', { token })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token,
    userClaims: state => state.claims,
    authStatus: state => state.status,
  }
});
