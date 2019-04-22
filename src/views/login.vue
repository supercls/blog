<template>
    <div class="blg-wrapper">
        <div class="crumbs crumbs-register">
            <el-breadcrumb separator="/" class="register-title">
                <el-breadcrumb-item><i class="el-icon-setting"></i>登陆</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="userContent">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item prop="name" label="用户名称">
                    <el-input v-model="form.name" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item prop="pass" label="密码">
                    <el-input v-model="form.pass" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                    <el-button @click="onCancle()">取消</el-button>
                </el-form-item>
				<el-form-item>
				    <span class="onLogin">还没有账号，去<a href="javascript:;" @click="onRegister()">注册</a></span>
				</el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {login} from '@/api/login'
export default {
        data() {
            return {
                form: {
                    name: '',                
                    pass: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true,message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            onSubmit(formName) {      
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       login(this.form).then(res=>{
                            
							alert("登陆成功")
							this.$router.push('/Index/article');
                       })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            onCancle() {
                this.$router.push('/Index/article');
            },
            onRegister  () {
                this.$router.push('/register');
            },  
        }
    }
</script>
<style scoped lang="less">
    .crumbs-register {
        background-color: #324157;
        height: 50px;
        line-height: 50px;
    }
    .register-title {
        line-height: 50px;
        margin: 0 auto;
        width: 50px;
        font-size: 16px;
    }   
    .userContent {
        width: 400px;
        margin: 60px auto 0;
    }
    .select-sex {
        width: 320px;
    }
	.onLogin{color: #606266;}
	.onLogin a{color: #409EFF;text-decoration: underline;}
</style>