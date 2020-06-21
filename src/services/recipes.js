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
                resolve({data: results});
            })
                .catch(reason => reject(reason));
        });
    },

    // GET /metadata/last-seen
    getMyRecipes() {
        return new Promise((resolve, reject) => {
            httpClient.get('/metadata/personal').then((response) => {
                let results = response.data.personal.filter(x => x !== null);
                // Adapt items
                let personal = []
                results.forEach(id => {
                    httpClient.get('/recipes/' + id).then(response => {
                        let raw = response.data;
                        raw.saved = raw.favs;
                        delete raw.favs;
                        personal.push(raw)
                    })
                });
                resolve({data: personal});

            })
                .catch(reason => reject(reason));
        });
    },

    // GET /metadata/last-seen
    getFamilyRecipes() {
        return new Promise((resolve, reject) => {
            httpClient.get('/metadata/family').then((response) => {
                let results = response.data.family.filter(x => x !== null);
                // Adapt items
                let family = []
                results.forEach(id => {
                    httpClient.get('/recipes/' + id).then(response => {
                        let raw = response.data;
                        raw.saved = raw.favs;
                        delete raw.favs;
                        family.push(raw)
                    })
                });
                resolve({data: family});

            })
                .catch(reason => reject(reason));
        });
    },

    // GET /metadata/last-seen
    getFavoritesRecipes() {
        return new Promise((resolve, reject) => {
            httpClient.get('/metadata/favs').then((response) => {
                let results = response.data.favs.filter(x => x !== null);
                // Adapt items
                let favorites = []
                results.forEach(id => {
                    httpClient.get('/recipes/' + id).then(response => {
                        let raw = response.data;
                        raw.saved = true;
                        delete raw.favs;
                        favorites.push(raw)
                    })
                });
                resolve({data: favorites});

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
    searchRecipes(query, selectedFilters, requestPage) {
        return this.getRecipesByRoute('/recipes/search', {
            query: query,
            cuisine: selectedFilters.Cuisines,
            diet: selectedFilters.Diets,
            intolerances: selectedFilters.Intolerances,
            instructionsRequired: true,
            number: 12, // TODO: Change
            limit: 3, // TODO: Change to 5
            page: requestPage ? requestPage : 0,
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
                let data = this.parseRecipeResponse(response);

                this.processRecipes(data).then(fullData => {
                    resolve(fullData);
                }).catch(reason => reject(reason));
            }).catch(reason => reject(reason));
        })
    },

    // Standardizes different recipe responses, i.e single, array, array with pagination
    // Returns: {
    //     data: {} / []
    //     Pagination: {} / undefined
    //}
    parseRecipeResponse(response) {
        let data = response.data;

        // We either get our data directly or it is under 'results'
        if (Object.prototype.hasOwnProperty.call(data, 'results'))
            data = data.results;

        // Wraps data if needed
        if (Object.prototype.hasOwnProperty.call(data, 'data'))
            return data;
        else
            return {data: data};
    },

    // Processes either a single recipe or a list
    // Formats instructions and fetches metadata
    // Returns filled object
    processRecipes(recipesObj) {
        // Adapt object(s)
        recipesObj = this.applyToRecipesInObj(recipesObj, this.formatInstructions);
        // Load metadata if logged in
        if (store.getters.tokenPresent) {
            return new Promise((resolve) => {
                httpClient.get('/metadata').then(response => {
                    recipesObj = this.applyToRecipesInObj(recipesObj, this.attachMetadata, response.data);
                    resolve(recipesObj);
                }).catch(() => resolve(recipesObj))
            });
        } else {
            return new Promise((resolve) => {
                resolve(recipesObj);
            });
        }
    },

    // Template for applying a function to an object or array accordingly
    applyToRecipesInObj(recipesObj, applyFunction, extraData) {
        let result;
        let data = recipesObj.data;
        if (Array.isArray(data)) {
            // Update each recipe
            result = data.map(recipe => applyFunction(recipe, extraData));
        } else {
            // Update single recipe
            result = applyFunction(data, extraData)
        }
        recipesObj.data = result;
        return recipesObj;
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