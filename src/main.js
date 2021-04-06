// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import Pusher from "pusher-js"
import tooltipDirective from './directives/tooltip.directive'
import loader from "./components/Loader"
import './assets/styles/main.scss'

// global components
Vue.component('loader', loader)

// directives
Vue.directive('tooltip', tooltipDirective)

// filters
Vue.filter('date', dateFilter);

// Vue config
Vue.config.productionTip = false
// Require all plugins folder
require('./plugins')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mounted: function() {
    let user = JSON.parse(localStorage.getItem('user'));

    // Pusher.logToConsole = true;
    let pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
      cluster: process.env.VUE_APP_PUSHER_CLUSTER
    });
    store.commit('setLoggedInUser', user);
    store.commit('setPusher', pusher);

  },
  components: { App },
  template: '<App/>'
})
