<template>
    <v-container class="fill-height">
        <v-col cols='6' offset="3" xl="2">
            <RecipeList
                    hideWatchedIndicator="true"
                    size="lg"
                    title="My Recipes"
                    v-bind:dataSource="loadMyRecipes"
            />
        </v-col>
    </v-container>
</template>


<script>
    import RecipeService from "@/services/recipes";
    import RecipeList from "@/components/RecipeList.vue";

    export default {
        name: "MyRecipes",

        components: {
            RecipeList,
        },

        data: () => ({
            recentRecipes: []
        }),

        methods: {
            loadMyRecipes() {
                return RecipeService.getMyRecipes();
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