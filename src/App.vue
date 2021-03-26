<template>
  <div id="app">

    <button class="btn btn-primary" @click="show()">
      show
    </button>
  </div>
</template>

<script>
import {store} from './store/store.js'

export default {
  name: 'App',

  components: {

  },

  data: function(){
    return {
      store:store,
      list:null
    }
  },

  methods: {
    show(){
      this.list = this.store.state.list;
      console.log(this.list.errors);
    }
  },
  mounted() {
    this.store.commit('getList');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
