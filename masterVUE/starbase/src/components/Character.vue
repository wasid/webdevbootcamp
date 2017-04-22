<template>
    <div class="" @click="switchchar">
        {{characterinfo}}
    </div>
</template>
<script>
    export default{
        props: ['id'],
        data(){
            return{
                characterinfo: {}                
            }
        },
        methods: {
            fetchdata(id) {
              fetch(`http://swapi.co/api/people/${id}`, {
                method:"GET"
              })
              .then(respose => respose.json())
              .then(json => this.characterinfo = json)
            },
            
            switchchar() {
               let rand_id = Math.floor(Math.random() * 83) + 1
               console.log(rand_id)
               this.fetchdata(rand_id)
            }
        },
        
        created(){
            this.fetchdata(this.id)
        }
    }
</script>