<template>
<div>
  <div class="loader d-flex justify-content-center align-items-center" v-if="isLoading">
    <div class="spinner-grow text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-secondary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-danger" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-warning" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-info" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-dark" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div class="row justify-content-center">
    <div class="col-md-4 col-xl-3 center" >
      <label>Primer residente</label>
      <Dropdown v-model="firstResident" :options="usersForDropdown" placeholder="Elija un residente" />
    </div>
    <div class="col-md-4 col-xl-3" >
      <label>Segundo residente</label>
      <Dropdown v-model="secondResident" :options="usersForDropdown" placeholder="Elija un residente" />
    </div>
    <div class="col-md-4 col-xl-3" >
      <label>Intervalo</label>
      <Dropdown v-model="selectedDays" :options="daysForSearchOprions" optionLabel="name" optionValue="value" placeholder="Intervalo" />
    </div>
  </div>
  <div class="text-center mt-3">
    <p-button type="success"
              round
              @click.native.prevent="transformInformation">
      MOSTRAR INFORMACION
    </p-button>
  </div>
  <div class="row justify-content-center border border-info mt-5 " v-if="showShortWindow">
    <div class="col-sm-12 text-center bg-white">
      <h3 class="text-info font-weight-bold">INFORMACION DE RESIDENTES</h3>
      <h3 class="text-info font-weight-bold">Por favor seleccione los residentes y el intervalo</h3>
    </div>
  </div>
  <div class="row justify-content-center border border-info mt-5" v-if="showInformationWindow">
    <div class="col-sm-12">
      <div class="row justify-content-center">
        <h3>Informacion mostrada para los ultimos {{selectedDays}} dias</h3>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-5 text-center m-1">
          <h4>Primer residente: {{firstUserName}}</h4>
        </div>
        <div class="col-sm-5 text-center m-1">
          <h4>Segundo residente: {{secondUserName}}</h4>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-5 text-center border border-info rounded-lg m-1">
          <div class="row justify-content-center m-2">
            <div class="col-sm-5 text-center border border-info rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Edad (años) : {{firstUserAge}} </h5>
            </div>
            <div class="col-sm-5 text-center border border-info rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Peso (kg) : {{firstUserWeight}}</h5>
            </div>
          </div>
          <div class="row justify-content-center m-2">
            <div class="col-sm-5 text-center border border-info m-1">
              <h5 class="text-info font-weight-bold">Altura (cm) : {{firstUserHight}} </h5>
            </div>
            <div class="col-sm-5 text-center border border-info rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Pasos diarios estimados : {{firstUserEstimatedSteps}}</h5>
            </div>
          </div>
          <div class="row justify-content-center m-2">
            <div class="col-sm-10 text-center border border-info  rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Notas sobre el usuario: </h5>
            </div>
          </div>
        </div>
        <div class="col-sm-5 text-center border border-danger rounded-lg m-1">
          <div class="row justify-content-center m-2">
            <div class="col-sm-5 text-center border border-danger  rounded-lg m-1">
              <h5 class="text-danger font-weight-bold">Edad (años): {{secondUserAge}}</h5>
            </div>
            <div class="col-sm-5 text-center border border-danger rounded-lg m-1">
              <h5 class="text-danger font-weight-bold">Peso (kg): {{secondUserWeight}}</h5>
            </div>
          </div>
          <div class="row justify-content-center m-2">
            <div class="col-sm-5 text-center border border-danger  rounded-lg m-1">
              <h5 class="text-danger font-weight-bold">Altura (cm): {{secondUserHight}} </h5>
            </div>
            <div class="col-sm-5 text-center border border-danger  rounded-lg m-1">
              <h5 class="text-danger font-weight-bold">Pasos diarios estimados : {{secondUserEstimatedSteps}}</h5>
            </div>
          </div>
          <div class="row justify-content-center m-2">
            <div class="col-sm-10 text-center border border-danger  rounded-lg m-1">
              <h5 class="text-danger font-weight-bold">Notas sobre el usuario: </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12 mt-2">

      <div class="row justify-content-center">
        <div class="col-sm-2 mt-5 text-center">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-info`" slot="header">
            <i :class="'ti-user'"></i>
          </div>
          <div class="numbers" slot="content">
            <p>Pasos totales</p>
            <p>{{firstUserTotalSteps}}</p>
          </div>
        </stats-card>
          <stats-card>
            <div class="icon-big text-center" :class="`icon-info`" slot="header">
              <i :class="'ti-user'"></i>
            </div>
            <div class="numbers" slot="content">
              <p>Pasos medios</p>
              <p>{{firstUserAveragueSteps}}</p>
            </div>
          </stats-card>
          <h5 class="mt-3">Objetivo cumplido (dias)</h5>
          <Knob v-model="value"  readonly />
        </div>
        <div class="col-sm-7 text-center border border-danger m-1 bg-white rounded-lg">
          <Chart type="bar" :data="chartData" :options="chartOptions" />
        </div>
        <div class="col-sm-2 mt-5 text-center">
          <stats-card>
            <div class="icon-big text-center" :class="`icon-danger`" slot="header">
              <i :class="'ti-user'"></i>
            </div>
            <div class="numbers" slot="content">
              <p>Pasos totales</p>
              <p>{{secondUserTotalSteps}}</p>
            </div>
          </stats-card>
          <stats-card>
            <div class="icon-big text-center" :class="`icon-danger`" slot="header">
              <i :class="'ti-user'"></i>
            </div>
            <div class="numbers" slot="content">
              <p>Pasos medios</p>
              <p>{{secondUserAveragueSteps}}</p>
            </div>
          </stats-card>
          <h5 class="mt-3">Objetivo cumplido (dias)</h5>
          <Knob v-model="value" readonly  />
        </div>
      </div>



      <div class="row justify-content-center">

      </div>
    </div>

    <div class="col-sm-12 mt-2">
      <div class="row justify-content-center">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
          <h3 class="text-info">Informacion por horas de los ultimos {{selectedDays}} de {{ firstUserName }}</h3>
          <vue-good-table
            :columns="columns"
            :rows="rowsFirstUser"
            max-height="400px"
            :fixed-header="true">
          </vue-good-table>
        </div>
        <div class="col-sm-1"> </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
          <h3 class="text-danger">Informacion por horas de los ultimos {{selectedDays}} de {{secondUserName}} </h3>
          <vue-good-table
            :columns="columns"
            :rows="rowsSecondUser"
            max-height="400px"
            :fixed-header="true">
          </vue-good-table>
        </div>
      </div>
    </div>

    <div class="col-sm-12 mt-2">
      <div class="row justify-content-center">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
        </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
        </div>
      </div>
    </div>
    <div class="col-sm-12 mt-2">
      <div class="row justify-content-center">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
        </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
        </div>
      </div>
    </div>


  </div>
</div>
</template>

<script>
import moment from "moment";
import Dialog from 'primevue/dialog';

const axios = require('axios').default;
import Dropdown from "primevue/dropdown";
import { StatsCard } from "@/components/index";
import Chart from 'primevue/chart';
import Knob from 'primevue/knob';
import { VueGoodTable } from 'vue-good-table';

export default {
  name: "CompareUsers",
  components: {
    Dropdown,
    StatsCard,
    Chart,
    Knob,
    VueGoodTable,
    Dialog
  },
  data() {
    return {
      columns: [
        {
          label: 'Fecha y hora',
          field: 'date',
        },
        {
          label: 'Pasos',
          field: 'steps',
        },
      ],
      rowsFirstUser :[],
      rowsSecondUser :[],
      showShortWindow : true,
      showInformationWindow : false,
      isLoading : false,
      value: 0,
      stepsCompareGraphicFirstUser : [],
      stepsCompareGraphicSecondUser : [],
      datesForCompareGraphic : [],
      sortedMapWIthTotalSteps:new Map(),
      firstUserAveragueSteps: '',
      secondUserAveragueSteps: '',
      firstUserTotalSteps: '',
      secondUserTotalSteps: '',
      list :[],
      firstUserName:'',
      secondUserName:'',
      firstUserAge:'',
      secondUserAge:'',
      firstUserHight:'',
      secondUserHight:'',
      firstUserEstimatedSteps:'',
      secondUserEstimatedSteps:'',
      firstUserWeight:'',
      secondUserWeight:'',
      allUsers:[],
      firstResident:'',
      secondResident:'',
      usersForDropdown : [],
      selectedDays : 30,
      daysForSearchOprions : [{
        name : '3',
        value : 3,
      },
        {
        name : '7',
        value : 7,
      },
        {
          name : '30',
          value : 30,
        },],
      statsCards: [
        {
          type: "success",
          icon: "ti-server",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
      ],
      chartData: {
        labels: [],
        datasets: [{
          type: 'line',
          label: 'Primer residente',
          borderColor: '#42A5F5',
          borderWidth: 2,
          fill: false,
          data: []
        }, {
          type: 'line',
          label: 'Segundo residente',
          borderColor: 'red',
          borderWidth: 2,
          fill: false,
          data: []
        }]
      },
      chartOptions: {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
      }

    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods:{
    getAllUsers() {
      let self = this;
      self.isLoading = true;
      axios.get("http://localhost:5998/pasos/getUsers")
        .then(function (response) {
          self.allUsers = response.data;
          self.getAllUsersInfo()
        }).catch(error => {
        console.log(error)
      })
    },
    pushUsersInDropDown(){
      this.usersForDropdown = [];
      for(let user of this.allUsers){
        this.usersForDropdown.push(user.firstName)
      }
    },
    getAllUsersInfo() {
      let self = this;
      axios.post('http://localhost:5998/pasos/getAllUsersSteps', {
        users: self.allUsers,
        days: 30
      }).then(function (response) {
        self.$store.state.allUsersInformation = response.data;
        self.isLoading = false;
        self.pushUsersInDropDown();

      }).catch(error => {
        console.log(error)
      })
    },

     transformInformation() {
      this.showInformationWindow = true;
      this.showShortWindow = false;
       let s = [];
       let listWithHours = [];
       for (let userInfo of this.$store.state.allUsersInformation) {
          if(userInfo.firstName === this.firstResident){
            let map = new Map(Object.entries(userInfo.stepsWithDatesMap));
            let mapWithHours = new Map(Object.entries(userInfo.stepsWithDatesMapWithTime));
            s.push(map)
            listWithHours.push(mapWithHours)
            this.putInformationInFirstBoxInfo(userInfo)
          }
         if(userInfo.firstName === this.secondResident){
           let map = new Map(Object.entries(userInfo.stepsWithDatesMap));
           let mapWithHours = new Map(Object.entries(userInfo.stepsWithDatesMapWithTime));
           listWithHours.push(mapWithHours)
           s.push(map)
           this.putInformationInSecondBoxInfo(userInfo)
         }
       }
       this.createInfoForTables(listWithHours);
       this.list = this.createTotalSteps(s);
       this.putInformationWithTotalSteps();

       this.datesForCompareGraphic = [];
       this.stepsCompareGraphicFirstUser = [];
       this.stepsCompareGraphicSecondUser = [];

       for (const [i, value] of s.entries()) {
         let eachMapCOnvertedToList = Array.from(value);
         console.log(eachMapCOnvertedToList)
         for (let datesWithSteps in eachMapCOnvertedToList){
           for(let paramsInArray in eachMapCOnvertedToList[datesWithSteps]){

             if(i === 0 && paramsInArray == 0 ){
               this.datesForCompareGraphic.push(eachMapCOnvertedToList[datesWithSteps][0]);
               this.stepsCompareGraphicFirstUser.push(eachMapCOnvertedToList[datesWithSteps][1])
             }
             if(i === 1 && paramsInArray == 0){
               this.stepsCompareGraphicSecondUser.push(eachMapCOnvertedToList[datesWithSteps][1])
             }
           }
         }
       }
       this.chartData.labels = [];
         this.chartData.datasets[0].data = [];
       this.chartData.datasets[1].data = [];
       if(this.selectedDays != 30){
         this.chartData.labels = this.datesForCompareGraphic.splice(30 - this.selectedDays,30)
         this.chartData.datasets[0].data =  this.stepsCompareGraphicFirstUser.splice(30 - this.selectedDays,30)
         this.chartData.datasets[1].data =  this.stepsCompareGraphicSecondUser.splice(30 - this.selectedDays,30)
       }   if(this.selectedDays == 30){
         this.chartData.labels = this.datesForCompareGraphic
         this.chartData.datasets[0].data =  this.stepsCompareGraphicFirstUser
         this.chartData.datasets[1].data =  this.stepsCompareGraphicSecondUser
       }


     },

    createInfoForTables(listWithHours){
      this.rowsFirstUser = []
      this.rowsSecondUser = []
      for (const [i, value] of listWithHours.entries()) {
        let arrayWithValuesAndTime = Array.from(value);
        if(i === 0){
          if(this.selectedDays !== 30){
            arrayWithValuesAndTime.splice(0,720-this.selectedDays*24)
          }
          for(let entry of arrayWithValuesAndTime){
            this.rowsFirstUser.push({date:moment(entry[0]).format('MMMM Do YYYY, H:mm'),steps:entry[1]})
          }
        }
        if(i === 1){
          if(this.selectedDays !== 30){
            arrayWithValuesAndTime.splice(0,720-this.selectedDays*24)
          }
          for(let entry of arrayWithValuesAndTime){
            this.rowsSecondUser.push({date:moment(entry[0]).format('MMMM Do YYYY, H:mm'),steps:entry[1]})
          }
        }
        }
    },
    putInformationWithTotalSteps(){
      this.firstUserAveragueSteps = this.list[0].medios;
      this.firstUserTotalSteps = this.list[0].mensuales;
      this.secondUserAveragueSteps = this.list[1].medios;
      this.secondUserTotalSteps = this.list[1].mensuales;
    },
    putInformationInFirstBoxInfo(userInfo){
        this.firstUserName = userInfo.firstName;
        this.firstUserAge = userInfo.age;
        this.firstUserHight = userInfo.height;
        this.firstUserEstimatedSteps = userInfo.estimatedSteps;
        this.firstUserWeight = userInfo.weight

    },
    putInformationInSecondBoxInfo(userInfo){
        this.secondUserName = userInfo.firstName;
        this.secondUserAge = userInfo.age;
        this.secondUserHight = userInfo.height;
        this.secondUserEstimatedSteps = userInfo.estimatedSteps;
        this.secondUserWeight = userInfo.weight
    },
    createTotalSteps(s){
      let arrayWithTotalAndAvergueSteps = [];
      for (let map of s){
        let arrayWithValues = Array.from(map);
        if(this.selectedDays !== 30){
          arrayWithValues.splice(0,30-this.selectedDays);
        }
        let totalStepsCounter = 0;
        for(let entry of arrayWithValues){
          totalStepsCounter = totalStepsCounter + entry[1];
        }
        arrayWithTotalAndAvergueSteps.push({
            mensuales : totalStepsCounter,
            medios:totalStepsCounter/this.selectedDays
          }
        );
      }
      return arrayWithTotalAndAvergueSteps ;
    },
  }
}
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(245, 245, 245, 0.5);
  z-index: 99999;
}

</style>
