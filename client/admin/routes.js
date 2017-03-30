import Admin from './views/Admin.vue'
import Hello from './views/admin/Hello.vue'
import Menu from './views/admin/Menu.vue'
import Table from './views/admin/Table.vue'
import Time from './views/admin/Time.vue'
import App from './App.vue'
import User from './views/User.vue'
import Game from './views/Game.vue'
import Login from './views/Login.vue'



const routes = [{
    path: '/',
    component: App,
    name: 'app',
    redirect: 'admin'
  }, {
    path: '/admin',
    component: Admin,
    name: 'admin',
    children: [{
      path: 'user/:id',
      component: User,
      name: 'user'
    }, {
      path: 'game',
      component: Game,
      name: 'game'
    }, {
      path: 'menu',
      component: Menu,
      name: 'menu',
      children: [{
        path: 'time',
        component: Time,
        name: 'time',
      }, {
        path: 'table',
        component: Table,
        name: 'table',
      }, {
        path: 'hello',
        component: Hello,
        name: 'hello'
      }]
    }]
  }, {
    path: '/login',
    component: Login,
    name: 'login'
  }
  // { path: '*', redirect: '/login' }
]
export default routes
