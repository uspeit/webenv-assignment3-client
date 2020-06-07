import httpClient from '@/services/httpClient'

export default {
    getRandomRecipes() {
        return httpClient.get('/recipes/rand')
    },

    getRecentRecipes() {
        return httpClient.get('/metadata/watched')
    },

    getRecipe(id) {
        return httpClient.get('/recipes/' + id)
    },

    toggleSave(id) {
        return httpClient.post('/metadata/favs/' + id)
    },

    setWatched(id) {
        return httpClient.post('/metadata/watched/' + id)
    },

    searchRecipes(query, selectedFilters) {
        return httpClient.get('/recipes/search', {
            query: query,
            cuisine: selectedFilters.cuisine,
            diet: selectedFilters.diet,
            intolerances: selectedFilters.intolerances,
            number: 5,
            instructionsRequired: true,
            offset: 0,
            page: 0,
            limit: 5,
        })
    }
}

// var mockRecipes = [
//     {
//         id: 1,
//         imgUrl:
//             "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/a1b309fa5bd84f21a645882c566b9e49/FB_05.jpg?output-quality=100&resize=900:*",
//         title: "Garlic Parmesan Grilled Corn",
//         prepTime: 60,
//         likes: 12,
//         restrictions: {
//             vegan: true,
//             vegetarian: true,
//             glutenFree: true
//         },
//         watched: false,
//         saved: false
//     },
//     {
//         id: 2,
//         imgUrl:
//             "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/184242.jpg?output-quality=100&resize=900:*",
//         title: "Low-Carb Eggplant Lasagna",
//         prepTime: 180,
//         likes: 14,
//         restrictions: {
//             vegan: false,
//             vegetarian: true,
//             glutenFree: false
//         },
//         watched: false,
//         saved: false
//     },
//     {
//         id: 3,
//         imgUrl:
//             "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_760,h_1064/k%2Farchive%2Fabd338f6b7c142c9d03b060e88bb5e5d99ad1ca4",
//         title: "Savoury Spaghetti With Meatballs",
//         prepTime: 45,
//         likes: 12,
//         restrictions: {
//             vegan: false,
//             vegetarian: false,
//             glutenFree: false
//         },
//         watched: false,
//         saved: false
//     }
// ];