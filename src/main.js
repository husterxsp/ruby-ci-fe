// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import moment from "moment"
import VueMomentJS from "vue-momentjs"

// import VueHighlightJS from 'vue-highlightjs'


import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// import './assets/theme/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Qs from 'qs'


import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件
                                            //
Vue.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
        hljs.highlightBlock(block)
    })
})


var axios_instance = axios.create({
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
})
Vue.use(VueAxios, axios_instance)


Vue.use(VueMomentJS, moment);

// Vue.use(VueHighlightJS)

Vue.use(ElementUI)

// Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.directive('highlightjs', {
    deep: true,
    bind: function(el, binding) {
        // on first bind, highlight all targets
        let targets = el.querySelectorAll('code')
        targets.forEach((target) => {
            // if a value is directly assigned to the directive, use this
            // instead of the element content.
            if (binding.value) {
                target.textContent = binding.value
            }
            hljs.highlightBlock(target)
        })
    },
    componentUpdated: function(el, binding) {
        // after an update, re-fill the content and then highlight
        let targets = el.querySelectorAll('code')
        targets.forEach((target) => {
            if (binding.value) {
                target.textContent = binding.value
                hljs.highlightBlock(target)
            }
        })
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
