<template>
  <div class="modal-backdrop">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title class="d-block text-center text-uppercase">Add a New Recipe</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="card">
              <v-form class="d-flex flex-column" lazy-validation ref="recipeForm" v-model="valid">
                <v-row>
                  <v-col cols="6">
                    <v-row>
                      <v-col>
                        <v-text-field label="Title" light required v-model="title"></v-text-field>
                        <v-text-field
                          label="Meal Count"
                          light
                          min="1"
                          required
                          type="number"
                          v-model="serving"
                        ></v-text-field>
                        <v-text-field
                          label="Ready In Minutes"
                          light
                          min="1"
                          required
                          type="number"
                          v-model="ready_in_minutes"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-checkbox label="Vegan?" light required v-model="vegan"></v-checkbox>

                        <v-checkbox label="Vegetarian?" light required v-model="vegetarian"></v-checkbox>

                        <v-checkbox label="Gluten Free?" light required v-model="gluten_free"></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <form enctype="multipart/form-data" class="d-flex align-center">
                          <v-file-input
                            accept="image/*"
                            class="flex-grow-1"
                            label="Upload Image"
                            light
                            prepend-icon="mdi-camera"
                            required
                            v-model="imgObj"
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
                      </v-col>
                      <v-col class="d-flex align-center justify-space-end">
                        <label class="v-label theme--light mr-4">Preview:</label>
                        <v-avatar color="primary">
                          <v-img v-bind:src="imgUrl" v-if="imgUrl" />
                          <v-icon v-else>mdi-pot-mix</v-icon>
                        </v-avatar>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-textarea
                        label="Instructions"
                        light
                        outlined
                        requireds
                        style="text-align:center"
                        v-model="instructions"
                        value="The Woodman set to work at once, and so sharp"
                      />
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <EditIngredients v-bind:value="extended_ingredients" />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-actions class="d-flex flex-column card">
              <v-btn
                :disabled="!valid"
                @click="validateInformation"
                class="mb-4 align-self-stretch"
                color="success"
                light
              >Create</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RecipeService from "@/services/recipes";
import EditIngredients from "@/components/EditIngredients";

export default {
  components: { EditIngredients },

  data: () => ({
    title: "",
    vegan: false,
    vegetarian: false,
    gluten_free: false,
    serving: "",
    ready_in_minutes: "",
    imgUrl: "",
    aggregate_likes: 0,
    instructions: "",
    extended_ingredients: [],
    selectedIngredient: null,

    imgObj: {},
    loading: false,
    toggle: false,
    valid: true,
    unit: "",
    amount: null,
    amounts: false,
    ingName: ""
  }),

  methods: {
    validateInformation() {
      if (!this.$refs.recipeForm.validate()) return;
      let recipeInfo = {
        title: this.title,
        ready_in_minutes: this.ready_in_minutes,
        aggregate_likes: 0,
        serving: this.serving,
        vegetarian: this.vegetarian,
        vegan: this.vegan,
        gluten_free: this.gluten_free,
        image: this.imgUrl,
        instructions: this.instructions,
        extended_ingredients: this.extended_ingredients
      };

      RecipeService.addRecipe(recipeInfo)
        .then(response => RecipeService.setPersonal(response.id))
        .then(() => this.$router.push("/personal/recipes"))
        .catch(err => console.log(err));
    },

    async performUpload() {
      this.loading = true;
      console.log(this.imgObj);
      this.imgUrl = await RecipeService.uploadImg(this.imgObj);
      this.loading = false;
    }
  }
};
</script>

