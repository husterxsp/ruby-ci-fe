import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Admin from '@/components/Admin'
import About from '@/components/About'
import Project from '@/components/Project'
import UserProfile from '@/components/UserProfile'

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
                    path: 'login',
                    component: Login
                },
                {
                    path: 'profile',
                    component: UserProfile,
                    redirect: ':username',
                    children: [
                        {
                            path: ':username',
                            component: Project,
                            children: [
                                {
                                    path: ':projectName',
                                    component: Project
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'admin',
                    component: Admin
                },
                {
                    path: 'about',
                    component: About
                }
            ]
        }
    ]
})
