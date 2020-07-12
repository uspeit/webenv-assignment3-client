import List from "@/core/dataStructures";
import LocalStorageFacade from "@/core/localStorageFacade";


export default {
    state: {
        cookedRecipes: new List(LocalStorageFacade.getList("cookedRecipes"))
    },
    mutations: {
        cooked(state, { recipeId }) {
            state.cookedRecipes.add(recipeId);
        },
        revert_cooked(state, { recipeId }) {
            state.cookedRecipes.remove(recipeId);
        },
        clear(state) {
            state.cookedRecipes.clear();
        }
    },
    actions: {
        setCookedStatus({ commit }, { recipeId, cooked }) {
            return new Promise(resolve => {
                commit(cooked ? "cooked" : "revert_cooked", { recipeId: recipeId });
                LocalStorageFacade.updateList("cookedRecipes", cooked ? "add" : "remove", recipeId);
                resolve();
            });
        },
        clearCooked({ commit }) {
            return new Promise(resolve => {
                commit("clear");
                localStorage.removeItem("cookedRecipes");
                resolve();
            });
        }
    },
    getters: {
        cookedRecipes: state => state.cookedRecipes.items
    }
}