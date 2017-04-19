import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import MusicLibrary from '@/components/pages/MusicLibrary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/music-library',
      name: 'MusicLibrary',
      component: MusicLibrary
    }
  ]
})
