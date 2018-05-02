<template>
  <div id="app">
    <vue-schedule-week :type="'week'"></vue-schedule-week>
  </div>
</template>
<script>
import Timer from '../src/utils/date'
window.Timer = Timer
export default {
  name: 'App',
  mounted () {
  },
  components: {
  }
}
</script>

<style>
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
