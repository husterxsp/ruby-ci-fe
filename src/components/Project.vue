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
        <el-breadcrumb separator="/" v-if='admin'>
            <el-breadcrumb-item :to="{ path: '/profile/' + username }"> 当前查看用户：{{username}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">{{author}} / {{projectName}} 项目构建列表</el-menu-item>
        </el-menu>
        <div class="line"></div>

        <el-table :data="buildList" stripe style="width: 100%" >
<!--             <el-table-column prop="branch" label="branch" width="120"></el-table-column>
            <el-table-column prop="commit" label="commit" min-width="120"></el-table-column>
            <el-table-column prop="status" label="status" width="100"></el-table-column>
            <el-table-column prop="time" label="time" width="220"></el-table-column> -->
            <el-table-column prop="branch" label="branch"></el-table-column>
            <el-table-column prop="commit_url"  show-overflow-tooltip="true" label="commit" >
                <a href="test">test</a>
            </el-table-column>
            <el-table-column prop="build_status" label="status"></el-table-column>
            <el-table-column prop="build_time" label="time"></el-table-column>
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

import _global from '../config';

export default {
    data() {
        return {
            username: sessionStorage.username,
            admin: sessionStorage.admin,
            projectName: this.$route.params.project,
            author: this.$route.params.author,
            activeIndex: '1',
            log: '',
            dialogVisible: false,
            buildList: []
        };
    },
    created() {
        if (!this.username) this.$router.push({path: '/'});
        
        this.$moment.locale('zh-cn');

        this.getBuildInfo();
    },
    methods: {
        getBuildInfo() {
            var _this = this;

            axios.get(_global.host + '/buildinfos/getBuildInfo', { params: {
                    'author': _this.author,
                    'user_name': _this.username,
                    'project_name': _this.projectName,
                    'user_type': '0'
                }
            })
            .then(function (res) {
                _this.buildList = res.data.buildinfoList || [];

                _this.udpateTime(); 
            });
        },
        reviewLog(row) {
            this.log = row.loginfo;
            this.dialogVisible = true;
        },
        udpateTime() {
            for (var i = 0; i < this.buildList.length; i++) {
                var time = +new Date(this.buildList[i].build_time);
                this.buildList[i].build_time = this.$moment(time).endOf().fromNow();
            }
        }
    }
}
</script>