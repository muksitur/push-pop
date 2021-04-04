import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";


Vue.use(Vuex);

export const store = new Vuex.Store({

  state: {
    url: process.env.VUE_APP_URL,
    errors:null,
    messages:null,
    notification:[],
    resolved:[],
    unresolved:[],
    backlog:[]
  },

  mutations: {
    getList(state){
      axios.get(state.url).then((response) =>{
        state.messages = response.data.messages;
        state.errors = response.data.errors;
        for (var i = 0; i < state.errors.length; i++) {
          const element = state.errors[i];
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
        let temp = state;
        setInterval(function(){
          const check = Math.floor(Math.random() * 2);
          if(check === 0){
            const randomIndex = Math.floor(Math.random() * (temp.messages.length - 1));
            temp.notification.push(temp.messages[randomIndex]);
          }
        }, 3000);
      });
    }
  }
});
