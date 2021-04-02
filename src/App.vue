<template>
  <div id="app">

    <div class="card mb-5">
      <div class="card-header">
        <button @click="collapseResolved('resolvedCollapseIcon')" style="color: #323232; font-weight: 600;" class="btn btn-block" type="button" data-toggle="collapse" data-target="#resolved" aria-expanded="false" aria-controls="">
          <div class="row">
            <div class="col-10 text-left">
              <div>
                <i class="fa fa-battery-full align-middle fa-2x" aria-hidden="true"></i><span class="align-middle break" style="margin-left: 10px;">Resolved</span>
              </div>
            </div>
            <div id="resolvedCollapseIcon" class="col-2 text-right">
              <i class="fa fa-angle-down fa-2x align-middle" aria-hidden="true"></i>
            </div>
          </div>
        </button>
      </div>
      <div id="resolved" class="card-body collapse">
        <div class="row col-12 mb-2" style="color: #323232; font-weight: 600;">
          <div class="col-4 col-xs-2">Code</div>
          <div class="col-8 col-xs-10">Error</div>
        </div>
        <div v-for="(element, index) in store.state.resolved" class="row col-12 mb-2">
          <div class="col-4 col-xs-2">{{element.code}}</div>
          <div class="col-5 col-xs-7">{{element.text}}</div>
          <button class="col-3 col-xs-3 btn btn-dark break" @click="resolvedToUnresolved(element)">Unresolve</button>
        </div>
      </div>
    </div>


    <div class="card mb-5">
      <div class="card-header">
        <button @click="collapseUnresolved('unresolvedCollapseIcon')" style="color: #323232; font-weight: 600;" class="btn btn-block" type="button" data-toggle="collapse" data-target="#unresolved" aria-expanded="false" aria-controls="">
          <div class="row">
            <div class="col-10 text-left">
              <div>
                <i class="fa fa-battery-empty align-middle fa-2x" aria-hidden="true"></i><span class="align-middle break" style="margin-left: 10px;">Unresolved</span>
              </div>
            </div>
            <div id="unresolvedCollapseIcon" class="col-2 text-right">
              <i class="fa fa-angle-down fa-2x align-middle" aria-hidden="true"></i>
            </div>
          </div>
        </button>
      </div>
      <div id="unresolved" class="card-body collapse">
        <div class="row col-12 mb-2" style="color: #323232; font-weight: 600;">
          <div class="col-4 col-xs-2">Code</div>
          <div class="col-8 col-xs-10">Error</div>
        </div>
        <div v-for="(element, index) in store.state.unresolved" class="row col-12 mb-2">
          <div class="col-4 col-xs-2">{{element.code}}</div>
          <div class="col-5 col-xs-7">{{element.text}}</div>
          <button class="col-3 col-xs-3 btn btn-success break" @click="unresolvedToResolved(element)">Resolve</button>
        </div>
      </div>
    </div>


    <div class="card mb-5">
      <div class="card-header">
        <button @click="collapseBacklog('backlogCollapseIcon')" style="color: #323232; font-weight: 600;" class="btn btn-block" type="button" data-toggle="collapse" data-target="#backlog" aria-expanded="false" aria-controls="">
          <div class="row">
            <div class="col-10 text-left">
              <div>
                <i class="fa fa-book align-middle fa-2x" aria-hidden="true"></i><span class="align-middle break" style="margin-left: 10px;">Backlog</span>
              </div>
            </div>
            <div id="backlogCollapseIcon" class="col-2 text-right">
              <i class="fa fa-angle-down fa-2x align-middle" aria-hidden="true"></i>
            </div>
          </div>
        </button>
      </div>
      <div id="backlog" class="card-body collapse">
        <div class="row col-12 mb-2" style="color: #323232; font-weight: 600;">
          <div class="col-4 col-xs-2">Code</div>
          <div class="col-8 col-xs-10">Error</div>
        </div>
        <div v-for="(element, index) in store.state.backlog" class="row col-12 mb-2">
          <div class="col-4 col-xs-2">{{element.code}}</div>
          <div class="col-5 col-xs-7">{{element.text}}</div>
          <button class="col-3 col-xs-3 btn btn-warning break" @click="backlogToUnresolved(element)">Unresolve</button>
        </div>
      </div>
    </div>
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
      list:null,
      resolvedClicked:false,
      unresolvedClicked:false,
      backlogClicked:false
    }
  },

  methods: {
    backlogToUnresolved(element){
      this.store.state.unresolved.push(element);
      const index = this.store.state.backlog.indexOf(element);
      this.store.state.backlog.splice(index, 1);
    },
    unresolvedToResolved(element){
      this.store.state.resolved.push(element);
      const index = this.store.state.unresolved.indexOf(element);
      this.store.state.unresolved.splice(index, 1);
    },
    resolvedToUnresolved(element){
      this.store.state.unresolved.push(element);
      const index = this.store.state.resolved.indexOf(element);
      this.store.state.resolved.splice(index, 1);
    },
    collapseResolved(id){
      this.resolvedClicked =! this.resolvedClicked;
      let collapseIconId = document.getElementById(id).childNodes[0];
      if(this.resolvedClicked === false){
        collapseIconId.setAttribute("class", "fa fa-angle-down fa-2x align-middle");
      }
      else{
        collapseIconId.setAttribute("class", "fa fa-angle-up fa-2x align-middle");
      }
    },
    collapseUnresolved(id){
      this.unresolvedClicked =! this.unresolvedClicked;
      let collapseIconId = document.getElementById(id).childNodes[0];
      if(this.unresolvedClicked === false){
        collapseIconId.setAttribute("class", "fa fa-angle-down fa-2x align-middle");
      }
      else{
        collapseIconId.setAttribute("class", "fa fa-angle-up fa-2x align-middle");
      }
    },
    collapseBacklog(id){
      this.backlogClicked =! this.backlogClicked;
      let collapseIconId = document.getElementById(id).childNodes[0];
      if(this.backlogClicked === false){
        collapseIconId.setAttribute("class", "fa fa-angle-down fa-2x align-middle");
      }
      else{
        collapseIconId.setAttribute("class", "fa fa-angle-up fa-2x align-middle");
      }
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
.break {
  white-space: normal;
  overflow-wrap: break-word;
}
</style>
