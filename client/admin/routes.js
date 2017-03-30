import Admin from './views/Admin'
import Hello from './views/admin/Hello'
import Menu from './views/admin/Menu'
import Table from './views/admin/Table'
import Time from './views/admin/Time'
import App from './App'
import User from './views/User'
import Game from './views/Game'
import Login from './views/Login'



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
