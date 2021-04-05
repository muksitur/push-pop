import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";


Vue.use(Vuex);

export const store = new Vuex.Store({

  state: {
    url: process.env.VUE_APP_URL,
    errors:null,
    messages:null,
    operators:[],
    notification:[],
    resolved:[],
    unresolved:[],
    backlog:[],
    operatorRequestCount:[],
    requestCount:0,
    resolved_unresolved:null,
    resolved_backlog:null,
    unresolved_backlog:null,
    resolvedCount:[]
  },

  mutations: {
    getList(state){
      axios.get(state.url).then((response) =>{
        state.operators = response.data.operators;
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
          if(temp.operatorRequestCount.length!==0){
            for (var i = 0; i < temp.operatorRequestCount.length; i++) {
              console.log('operator name: ',temp.operators[i].name, '//request count: ', temp.operatorRequestCount[i]);
            }
          }
          console.log('total request count ', temp.requestCount);
          temp.resolved_unresolved = temp.resolved_backlog = temp.unresolved_backlog = 0;
          for (var i = 0; i < temp.resolved.length; i++) {
            const element = temp.resolved[i];
            for (var j = 0; j < temp.unresolved.length; j++) {
              if(element.code===temp.unresolved[j].code){
                temp.resolved_unresolved++;
              }
            }
          }
          for (var i = 0; i < temp.resolved.length; i++) {
            const element = temp.resolved[i];
            for (var j = 0; j < temp.backlog.length; j++) {
              if(element.code===temp.backlog[j].code){
                temp.resolved_backlog++;
              }
            }
          }
          for (var i = 0; i < temp.unresolved.length; i++) {
            const element = temp.unresolved[i];
            for (var j = 0; j < temp.backlog.length; j++) {
              if(element.code===temp.backlog[j].code){
                temp.unresolved_backlog++;
              }
            }
          }
          for (var i = 0; i < temp.resolvedCount.length; i++) {
            if(Number.isNaN(Number(temp.resolvedCount[i])) === false){
              console.log('this error code ', i, ' is resolved ', temp.resolvedCount[i], ' times');
            }
          }
          console.log('resolved_unresolved: ', temp.resolved_unresolved, ', resolved_backlog: ', temp.resolved_backlog, ', unresolved_backlog', temp.unresolved_backlog);
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
