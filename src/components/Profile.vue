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
            <el-table-column prop="projectName" label="项目名称" ></el-table-column>
            <el-table-column prop="buildNum" label="构建次数" ></el-table-column>
            <el-table-column prop="author" label="所有者" ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button @click="reviewProject(scope.row)" type="text" size="small">查看</el-button>                    
                    <el-button
                        @click.native.prevent="deletePeoject(scope.$index, projectList)" type="text" size="small">
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
            username: localStorage.username,
            activeIndex: '1',
            projectList: [
                {
                    projectName: 'project-1',
                    buildNum: '1',
                    author: 'author-1'
                },
                {
                    projectName: 'project-2',
                    buildNum: '3',
                    author: 'author-2'
                }
            ]
        }
    },
    methods: {
        deleteRow(index, row) {
            console.log(index, row);
        },
        reviewProject(row) {
            this.$router.push({ path: '/project/' + row.projectName });
        },
        getProjects() {
            var _this = this;
            var username = localStorage.username;

            axios.get('http://127.0.0.1:3000/users/getprojects', { params: {
                    username: localStorage.username
                }
            })
            .then(function (res) {
                _this.projectList = res.data.project_list || [];
            });

            // for (item in _this.projectList.build_list) {
            //     item.time = _this.$moment.endOf(item.time).fromNow();
            // }
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
                    project_name: /https:\/\/github.com\/\w+\/([\w\_\-]+)/.exec(value)[1],
                    project_url: value
                });

                console.log(data);

                axios.post('http://127.0.0.1:3000/users/addproject', data, {
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