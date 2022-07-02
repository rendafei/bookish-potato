<template>
<div id="app">
    <div id="nav">
    <vue-particles
        color="#555"
        :particleOpacity="0.7"
        :particlesNumber="150"
        shapeType="circle"
        :particleSize="4"
        linesColor="#555"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="push"
        class="lizi"
    />
    </div>
<div id="login-container">
    <div class="login-image">
    <img src="./3.jpg.png" style="width: 93px;
    height: 93px;
    border-radius: 50%;
    margin-left: -4px;
    margin-top: -8px;">
    </div>
    <div class="login-win">
    <el-input v-model="username" placeholder="请输入用户名" id="User"></el-input>
    <el-input v-model="userpwd" placeholder="请输入密码" id="Pass" type="password"></el-input>
    <div class="login-but">
    <el-button type="info"  @click="loginx()" >登录</el-button>
    <el-button type="info" @click="add">注册</el-button>
    </div>
    </div>
</div>
</div>
</template>
<script>
import axios from 'axios'; 
import { GetName } from '../api/list'
export default {
    data(){
        return{
            username:'',
            userpwd:''

        }
    },

    methods:{
        loginx(){
            let _this =this;
            const user =  this.username;
            const pass =  this.userpwd;
            GetName(user);
            if(user == ''||pass == ''){
                alert('用户名密码为空')
            }else if(user.indexOf(' ') != -1||pass.indexOf(' ')!= -1){
                alert('用户名密码中含有空格')
            }else
            axios.get('http://localhost:5002/Users/Login',{params:{Flow_no_name:user,Flow_no_pass:pass}}
            ).then(function (response) {
                if(response.data!=0){
                    let userRole = response.data; 
                    if(userRole == "admin" || userRole == "manage"){
                            _this.$store.commit('roleGet',{id:userRole,name:user});
                            _this.$router.replace('/home/Agree'); 
                    }else{
                            _this.$store.commit('roleGet',{id:userRole,name:user});
                            _this.$router.replace('/home/Upload'); 
                    }
                }else{
                    alert('用户名密码错误')
                }
            }) .catch(function (error) {
            console.log(error);
        })
        },

        add(){
            const user = this.username;
            const pass = this.userpwd;
            if(user == ''||pass == ''){
                alert('用户名密码为空')
            }else if(user.indexOf(' ') != -1||pass.indexOf(' ')!= -1){
                alert('用户名密码中含有空格')
            }else{
                  axios.post('http://localhost:5002/Users',
            {Flow_no_name:user,Flow_no_pass:pass}).then(function(res){
               if(JSON.stringify(res.data)){
                alert('注册成功')
               }else{
                alert('注册失败')
               }
            }).catch(function(err){
                console.log(err)
            })
            }
        },
    }
}
</script>
<style scoped>
body{
    /*margin: 0;*/
    width: 100%;
    background-color: rgb(198, 222, 238);
}
#login-container{
    width: 400px;
    height: 290px;
    background: #74c8d150;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -220px;
    margin-top: -170px;
    border-radius: 5px;
    padding-top: 40px;
    padding-right: 40px;
}
.login-win{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 200px;
    margin-left: 113px;
    margin-top: 80px;
}
.login-but{
    width: 100%;
    height: auto;
    margin: 0 20px;
    
}
.login-image{
    width:80px;
    height: 80px;
    border: white dashed 1px;
    border-radius: 50%;
    background-size: 215px;
    background-repeat:no-repeat;
    background-position-y: 9%;
    padding: 5px;
    margin: -50px auto;
}
.lizi{
    position:fixed;
    top:0;
    width:100%;
    background:rgb(204, 228, 235);
}
</style>