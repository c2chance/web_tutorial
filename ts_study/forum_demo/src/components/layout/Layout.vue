<template>
    Layout page
    <el-container id="container">
        <el-header style="margin:0;padding: 0;box-shadow: 5px 5px 10px #c1c1c1;" height="80px">
            <el-container style="background-color: #ffffff;margin:0;padding:0; height:80px">
                <div style="margin: auto;margin-left: 300px;">
                    <h1 style="float:left">Developer techonogies forum</h1>
                    <div v-if="isLogin" style="margin:auto;margin-left: 60px;float: left;">
                        <el-input v-model="keyword" style="height:30px; width: 500px;"
                            placeholder="search the posts you interesting">
                            <template #prepend>
                                <el-button icon="Search" />
                            </template>
                            <template #append>
                                <el-button v-on:click="toSearch">Goto</el-button>
                            </template>
                        </el-input>
                    </div>

                    <div v-if="isLogin" style="float: left;margin-left: 40px;">
                        <el-button type="danger" v-on:click="logout">logout</el-button>
                    </div>
                </div>
            </el-container>
        </el-header>
        <el-main style="padding: 0;margin-top:20px">
            <router-view :key="$route.fullPath"></router-view>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
//import { Options, Vue } from 'vue-facing-decorator'
import store from '../../tools/Store';
//@Options({})

@Component
class Layout extends Vue {
    keyword = ""
    get isLogin(): boolean {
        return store.getters.isLogin;

    }
    toSearch() {
        if (this.keyword) {
            this.$router.push({ name: "search", params: { keyword: this.keyword } })
        }
    }
    logout() {
        store.commit('clearUserInfo')
        this.$router.push({ name: 'login' })
        console.log('logout')
    }
}
export default toNative(Layout)
</script>

<style scoped>
#container {
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
}
</style>