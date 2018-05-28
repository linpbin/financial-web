<template>
    <el-row>
        <el-row>
            <el-col :span="24">
                <el-button-group>
                    <el-button type="primary" size="small" icon="el-icon-circle-plus-outline"
                               @click="updatepw=true"
                               round>
                        修改密码
                    </el-button>
                    <el-dialog title="修改密码信息" :visible.sync="updatepw">
                        <el-form :model="pwform" :rules="rules2" ref="pwform" label-width="80px" class="demo-ruleForm"
                                 size="smart">
                            <el-form-item label="新密码" prop="pass">
                                <el-input type="password" v-model="pwform.pass"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPass">
                                <el-input type="password" v-model="pwform.checkPass" ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitFormPw('pwform')">提交</el-button>
                                <el-button @click="resetFormPw('pwform')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                    <el-button type="primary" size="small" icon="el-icon-circle-plus-outline"
                               @click="updatephone =true"
                               round>
                        更改手机号
                    </el-button>
                    <el-dialog title="更改手机号" :visible.sync="updatephone">
                        <el-form :model="phoneform" status-icon :rules="rules2" ref="phoneform" label-width="80px" class="demo-ruleForm"
                                 size="smart">
                            <el-form-item  prop="phone">
                                <el-input placeholder="请输入手机号" v-model="phoneform.phone" >
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="verifyCode">
                                <el-input placeholder="请输入验证码" v-model="phoneform.verifyCode" class="input-with-select">
                                    <el-button slot="append" @click="getVerifyCode()">获取验证码</el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitFormPhone('phoneform')">提交</el-button>
                                <el-button @click="resetFormPhone('phoneform')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </el-button-group>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="userinfo"
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
                            label="昵称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="age"
                            label="年龄"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="sex"
                            label="性别"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="familyName"
                            label="家庭"
                            width="180">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit" @click="updateinfo = true">编辑
                            </el-button>
                            <el-dialog title="修改个人信息" :visible.sync="updateinfo">
                                <el-form :model="updateuserinfo" status-icon :rules="rules2" ref="updateuserinfo"
                                         label-width="80px" class="demo-ruleForm"
                                         size="smart">
                                    <el-form-item prop="username">
                                        <el-input placeholder="请输入用户名" v-model="updateuserinfo.username">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="name">
                                        <el-input placeholder="请输入昵称" v-model="updateuserinfo.name">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="age">
                                        <el-input placeholder="请输入年龄" v-model="updateuserinfo.age">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="sex">
                                        <el-input placeholder="请输入性别" v-model="updateuserinfo.sex">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="updateinfoForm('updateuserinfo')">修改
                                        </el-button>
                                        <el-button @click="resetUserinfo('updateuserinfo')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
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
    import {updatepassword, userinfo,getcode,updatephone,updateuser} from '../../api/api'
    import ElButtonGroup from "../../../node_modules/element-ui/packages/button/src/button-group.vue";

    export default {
        components: {ElButtonGroup},
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.pwform.checkPass !== '') {
                        this.$refs.pwform.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.pwform.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                userId: JSON.parse(sessionStorage.getItem('access-token')),
                userinfo: [],
                phoneform: {
                    phone: '',
                    verifyCode:'',
                },
                pwform:{
                    pass:'',
                    checkPass:'',
                },
                updateuserinfo:{
                    username:'',
                    name:'',
                    age:'',
                    sex:'',
                },
                updateinfo:false,
                updatephone:false,
                updatepw:false,
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    phone:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
                    ],
                    verifyCode:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 6, max: 6, message: '长度为6个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            submitFormPhone(){
                this.$refs.phoneform.validate((valid) => {
                    if (valid) {
                        updatephone(this.userId.id, this.phoneform).then(data => {
                            if (data.resultCode == 0) {
                                userinfo(this.userId.id).then(data => {
                                    this.userinfo=[data.data]
                                    sessionStorage.setItem("access-token", JSON.stringify(data.data));
                                })
                                this.$notify({
                                    title: '成功',
                                    message: '绑定成功',
                                    type: 'success'
                                });
                                this.phoneform.phone=''
                                this.phoneform.verifyCode=''
                                this.updatephone=false
                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: data.resultMsg
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetFormPhone(){
                this.$refs.phoneform.resetFields();
            },
            getVerifyCode(){
                if(this.phoneform.phone && this.phoneform.phone.length == 11){
                    getcode(this.phoneform.phone).then(data =>{
                        if (data.resultCode ==0){
                            this.$notify({
                                title: '成功',
                                message: '验证码发送成功，请在5分钟之内输入',
                                type: 'success'
                            });
                        }else {
                            this.$notify.error({
                                title: '错误',
                                message: '验证码获取失败'
                            });
                        }
                    })
                }else {
                    this.$notify.error({
                        title: '错误',
                        message: '请输入正确手机号'
                    });
                }

            },
            submitFormPw() {
                this.$refs.pwform.validate((valid) => {
                    if (valid) {
                        let userinfos = {
                            password: this.pwform.pass,
                        }
                        updatepassword(this.userId.id, userinfos).then(data => {
                            if (data.resultCode == 0) {
                                userinfo(this.userId.id).then(data => {
                                    this.userinfo=[data.data]
                                    sessionStorage.setItem("access-token", JSON.stringify(data.data));
                                })
                                this.$notify({
                                    title: '成功',
                                    message: '修改密码成功',
                                    type: 'success'
                                })
                                this.pwform.pass=''
                                this.pwform.checkPass=''
                                this.updatepw=false
                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: data.resultMsg
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetFormPw() {
                this.$refs.pwform.resetFields();
            },
            updateinfoForm(){
                updateuser(this.userId.id,this.updateuserinfo).then(data=>{
                    if (data.resultCode == 0 ){
                        userinfo(this.userId.id).then(data => {
                            this.userinfo=[data.data]
                            sessionStorage.setItem("access-token", JSON.stringify(data.data));
                        })
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                        this.updateinfo=false;
                    }
                    else {
                        this.$notify.error({
                            title: '错误',
                            message: data.resultMsg
                        });
                    }
                })
            },
            resetUserinfo(){
                this.$refs.updateuserinfo.resetFields();
            },
            info() {
                let userinfo = JSON.parse(sessionStorage.getItem('access-token'));
                if (userinfo) {
                    this.userinfo.push(userinfo)
                    console.log(this.userinfo)
                }
            }
        },
        created() {
            this.info()
        }
    }
</script>
