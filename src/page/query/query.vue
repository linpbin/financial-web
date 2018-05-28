<template>
    <el-row>
        <el-form ref="form" :model="form" label-width="80px">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="金额范围">
                        <el-col :span="10">
                            <el-input
                                    size="small"
                                    placeholder="最小金额"
                                    suffix-icon="el-icon-edit"
                                    v-model="form.minSum"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="2">-</el-col>
                        <el-col :span="10">
                            <el-input
                                    size="small"
                                    placeholder="最大金额"
                                    suffix-icon="el-icon-edit"
                                    v-model="form.maxSum"
                                    clearable>
                            </el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                    <div class="block">
                        <el-form-item label="时间范围">
                            <el-date-picker
                                    v-model="time"
                                    type="datetimerange"
                                    :picker-options="pickerOptions2"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right"
                                    @change="getTimeValues">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="类型">
                        <el-cascader
                                placeholder="请选择类型"
                                :options="options"
                                change-on-select
                                @change="getTypeValue"
                        ></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                    <el-form-item label="关键字">
                        <el-input
                                style="width:60%"
                                size="small"
                                placeholder="备注关键字"
                                suffix-icon="el-icon-date"
                                v-model="form.remark"
                                clearable>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                </el-col>
                <el-col :span="12">
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="small" @click="query('form')">搜索
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row></el-row>
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
                            :page-sizes="[5, 20, 50, 100, 200]"
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
    import {incomeType, expendType, query, updateexpendType, updateincomeType,deleteexpend,deleteincome,updateexpend,updateincome} from '../../api/api'
    export default {
        data() {
            return {
                tableData3: (JSON.parse(sessionStorage.getItem('query'))).list,
                pageSize: '5',
                pageNo: '1',
                total: (JSON.parse(sessionStorage.getItem('query'))).total,
                //下拉选择 start
                options: [{
                    value: '收入',
                    label: '收入',
                    children: this.getValue(JSON.parse(sessionStorage.getItem("incometype"))),
                },
                    {
                        value: '支出',
                        label: '支出',
                        children: this.getValue(JSON.parse(sessionStorage.getItem("expendtype"))),
                    }
                ],
                props: {
                    value: 'value',
                    label: 'label',
                    children: 'children'
                },
                //end
                //时间 start
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                //end
                form: {
                    minSum: '',
                    maxSum: '',
                    startTime: '',
                    endTime: '',
                    remark: '',
                    type: "",
                    typeName: "",
                },
                time: '',
                queryparam: '',
                multipleSelection: [],
            };
        },
        methods: {
            getValue(ids) {
                const typelist = [];
                for (let index in ids) {
                    typelist.push({value: ids[index].typeName, label: ids[index].typeName})
                }
                return typelist;
            },
            getTypeValue(value) {
                this.form.type = JSON.parse(JSON.stringify(value))[0];
                this.form.typeName = JSON.parse(JSON.stringify(value))[1];
            },
            formatDate(inputTime){
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
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            },
            getTimeValues() {
                this.form.startTime = this.formatDate(JSON.parse(JSON.stringify(this.time))[0]);
                this.form.endTime = this.formatDate(JSON.parse(JSON.stringify(this.time))[1]);
            },
            query(formName) {
                this.pageNo = 1;
                let url = '';
                if (this.form.type) {
                    url = url + `&type=${this.form.type}`
                    console.log(this.form.type)
                }
                if (this.form.typeName) {
                    url = url + `&typeName=${this.form.typeName}`
                    console.log(this.form.typeName)
                }
                if (this.form.minSum) {
                    url = url + `&minSum=${this.form.minSum}`
                }
                if (this.form.maxSum) {
                    url = url + `&maxSum=${this.form.maxSum}`
                }
                if (this.form.startTime) {
                    url = url + `&startTime=${this.form.startTime}`
                }
                if (this.form.endTime) {
                    url = url + `&endTime=${this.form.endTime}`
                }
                if (this.form.remark) {
                    url = url + `&remark=${this.form.remark}`
                }
                var userid = sessionStorage.getItem('access-token');
                userid = JSON.parse(userid);
                query(`${userid.id}?pageNo=${this.pageNo}&pageSize=${this.pageSize}${url}`).then(data => {
                    if (data.data != null) {
                        var arr = data.data.list;
                        for (const index in arr){
                            arr[index].time= this.formatDate(arr[index].time)
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
            getPageSize(val) {
                this.pageSize = val;
                let url = '';
                if (this.form.type) {
                    url = url + `&type=${this.form.type}`
                }
                if (this.form.typeName) {
                    url = url + `&typeName=${this.form.typeName}`
                }
                if (this.form.minSum) {
                    url = url + `&minSum=${this.form.minSum}`
                }
                if (this.form.maxSum) {
                    url = url + `&maxSum=${this.form.maxSum}`
                }
                if (this.form.startTime) {
                    url = url + `&startTime=${this.form.startTime}`
                }
                if (this.form.endTime) {
                    url = url + `&endTime=${this.form.endTime}`
                }
                if (this.form.remark) {
                    url = url + `&remark=${this.form.remark}`
                }
                var userid = sessionStorage.getItem('access-token');
                userid = JSON.parse(userid);
                query(`${userid.id}?pageNo=${this.pageNo}&pageSize=${this.pageSize}${url}`).then(data => {
                    if (data.data != null) {
                        var arr = data.data.list;
                        for (const index in arr){
                            arr[index].time= this.formatDate(arr[index].time)
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
                let url = '';
                if (this.form.type) {
                    url = url + `&type=${this.form.type}`
                }
                if (this.form.typeName) {
                    url = url + `&typeName=${this.form.typeName}`
                }
                if (this.form.minSum) {
                    url = url + `&minSum=${this.form.minSum}`
                }
                if (this.form.maxSum) {
                    url = url + `&maxSum=${this.form.maxSum}`
                }
                if (this.form.startTime) {
                    url = url + `&startTime=${this.form.startTime}`
                }
                if (this.form.endTime) {
                    url = url + `&endTime=${this.form.endTime}`
                }
                if (this.form.remark) {
                    url = url + `&remark=${this.form.remark}`
                }
                var userid = sessionStorage.getItem('access-token');
                userid = JSON.parse(userid);
                query(`${userid.id}?pageNo=${this.pageNo}&pageSize=${this.pageSize}${url}`).then(data => {
                    if (data.data != null) {
                        var arr = data.data.list;
                        for (const index in arr){
                            arr[index].time= this.formatDate(arr[index].time)
                        }
                        this.tableData3 = arr
                       // this.tableData3 = data.data.list;
                        this.total = data.data.total;
                    } else {
                        this.tableData3 = [];
                        this.total = 0;
                    }
                })
                this.dateformat()
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
                    if (type ===0) {
                        console.log(value)
                        updateexpend(id, value).then(data => {
                            if (data.resultCode == 0) {
                                var userid = sessionStorage.getItem('access-token');
                                userid = JSON.parse(userid);
                                query(userid.id).then(data => {
                                    if (!data.data) {
                                        this.tableData3 = [];
                                        this.total = 0;
                                    } else {
                                        this.tableData3 = data.data.list;
                                        this.total = data.data.total;
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
                    }else {
                        updateincome(id, value).then(data => {
                            if (data.resultCode == 0) {
                                var userid = sessionStorage.getItem('access-token');
                                userid = JSON.parse(userid);
                                query(userid.id).then(data => {
                                    if (!data.data) {
                                        this.tableData3 = [];
                                        this.total = 0;
                                    } else {
                                        this.tableData3 = data.data.list;
                                        this.total = data.data.total;
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
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            handleDelete(row) {
                let type = row.type;
                if(type == 0){
                    deleteexpend(row.id).then(data => {
                        if (data.resultCode == 0) {
                            var userid = sessionStorage.getItem('access-token');
                            userid = JSON.parse(userid);
                            query(userid.id).then(data => {
                                if (!data.data) {
                                    this.tableData3 = [];
                                    this.total = 0;
                                } else {
                                    this.tableData3 = data.data.list;
                                    this.total = data.data.total;
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
                }else {
                    deleteincome(row.id).then(data => {
                        if (data.resultCode == 0) {
                            var userid = sessionStorage.getItem('access-token');
                            userid = JSON.parse(userid);
                            query(userid.id).then(data => {
                                if (!data.data) {
                                    this.tableData3 = [];
                                    this.total = 0;
                                } else {
                                    this.tableData3 = data.data.list;
                                    this.total = data.data.total;
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
                }

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
            dateformat(){
                var arr = this.tableData3;
                for (const index in arr){
                    arr[index].time= this.formatDate(arr[index].time)
                }
                this.tableData3 = arr
            }

        },
        mounted() {
            this.dateformat()
        }
    };
</script>
<style>
    .el-row {
        margin-bottom: 2px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
</style>