<template>
    Login page
    <div id="container">
        <div id="title">User Login</div>
        <el-row class="input">
            <el-col :span="3">
                <div class="label">Account: </div>
            </el-col>
            <el-col :span="9"><el-input v-model="account" prefix-icon="User"
                    placeholder="please input a account"></el-input></el-col>
        </el-row>
        <el-row class="input">
            <el-col :span="3">
                <div class="label">Password: </div>
            </el-col>
            <el-col :span="9"><el-input v-model="password" prefix-icon="Key"
                    placeholder="please input password"></el-input></el-col>
        </el-row>
        <el-button @click="login" style="width:100px; margin-top: 20px; margin-left: 100px;" type="primary"
            :disabled="disabled">Login</el-button>
        <div class="link"><el-link href="#/sign">Not have a account, please sign-up first</el-link></div>
    </div>
</template>

<script lang="ts">
//import { Options, Vue } from 'vue-facing-decorator'
import { Component, Vue, toNative } from 'vue-facing-decorator'
import networkPath from '../../tools/Network';
import store, { UserInfo } from '../../tools/Store';
import { ElMessage } from 'element-plus'
//@Options({})
@Component
class Login extends Vue {
    get disabled() {
        return !(this.account && this.password)
    }
    account?: string = ""
    password?: string = ""
    login() {
        this.axios.get(networkPath.login + `?account=${this.account}&password=${this.password}`).then((response) => {
            let userInfo: UserInfo = response.data.content;
            store.commit('registUserInfo', userInfo);
            ElMessage({
                message: 'Login success, will goto the home page',
                type: 'success'
            })
            setTimeout(() => { this.$router.push({ name: "home" }) }, 3000);
        }).catch((error) => {
            ElMessage.error(error.response.data.msg)
        })
        console.log("login")
    }
}
export default toNative(Login)
</script>

<style scoped>
#container {
    margin: 0 auto;
    width: 800px;
    background-color: white;
    box-shadow: 5px 5px 10px #c1c1c1;
    border-radius: 5px;
    overflow: hidden
}

#title {
    margin: 10px 0px 0px 20px;
    font-size: 18px;
    font-weight: bold;
}

.label {
    display: flex;
    height: 100%;
    line-height: 100%;
    justify-content: center;
    align-items: center;
}

.input {
    margin-top: 20px;
    text-align: center;
}

.link {
    margin-left: 100px;
    margin-top: 15px;
    margin-bottom: 20px;
}
</style>