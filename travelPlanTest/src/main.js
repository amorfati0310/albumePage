import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

new Vue({
  el: '#app',
  render: h => h(App)
})




Vue.prototype.$http = axios
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
