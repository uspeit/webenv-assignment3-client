import httpClient from '@/services/httpClient'

export default {
    getRandomRecipes() {
        return this.getRecipesByRoute('rand'); // GET /recipes/rand
    },

    getRecentRecipes() {
        return this.getRecipesByRoute('rand'); 
        // return this.getRecipesByRoute('last-seen'); // GET /recipes/last-seen
    },

    getRecipe(id) {
        return httpClient.get('/recipes/' + id) // GET /recipes/{id}
    },

    toggleSave(id) {
        return httpClient.post('/metadata/saved/' + id) // POST /metadata/saved/{id}
    },

    setWatched(id) {
        return httpClient.post('/metadata/watched/' + id) // POST /metadata/watched/{id}
    },


    searchRecipes(query, selectedFilters) {
        return this.getRecipesByRoute('search', { // GET /recipes/search
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

    getRecipesByRoute(route, extraParams) {
        return new Promise((resolve, reject) => {
            httpClient.get(`/recipes/${route}`, {
                params: extraParams
            }).then(response => {
                let recipes = response.data.results;

                // Fix for search results structure
                if(route === 'search')
                    recipes = recipes.data;

                this.attachMetadata(recipes).then(recipesWithMetadata => {
                    resolve(recipesWithMetadata);
                }).catch(reason => reject(reason));
            }).catch(reason => reject(reason));
        })
    },

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