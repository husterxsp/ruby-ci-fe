<style lang="less" scoped>
    .login {
        margin-top: 100px;
    }
    .el-form {
        margin: 0 auto;
        width: 30%;
    }
</style>
<template>
    <div class="login">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input type="username" v-model="loginForm.name" auto-complete="off" placeholder="Github"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('loginForm')">登录</el-button>
                <el-button @click="register('loginForm')">注册</el-button>
            </el-form-item>
        </el-form>        
    </div>
</template>
<script>
import axios from 'axios';
import Qs from 'qs';

export default {
    data() {

        // 判断已登录跳转首页
        var username = localStorage.username;
        var adminname = localStorage.adminname;
        if (adminname) {
            this.$router.push({ path: '/admin/'});
        }
        else if (username) {
            this.$router.push({ path: '/profile/' + username });   
        }

        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };

        return {
            loginForm: {
                name: '',
                pass: '',
            },
            rules: {
                name: [
                    { validator: validateName, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        login(loginForm) {

            var _this = this;
            this.$refs[loginForm].validate((valid) => {
                if (valid) {

                    var data = Qs.stringify( {
                        username: this.loginForm.name,
                        password: this.loginForm.pass
                    });                    

                    axios.post('https://limiao-limiao.c9users.io/users/login', data, {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                    .then(function (res) {
                        if (res.data.status == 0) {
                            _this.$message.error(res.data.message);
                        }
                        else {
                            _this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            
                            if (res.data.user_type == 1) {
                                localStorage.adminname = _this.loginForm.name;
                                localStorage.admin = 1;
                                _this.$router.push({ path: '/admin' });
                            }                            
                            else {
                                localStorage.username = _this.loginForm.name;
                                _this.$router.push({ path: '/profile/' + localStorage.username });
                            }
                        }
                    });
                }

            });
        },
        // register(loginForm) {
        //     var _this = this;
        //     this.$refs[loginForm].validate((valid) => {
        //         if (valid) {

        //             var data = Qs.stringify( {
        //                 username: _this.loginForm.name,
        //                 password: _this.loginForm.pass
        //             });
                    
        //             axios.post('https://limiao-limiao.c9users.io/users/regist', data, {
        //                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //             })
        //             .then(function (res) {
        //                 if (res.status == 0) {
        //                     _this.$message.error(res.message);
        //                 }
        //                 else {
        //                     _this.$message({
        //                         message: '注册成功',
        //                         type: 'success'
        //                     });

        //                     _this.$router.push({ path: '/login' });

        //                 }
        //             });
        //         }
        //     });
            
        // }
    }
}
</script>