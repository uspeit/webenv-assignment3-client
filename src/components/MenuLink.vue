<template>
  <v-btn
    :input-value="active"
    class="primary"
    text
    v-bind:to="!disableNav ? route : undefined"
    v-on="activator"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: "MenuLink",
  props: ["route", "activator", "disableNav"],
  computed: {
    active: function() {
      return (
        typeof this.$router.currentRoute === "string" &&
        this.$router.currentRoute.startsWith(this.route)
      );
    }
  }
};
</script>

<style scoped>
.v-btn {
  height: 100% !important;
  border-radius: 0;
}
</style>
