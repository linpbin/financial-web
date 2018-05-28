<template>
    <el-row>
        <el-row>
            <el-col :span="24">
                <template>
                    <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="postmember = true"
                               round>
                        添加成员
                    </el-button>
                    <el-dialog title="添加成员" :visible.sync="postmember">
                        <el-form :model="createform" :rules="rules" ref="createform">
                            <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                                <el-input v-model="createform.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                                <el-input v-model="createform.password" type="password"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="postmember = false">取 消</el-button>
                            <el-button type="primary" @click="addMember('createform')">确 定</el-button>
                        </div>
                    </el-dialog>
                </template>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="members"
                        border
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            label="用户名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="名字"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="age"
                            label="年龄"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="sex"
                            label="性别"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机"
                            width="180">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
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
    import {familyuser, addmember, deletemember} from '../../api/api';

    export default {
        data() {
            return {
                userId: JSON.parse(sessionStorage.getItem('access-token')),
                members: '',
                familyinfo:JSON.parse(sessionStorage.getItem('familyinfo')),
                postmember: false,
                createform: {
                    username: '',
                    password:'',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'}

                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'},
                        {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
                    ],
                },
                formLabelWidth: '120px',
                formLabelWidths: '120px',
                selectoption: '',
            }
        },
        methods: {
            handleDelete(row) {
                deletemember(this.userId.id,this.familyinfo.id, row.id).then(data => {
                    if (data.resultCode == 0) {
                        familyuser(this.userId.id).then(data => {
                            console.log(JSON.stringify(data.data))
                            this.members = data.data
                            sessionStorage.setItem("familyinfo", JSON.stringify(data.data));
                        })
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: data.resultMsg
                        });
                    }
                })
            },
            addMember(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addmember(this.userId.id, this.familyinfo.id,this.createform).then(data => {
                            if (data.resultCode == 0) {
                                familyuser(this.userId.id).then(data => {
                                    this.members = data.data
                                    sessionStorage.setItem("familyinfo", JSON.stringify(data.data));
                                })
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
            info() {
                let familyuser = JSON.parse(sessionStorage.getItem('familyuser'));
                if (familyuser) {
                    this.members = familyuser
                    console.log(this.members)
                }
            }
        },
        created() {
            this.info()

        }
    }
</script>
