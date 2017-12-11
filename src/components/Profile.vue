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

export default {
    data() {

        this.$moment.locale('zh-cn');

        this.fetch();

        return {
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
        fetch() {
            // axios.post('/user/profile', {
            //     username: this.username
            // })
            // .then(function (res) {
            //     this.projectList = res.project_list;
            // });

            // for (item in this.projectList.build_list) {
            //     item.time = this.$moment.endOf(item.time).fromNow();
            // }
            // console.log(this.projectList);
        },
        addProject() {
            this.$prompt('请输入GitHub项目地址', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /https:\/\/github.com\/\w+\/\w+/,
                inputErrorMessage: '项目地址格式不正确'
            }).then(({ value }) => {
                this.$message({
                    type: 'success',
                    message: '你的GitHub项目地址是: ' + value
                });

                axios.post('/user/add_project', {
                    username: this.username,
                })
                .then(function (res) {
                    if (res.status == 0) {
                        // todo 后端校验项目地址
                        this.$message.error(res.message);
                    }
                    else {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });

                        // 此处返回新的项目列表
                    }
                });

                $(this.$refs.list.$el).click();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });

                $(this.$refs.list.$el).click();
            });

        }
    }
}
</script>