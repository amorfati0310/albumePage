import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

new Vue({
  el: '#app',
  render: h => h(App)
})

const EventBus = new Vue();

const store = {
  token: '',
  imgURL: ''
}

Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get() {
      return EventBus;
    }
  },
  $store: {
    get() {
      return store;
    }
  }
});

// Vue.prototype.$http = axios

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
