<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="6" xl="5">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="d-block text-center text-uppercase"
            >Register
            </v-toolbar-title
            >
          </v-toolbar>
          <v-card-text class="card">
            <v-form
                    class="d-flex flex-column"
                    lazy-validation
                    ref="registerForm"
                    v-model="valid"
            >
              <v-row>
                <v-col>
                  <v-text-field
                          v-model="userName"
                          :rules="userNameRules"
                          label="Username"
                          required
                          light
                  ></v-text-field>
                  <v-text-field
                          label="First Name"
                          light
                          required
                          v-model="firstName"
                  ></v-text-field>
                  <v-text-field
                          label="Last Name"
                          light
                          required
                          v-model="lastName"
                  ></v-text-field>
                  <v-combobox
                          v-model="country"
                          :items="countries"
                          item-text="name"
                          :rules="[v => !!v || 'Please select country']"
                          label="Country"
                          required
                          light
                  >
                    <template slot="selection" slot-scope="{ item }">
                      <img
                              class="country-icon"
                              height="16"
                              v-bind:src="item.flag"
                              width="24"
                      />
                      <span class="mx-2"></span>
                      {{ item.name }}
                    </template>
                    <template slot="item" slot-scope="{ item }">
                      <img
                              class="country-icon"
                              height="16"
                              v-bind:src="item.flag"
                              width="24"
                      />
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
                  <v-text-field
                          label="Email"
                          light
                          required
                          v-model="email"
                  ></v-text-field>
                  <v-text-field
                          label="Image URL"
                          light
                          required
                          v-model="imgUrl"
                  ></v-text-field>
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
            >Register
            </v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AuthService from "@/services/auth";
  import countryData from "@/assets/countryData.json";

  import {confirmPasswordRules, passwordRules, userNameRules} from "@/core/validationRules";

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

      let userCredentials = {
        login: this.userName,
        password: this.password
      };

      let userInfo = {
        login: this.userName,
        password: this.password,
        role: "Client",
        avatar: this.imgUrl,
        fullname: this.firstName + " " + this.lastName,
        country: this.country.name,
        email: this.email,
        is_blocked: false,
        question: "Place of Birth?",
        answer: "Dimona"
      };

      AuthService.register(userCredentials, userInfo)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>
