<template>
    <v-container class="fill-height">
        <v-col cols='6' offset="3" xl="2">
            <RecipeList
                    hideWatchedIndicator="true"
                    size="lg"
                    title="Favorites Recipes"
                    v-bind:dataSource="loadFavoritesRecipes"
            />
        </v-col>
    </v-container>
</template>


<script>
    import RecipeService from "@/services/recipes";
    import RecipeList from "@/components/RecipeList.vue";

    export default {
        name: "FavoritesRecipes",

        components: {
            RecipeList,
        },

        data: () => ({}),

        methods: {
            loadFavoritesRecipes() {
                return RecipeService.getFavoritesRecipes();
            }
        },

        computed: {}
    };
</script>