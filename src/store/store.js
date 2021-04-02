import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";


Vue.use(Vuex);

export const store = new Vuex.Store({

  state: {
    url: process.env.VUE_APP_URL,
    list:null,
    resolved:[],
    unresolved:[],
    backlog:[]
  },

  mutations: {
    getList(state){
      axios.get(state.url).then((response) =>{
        state.list = response.data.errors;
        for (var i = 0; i < state.list.length; i++) {
          const element = state.list[i];
          if(element.type === "resolved"){
            state.resolved.push(element);
          }
          else if (element.type === "unresolved") {
            state.unresolved.push(element);
          }
          else if (element.type === "backlog") {
            state.backlog.push(element);
          }
        }
      });
    }
  }
});
