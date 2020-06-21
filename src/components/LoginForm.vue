<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title class="d-block text-center text-uppercase"
      >Login
      </v-toolbar-title
      >
    </v-toolbar>
    <v-card-text class="card">
      <v-form
              class="d-flex flex-column"
              lazy-validation
              ref="loginForm"
              v-model="valid"
      >
        <v-text-field
                :rules="userNameRules"
                label="Username"
                light
                required
                v-model="userName"
        ></v-text-field>

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
    <v-card-actions class="d-flex flex-column card">
      <v-btn
              :disabled="!valid"
              color="success"
              class="mb-4 align-self-stretch"
              @click="validateCredentials"
              light
      >Login
      </v-btn
      >

      <router-link class="text-center" to="/register"
      >Don't have an account? Register now.
      </router-link
      >
    </v-card-actions>
  </v-card>
</template>

<script>
  import AuthService from "@/services/auth";
  import {passwordRules, userNameRules} from "../core/validationRules";

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
      if (!this.$refs.loginForm.validate()) return;

      let userCredentials = {
        login: this.userName,
        password: this.password
      };

      AuthService.login(userCredentials)
        .then(() => this.$router.push("/"))
        .catch(err => {
          if (err.name !== "NavigationDuplicated") console.log(err);
        });
    }
  }
};
</script>
