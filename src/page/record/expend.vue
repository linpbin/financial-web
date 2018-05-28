<template>
    <el-row>
        <el-row>
            <el-col :span="24">
                <el-button-group>
                    <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="addincomes=true"
                               round>
                        添加支出
                    </el-button>
                    <el-dialog title="添加支出记录" :visible.sync="addincomes">
                         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="消费金额" prop="sum">
                            <el-input v-model.number="ruleForm.sum" type="sum"></el-input>
                        </el-form-item>
                        <el-form-item label="支出类型" prop="expendType">
                            <el-select v-model="ruleForm.expendType" placeholder="请选择" prop>
                                <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.typeName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                            <el-button type="primary" icon="el-icon-edit" @click="addType()">管理类别</el-button>
                        </el-form-item>
                        <el-form-item label="消费时间" required prop="expendDate">
                            <div class="block">
                                <el-date-picker
                                        v-model="ruleForm.expendDate"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        prop="date">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                    </el-dialog>
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
                        @selection-change="handleSelectionChange()">
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
                            prop="sum"
                            label="金额"
                            width="120"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="typeName"
                            label="类型名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="记录时间"
                            width="150"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="备注"
                            width="200">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">
                                编辑备注
                            </el-button>
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="getPageSize"
                            @current-change="getPageNo"
                            :current-page="pageNo"
                            :page-sizes="[10, 20, 50, 100, 200]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </el-row>
</template>
<script>
    import {expend,expendType, postexpendType,expendlist,updateexpend,deleteexpend} from '../../api/api';

    export default {
        data() {
            return {
                tableData3: (JSON.parse(sessionStorage.getItem('expendlist'))).list,
                pageSize: '10',
                pageNo: '1',
                total: (JSON.parse(sessionStorage.getItem('expendlist'))).total,
                multipleSelection: [],
                addincomes: false,
                options: JSON.parse(sessionStorage.getItem('expendtype')),
                ruleForm: {
                    sum: '',
                    expendType: '',
                    remark: '',
                    expendDate: '',
                },
                form: {
                    typeName: '',
                },
                formLabelWidth: '120px',

                rules: {
                    sum: [
                        {required: true, message: '请输入消费金额', trigger: 'blur'},
                        {type: 'number', message: '金额必须为数字'}
                    ],
                    expendType: [
                        {required: true, message: '请选择类型', trigger: 'change'}
                    ],
                    expendDate: [
                        {required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    remark: [
                        {required: true, message: '请填写备注', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            getPageSize(val) {
                this.pageSize = val;
                var userid = sessionStorage.getItem('access-token');
                userid = JSON.parse(userid);
                expendlist(`${userid.id}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
                    if (data.data != null) {
                        var arr = data.data.list;
                        for (const index in arr){
                            arr[index].time= this.formatDate(arr[index].expendDate)
                        }
                        this.tableData3 = arr
                        //this.tableData3 = data.data.list;
                        this.total = data.data.total;
                    } else {
                        this.tableData3 = [];
                        this.total = 0;
                    }
                })
            },
            getPageNo(val) {
                this.pageNo = val;
                var userid = sessionStorage.getItem('access-token');
                userid = JSON.parse(userid);
                expendlist(`${userid.id}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
                    if (data.data != null) {
                        var arr = data.data.list;
                        for (const index in arr){
                            arr[index].time= this.formatDate(arr[index].expendDate)
                        }
                        this.tableData3 = arr
                        // this.tableData3 = data.data.list;
                        this.total = data.data.total;
                    } else {
                        this.tableData3 = [];
                        this.total = 0;
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var userid = sessionStorage.getItem('access-token');
                        userid = JSON.parse(userid);
                        this.ruleForm.userId = userid.id
                        expend(this.ruleForm).then(data => {
                            if (data.resultCode == 0) {
                                expendlist(`${userid.id}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
                                    if (!data.data) {
                                        this.tableData3 = [];
                                        this.total = 0;
                                    } else {
                                        this.tableData3 = data.data.list;
                                        this.total = data.data.total;
                                        this.dateformat();
                                    }
                                })
                                this.$notify({
                                    title: '成功',
                                    message: '添加记录成功',
                                    type: 'success'
                                });
                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: '添加记录失败'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    this.addincomes =false
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            addType() {
                this.$prompt('请输入类型名称', '添加支出类型', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^\S/,
                    inputErrorMessage: '请输入类型名称'
                }).then(({value}) => {
                    var userid = sessionStorage.getItem('access-token');
                    userid = JSON.parse(userid);
                    this.form.userId = userid.id;
                    this.form.dr = 1;
                    this.form.typeName = value;
                    postexpendType(this.form).then(data => {
                        if (data.resultCode == 0) {
                            expendType(userid.id).then(data => {
                                let expendtype = JSON.stringify(data.data);
                                sessionStorage.setItem("expendtype", expendtype);
                                this.options = data.data;
                            })
                            this.$notify({
                                title: '成功',
                                message: '类型添加成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '添加记录失败'
                            });
                            this.dialogFormVisible = false;
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
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
                this.$prompt('请输入', '修改备注', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^\S/,
                    inputErrorMessage: '请输入备注'
                }).then(({value}) => {
                    let id = row.id
                    let type = row.type;
                    updateexpend(id, value).then(data => {
                        if (data.resultCode == 0) {
                            var userid = sessionStorage.getItem('access-token');
                            userid = JSON.parse(userid);
                            expendlist(`${userid.id}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
                                if (!data.data) {
                                    this.tableData3 = [];
                                    this.total = 0;
                                } else {
                                    this.tableData3 = data.data.list;
                                    this.total = data.data.total;
                                    this.dateformat();
                                }
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
                deleteexpend(row.id).then(data => {
                    if (data.resultCode == 0) {
                        var userid = sessionStorage.getItem('access-token');
                        userid = JSON.parse(userid);
                        expendlist(`${userid.id}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
                            if (!data.data) {
                                this.tableData3 = [];
                                this.total = 0;
                            } else {
                                this.tableData3 = data.data.list;
                                this.total = data.data.total;
                                this.dateformat();
                            }
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
            formatDate(inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
            dateformat() {
                var arr = this.tableData3;
                for (const index in arr) {
                    arr[index].time = this.formatDate(arr[index].expendDate)
                }
                this.tableData3 = arr
            },


        },
        mounted() {
            this.dateformat()
        }
    }
</script>