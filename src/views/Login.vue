<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col class="shrink" style="min-width: 350px">
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm
  }
};
</script>
