<style lang="less" scoped>
pre {
    clear: left;
    min-height: 42px;
    padding: 15px 0;
    color: #f1f1f1;
    font-family: Monaco,monospace;
    font-size: 12px;
    line-height: 19px;
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: #222;
    counter-reset: line-numbering;
    margin-top: 0;
}
</style>
<template>
    <div class="project">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">{{projectName}} 构建列表</el-menu-item>
        </el-menu>
        <div class="line"></div>

        <el-table :data="buildList" stripe style="width: 100%" >
            <el-table-column prop="branch" label="branch" width="120"></el-table-column>
            <el-table-column prop="commit" label="commit" min-width="120"></el-table-column>
            <el-table-column prop="status" label="status" width="100"></el-table-column>
            <el-table-column prop="time" label="time" width="220"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button @click="reviewLog(scope.row)" type="text" size="small">查看log</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="Log信息" :visible.sync="dialogVisible">
            <pre>
                <code>
                {{log}}
                </code>
            </pre>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        this.getBuildInfo();
        this.$moment.locale('zh-cn');

        return {
            activeIndex: '1',
            projectName: this.$route.params.id,
            log: '✘ 71 problems (71 errors, 0 warnings)',
            dialogVisible: false,
            buildList: [
                {
                    author: 'husterxsp',
                    branch: 'master',
                    commit: '0a6b3fca32ea16814ccf871ef764f23b5eda3c57',
                    status: 0,
                    log: 'var a = 1;console.log(aaa);',
                    time: this.$moment(1512995343714).fromNow()
                },
                {
                    author: 'husterxsp',
                    branch: 'master',
                    commit: '0a6b3fca32ea16814ccf871ef764f23b5eda3c57',
                    status: 0,
                    log: '✘ 71 problems (71 errors, 0 warnings)',
                    time: this.$moment(1512295343714).fromNow()
                }
            ]
        };
    },
    methods: {
        getBuildInfo() {
            var username = localStorage.username;
            var projectName = this.projectName || 'test';
            console.log(projectName);

            axios.get('/users/getprojects', { params: {
                    user_name: localStorage.username,
                    projectName: projectName,
                    user_type: '0'
                }
            })
            .then(function (res) {
                console.log(res);
                this.projectList = res.project_list;
            });
        },
        reviewLog(row) {
            this.log = row.log;

            this.dialogVisible = true;
        }
    }
}
</script>