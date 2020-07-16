<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="6" xl="5">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-avatar color="black-grey">
              <v-img v-bind:src="imgUrl" v-if="imgUrl" />
              <v-icon v-else dense>mdi-account-circle</v-icon>
            </v-avatar>
            <v-toolbar-title class="ml-2 d-block text-center text-uppercase"
              >Register</v-toolbar-title
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
                    :rules="userNameRules"
                    label="Username"
                    light
                    required
                    v-model="userName"
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
                    :items="countries"
                    :rules="[v => !!v || 'Please select country']"
                    item-text="name"
                    label="Country"
                    light
                    required
                    v-model="country"
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
                        :src="item.flag"
                        width="24"
                      />
                      <span class="mx-2"></span>
                      {{ item.name }}
                    </template>
                  </v-combobox>
                  <v-combobox
                    :items="questions"
                    :rules="[v => !!v || 'Please select question']"
                    item-text="q"
                    label="Recovery Question"
                    light
                    required
                    v-model="question"
                  />
                  <v-combobox
                    :items="roles"
                    :rules="[v => !!v || 'Please select role']"
                    label="Choose a Role"
                    light
                    required
                    v-model="role"
                  />
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
                    :rules="[confirmPasswordRule]"
                    label="Confirm Password"
                    light
                    required
                    type="password"
                    v-model="passwordConfirm"
                  ></v-text-field>
                  <v-text-field
                    label="Email"
                    light
                    required
                    v-model="email"
                  ></v-text-field>
                  <form
                    ref="imageUpload"
                    enctype="multipart/form-data"
                    class="d-flex align-center"
                  >
                    <v-file-input
                      accept="image/*"
                      class="flex-grow-1"
                      label="Profile Picture"
                      light
                      required
                      name="file"
                      v-model="imgObj"
                      id="imageInput"
                    ></v-file-input>
                    <v-btn
                      :loading="loading"
                      @click="performUpload"
                      class="ml-4 small white--text"
                      color="blue-grey"
                      fab
                      outlined
                      small
                    >
                      <v-icon dark>mdi-cloud-upload</v-icon>
                    </v-btn>
                  </form>
                  <v-text-field
                    label="Answer"
                    light
                    required
                    v-model="answer"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column card">
            <v-btn
              :disabled="!valid"
              @click="validateCredentials"
              class="mb-4 align-self-stretch"
              color="success"
              light
              >Register</v-btn
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
import FileService from "@/services/files";

import { passwordRules, userNameRules } from "@/core/validationRules";

export default {
  data: () => ({
    valid: true,
    userName: "",
    userNameRules: userNameRules,
    password: "",
    passwordRules: passwordRules,
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    countries: countryData,
    country: "",
    email: "",
    question: "",
    answer: "",
    role: "",
    imgUrl: "",
    imgObj: {},
    loading: false,
    roles: ["Client", "Chef", "Reviewer"],
    questions: [
      "What is the name of the town where you were born?",
      "What was your first car?",
      "What elementary school did you attend?",
      "What is the name of your first pet?",
      "What is your mother's maiden name?"
    ]
  }),

  methods: {
    async performUpload() {
      if (!this.imgObj.name) return;
      this.loading = true;
      let formData = new FormData();

      formData.append("image", this.imgObj, this.imgObj.name);

      this.imgUrl = await FileService.uploadImg(formData);
      this.loading = false;
    },

    validateCredentials() {
      if (!this.$refs.registerForm.validate()) return;

      let userCredentials = {
        login: this.userName,
        password: this.password
      };

      let userInfo = {
        login: this.userName,
        password: this.password,
        role: this.role,
        avatar: this.imgUrl,
        fullname: this.firstName + " " + this.lastName,
        country: this.country.name,
        email: this.email,
        is_blocked: false,
        question: this.question,
        answer: this.answer
      };

      AuthService.register(userCredentials, userInfo)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    },

    confirmPasswordRule() {
      return this.password === this.passwordConfirm || "Password must match";
    }
  }
};
</script>
