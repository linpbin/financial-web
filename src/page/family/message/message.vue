<template>
    <el-row>
        <el-row>
            <el-col :span="24">
                <template>
                    <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="postnotice = true"
                               round>
                        留言
                    </el-button>
                    <el-dialog title="留言" :visible.sync="postnotice">
                        <el-form :model="createform" :rules="rules" ref="createform">
                            <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                                <el-input v-model="createform.title"></el-input>
                            </el-form-item>
                            <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
                                <el-input v-model="createform.content"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="postnotice = false">取 消</el-button>
                            <el-button type="primary" @click="addNotice('createform')">确 定</el-button>
                        </div>
                    </el-dialog>
                </template>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="notices"
                        border
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="createDate"
                            label="时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="createBy"
                            label="发布者"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="标题"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="内容"
                            width="120">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editIds(scope.row)">编辑
                            </el-button>
                            <el-dialog title="修改留言内容" :visible.sync="updatenotice">
                                <el-form :model="editform" :rules="rules">
                                    <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                                        <el-input v-model="editform.title" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
                                        <el-input v-model="editform.content" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="updatenotice = false">取 消</el-button>
                                    <el-button type="primary" @click="handleEdit(scope.row)">确 定</el-button>
                                </div>
                            </el-dialog>
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
    import {familyuser, getmessage, updatemessage, createmessage, deletemessage} from '../../../api/api';

    export default {
        data() {
            return {
                editId:'',
                pageSize: '10',
                pageNo: '1',
                total: '',//(JSON.parse(sessionStorage.getItem('message'))).total
                userId: JSON.parse(sessionStorage.getItem('access-token')),
                notices: '',
                familyinfo: JSON.parse(sessionStorage.getItem('familyinfo')),
                postnotice: false,
                updatenotice: false,
                createform: {
                    content: '',
                    title: '',
                },
                editform: {
                    content: '',
                    title: '',
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}

                    ],
                    content: [
                        {required: true, message: '请输入内容', trigger: 'blur'},
                    ],
                },
                formLabelWidth: '120px',
                formLabelWidths: '120px',
                selectoption: '',
            }
        },
        methods: {
            getPageSize(val) {
                this.pageSize = val;
                getmessage(`${this.familyinfo.id}?pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
                    var arr = data.data.list
                    for (const index in arr) {
                        arr[index].createDate = this.formatDate(arr[index].createDate)
                    }
                    this.notices = arr
                    sessionStorage.setItem("message", JSON.stringify(data.data));
                })
            },
            getPageNo(val) {
                this.pageNo=val
                getmessage(`${this.familyinfo.id}?pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
                    var arr = data.data.list
                    for (const index in arr) {
                        arr[index].createDate = this.formatDate(arr[index].createDate)
                    }
                    this.notices = arr
                    sessionStorage.setItem("message", JSON.stringify(data.data));
                })
            },
            editIds(row){
                this.editId = row.id
                this.updatenotice=true
            },
            handleEdit() {
//                this.$refs[formName].validate((valid) => {
//                  if (valid){
                updatemessage(this.familyinfo.id, this.userId.id, this.editId, this.editform).then(data => {
                    if (data.resultCode == 0) {
                        getmessage(`${this.familyinfo.id}?pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
                            var arr = data.data.list
                            this.total=data.data.total
                            for (const index in arr) {
                                arr[index].createDate = this.formatDate(arr[index].createDate)
                            }
                            this.notices = arr
                            sessionStorage.setItem("message", JSON.stringify(data.data));
                        })
                        this.editform.title='';
                        this.editform.content='';
                        this.updatenotice = false
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: data.resultMsg
                        });
                    }
                    this.updatenotice = false
                })
//                  }else {
//                      return false;
//                  }
//              })


            },
            handleDelete(row) {
                deletemessage(this.familyinfo.id, this.userId.id, row.id).then(data => {
                    if (data.resultCode == 0) {
                        getmessage(`${this.familyinfo.id}?pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
                            var arr = data.data.list
                            this.total=data.data.total
                            for (const index in arr) {
                                arr[index].createDate = this.formatDate(arr[index].createDate)
                            }
                            this.notices = arr
                            console.log(arr)
                            sessionStorage.setItem("message", JSON.stringify(data.data));
                        })
                        this.postnotice = false
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: data.resultMsg
                        });
                    }
                })
            },
            addNotice(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        createmessage(this.familyinfo.id, this.userId.id, this.createform).then(data => {
                            if (data.resultCode == 0) {
                                getmessage(this.familyinfo.id).then(data => {
                                    var arr = data.data.list
                                    this.total=data.data.total
                                    for (const index in arr) {
                                        arr[index].createDate = this.formatDate(arr[index].createDate)
                                    }
                                    this.notices = arr
                                    this.createform.title='';
                                    this.createform.content='';
                                    sessionStorage.setItem("message", JSON.stringify(data.data));
                                })
                                this.postnotice = false
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success'
                                });
                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: data.resultMsg
                                });
                            }
                            this.postmember = false
                        })
                    } else {
                        return false;
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
            info() {
                let notices = JSON.parse(sessionStorage.getItem('message'));
                let total = notices.total
                if (notices) {
                    var arr = notices.list;
                    for (const index in arr) {
                        arr[index].createDate = this.formatDate(arr[index].createDate)
                    }
                    this.notices = arr
                    this.total = total
                    console.log(this.notices)
                }
            }
        },
        created() {
            this.info()
        }
    }
</script>
