<template>
    <el-row>
        <el-row>
            <el-col :span="24">
                <template>
                    <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="postfamily = true"
                               round>
                        添加家庭
                    </el-button>
                    <el-dialog title="新增家庭" :visible.sync="postfamily">
                        <el-form :model="createform" :rules="rules" ref="createform">
                            <el-form-item label="家庭名称" :label-width="formLabelWidth" prop="familyName">
                                <el-input v-model="createform.familyName"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="postfamily = false">取 消</el-button>
                            <el-button type="primary" @click="addFamily('createform')">确 定</el-button>
                        </div>
                    </el-dialog>
                </template>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="familyinfo"
                        border
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="familyName"
                            label="名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="管理员"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="membersNum"
                            label="成员人数"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="createDate"
                            label="创建时间"
                            width="180">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit" @click="updatefamily = true">编辑
                            </el-button>
                            <el-dialog title="修改家庭信息" :visible.sync="updatefamily">
                                <el-form :model="editform">
                                    <el-form-item label="家庭名称" :label-width="formLabelWidth" prop="familyName">
                                        <el-input v-model="editform.familyName" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="选择管理员" :label-width="formLabelWidth">
                                        <el-select v-model="editform.familyAdmin" placeholder="请选择">
                                            <el-option
                                                    v-for="item in selectoption"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="updatefamily = false">取 消</el-button>
                                    <el-button type="primary" @click="handleEdit(scope.row)">确 定</el-button>
                                </div>
                            </el-dialog>
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
    import {familyinfo, editfamily, postfamily, deletefamily} from '../../api/api';
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";

    export default {
        components: {ElFormItem},
        data() {
            return {
                userId: JSON.parse(sessionStorage.getItem('access-token')),
                familyinfo: [],
                updatefamily: false,
                postfamily: false,
                editform: {
                    familyName: '',
                    familyAdmin: '',
                },
                createform: {
                    familyName: '',
                },
                rules: {
                    familyName: [
                        {required: true, message: '请输入家庭名称', trigger: 'blur'},
                    ]
                },
                formLabelWidth: '120px',
                selectoption: '',
            }
        },
        methods: {
            handleEdit(row) {
                editfamily(this.userId.id, row.id, this.editform).then(data => {
                    if (data.resultCode == 0) {
                        familyinfo(this.userId.id).then(data => {
                            this.familyinfo = [data.data]
                            var arr = this.familyinfo;
                            for (const index in arr) {
                                arr[index].createDate = this.formatDate(arr[index].createDate)
                            }
                            this.familyinfo = arr
                            sessionStorage.setItem("familyinfo", JSON.stringify(data.data));
                        })
                        this.$notify({
                            title: '成功',
                            message: '修改记录成功',
                            type: 'success'
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: data.resultMsg
                        });
                    }

                })
                this.updatefamily = false
            },
            handleDelete(row) {
                deletefamily(this.userId.id, row.id).then(data => {
                    if (data.resultCode == 0) {
                        this.familyinfo = '';
                        let info = '';
                        sessionStorage.setItem("familyinfo", info);
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: data.resultMsg
                        });
                    }
                })
            },
            addFamily(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        postfamily(this.userId.id, this.createform.familyName).then(data => {
                            if (data.resultCode == 0) {
                                familyinfo(this.userId.id).then(data => {
                                    var arr = data.data;
                                    arr.createDate = this.formatDate(arr.createDate)
                                    this.familyinfo.push(arr)
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
                            this.postfamily = false
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
            dateformat() {
                var arr = this.familyinfo;
                for (const index in arr) {
                    arr[index].createDate = this.formatDate(arr[index].createDate)
                }
                this.familyinfo = arr
            },
            info() {
                let familyinfo = JSON.parse(sessionStorage.getItem('familyinfo'));
                let familyuser = JSON.parse(sessionStorage.getItem('familyuser'));
                if (familyuser) {
                    this.selectoption = familyuser
                }
                if (familyinfo) {
                    this.familyinfo.push(familyinfo)
                }
            }
        },
        created() {
            this.info()
            this.dateformat()

        }
    }
</script>
