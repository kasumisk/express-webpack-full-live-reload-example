// import Vue from 'vue'
// import App from './App'
//
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })

import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Resource from 'vue-resource'
import store from './store'

import Element from 'element-ui'


Vue.use(Element)

Vue.use(Router)
Vue.use(Resource)
// Vue.use(store)

const config = {
    linkActiveClass: 'active',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: routes
}

let app = require('./App.vue')
// import App from './App.vue'

app.router = new Router(config)
app.store = store

//路由拦截器
app.router.beforeEach((to, from, next) => {
  // console.log(from)
  next();
});

// new Vue({
//   el: '#app',
//   store,
//   render: h => h(App)
// })

new Vue(app).$mount('#app')
