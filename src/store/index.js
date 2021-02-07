import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
    students: [
      {
        name: "tom",
        age: 10,
      },
      {
        name: "jerry",
        age: 20,
      },
    ],
    info: {
      name: "zhangsan",
      age: 12,
    },
  },
  mutations: {
    prev(state) {
      state.counter--;
    },
    next(state) {
      state.counter++;
    },
    updateInfo(state) {
      // state.info.name = "lisi";
      // state.info["address"] = "洛杉矶";
      // Vue.set(state.info, "address", "洛杉矶");
      // delete state.info.name;
      Vue.delete(state.info,'name')
    },
  },
  getters: {
    more20age(state) {
      return state.students.filter((item) => item.age >= 20);
    },
    more20agelength(state) {
      return function(age) {
        return state.students.filter((item) => item.age >= age).length;
      };
    },
  },
  actions: {},
  modules: {},
});
