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
  <router-view />
</template>

<script lang="ts">
//import { Options, Vue } from 'vue-facing-decorator'
//@Options({})
import { Component, Vue } from 'vue-facing-decorator';
@Component
export default class App extends Vue { }
</script>
<style>
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #e2e2e2;
}

div {
  margin: 0;
  padding: 0;
}

h1 {
  margin: 0;
  padding: 0;
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
