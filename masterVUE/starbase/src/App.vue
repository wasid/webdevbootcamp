<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h1>{{title}}</h1>
    <button class="btn btn-success" @click="fetchdata">get info</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Generate your team'
    }
  },
  methods: {
    fetchdata(){
      fetch("http://swapi.co/api/people/1", {
        method:"GET"
      }).then(respose => respose.json()).then(json => console.log(json))
    }
  }
}
</script>

<style>

</style>
