<style lang="less" scoped>

.userProfile {
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 100%;
}
.left {
    float: left;
    box-sizing: border-box;
    width: 25%;
    height: 100%;
    border-right: 2px solid #f2f2f2;
    background-color: #fff;
    .title-container {
        overflow: hidden;
        .title {
            float: left;
        }
        .build-num {
            float: right;
        }
    }
    .left-title {
        margin-top: 30px;
        padding: 10px 0;
        padding-left: 30px;
        border-bottom: 2px solid #f1f1f1;
        .list {
            position: relative;
            display: inline-block;
            cursor: pointer;
            color: #3eaaaf;
            &:after {
                position: absolute;
                bottom: -12px;
                display: block;
                width: 100%;
                height: 2px;
                content: '';
                background-color: #3eaaaf;
            }
        }
        .add-project {
            position: relative;
            display: inline-block;
            margin-left: 10px;
            &:hover {
                cursor: pointer;
                color: #3eaaaf;
                &:after {
                    position: absolute;
                    bottom: -12px;
                    display: block;
                    width: 100%;
                    height: 2px;
                    content: '';
                    background-color: #3eaaaf;
                } 
            }
        }
    }
}
.repos-list {
    margin-top: 15px;
    list-style: none;
    border-bottom: .46rem solid #f1f1f1;
    background-color: #f1f1f1;
    li {
        margin-bottom: .46rem;
        padding: .8em .5em .8em 1.5em;
        cursor: pointer;
        border-left: 8px solid #fff;
        background-color: #fff;
        &.active, &:hover {
            border-color: #3eaaaf;
        }

    }
}
.right {
    float: left;
    box-sizing: border-box;
    width: 75%;
    padding: 15px;
    background-color: #fff;
    .title-container {
        .right-title {
            font-size: 36px;
            font-weight: 400;
            margin: 0;
        }
        .menu {
            margin: 20px 0;
            border-bottom: 2px #f1f1f1 solid;
            li {
                position: relative;
                display: inline-block;
                margin-right: 1.5em;
                padding: .5em 0;
                &:hover,
                &.active {
                    cursor: pointer;
                    color: #3eaaaf;
                    &:after {
                        position: absolute;
                        bottom: -2px;
                        display: block;
                        width: 100%;
                        height: 2px;
                        content: '';
                        background-color: #3eaaaf;
                    }
                }
            }
        }
    }
}
.history-panel {
    li {
        font-size: 16px;
        margin-bottom: .3rem;
        border: 1px solid #eaeaea;
        border-radius: 2px;
    }
}
pre {
    font-family: Monaco,monospace;
    font-size: 12px;
    line-height: 19px;
    clear: left;
    min-height: 42px;
    margin-top: 0;
    padding: 15px 0;
    counter-reset: line-numbering;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #f1f1f1;
    background-color: #222;
}
.no-project {
    margin: 30px 0;
    text-align: center;
}

</style>
<template>
    <div class="userProfile">
        <div class="left">
            <div class="left-title">
                <div class="list">项目列表</div>
                <div class="add-project" @click="addProject()">添加项目</div>
            </div>
            <ul class="repos-list" v-if="projectList.length">
               <li  v-for="(project, index) in projectList" 
                    v-bind:class="{'active': $route.params.projectName == project.project_name}"
                    @click="switchProject(index, project.project_name)">
                    <div class="title-container">
                        <div class="title">
                             {{project.project_name}}
                        </div>
                        <div class="build-num"># {{project.build_list.length}}</div>
                    </div>
                    <div class="finished">
                        Finished: {{
                            project.build_list.length ? project.build_list[0].time : '-'}}
                    </div>
               </li>
           </ul>
           <div v-if="!projectList.length" class="no-project">
               当前暂无项目
           </div>
        </div>
        <div class="right">
            <router-view :project="projectList[curProject]"></router-view>
        </div>

    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {

        this.$moment.locale('zh-cn');

        this.fetch();

        return {
            panel: 'curBuild',
            username: localStorage.username,
            curProject: 0,
            projectList: [
                {
                    project_name: 'test1',        
                    build_list: [
                        {
                            author: 'husterxsp',
                            branch: 'master',
                            commit: '0a6b3fca32ea16814ccf871ef764f23b5eda3c57',
                            status: 0,
                            log: '✘ 71 problems (71 errors, 0 warnings)',
                            time: '1512874532313'
                        },
                        {
                            author: 'husterxsp',
                            branch: 'master',
                            commit: '0a6b3fca32ea16814ccf871ef764f23b5eda3c57',
                            status: 0,
                            log: '✘ 71 problems (71 errors, 0 warnings)',
                            time: '1512874532313'
                        }
                    ]
                },
                {
                    project_name: 'test2',        
                    build_list: [
                        {
                            author: 'husterxsp',
                            branch: 'master',
                            commit: '0a6b3fca32ea16814ccf871ef764f23b5eda3c57',
                            status: 0,
                            log: '✘ 71 problems (71 errors, 0 warnings)',
                            time: '1512874532313'
                        },
                        {
                            author: 'husterxsp',
                            branch: 'master',
                            commit: '0a6b3fca32ea16814ccf871ef764f23b5eda3c57',
                            status: 0,
                            log: '✘ 71 problems (71 errors, 0 warnings)',
                            time: '1512874532313'
                        }
                    ]
                },
            ]
        }
    },
    methods: {
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
        switchPanel(panel) {
            this.panel = panel;
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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        switchProject(index, projectName) {
            this.curProject = index;
            this.$router.push({ 
                path: '/profile/' + this.username + '/' + projectName,
                props: this.projectList[index]
            });
        }
    }
}
</script>