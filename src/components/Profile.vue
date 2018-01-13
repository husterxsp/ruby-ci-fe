<style lang="less" scoped>
.profile {
    position: relative;
    margin: 0 auto;
}
.el-breadcrumb {
    margin: 0 20px 10px
}
</style>
<template>
    <div class="profile">
        <el-breadcrumb separator="/" v-if='admin'>
            <el-breadcrumb-item :to="{ path: '/profile/' + username }"> 当前查看用户：{{username}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" ref="list">项目列表</el-menu-item>
            <el-menu-item index="2" @click="addProject">添加项目</el-menu-item>
        </el-menu>
        <div class="line"></div>

        <el-table :data="projectList" stripe style="width: 100%" >
            <el-table-column prop="project_name" label="项目名称" ></el-table-column>
            <el-table-column prop="buildinfo_num_all" label="构建次数" ></el-table-column>
            <el-table-column prop="author" label="所有者" ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button @click="reviewProject(scope.row)" type="text" size="small">查看</el-button>     
                    <el-button
                        @click.native.prevent="delProject(scope.row)" type="text" size="small">
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

import _global from '../config';

export default {
    data() {
        return {
            username: sessionStorage.username,
            admin: sessionStorage.admin,
            activeIndex: '1',
            projectList: []
        }
    },
    created() {
        this.$moment.locale('zh-cn');

        this.getProjects();
    },
    methods: {
        deleteRow(index, row) {
            console.log(index, row);
        },
        reviewProject(row) {
            this.$router.push({ path: '/project/' + row.author + '/' + row.project_name });
        },
        getProjects() {
            var _this = this;

            axios.get(_global.host + '/projects/getprojects', {params: {
                    username: _this.username
                }
            })
            .then(function (res) {

                _this.projectList = res.data.projectList || [];

            });

            // for (item in _this.projectList.build_list) {
            //     item.time = _this.$moment.endOf(item.time).fromNow();
            // }
        },
        delProject(row) {
            var _this = this;

            var data = Qs.stringify({
                author: row.author,
                user_name: _this.username,
                project_name: row.project_name
            });

            axios.post(_global.host + '/projects/delproject', data)
            .then(function (res) {
                if (res.data.status == 1) {
                    _this.$message({
                        message: '删除成功',
                        type: 'success'
                    });

                    _this.projectList.splice(row.index, 1);                    
                }
            });
        },
        addProject() {
            var _this = this;
            var githubReg = /https:\/\/github.com\/[\w\-\_\.]+\/([\w\-\_\.]+)/;

            _this.$prompt('请输入GitHub项目URL', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: githubReg,
                inputErrorMessage: '项目地址格式不正确'
            }).then(({ value }) => {

                // 此处加验证github url
                var data = Qs.stringify({
                    username: _this.username,
                    author: githubReg.exec(value)[1],
                    project_name: githubReg.exec(value)[2],
                    project_url: value
                });

                axios.post(_global.host + '/projects/addproject', data, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function (res) {
                    if (res.data.status == 0) {
                        _this.$message.error(res.data.message);
                    }
                    else {
                        _this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        _this.getProjects();
                    }
                });

                _this.$refs.list.$el.click();
            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '取消输入'
                });

                _this.$refs.list.$el.click();
            });

        }
    }
}
</script>