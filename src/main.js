// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import moment from "moment";
import VueMomentJS from "vue-momentjs";

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// import './assets/theme/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueMomentJS, moment);

Vue.use(ElementUI)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
