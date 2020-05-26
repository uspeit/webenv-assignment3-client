import Vue from "vue";

Vue.filter("timeString", function(value) {
    if (!value || value < 5) return "A few Minutes";
    if (value >= 60) {
      if (value >= 120) return "More than " + parseInt(value / 60) + " hours";
      return "More than an hour";
    }
    return parseInt(value / 5) * 5 + " minutes";
});