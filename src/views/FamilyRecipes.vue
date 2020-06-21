<template>
    <v-container class="fill-height">
        <v-col cols='6' offset="3" xl="2">
            <RecipeList
                    hideWatchedIndicator="true"
                    size="lg"
                    title="Family Recipes"
                    v-bind:dataSource="loadFamilyRecipes"
            />
        </v-col>
    </v-container>
</template>


<script>
    import RecipeService from "@/services/recipes";
    import RecipeList from "@/components/RecipeList.vue";

    export default {
        name: "FamilyRecipes",

        components: {
            RecipeList,
        },

        data: () => ({
            recentRecipes: []
        }),

        methods: {
            loadFamilyRecipes() {
                return RecipeService.getFamilyRecipes();
            }
        },

        computed: {
            isLoggedIn: function () {
                const currentVal = this.$store.getters.tokenPresent;
                if (this.loadedWithToken === false && currentVal) {
                    this.$refs.randRecipes.triggerLoad();
                }
                return currentVal;
            }
        }
    };
</script>