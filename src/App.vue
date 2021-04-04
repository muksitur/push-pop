<template>
  <div id="app">

    <header class="fixed-top container-fluid col-12" style="z-index:1;">
      <nav class="row rounded" style="background-color:white;">
        <div class="">
          <button v-if="store.state.notification.length!==0" @click="openSideNav()" class="btn" style="background-color:white; height: 30px; margin-bottom:5px;">
            <i class="fa fa-comments fa-2x" aria-hidden="true"></i>
          </button>
        </div>
        <div class="col-11 row justify-content-center">
          <span class="break" style="font-weight: 600; font-size: 19px; color:#4E4E4E;">Error Log</span>
        </div>
      </nav>
    </header>

    <div id="mySidenav" class="sidenav col-12 position-fixed">
      <header class="row justify-content-between container" style="width:275px; margin-right:0px; height:35px; position:fixed; top:0px; background-color:white; z-index:2">
        <span class="row col-12 justify-content-center" style="color:#4E4E4E; height:30px; font-weight: 600; font-size: 19px;">Notification</span>
        <button @click="closeSideNav()" class="btn col-1" style="background-color:white; height:30px; margin-bottom:5px;">
          <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
        </button>
      </header>
      <ul id="myUL" class="list-group list-unstyled" style="padding-bottom:40px; padding-top:30px;">
        <li v-for="(message, i) in notification" class="mb-2">
          <div class="row btn-group btn-group-toggle" data-toggle="buttons">
            <button class="break btn w-100 d-block btn-info" style="padding:0px;" data-toggle="modal" :data-target="'#notification'+message.index">
              <label class="break btn w-100">
                <input type="radio" name="options" autocomplete="off">
                <div class="row" style="margin-left:20px;">
                  <span style="margin-top:5px; margin-left:10px; margin-right:10px; font-weight:600; font-size:22px;">{{message.text.substring(0,18)}}</span>
                </div>
              </label>
            </button>
          </div>
          <div class="modal fade" :id="'notification'+message.index" tabindex="0" role="dialog" aria-labelledby="" aria-hidden="">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Message Index: {{message.index}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div>{{message.text}}</div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" @click="read(i, 'notification'+message.index)">Mark As Read</button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <footer class="container" style="width:275px; background-color:white; position:fixed; bottom:0px; margin-left:-15px; height:40px; margin-right:15px; box-shodow: 2px 2px;">
        <span class="row justify-content-end pr-2 mt-2" style="height:23px; color:#767474; font-size:13px;">Version 0.0.1</span>
      </footer>
    </div>

    <div class="" @click="closeSideNav()">
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
            <button class="col-3 col-xs-3 btn btn-dark break" data-toggle="modal" :data-target="'#resolved'+element.index">
              Unresolve
            </button>
            <div class="modal fade" :id="'resolved'+element.index" tabindex="0" role="dialog" aria-labelledby="" aria-hidden="">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Error Index: {{element.index}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div>Error Text: {{element.text}}</div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">UNDO</button>
                    <button type="button" class="btn btn-primary" @click="resolvedToUnresolved(element, 'resolved'+element.index)">CONFIRM</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="card">
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
            <button class="col-3 col-xs-3 btn btn-success break" data-toggle="modal" :data-target="'#unresolved'+element.index">
              Resolve
            </button>
            <div class="modal fade" :id="'unresolved'+element.index" tabindex="0" role="dialog" aria-labelledby="" aria-hidden="">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Error Index: {{element.index}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div>Error Text: {{element.text}}</div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">UNDO</button>
                    <button type="button" class="btn btn-primary" @click="unresolvedToResolved(element, 'unresolved'+element.index)">CONFIRM</button>
                  </div>
                </div>
              </div>
            </div>
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
            <button class="col-3 col-xs-3 btn btn-warning break" data-toggle="modal" :data-target="'#backlog'+element.index">
              Unresolve
            </button>
            <div class="modal fade" :id="'backlog'+element.index" tabindex="0" role="dialog" aria-labelledby="" aria-hidden="">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Error Index: {{element.index}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div>Error Text: {{element.text}}</div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">UNDO</button>
                    <button type="button" class="btn btn-primary" @click="backlogToUnresolved(element, 'backlog'+element.index)">CONFIRM</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      resolvedClicked:false,
      unresolvedClicked:false,
      backlogClicked:false,
      notification:[]
    }
  },

  methods: {
    openSideNav(){
      document.getElementById("mySidenav").style.left = "0px";
      this.notification = this.store.state.notification;
    },
    closeSideNav(){
      document.getElementById("mySidenav").style.left = "-290px";
    },
    read(index, modalId){
      this.store.state.notification.splice(index, 1);
      this.notification = this.store.state.notification;
      $('#'+modalId).modal('hide');
    },
    backlogToUnresolved(element, modalId){
      this.store.state.unresolved.push(element);
      const index = this.store.state.backlog.indexOf(element);
      this.store.state.backlog.splice(index, 1);
      $('#'+modalId).modal('hide');
    },
    unresolvedToResolved(element, modalId){
      this.store.state.resolved.push(element);
      const index = this.store.state.unresolved.indexOf(element);
      this.store.state.unresolved.splice(index, 1);
      $('#'+modalId).modal('hide');
    },
    resolvedToUnresolved(element, modalId){
      this.store.state.unresolved.push(element);
      const index = this.store.state.resolved.indexOf(element);
      this.store.state.resolved.splice(index, 1);
      $('#'+modalId).modal('hide');
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
.modal-backdrop {
  z-index: 0;
}
.sidenav {
  margin-top:-30px;
  background-color: rgb(241, 241, 241);
  height:100%;
  left: -290px;
  overflow-y:scroll;
  width: 275px;
  transition: 1s;
  z-index:1;
  box-shadow: 2px 2px 8px #888888;
}
</style>
