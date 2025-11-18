<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue';
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus';
import type { TabsPaneContext } from 'element-plus';
import type { TabsInstance } from 'element-plus';
import 'element-plus/theme-chalk/el-overlay.css'
import 'element-plus/theme-chalk/el-message-box.css'
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router'

const router: Router = useRouter()
const handleClick = (tab: TabsPaneContext) => {
  router.push({
    path: tab.props.name as string
  })
}

const tabPosition = ref<TabsInstance['tabPosition']>('left')
/*
onMounted(() => {
  ElMessageBox.alert('Load elementplus ui framework success', 'tips', {})
})
*/

</script>

<template>
  <!--
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
-->

  <el-button type="primary">el-button</el-button>
  <br><br><br>
  <el-tabs :tab-position="tabPosition" type="card" class="demo-tabs" style="height: 200px;" @tab-click="handleClick">
    <el-tab-pane label='Visit Index.vue' name="/"></el-tab-pane>
    <el-tab-pane label="visit Login.vue" name="/login"></el-tab-pane>
  </el-tabs>
  <router-view></router-view>

</template>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  --webkit-font-smoothing: antialiased;
  --moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
