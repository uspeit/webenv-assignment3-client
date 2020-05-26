<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="d-block text-center text-uppercase">Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="card">
            <v-form ref="registerForm" v-model="valid" lazy-validation class="d-flex flex-column">
              <v-row>
                <v-col>
                  <v-text-field v-model="userName" :rules="userNameRules" label="Username" required light></v-text-field>
                  <v-text-field v-model="firstName" label="First Name" required light></v-text-field>
                  <v-text-field v-model="lastName" label="Last Name" required light></v-text-field>
                  <v-select
                    v-model="country"
                    :items="countries"
                    :rules="[v => !!v || 'Please select country']"
                    label="Country"
                    required
                    light
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                    light
                  ></v-text-field>

                  <v-text-field
                    v-model="passwordConfirm"
                    :rules="confirmPasswordRules"
                    label="Confirm Password"
                    type="password"
                    required
                    light
                  ></v-text-field>
                  <v-text-field v-model="email" label="Email" required light></v-text-field>
                  <v-text-field v-model="imageUrl" label="Image URL" required light></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column card">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mb-4 align-self-stretch"
              @click="validateCredentials"
              light
            >Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { userNameRules, passwordRules, confirmPasswordRules } from "../core/validationRules";
export default {
  data: () => ({
    valid: true,
    userName: "",
    userNameRules: userNameRules,
    password: "",
    passwordRules: passwordRules,
    passwordConfirm: "",
    confirmPasswordRules: confirmPasswordRules,
    firstName: "",
    lastName: "",
    countries: ["Israel", "USA"],
    country: "",
    email: "",
    imgUrl: ""
  }),

  methods: {
    validateCredentials() {
      this.$refs.registerForm.validate();
    }
  }
};
</script>