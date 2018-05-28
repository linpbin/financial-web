<template>
    <el-row>
        <el-row>
            <el-col :span="24">
                <el-button-group>
                    <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="addType()" round>
                        添加类别
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="multiDelete()" round>批量删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        stripe
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            type="index"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="typeName"
                            label="名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            label="是否预置"
                            width="120">
                        <template slot-scope="scope">
                            否
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">
                                编辑
                            </el-button>
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-row>
</template>
<style>
    .el-row {
        margin-bottom: 20px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
</style>
<script>
    import {expendType, updateexpendType, userExpendType, deleteexpendType, postexpendType} from '../../api/api';

    export default {
        data() {
            return {
                tableData3: JSON.parse(sessionStorage.getItem('userexpendtype')),
                multipleSelection: [],
                form: {
                    typeName: '',
                },
                formLabelWidth: '120px',
            }
        },

        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            getSelectionIds() {
                let ids = []
                this.multipleSelection.map((item) => {
                    ids.push(item.id)
                })
                return ids;
            },
            handleEdit(row) {
                this.$prompt('请输入类型名称', '修改支出类型', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^\S/,
                    inputErrorMessage: '请输入类型名称'
                }).then(({value}) => {
                    let id = row.id
                    updateexpendType(id, value).then(data => {
                        if (data.resultCode == 0) {
                            userExpendType(row.userId).then(data => {
                                this.tableData3 = data.data;
                            })
                            this.$notify({
                                title: '成功',
                                message: '修改记录成功',
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '修改记录失败'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            handleDelete(row) {
                deleteexpendType(row.id).then(data => {
                    if (data.resultCode == 0) {
                        userExpendType(row.userId).then(data => {
                            let incometype = JSON.stringify(data.data);
                            sessionStorage.setItem("userexpendtype", incometype);
                            this.tableData3 = data.data;
                        })
                        this.$notify({
                            title: '成功',
                            message: '删除记录成功',
                            type: 'success'
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '删除记录失败'
                        });
                    }
                })
            },
            addType(){
                this.$prompt('请输入类型名称', '添加支出类型', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^\S/,
                    inputErrorMessage: '请输入类型名称'
                }).then(({ value }) => {
                    var userid = sessionStorage.getItem('access-token');
                    userid = JSON.parse(userid);
                    this.form.userId = userid.id;
                    this.form.dr = 1;
                    this.form.typeName = value;
                    postexpendType(this.form).then(data => {
                        if (data.resultCode == 0){
                            userExpendType(userid.id).then(data => {
                                let incometype = JSON.stringify(data.data);
                                sessionStorage.setItem("userexpendtype", incometype);
                                this.tableData3 = data.data;
                            })
                            this.$notify({
                                title: '成功',
                                message: '类型添加成功',
                                type: 'success'
                            });
                        }else {
                            this.$notify.error({
                                title: '错误',
                                message: '添加记录失败'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            multiDelete(){
                let ids = this.getSelectionIds();
                for (let id in ids){
                    deleteexpendType(ids[id]).then(data =>{
                        if (data.resultCode == 0) {
                            var userid = sessionStorage.getItem('access-token');
                            userid = JSON.parse(userid);
                            userExpendType(userid.id).then(data => {
                                let incometype = JSON.stringify(data.data);
                                sessionStorage.setItem("userexpendtype", incometype);
                                this.tableData3 = data.data;
                            })
                            this.$notify({
                                title: '成功',
                                message: '删除记录成功',
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '删除记录失败'
                            });
                        }
                    })
                }
            }

        }
    }
</script>