<style lang="less">
    .login {
        text-align: center;
        padding-top: 150px;
    }
    .icon-github {
        font-size: 1.2em;
    }
</style>
<template>
    <div class="login">
        <el-button type="primary">
            <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=b19afefbbe329468fd6d">
                <i class="demo-icon icon-github"></i>使用Github账户登录
            </a>
        </el-button>
    </div>
</template>
<script>

export default {
    data() {
        return {
            
        };
    },
    methods: {  

    }
}
</script>