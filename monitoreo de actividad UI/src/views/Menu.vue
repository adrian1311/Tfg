<template>
    <div class="about">
      <div>
        <b-modal ref="my-modal" hide-footer title="Steps in last 15 days">
          <div class="d-block text-center">
<!--            <div class="row justify-content-center mt-4 " v-for="(list, key) in mapStepsAndDate" :index="key" :key="key">-->
<!--              {{ list}}-->
<!--            </div>-->
            <div class="row justify-content-center mt-4 " v-for="[fooKey, barValue,key] in mapStepsAndDate" :key="key" >
              Date:  {{fooKey}} => Steps:  {{barValue}}
            </div>

          </div>
          <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
        </b-modal>
      </div>

      <div class="row justify-content-center">
<!--        <div class="col-sm-4">-->
<!--          <button type="button" class="btn btn-warning btn-lg mt-4 btn-block">Borrar pulsera</button>-->
<!--        </div>-->
      </div>
      <div class="row justify-content-center" >
        <div class="col-sm-6">
          <button type="button" class="btn btn-success btn-lg mt-4 btn-block" v-on:click="getAllUsers" >Ver pulseras</button>
        </div>
<!--        <div class="col-sm-4">-->
<!--          <button type="button" class="btn btn-success btn-lg mt-4 btn-block">Otras</button>-->
<!--        </div>-->
      </div>
      <div class="row justify-content-center mt-4 " v-for="user in this.allUsers" :key="user.name">
       <div class="col-sm-8">
         <div class="row border border-primary justify-content-center">
           <div class="col-sm-4 mt-3 mb-3">
             <input type="text" disabled class="form-control text-center" v-model="user.name">
           </div>
           <div class="col-sm-2 mt-3 mb-3">
             <b-button id="show-btn" class="btn-dark btn" @click="showModal(user.refresh_token)">Ver informacion</b-button>
<!--             <button type="button" class="btn btn-success btn-sm btn-block" v-on:click="seeSteps(user.refresh_token)">Ver informacion</button>-->
           </div>
         </div>
<!--         <div class="row border border-primary justify-content-center" v-for="day in this.userSteps" :key="day.name">-->
<!--           <input type="text" disabled class="form-control " v-model="day.name">-->
<!--         </div>-->


       </div>



      </div>
      <div class="row justify-content-center">
        <div class="col-sm-6 mt-3">
          <button type="button" class="btn btn-success btn-lg mt-4 btn-block" v-on:click="addBand">Añadir nueva pulsera</button>
        </div>
      </div>

    </div>
</template>
<script>
    // @ is an alias to /src
   const axios = require('axios').default;
    export default {
        name: 'About',
        components: {},
        data() {
            return {
              errorStatus:'',
              allUsers:[],
              userSteps:[],
              mapStepsAndDate : new Map(),
              chartData: {
                labels: ['A','B','C'],
              }
            }

        },
        mounted() {

        },
        methods: {
          addBand(){
            var self=this;
            axios.get("http://localhost:5999/")
                .then(function (response) {
                  self.urlForSteps= response.data
                  window.open(self.urlForSteps, "_blank");
                }).catch(error => {
              if (!error.response) {
                // network error
                this.errorStatus = 'Error: Network Error';
              } else {
                this.errorStatus = error.response.data.message;
              }
            })
          },
          getAllUsers(){
            var self=this;
            axios.get("http://localhost:5998/pasos/getUsers")
                .then(function (response) {
                  self.allUsers= response.data
                  console.log(self.allUsers)
                }).catch(error => {
              console.log(error)
            })
          },
          seeSteps(token){
            var self=this;
            axios.get("http://localhost:5999/getInformation",{
              params:{
                userToken:token
              }
            })
                .then(function (response) {
                  self.userSteps= response.data
                  self.testConverter(self.userSteps)
                  //self.convertResponseArrayToMapWithDateAndSteps(self.userSteps);
                }).catch(error => {
              console.log(error)
            })
          },
          testConverter(steps){
            //var self = this;
            for(var step of steps ) {
              console.log('dddddddd'+ typeof step.startTimeMillis)
              console.log('start', step.startTimeMillis)
              console.log(step.endTimeNanos/1000000)
              var date = new Date(step.endTimeNanos/1000000);
              var date2 = new Date( step.startTimeMillis);
              console.log('end', date)
              console.log('end2', date2)
              //console.log(step.dataset[0].point)
              if(step.dataset[0].point.length >0){
                console.log('steps', step.dataset[0].point[0].value[0].intVal);
              }else{
                console.log(0);
              }

            }
          },

          convertResponseArrayToMapWithDateAndSteps(userSteps){
            console.log(userSteps)
            var self = this;
            self.mapStepsAndDate = new Map();
            for(var step of userSteps ){



              console.log(step.endTimeNanos/1000000)
              var date = new Date(step.endTimeNanos/1000000);
              if(step.value != null){
                self.mapStepsAndDate.set(date.toDateString(),step.value[0].intVal)
              }else {
                self.mapStepsAndDate.set(date.toDateString(),0)
              }

            }
            console.log(self.mapStepsAndDate)
          },
          showModal(token) {
            this.seeSteps(token)
            this.$refs['my-modal'].show()
          },
          hideModal() {
            this.$refs['my-modal'].hide()
          },
          toggleModal() {
            // We pass the ID of the button that we want to return focus to
            // when the modal has hidden
            this.$refs['my-modal'].toggle('#toggle-btn')
          }
        }
    }
</script>