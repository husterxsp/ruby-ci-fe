<style lang="less" scoped>
    .login {
        text-align: center;
        padding-top: 150px;
    }
</style>
<template>
    <div class="login">
        <el-button type="primary">
            <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=b19afefbbe329468fd6d">使用Github账户登录
            </a>
        </el-button>
    </div>
</template>
<script>
import {getCookie} from '../lib/util.js';

export default {
    data() {
        var profile = getCookie('profile').split('&imgurl=');
        var username = profile[0];
        var imgurl = profile[1];
        var admin = getCookie('admin');

        sessionStorage.imgurl = imgurl;
        sessionStorage.username = username;
        sessionStorage.admin = admin;

        this.$emit('sendData', sessionStorage);

        if (admin) this.$router.push({path: '/admin'});
        else if (username) this.$router.push({path: '/profile/' + username});

        return {
            
        };
    },
    methods: {  

    }
}
</script>