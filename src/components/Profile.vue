<style lang="less" scoped>
.profile {
    position: relative;
    margin: 0 auto;
}

</style>
<template>
    <div class="profile">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" ref="list">项目列表</el-menu-item>
            <el-menu-item index="2" @click="addProject">添加项目</el-menu-item>
        </el-menu>
        <div class="line"></div>

        <el-table :data="projectList" stripe style="width: 100%" >
            <el-table-column prop="project_name" label="项目名称" ></el-table-column>
            <el-table-column prop="buildinfo_num" label="构建次数" ></el-table-column>
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

export default {
    data() {

        this.$moment.locale('zh-cn');


        this.getProjects();

        return {
            user_name: localStorage.user_name || '',
            admin_name: localStorage.admin_name || '',
            activeIndex: '1',
            projectList: []
        }
    },
    methods: {
        deleteRow(index, row) {
            console.log(index, row);
        },
        reviewProject(row) {
            this.$router.push({ path: '/project/' + row.project_name });
        },
        getProjects() {
            var _this = this;
            var username = localStorage.username;

            axios.get('https://limiao-limiao.c9users.io/projects/getprojects', {params: {
                    username: username
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
            var username = localStorage.username;

            var data = Qs.stringify({
                user_name: username,
                project_name: row.project_name
            });

            axios.post('https://limiao-limiao.c9users.io/projects/delproject', data)
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

            _this.$prompt('请输入GitHub项目地址', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /https:\/\/github.com\/\w+\/([\w\-\_]+)/,
                inputErrorMessage: '项目地址格式不正确'
            }).then(({ value }) => {

                // 此处加验证github url
 
                var data = Qs.stringify({
                    username: localStorage.username,
                    author: /https:\/\/github.com\/(\w+)\/([\w\_\-]+)/.exec(value)[1],
                    project_name: /https:\/\/github.com\/(\w+)\/([\w\_\-]+)/.exec(value)[2],
                    project_url: value
                });

                axios.post('https://limiao-limiao.c9users.io/projects/addproject', data, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function (res) {
                    if (res.status == 0) {
                        _this.$message.error(res.message);
                    }
                    else {
                        _this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        _this.getProjects();
                    }
                });

                $(_this.$refs.list.$el).click();
            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '取消输入'
                });

                $(_this.$refs.list.$el).click();
            });

        }
    }
}
</script>