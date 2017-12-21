<style lang="less" scoped>

</style>

<template>
    <div class="admin">
        <el-table :data="userList" stripe style="width: 100%" >
            <el-table-column prop="username" label="用户名" ></el-table-column>
            <el-table-column prop="projectNum" label="项目数" ></el-table-column>
            <el-table-column prop="lastLogin" label="最近登录" ></el-table-column>
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

export default {
    data() {
        return {
            userList: [
                {
                    username: '张三',
                    projectNum: 3,
                    lastLogin: this.$moment(1511996115485).fromNow()
                },
                {
                    username: '李四',
                    projectNum: 2,
                    lastLogin: this.$moment(1512296115485).fromNow()
                }
            ]
        }
    },
    methods: {
        reviewUser(row) {
            this.$router.push({ path: '/profile/' + row.username});
        },
        deleteUser(row) {
            console.log(row);
        },
        getUsers() {
            axios.get('/users/getusers')
            .then(function (res) {
                if (res.status == 0) {
                    this.$message.error(res.message);
                }
                else {
                    console.log(res);
                }
            });
        }
    }
}
</script>