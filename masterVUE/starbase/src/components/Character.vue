<template>
    <div class="">
        {{character}}
    </div>
</template>
<script>
    export default{
        data(){
            return{
                character: {
                    
                }                
            }
        },
        methods: {
            fetchdata(){
              fetch("http://swapi.co/api/people/1", {
                method:"GET"
              })
              .then(respose => respose.json())
              .then(json => this.character = json)
            }
        },
        
        created(){
            this.fetchdata()
        }
    }
</script>