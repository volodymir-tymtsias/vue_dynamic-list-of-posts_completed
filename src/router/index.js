import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
      meta: {
        needsAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    let user;
    const jsonData = localStorage.getItem('user') || '{}';

    try {
      user = JSON.parse(jsonData);
      if (user.id) {
        next();
      } else {
        next("/login");
      }
    } catch (e) {
      next("/login");
    }
  } else {
    next();
  }
});

export default router
