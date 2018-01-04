<style lang="less" scoped>

</style>

<template>
    <div class="admin">
        <el-table :data="userList" stripe style="width: 100%" >
            <el-table-column prop="user_name" label="用户名" ></el-table-column>
            <el-table-column prop="projects_num || 0" label="项目数" ></el-table-column>
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

export default {
    data() {
        this.$moment.locale('zh-cn');

        this.getUsers();
        return {
            userList: []
        }
    },
    methods: {
        reviewUser(row) {
            localStorage.username = row.user_name;
            this.$router.push({ path: '/profile/' + row.user_name});
        },
        deleteUser(row) {
            console.log(row);
        },
        getUsers() {
            var _this = this;
            axios.get('https://limiao-limiao.c9users.io/users/getusers')
            .then(function (res) {
                if (res.data.status == 0) {
                    this.$message.error(res.data.message);
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
        }

    }
}
</script>