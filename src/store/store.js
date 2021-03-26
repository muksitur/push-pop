import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";


Vue.use(Vuex);

export const store = new Vuex.Store({

  state: {
    url: process.env.VUE_APP_URL,
    list:null
  },

  mutations: {
    getList(state){
      axios.get(state.url).then((response) =>{
        state.list = response.data;
      });
    }
  }
});
