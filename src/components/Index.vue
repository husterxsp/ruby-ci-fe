<style lang="less" scoped>
    .header {
        height: 60px;
        background-color: #f1f1f1;
        padding: 0 20px;
        .logo {
            line-height: 60px;
            float: left;
            cursor: pointer;
        }
        ul {
            margin-left: 30px;
            float: left;
            li {
                float: left;
                line-height: 60px;

            }
        }
        .username {
            float: right;
            line-height: 60px;
            padding: 0 20px;
            .logout {
                display: inline-block;
                cursor: pointer;
            }
        }
    }
    .index {
        height: 100%;
        width: 100%;
    }
    .container {
        min-height: 100%;
        width: 100%;
    }
</style>
<template>
    <div class="index">
        <div class="header">
            <h1 class="logo"><a href="/">Ruby-CI</a></h1>
            <ul class="menu">
                <li>
                    <router-link to="/about">关于</router-link>
                </li>
            </ul>
            <div class="username">
                {{$route.params.username}}
                <div class="logout" @click="logout" v-if="$route.params.username"> / 退出登录</div>
            </div>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: ''
        };
    },
    mounted: function () {

        this.username =  this.$route.params.username;

    },
    methods: {
        logout() {
            localStorage.clear();
            this.username = '';

            this.$router.push({ path: '/login' });
        }
    }
}
</script>
