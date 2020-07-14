<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="8">
        <v-card class="card">
          <v-toolbar color="primary" class="mb-5">
            <v-avatar color="black-grey">
              <v-icon>mdi-food</v-icon>
            </v-avatar>
            <v-toolbar-title
              class="ml-2 font-weight-bold d-block text-center text-uppercase"
              >Cook A Meal</v-toolbar-title
            >
          </v-toolbar>

          <v-data-table
            v-if="!loading"
            :headers="dataTable.headers"
            :items="recipes"
            :single-expand="dataTable.singleExpand"
            :expanded.sync="dataTable.expanded"
            item-key="id"
            :show-expand="!reorderActive"
            hide-default-footer
            light
            :footer-props="{
              prevIcon: 'mdi-minus',
              nextIcon: 'mdi-plus',
              'items-per-page-options': [5, 10, 15, 30]
            }"
            :items-per-page="5"
          >
            <template v-slot:item.ready_in_minutes="{ item }">
              <v-chip :color="getColor(item.ready_in_minutes)" dark>
                {{ item.ready_in_minutes }}
              </v-chip>
            </template>
            <template v-slot:item.index="{ item }">
              <span v-if="!reorderActive" class="text--black">{{
                recipes.indexOf(item) + 1
              }}</span>
              <v-icon v-else x-small style="cursor: move"
                >mdi-drag-vertical</v-icon
              >
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td
                :colspan="headers.length"
                class="text-center"
                style="color: darkslategray;"
              >
                <router-link :to="'/recipe-cook/' + item.id">
                  <RecipeSummary
                    class="white--text"
                    style
                    :recipe="item"
                    size="md"
                    :height="height"
                    hideTitle="true"
                    disableAnimation="true"
                    :hideWatchedIndicator="hideWatchedIndicator"
                  />
                </router-link>
              </td>
            </template>
            <template v-slot:item.cooked="{ item }">
              <v-checkbox
                v-model="item.cooked"
                @change="updateCookedValue(item)"
              ></v-checkbox>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
          <div class>
            <br />
            <v-progress-linear
              style="max-width: 44em;"
              class="ml-7 black--text font-weight-bold"
              color="light-green darken-4"
              :buffer-value="100"
              :value="progress"
              height="25"
              >{{ Math.ceil(progress) || 0 }}%</v-progress-linear
            >
            <br />
          </div>
          <v-btn
            to="/"
            class="ma-3 small white--text"
            color="success"
            fab
            outlined
            small
            title="Back Home"
          >
            <v-icon dark>mdi-keyboard-backspace</v-icon>
          </v-btn>
          <v-btn
            @click="clearAll"
            class="ml-3 small white--text"
            color="success"
            fab
            outlined
            small
            title="Clear All"
          >
            <v-icon dark>mdi-delete-empty</v-icon>
          </v-btn>
          <v-btn
            @click="toggleReorder"
            class="ml-3 small white--text"
            color="success"
            fab
            :outlined="!reorderActive"
            small
            title="Reorder"
          >
            <v-icon dark>mdi-swap-vertical</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeService from "@/services/recipes";
import RecipeSummary from "../components/RecipeSummary";
import Sortable from "sortablejs";

export default {
  components: {
    RecipeSummary
  },

  data: () => ({
    loading: true,
    reorderActive: false,
    progress: 0,
    recipes: [],
    height: "1em",
    hideWatchedIndicator: true,
    dataTable: {
      headers: [
        { text: "#", value: "index", sortable: false },
        {
          text: "Dish",
          align: "start",
          sortable: false,
          value: "title"
        },
        { text: "Preparation time (min)", value: "ready_in_minutes" },
        { text: "Servings", value: "serving" },
        { text: "Dietary accommodations", value: "accommodations" },
        { text: "Cooked?", value: "cooked" },
        { text: "Action", value: "action" },
        { text: "", value: "data-table-expand" }
      ],
      expanded: [],
      singleExpand: true
    }
  }),

  async mounted() {
    this.recipes = (await RecipeService.getMealRecipes()).data;

    this.updateProgress();

    // Bootstrap recipe sorting
    setTimeout(() => {
      let table = document.querySelector(".v-data-table tbody");
      const _self = this;
      this.sortableInstance = Sortable.create(table, {
        disabled: true,
        onEnd({ newIndex, oldIndex }) {
          // Move relevant item
          const rowSelected = _self.recipes.splice(oldIndex, 1)[0];
          _self.recipes.splice(newIndex, 0, rowSelected);
          // Update server
          RecipeService.updateMealOrder(_self.recipes.map(r => r.id));
        }
      });
    }, 0);

    this.loading = false;
  },

  methods: {
    async clearAll() {
      await this.$store.dispatch("updateMealCount", 0);
      let pro = [];
      for await (let i of this.recipes) {
        const p = await RecipeService.removeFromMeal(i.id);
        pro.push(p);
      }
      await Promise.all(pro);
      this.recipes = [];
    },

    async deleteItem(item) {
      const index = item.id;
      confirm("Are you sure you want to delete this item?") &&
        (await RecipeService.removeFromMeal(index));
      this.recipes.splice(this.recipes.indexOf(item), 1);
    },

    updateCookedValue(item) {
      this.$store.dispatch("setCookedStatus", {
        recipeId: item.id,
        cooked: item.cooked
      });

      this.updateProgress();
    },

    getColor(rim) {
      if (rim > 45) return "red";
      else if (rim > 25) return "orange";
      else return "green";
    },

    updateProgress() {
      // Calculate precentage of cooked recipes of total recipes by preparation time
      let cooked = 0,
        total = 0;
      this.recipes.forEach(recipe => {
        total += recipe.ready_in_minutes;
        if (recipe.cooked) cooked += recipe.ready_in_minutes;
      });

      this.progress = (cooked / total) * 100;
    },

    toggleReorder() {
      // Disable expanded rows to avoid bugs with reordering
      this.dataTable.expanded = [];
      this.reorderActive = !this.reorderActive;
      // Toggle sorting
      this.sortableInstance.option("disabled", !this.reorderActive);
    }
  }
};
</script>

<style scoped></style>
