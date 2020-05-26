<template>
    <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="d-block text-center text-uppercase">Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="modalColor">
            <v-form ref="loginForm" v-model="valid" lazy-validation class="d-flex flex-column">
              <v-text-field v-model="userName" label="Username"
                :rules="userNameRules" required light></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
                light
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column modalColor">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mb-4 align-self-stretch"
              @click="validateCredentials"
              light
            >Login</v-btn>

            <router-link to="/register" class="text-center">Don't have an account? Register now.</router-link>
          </v-card-actions>
        </v-card>
</template>

<script>
import { userNameRules, passwordRules } from "../core/validationRules";
export default {
  name: "LoginForm",

  data: () => ({
    valid: true,
    userName: "",
    userNameRules: userNameRules,
    password: "",
    passwordRules: passwordRules
  }),

  methods: {
    validateCredentials() {
      this.$refs.loginForm.validate();
    }
  }
};
</script>