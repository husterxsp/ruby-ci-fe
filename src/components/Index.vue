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
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                vertical-align: top;
                margin-top: 5px;
            }
        }
    }
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
            <div class="username" v-if="admin">
                admin
                <img src="../assets/avatar.png" class="avatar" />
            </div>
            <div class="username" v-else>
                {{username}}
                <img v-bind:src="imgurl" class="avatar" />
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
            username: sessionStorage.username,
            imgurl: sessionStorage.imgurl,
            admin: sessionStorage.admin
        };
    },
    methods: {

        
    }
}
</script>
