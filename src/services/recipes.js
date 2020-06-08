import httpClient from '@/services/httpClient'

export default {
    // GET /recipes/rand
    getRandomRecipes() {
        return this.getRecipesByRoute('/recipes/rand');
    },

    // GET /metadata/last-seen
    getRecentRecipes() {
        return new Promise((resolve, reject) => {
            httpClient.get('/metadata/last-seen').then(response => {
                let results = response.data.results;
                // Adapt structure
                results.saved = results.favs;
                delete results.favs;
                // 
                resolve(results);
            })
                .catch(reason => reject(reason));
        });
    },

    // GET /recipes/{id}
    getRecipe(id) {
        return httpClient.get('/recipes/' + id)
    },

    // POST /metadata/saved/{id}
    toggleSave(id) {
        return httpClient.post('/metadata/saved/' + id)
    },

    // POST /metadata/watched/{id}
    setWatched(id) {
        return httpClient.post('/metadata/watched/' + id)
    },

    // GET /recipes/search
    searchRecipes(query, selectedFilters) {
        return this.getRecipesByRoute('/recipes/search', {
            query: query,
            cuisine: selectedFilters.Cuisines,
            diet: selectedFilters.Diets,
            intolerances: selectedFilters.Intolerances,
            number: 5,
            instructionsRequired: true,
            offset: 0,
            page: 0,
            limit: 5,
        });
    },

    // Method for fetching recipes from a route and processing them
    getRecipesByRoute(route, extraParams) {
        return new Promise((resolve, reject) => {
            httpClient.get(route, {
                params: extraParams
            }).then(response => {
                let recipes = response.data.results;

                // Fix for search results structure
                if (route.includes('search'))
                    recipes = recipes.data;

                this.attachMetadata(recipes).then(recipesWithMetadata => {
                    resolve(recipesWithMetadata);
                }).catch(reason => reject(reason));
            }).catch(reason => reject(reason));
        })
    },

    // Fetches metadata for a list of recipes
    // Promises a list of recipes with filled data
    attachMetadata(recipes) {
        return new Promise((resolve, reject) => {
            httpClient.get('/metadata').then(response => {
                let recipesWithData = recipes.map(recipe => {
                    recipe.watched = response.data.watched.includes(recipe.id);
                    recipe.saved = response.data.favs.includes(recipe.id);
                    recipe.addedToMeal = response.data.meal.includes(recipe.id);

                    return recipe;
                })

                resolve(recipesWithData);
            }).catch(reason => reject(reason))
        })
    }
}