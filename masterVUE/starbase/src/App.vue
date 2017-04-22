<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h3>{{title}}</h3>
    <!--<button class="btn btn-success" @click="fetchdata">Get Character Info</button>-->
    <div class="col-md-12">
      <getCharacter  
    
      v-for="(got_id, index) in init_ids"
      :id="got_id"
      key= "index"
      
      />  
    </div>
    
  </div>
</template>

<script>
import getCharacter from './components/Character.vue'
export default {
  name: 'app',
  data() {
    return {
      title: 'Generate your team',
      init_ids: [1,13,14]
    }
  },
  components: {
      getCharacter
  }
}
</script>

<style>

</style>
