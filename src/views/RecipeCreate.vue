<template>
    <div class="modal-backdrop">
        <v-container class="fill-height">
            <v-row align="center" justify="center">
                <v-col cols="6" xl="5">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title class="d-block text-center text-uppercase">Add a New Recipe
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text class="card">
                            <v-form class="d-flex flex-column" lazy-validation ref="recipeForm" v-model="valid">
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                                label="Title"
                                                light
                                                required
                                                v-model="title"
                                        ></v-text-field>
                                        <v-text-field label="Meal Count" light min="1" required type="number"
                                                      v-model="serving"></v-text-field>
                                        <v-text-field label="Ready In Minutes" light min="1" required
                                                      type="number" v-model="ready_in_minutes"></v-text-field>
                                        <v-file-input accept="image/*"
                                                      counter
                                                      label="Image URL"
                                                      light
                                                      prepend-icon="mdi-camera"
                                                      required
                                                      v-model="imgObj"
                                        ></v-file-input>
                                    </v-col>
                                    <v-col>
                                        <v-checkbox
                                                label="Vegan?"
                                                light
                                                required
                                                v-model="vegan"
                                        ></v-checkbox>

                                        <v-checkbox
                                                label="Vegetarian?"
                                                light
                                                required
                                                v-model="vegetarian"
                                        ></v-checkbox>

                                        <v-checkbox
                                                label="Gluten Free?"
                                                light
                                                required
                                                v-model="gluten_free"
                                        ></v-checkbox>
                                        <v-btn
                                                :loading="loading"
                                                @click="performUpload"
                                                class="mt-7 small white--text"
                                                color="blue-grey"
                                                fab
                                                outlined
                                                small
                                        >
                                            <v-icon dark>mdi-cloud-upload</v-icon>
                                        </v-btn>
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

                                <v-row>
                                    <v-combobox
                                            :items="ingredients"
                                            :rules="[v => !!v || 'Please select ingredient']"
                                            class="d-flex"
                                            clearable
                                            hide-selected
                                            item-text="name"
                                            item-value="id"
                                            label="Ingredients"
                                            light
                                            multiple
                                            outlined
                                            required
                                            small-chips
                                            v-model="extended_ingredients"
                                    />
                                    <v-btn
                                            @click='toggle = !toggle'
                                            class="ma-2 small white--text"
                                            color="blue-grey"
                                            fab
                                            outlined
                                            small
                                    >
                                        <v-icon dark>mdi-pen</v-icon>
                                    </v-btn>
                                    <v-row class="ma-1" v-show='toggle'>
                                        <v-col>
                                            <v-text-field
                                                    label="Ingredient Name"
                                                    light
                                                    v-model="ingName"/>
                                        </v-col>
                                        <v-col>
                                            <v-btn
                                                    @click="addIngredient"
                                                    class="mt-4 ml-4 small white--text"
                                                    color="blue-grey"
                                                    outlined
                                                    rounded
                                                    small>
                                                Add New Ingredient
                                            </v-btn>
                                        </v-col>
                                    </v-row>

                                    <v-col align="center" v-if="!extended_ingredients.length<=0">
                                        <v-btn
                                                @click="amounts = !amounts"
                                                class="white--text"
                                                color="blue-grey"
                                                light
                                                outlined
                                                rounded
                                                white
                                        >Add Amounts and Units
                                        </v-btn>

                                        <v-row :key="index"
                                               class="ma-1"
                                               v-for="(item, index) in extended_ingredients" v-show="amounts">
                                            <v-list-item-title class="mt-7 black--text font-italic font-weight-bold"> {{
                                                item.name }}
                                            </v-list-item-title>
                                            <v-col>

                                                <v-text-field
                                                        label="Amount"
                                                        light
                                                        min="1"
                                                        type="number"
                                                        v-model="amount"/>

                                            </v-col>
                                            <v-col>
                                                <v-text-field
                                                        label="Unit"
                                                        light
                                                        v-model="unit"
                                                />
                                            </v-col>
                                        </v-row>
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
                            >Create
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import RecipeService from "@/services/recipes";

    export default {
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
            ingredients: [],

            imgObj: {},
            loading: false,
            toggle: false,
            valid: true,
            unit: "",
            amount: null,
            amounts: false,
            ingName: "",

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
                    .then((response) => RecipeService.setPersonal(response.id))
                    .then(() => this.$router.push("/personal/recipes"))
                    .catch(err => console.log(err));
            },

            async performUpload() {
                this.loading = true
                this.imgUrl = await RecipeService.uploadImg(this.imgObj)
                this.loading = false
            },

            async addIngredient() {
                this.loading = true
                const ingredient = {
                    name: this.ingName,
                }
                await RecipeService.addIngredient(ingredient)
                this.extended_ingredients.push(ingredient.name)
                this.loading = false
                this.toggle = false
            },
        },

        mounted() {
            RecipeService.ingredientsData().then(response => {
                this.ingredients = response;
            });
        }
    }
</script>

