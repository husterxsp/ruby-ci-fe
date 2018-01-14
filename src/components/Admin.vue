<style lang="less" scoped>
    .el-form {
        position: relative;
        left: -25px;
        margin: 0 auto;
        width: 30%;
        text-align: center;
        padding-top: 50px;
    }

</style>

<template>
    <div class="admin">
        <el-form :model="loginForm" status-icon :rules="rules" 
                ref="loginForm" label-width="100px" class="demo-ruleForm" v-if="!admin">
            <el-form-item label="用户名" prop="name">
                <el-input type="username" v-model="loginForm.name" auto-complete="off" placeholder="admin"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="loginForm.pass" auto-complete="off" placeholder="admin"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('loginForm')">管理员登录</el-button>
            </el-form-item>
        </el-form>        

        <el-table :data="userList" stripe style="width: 100%" v-if="admin">
            <el-table-column prop="user_name" label="用户名" ></el-table-column>
            <el-table-column prop="projects_num" label="项目数" ></el-table-column>
            <el-table-column prop="last_login" label="最近登录" ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button @click="reviewUser(scope.row)" type="text" size="small">查看</el-button>                    
                    <el-button
                        @click.native.prevent="deleteUser(scope.row)" type="text" size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios';
import Qs from 'qs';
import {setCookie} from '../lib/util.js';

import _global from '../config';

export default {
    data() {

        if (sessionStorage.admin) this.getUsers();

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

        this.$moment.locale('zh-cn');

        return {
            admin: sessionStorage.admin,
            userList: [],
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
        }
    },
    methods: {
        reviewUser(row) {
            sessionStorage.username = row.user_name;

            this.$router.push({ path: '/profile/' + row.user_name});
        },
        deleteUser(row) {
            console.log(row);
        },
        getUsers() {
            var _this = this;
            axios.get(_global.host + '/users/getusers')
            .then(function (res) {
                if (res.data.status == 0) {
                    _this.$message.error(res.data.message);
                }
                else {
                    _this.userList = res.data.userList || [];
                    
                    _this.udpateTime();
                }

            });
        },
        udpateTime() {
            for (var i = 0; i < this.userList.length; i++) {
                var time = +new Date(this.userList[i].last_login);
                this.userList[i].last_login = this.$moment(time).endOf().fromNow();
            }
        },
        login(loginForm) {
            var _this = this;
            this.$refs[loginForm].validate((valid) => {
                if (valid) {

                    var data = Qs.stringify( {
                        username: _this.loginForm.name,
                        password: _this.loginForm.pass
                    });                    

                    axios.post(_global.host + '/users/login', data, {
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

                            sessionStorage.admin = 1;

                            _this.admin = 1;

                            _this.$emit('sendData', sessionStorage);

                            _this.getUsers();
                        }
                    });
                }
            });
        }
    }
}
</script>