import List from "@/core/dataStructures";
import localStorageFacade from "@/core/localStorageFacade";

export default {
  state: {
    cookedRecipes: new List(localStorageFacade.getList("cookedRecipes")),
    mealCount: ""
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
    },
    update_meal_count(state, { count }) {
      state.mealCount = count;
    }
  },
  actions: {
    setCookedStatus({ commit }, { recipeId, cooked }) {
      return new Promise(resolve => {
        commit(cooked ? "cooked" : "revert_cooked", { recipeId: recipeId });
        localStorageFacade.updateList(
          "cookedRecipes",
          cooked ? "add" : "remove",
          recipeId
        );
        resolve();
      });
    },
    clearCooked({ commit }) {
      return new Promise(resolve => {
        commit("clear");
        localStorage.removeItem("cookedRecipes");
        resolve();
      });
    },
    updateMealCount({ commit }, newCount) {
      commit("update_meal_count", { count: newCount });
    }
  },
  getters: {
    cookedRecipes: state => state.cookedRecipes.items,
    mealCount: state => state.mealCount
  }
};
