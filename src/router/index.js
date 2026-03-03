import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogDetailView from '../views/BlogDetailView.vue'
import AddBlogView from '../views/AddBlogView.vue'
import AboutView from '../views/AboutView.vue'
import ExploreView from '../views/ExploreView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/explore',
    name: 'explore',
    component: ExploreView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/blog/:id',
    name: 'blog-detail',
    component: BlogDetailView
  },
  {
    path: '/add-blog',
    name: 'add-blog',
    component: AddBlogView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
