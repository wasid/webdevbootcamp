<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h3>{{title}}</h3>
    <!--<button class="btn btn-success" @click="fetchdata">Get Character Info</button>-->
    <Character />
  </div>
</template>

<script>
import Character from './components/Character.vue'
export default {
  name: 'app',
  data() {
    return {
      title: 'Generate your team'
    }
  },
  components: {
      Character
  }
}
</script>

<style>

</style>
