<style lang="less">
    @import '../assets/css/fontello.css';
    .index {
        height: 100%;
        width: 100%;
    }
    .container {
        min-height: 100%;
        width: 80%;
        min-width: 1000px;
        margin: 0 auto;
        padding: 30px 0;
        box-sizing: border-box;
    }
    
    .el-breadcrumb {
        margin: 0 20px 10px
    }
    .header {
        height: 60px;
        background-color: #f1f1f1;
        padding: 0 50px;
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
    }
    .menu-left {
        li {
            padding: 0 10px;
        }
    }
    .menu-right {
        float: right;
        .admin {
            display: inline-block;
            line-height: 60px;
            padding: 0 10px;            
            font-size: 25px;

        }
        .user {
            display: inline-block;
            line-height: 60px;
            padding: 0 10px;
            .avatar {
                position: relative;
                display: inline-block;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    vertical-align: top;
                    margin-top: 10px;
                }
            }
        }
        .lagout {
            font-size: 20px;
            line-height: 60px;
        }
    }
    a:hover {
        text-decoration: underline;
    }
</style>
<template>
    <div class="index">
        <div class="header">
            <h1 class="logo"><a href="/">Ruby-CI</a></h1>
            <ul class="menu-left">
                <li><router-link to="/about">关于</router-link></li>
                <li><router-link to="/admin">管理员</router-link></li>
            </ul>
            <div class="menu-right" v-if="admin || username">
                <div class="admin" v-if="admin">
                    <a title="admin" href="/">
                        <i class="demo-icon icon-github-circled"></i>
                    </a>
                </div>
                <div class="user" v-else-if="username">
                    <a :title="username" href="/" class="avatar">
                        <img v-bind:src="imgurl" :title="username"/>
                    </a>
                </div>
                <a href="/" class="lagout" @click="lagout">
                    <i class="demo-icon icon-logout"></i>
                </a>
            </div>
        </div>
        <div class="container">
            <router-view v-on:sendData='updateData'></router-view>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {getCookie, deleteAllCookies} from '../lib/util.js';

export default {
    data() {
        return {
            username: sessionStorage.username,
            imgurl: sessionStorage.imgurl,
            admin: sessionStorage.admin
        };
    },
    created() {
        this.redirect();

        var profile = getCookie('profile');

        if (!profile) this.$router.push({path: '/login'});

        profile = profile.split('&imgurl=');

        var username = profile[0];
        var imgurl = profile[1];
        var admin = getCookie('admin');

        sessionStorage.imgurl = imgurl;
        sessionStorage.username = username;
        sessionStorage.admin = admin;

        this.imgurl = imgurl;
        this.username = username;
        this.admin = admin;

        this.redirect();
    },

    methods: {
        redirect() {
            if (this.admin) this.$router.push({path: '/admin'});
            else if (this.username) this.$router.push({path: '/profile/' + this.username});
        },
        updateData (newData) {
            this.username = newData.username;
            this.imgurl = newData.imgurl;
            this.admin = newData.admin;
        },
        lagout() {
            sessionStorage.clear();
            deleteAllCookies();

            location.href = '/';
        }
    }
}
</script>
