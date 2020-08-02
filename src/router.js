/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-08-01 21:35
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/Index'
import ChatRoom from './pages/ChatRoom'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Index },
    { path: '/chat-room', component: ChatRoom }
  ]
})
