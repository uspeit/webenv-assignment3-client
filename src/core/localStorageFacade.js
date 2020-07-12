import List from "./dataStructures"

// Provides a facade to local storage
// mainly enables saving and maintaining lists
export default {
    getList(itemName) {
        if (localStorage.getItem(itemName))
            return JSON.parse(localStorage.getItem(itemName));
        else return [];
    },

    updateList(itemName, action, recipeId) {
        let list = new List(this.getList(itemName));
        if (action === "add")
            list.add(recipeId);
        else if (action === "remove")
            list.remove(recipeId);

        localStorage.setItem(itemName, JSON.stringify(list.items))
    }
}