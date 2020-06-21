<template>
  <!-- Rating -->
  <div>
    <span>{{ rating }}</span>
    <v-icon class="ml-1" style="top: -1.5px">mdi-star</v-icon>
  </div>
</template>

<script>
export default {
  name: "RecipePage",
  props: ["rating"]
};
</script>

<style scoped>
span {
  font-size: 1.5em;
  line-height: 1.5em;
  font-weight: 400;
}

span,
.v-icon {
  color: var(--v-rating-base) !important;
}
</style>
