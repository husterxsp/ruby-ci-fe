import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Admin from '@/components/Admin'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Project from '@/components/Project'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            redirect: 'login',
            children: [
                {
                    path: '/login',
                    component: Login
                },
                {
                    path: '/profile/:id',
                    component: Profile,
                },
                {
                    path: '/project/:author/:project',
                    component: Project,
                },
                {
                    path: '/admin',
                    component: Admin
                },
                {
                    path: '/about',
                    component: About
                }
            ]
        }
    ]
})
