<template>
    <div id="app">
        <el-form :model="phoneform" status-icon :rules="rules2" ref="phoneform" label-width="100px"
                 class="demo-ruleForm login-container">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <el-row :gutter="6">
                            <el-col :xs="0" :sm="4" :md="6" :lg="8" :xl="8">
                                <div class="grid-content bg-purple"></div>
                            </el-col>
                            <el-col :span="10" :xs="24" :sm="16" :md="12" :lg="8" :xl="8">
                                <div class="grid-content bg-purple">
                                    <div class="login">
                                        <el-form-item  prop="phone">
                                            <el-input placeholder="请输入手机号" v-model="phoneform.phone" >
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="verifyCode">
                                            <el-input placeholder="请输入验证码" v-model="phoneform.verifyCode" class="input-with-select">
                                                <el-button slot="append" @click="getVerifyCode()">获取验证码</el-button>
                                            </el-input>
                                        </el-form-item>
                                        <el-button-group>
                                            <el-button size="mini" type="primary" icon="el-icon-arrow-left" @click="change()"  plain round>账号密码登录</el-button>
                                            <el-button size="mini" type="primary" icon="el-icon-circle-plus" @click="registerss=true" plain>注册账号</el-button>
                                            <el-dialog title="注册账号" :visible.sync="registerss">
                                                <el-form :model="register" status-icon :rules="rules2" ref="register"
                                                         label-width="80px" class="demo-ruleForm"
                                                         size="smart">
                                                    <el-form-item prop="phone">
                                                        <el-input placeholder="请输入手机号" v-model="register.phone">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item prop="verifyCode">
                                                        <el-input placeholder="请输入验证码" v-model="register.verifyCode"
                                                                  class="input-with-select">
                                                            <el-button slot="append" @click="getVerifyCode1()">获取验证码
                                                            </el-button>
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <el-button type="primary" @click="registerForm('register')">提交
                                                        </el-button>
                                                        <el-button @click="resetRegister('register')">重置</el-button>
                                                    </el-form-item>
                                                </el-form>
                                            </el-dialog>
                                            <el-button size="mini" type="primary" icon="el-icon-arrow-right" plain
                                                       round @click="findpws = true">找回密码
                                            </el-button>
                                            <el-dialog title="找回密码" :visible.sync="findpws">
                                                <el-form :model="findpw" status-icon :rules="rules" ref="findpw"
                                                         label-width="80px" class="demo-ruleForm"
                                                         size="smart">
                                                    <el-form-item prop="phone">
                                                        <el-input placeholder="请输入手机号" v-model="findpw.phone">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item prop="verifyCode">
                                                        <el-input placeholder="请输入验证码" v-model="findpw.verifyCode"
                                                                  class="input-with-select">
                                                            <el-button slot="append" @click="getVerifyCode2()">获取验证码
                                                            </el-button>
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <el-button type="primary" @click="findpwForm('findpw')">提交
                                                        </el-button>
                                                        <el-button @click="findpwRegister('findpw')">重置</el-button>
                                                    </el-form-item>
                                                </el-form>
                                            </el-dialog>
                                        </el-button-group>
                                        <el-form-item style="text-align: center;margin: 50px 50px 5px 0px;">
                                            <el-button type="primary" @click="submitFormPhone('phoneform')">登录</el-button>
                                            <el-button @click="resetFormPhone('phoneform')">重置</el-button>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :xs="0" :sm="4" :md="6" :lg="8" :xl="8">
                                <div class="grid-content bg-purple"></div>
                            </el-col>
                            <el-col :xs="0" :sm="4" :md="6" :lg="8" :xl="8">
                                <div class="grid-content bg-purple"></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-form>
    </div>
</template>

<script>
    import {login,getcode,registeres,findpw,updatepass} from '../../api/api';
    export default {
        data() {
            return {
                findpws:false,
                findpw: {
                    phone: '',
                    verifyCode: '',
                },
                phoneform: {
                    phone: '',
                    verifyCode:'',
                },
                registerss: false,
                register: {
                    phone: '',
                    verifyCode: '',
                },
                rules2: {
                    phone:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
                    ],
                    verifyCode:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 6, max: 6, message: '长度为6个字符', trigger: 'blur' }
                    ], phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {min: 11, max: 11, message: '长度为11个字符', trigger: 'blur'}
                    ],
                    verifyCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {min: 6, max: 6, message: '长度为6个字符', trigger: 'blur'}
                    ],
                },
            };
        },
        methods: {
            change(){
                this.$router.push({path:'/login'})
            },
            submitFormPhone(){
                this.$refs.phoneform.validate((valid) => {
                    if (valid) {
                        login(this.phoneform).then(data => {
                            console.log(data)
                            if (data.resultCode == 0) {
                                let access = JSON.stringify(data.data);
                                sessionStorage.setItem('access-token', access);
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                this.$router.replace({path: '/home'});
                            } else {
                                this.$message.error(data.resultMsg);
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
                                message: '验证码发送成功，请在1分钟之内输入',
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
            getVerifyCode1(){
                if(this.register.phone && this.register.phone.length == 11){
                    getcode(this.register.phone).then(data =>{
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
            resetRegister() {
                this.$refs.register.resetFields();
            },
            registerForm(){
                this.$refs.register.validate((valid)=>{
                    if (valid) {
                        console.log(this.register.phone)
                        const phone = {
                            phone:this.register.phone
                        }
                        registeres(this.register.verifyCode,phone).then(data => {
                            if (data.resultCode == 0) {
                                this.$message({
                                    message: '注册成功',
                                    type: 'success'
                                });
                                this.registerss=false;
                            } else {
                                this.$message.error(data.resultMsg);
                            }
                        })

                    } else {
                        return false;
                    }
                })
            },
            findpwForm() {
                this.$refs.findpw.validate((valid) => {
                    if (valid) {
                        console.log(this.findpw.phone)
                        findpw(this.findpw.phone, this.findpw.verifyCode).then(data => {
                            if (data.resultCode == 0) {
                                this.$prompt('请输入新密码', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                }).then(({ value }) => {
                                    let string = {
                                        phone:this.findpw.phone,
                                        password:value
                                    }
                                    updatepass(string).then(data=>{
                                        if (data.resultCode ==0){
                                            this.$message({
                                                message: '修改成功',
                                                type: 'success'
                                            });
                                        }else {
                                            this.$message.error(data.resultMsg);
                                        }
                                    })
                                    this.findpws=false
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '取消输入'
                                    });
                                    this.findpws=false
                                });
                            } else {
                                this.$message.error(data.resultMsg);
                            }
                        })

                    } else {
                        return false;
                    }
                })
            },
            findpwRegister() {
                this.$refs.findpw.resetFields();
            },
            getVerifyCode2() {

                if (this.findpw.phone && this.findpw.phone.length == 11) {
                    let pohone = this.findpw.phone;
                    getcode(pohone).then(data => {
                        if (data.resultCode == 0) {
                            this.$notify({
                                title: '成功',
                                message: '验证码发送成功，请在1分钟之内输入',
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: data.resultMsg
                            });
                        }
                    })
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请输入正确手机号'
                    });
                }

            },
        }
    }
</script>
<style>
    body {
        background: #409EFF;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .login {
        width: 500px;
        height: 300px;
        margin: -190px 0 0 -250px;
        position: absolute;
        top: 500%;
        left: 50%;
        z-index: 100;
        background-color: #ffffff;
        border-radius: 10px;
        text-align: center;
        padding-top:60px;
        padding-right: 80px;
    }
</style>