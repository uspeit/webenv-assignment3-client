<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="6" xl="5">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="d-block text-center text-uppercase">Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="card">
            <v-form ref="registerForm" v-model="valid" lazy-validation class="d-flex flex-column">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="userName"
                    :rules="userNameRules"
                    label="Username"
                    required
                    light
                  ></v-text-field>
                  <v-text-field v-model="firstName" label="First Name" required light></v-text-field>
                  <v-text-field v-model="lastName" label="Last Name" required light></v-text-field>
                  <v-combobox
                    v-model="country"
                    :items="countries"
                    item-text="name"
                    :rules="[v => !!v || 'Please select country']"
                    label="Country"
                    required
                    light=""
                  >
                    <template slot="selection" slot-scope="{ item }">
                      <img height="16" width="24" class="country-icon" v-bind:src="item.flag" />
                      <span class="mx-2"></span>
                      {{ item.name }}
                    </template>
                    <template slot="item" slot-scope="{ item }">
                      <img height="16" width="24" class="country-icon" v-bind:src="item.flag" />
                      <span class="mx-2"></span>
                      {{ item.name }}
                    </template>
                  </v-combobox>
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
                  <v-text-field v-model="imgUrl" label="Image URL" required light></v-text-field>
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
import countryData from "../assets/countryList.json";

import {
  userNameRules,
  passwordRules,
  confirmPasswordRules
} from "../core/validationRules";

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
    countries: countryData,
    country: "",
    email: "",
    imgUrl: ""
  }),

  methods: {
    validateCredentials() {
      if (!this.$refs.registerForm.validate()) return;

      let data = {
        userName: this.userName,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        country: this.country.code,
        email: this.email,
        imgUrl: this.imgUrl
      };

      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>