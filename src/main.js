// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import request from './components/request.js'
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import axios from 'axios';



Vue.component(VeLine.name, VeLine);
Vue.component(VePie.name, VePie);
Vue.component(VeHistogram.name, VeHistogram);
Vue.config.productionTip = false;
Vue.prototype.request = request;
Vue.prototype.axios = axios;
Vue.prototype.baseUrl = "http://39.105.35.188:1500";
Vue.prototype.$Loading.config({
  color: '#19D4AE',
  height: 3
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
