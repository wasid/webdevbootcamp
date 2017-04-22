<template>
    <div class="col-md-4" @click="switchchar">
        <div class="character-card">
            <div class="card-block">
                <h4 class="catd-title">{{characterinfo.name}}</h4>
                <p class="card-text">Height: {{characterinfo.height}}cm</p>
                <p class="card-text">Mass: {{characterinfo.mass}}kg</p>
                <p class="card-text">Hair Color: {{characterinfo.hair_color}}</p>
                <p class="card-text">Eye Color: {{characterinfo.eye_color}}</p>
            </div>
        </div>

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
            this.switchchar()
            this.fetchdata(this.id)
        }
    }
</script>