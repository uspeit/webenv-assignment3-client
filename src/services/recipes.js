import httpClient from '@/services/httpClient'
import store from '@/store/index'

const ID_SOURCE_THRESHOLD = 200; // Threshold for determining if ID is local or belongs to the external API

export default {
    // GET /recipes/rand
    getRandomRecipes() {
        return this.getRecipesByRoute('/recipes/rand');
    },

    // GET /metadata/last-seen
    getRecentRecipes() {
        return new Promise((resolve, reject) => {
            httpClient.get('/metadata/last-seen').then(response => {
                let results = response.data.results.filter(x => x !== null);
                // Adapt items
                results.forEach(res => {
                    res.saved = res.favs;
                    delete res.favs;
                });
                // 
                resolve(results);
            })
                .catch(reason => reject(reason));
        });
    },

    // GET /recipes/{id}
    getRecipe(id) {
        let route = '/recipes/' + id;
        if (id <= ID_SOURCE_THRESHOLD)
            route += '?local=true';

        return this.getRecipesByRoute(route);
    },

    // POST /metadata/personal/{id}
    setPersonal(id) {
        return httpClient.post('/metadata/personal/' + id)
    },

    // POST /recipes
    async addRecipe(recipe) {
        const recipeWithId = await httpClient.post('/recipes/', recipe)
        console.log("recipe is:" + recipeWithId.data.id)
        await this.setPersonal(recipeWithId.id)
        return recipeWithId.data
    },

    // POST /metadata/saved/{id}
    setSaved(id, value) {
        if (value)
            return httpClient.post('/metadata/favs/' + id)
        else
            return httpClient.delete('/metadata/favs/' + id)
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

    // GET /ingredients/
    ingredientsData() {
        return new Promise((resolve, reject) => {
            httpClient.get('/ingredients')
                .then(response => {
                    let data = response.data;
                    resolve(data);
                }).catch(reason => reject(reason));
        })
    },

    // POST /ingredients/
    addIngredient() {
        return new Promise((resolve, reject) => {
            httpClient.post('/ingredients')
                .then(response => {
                    let data = response.data;
                    resolve(data);
                }).catch(reason => reject(reason));
        })

    },

    // Method for fetching recipes from a route and processing them
    getRecipesByRoute(route, queryParams) {
        return new Promise((resolve, reject) => {
            httpClient.get(route, {
                params: queryParams
            }).then(response => {
                let data = response.data;

                // If we got a list it will be under 'results'
                if (Object.prototype.hasOwnProperty.call(data, 'results')) {
                    data = data.results;

                    // Search results are under results.data
                    if (route.includes('search'))
                        data = data.data;
                }

                this.processRecipes(data).then(fullData => {
                    resolve(fullData);
                }).catch(reason => reject(reason));
            }).catch(reason => reject(reason));
        })
    },

    // Processes either a single recipe or a list
    // Formats instructions and fetches metadata
    // Returns filled object
    processRecipes(singleOrArray) {
        // Adapt object(s)
        singleOrArray = this.applyToRecipes(singleOrArray, this.formatInstructions);
        // Load metadata if logged in
        if (store.getters.tokenPresent) {
            return new Promise((resolve) => {
                httpClient.get('/metadata').then(response => {
                    let result = this.applyToRecipes(singleOrArray, this.attachMetadata, response.data);
                    resolve(result);
                }).catch(() => resolve(singleOrArray))
            });
        } else {
            return new Promise((resolve) => {
                resolve(singleOrArray);
            });
        }
    },

    // Template for applying a function to an object or array accordingly
    applyToRecipes(singleOrArray, applyFunction, extraData) {
        let result;
        if (Array.isArray(singleOrArray)) {
            // Update each recipe
            result = singleOrArray.map(recipe => applyFunction(recipe, extraData));
        } else {
            // Update single recipe
            result = applyFunction(singleOrArray, extraData)
        }
        return result;
    },

    // Updates recipe data based on the response of a metadata request
    attachMetadata(recipe, metadataResponse) {
        recipe.watched = metadataResponse.watched.includes(recipe.id);
        recipe.saved = metadataResponse.favs.includes(recipe.id);
        recipe.addedToMeal = metadataResponse.meal.includes(recipe.id);

        return recipe;
    },

    // Parses recipe instructions into an array
    formatInstructions(recipe) {
        recipe.instructions = recipe.instructions
            .replace(/^Instructions\s*/, '')
            .replace(/<.*?>/g, '.')
            .replace(/[.!]+/g, '.')
            .split(/\.\s*/)
            .filter(line => line.length > 0)
            .map(line => line + '.');
        return recipe;
    }

}
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}