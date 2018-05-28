<template>
    <div id="app"> <!-- 头部导航 -->
        <header class="header">
        </header>
        <main> <!-- 左侧导航 -->
            <div class="main-left">
                <el-menu
                        class="el-menu-vertical-demo"
                        @select="handleSelect"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span>收支记录</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">收入记录</el-menu-item>
                            <el-menu-item index="1-2">支出记录</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>类别管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">收入类别</el-menu-item>
                            <el-menu-item index="2-2">支出类别</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-search"></i>
                            <span>查询明细</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">收支查询</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>理财报告</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">理财报告</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>家庭管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="5-1">家庭信息</el-menu-item>
                            <el-menu-item index="5-2">家庭成员</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="6">
                            <template slot="title">
                                <i class="el-icon-bell"></i>
                                <span>公告管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="6-1">公告信息</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item-group>
                        </el-menu-item-group>
                        <el-submenu index="7">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span>留言管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="7-1">留言信息</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="8">
                        <template slot="title">
                            <i class="el-icon-info"></i>
                            <span>个人信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="8-1">个人信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div> <!-- 右侧主内容区 -->
            <div class="main-right">
                <router-view class="view"></router-view>
            </div>
        </main>
    </div>
</template>
<script>
    import {
        incomeType,
        expendType,
        userIncomeType,
        userExpendType,
        getuser,
        query,
        getincomes,
        getexpends,
        familyinfo,
        familyuser,
        getnotices,
        getmessage,
        incomelist,
        expendlist,
    } from '../../api/api';

    export default {
        data() {
            return {
                userId: JSON.parse(sessionStorage.getItem('access-token')),
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key == '1-1') {
                    incomelist(this.userId.id).then(data=>{
                        let incomelist = JSON.stringify(data.data);
                        if (!data.data) {
                            var id = {
                                list: [],
                                total: 0,
                            };
                            sessionStorage.setItem("incomelist", JSON.stringify(id));
                        } else {
                            sessionStorage.setItem("incomelist", incomelist);
                        }
                    })
                    incomeType(this.userId.id).then(data => {
                        let incometype = JSON.stringify(data.data);
                        sessionStorage.setItem("incometype", incometype);
                        this.$router.push({path: '/home/income'});
                    })

                } else if (key == '1-2') {
                    expendlist(this.userId.id).then(data=>{
                        let incomelist = JSON.stringify(data.data)
                        if (!data.data) {
                            let id = {
                                list: [],
                                total: 0,
                            };
                            sessionStorage.setItem("expendlist",JSON.stringify(id));
                        } else {
                            sessionStorage.setItem("expendlist", incomelist);
                        }
                    })
                    expendType(this.userId.id).then(data => {
                        let expendtype = JSON.stringify(data.data);
                        sessionStorage.setItem("expendtype", expendtype);
                        this.$router.push({path: '/home/expend'});
                    })
                } else if (key == '2-1') {

                    userIncomeType(this.userId.id).then(data => {
                        let incometype = JSON.stringify(data.data);
                        if (!data.data) {
                            let id = {
                                list: [],
                                total: 0,
                            };
                            sessionStorage.setItem("userincometype", JSON.stringify(id));
                        } else {
                            sessionStorage.setItem("userincometype", incometype);
                        }
                        this.$router.push({path: '/home/income/type'});
                    })
                } else if (key == '2-2') {
                    userExpendType(this.userId.id).then(data => {
                        let expendtype = JSON.stringify(data.data);
                        if (!data.data) {
                            let id = {
                                list: [],
                                total: 0,
                            };
                            sessionStorage.setItem("userexpendtype", JSON.stringify(id));
                        } else {
                            sessionStorage.setItem("userexpendtype", expendtype);
                        }
                        this.$router.push({path: '/home/expend/type'});
                    })
                } else if (key == '3-1') {
                    query(this.userId.id).then(data => {
                        let expendtype = JSON.stringify(data.data);
                        if (!data.data) {
                            let id = {
                                list: [],
                                total: 0,
                            };
                            sessionStorage.setItem("query", JSON.stringify(id));
                        } else {
                            sessionStorage.setItem("query", expendtype);
                        }
                        expendType(this.userId.id).then(data => {

                            if (!data.data){
                                let id = {
                                    list: [],
                                    total: 0,
                                };
                                sessionStorage.setItem("expendtype", JSON.stringify(id));
                            }else {
                                let expendtype = JSON.stringify(data.data);
                                sessionStorage.setItem("expendtype", expendtype);
                            }

                        })
                        incomeType(this.userId.id).then(data => {

                            if (!data.data){
                                let id = {
                                    list: [],
                                    total: 0,
                                };
                                sessionStorage.setItem("incometype", JSON.stringify(id));
                            }else {
                                let incometype = JSON.stringify(data.data);
                                sessionStorage.setItem("incometype", incometype);
                            }

                        })
                        this.$router.push({path: '/home/query'});
                    })
                }
                else if (key == '4-1') {
                    getincomes(this.userId.id).then(data =>{
                        let incomes = JSON.stringify(data.data);
                        if (!data.data) {
                            let id = {
                                list: [],
                                total: 0,
                            };
                            sessionStorage.setItem("incomelist", JSON.stringify(id));
                        } else {
                            sessionStorage.setItem("incomelist", incomes);
                        }
                    })
                    getexpends(this.userId.id).then(data =>{
                        let incomes = JSON.stringify(data.data);
                        if (!data.data) {
                            let id = {
                                list: [],
                                total: 0,
                            };
                            sessionStorage.setItem("expendlist", JSON.stringify(id));
                        } else {
                            sessionStorage.setItem("expendlist", incomes);
                        }
                    })
                    expendType(this.userId.id).then(data => {
                        let expendtype = JSON.stringify(data.data);
                        sessionStorage.setItem("expendtype", expendtype);
                    })
                    incomeType(this.userId.id).then(data => {
                        let incometype = JSON.stringify(data.data);
                        sessionStorage.setItem("incometype", incometype);
                        this.$router.push({path: '/home/graph'});
                    })
                }else if (key == '5-1'){
                    familyinfo(this.userId.id).then(data=>{
                        let familyinfo = JSON.stringify(data.data);
                        sessionStorage.setItem("familyinfo",familyinfo);
                    })
                    familyuser(this.userId.id).then(data=>{
                        let familyuser = JSON.stringify(data.data);
                        sessionStorage.setItem("familyuser",familyuser);
                        this.$router.push({path:'/home/familyinfo'})
                    })

                } else if (key == '5-2'){
                    familyinfo(this.userId.id).then(data=>{
                        let familyinfo = JSON.stringify(data.data);
                        sessionStorage.setItem("familyinfo",familyinfo);
                    })
                    familyuser(this.userId.id).then(data=>{
                        let familyuser = JSON.stringify(data.data);
                        sessionStorage.setItem("familyuser",familyuser);
                        this.$router.push({path:'/home/familymember'})
                    })
                }else if (key == '6-1'){
                    familyinfo(this.userId.id).then(data=>{
                        let familyinfo = JSON.stringify(data.data);
                        const id = data.data.id;
                        sessionStorage.setItem("familyinfo",familyinfo);
                        getnotices(id).then(data=>{
                            let incomes = JSON.stringify(data.data);
                            if (!data.data) {
                                let id = {
                                    list: [],
                                    total: 0,
                                };
                                sessionStorage.setItem("notices", JSON.stringify(id));
                            } else {
                                sessionStorage.setItem("notices", incomes);
                            }

//                            sessionStorage.setItem("notices", JSON.stringify(data.data));
                            this.$router.push({path:'/home/notice'})
                        })
                    })


                }else if (key == '7-1'){
                    familyinfo(this.userId.id).then(data=>{
                        let familyinfo = JSON.stringify(data.data);
                        const id = data.data.id;
                        sessionStorage.setItem("familyinfo",familyinfo);
                        getmessage(id).then(data=>{
                            let incomes = JSON.stringify(data.data);
                            if (!data.data) {
                                let id = {
                                    list: [],
                                    total: 0,
                                };
                                sessionStorage.setItem("message", JSON.stringify(id));
                            } else {
                                sessionStorage.setItem("message", incomes);
                            }
//                            sessionStorage.setItem("message", JSON.stringify(data.data));
                            this.$router.push({path:'/home/message'})
                        })
                    })

                }
                else if (key == '8-1') {
                    getuser(this.userId.id).then(data => {
                        let userinfo = JSON.stringify(data.data);
                        sessionStorage.setItem("userinfo", userinfo);
                        this.$router.push({path: '/home/user'});
                    })
                }

            },
        }
    }
</script>
<style>
    body {
        margin: 0;
    }

    #app {
        min-width: 1200px;
        margin: 0 auto;
        font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif;
    }

    /* 头部导航 */
    header {
        z-index: 1000;
        min-width: 1200px;
        transition: all 0.5s ease;
        border-top: solid 4px #3091F2;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    }

    header.header-fixed {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    header .el-menu-demo {
        padding-left: 300px !important;
    }

    /* 主内容区 */
    main {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        min-height: 900px;
        border: solid 40px #E9ECF1;
        background-color: #FCFCFC;
    }

    main .main-left {
        text-align: center;
        width: 200px;
        float: left;
    }

    main .main-right {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        background-color: #fff;
        padding: 50px 70px;
    }

    main .el-menu {
        background-color: transparent !important;
    } </style>
