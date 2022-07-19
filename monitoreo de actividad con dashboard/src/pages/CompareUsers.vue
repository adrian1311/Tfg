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
          <h3 class="text-success font-weight-bold" :class="`ti-arrow-up`">Top 3 de dias con mayor actividad en los ultimos {{selectedDays}}</h3>
          <Chart type="bar" :data="dataHighestStepsFirstUser" :options="horizontalOptions" />
        </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
          <h3 class="text-success font-weight-bold" :class="`ti-arrow-up`">Top 3 de dias con mayor actividad en los ultimos {{selectedDays}}</h3>
          <Chart type="bar" :data="dataHighestStepsSecondUser" :options="horizontalOptions" />
        </div>
      </div>
    </div>
    <div class="col-sm-12 mt-2">
      <div class="row justify-content-center">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
          <h3 class="text-danger font-weight-bold" :class="`ti-arrow-down`">Dias de menor actividad</h3>
          <Chart type="bar" :data="dataLowerStepsFirstUser" :options="horizontalOptions" />
        </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
          <h3 class="text-danger font-weight-bold" :class="`ti-arrow-down`">Dias de menor actividad</h3>
          <Chart type="bar" :data="dataLowerStepsSecondUser" :options="horizontalOptions" />
        </div>
      </div>
    </div>

    <div class="col-sm-12 mt-2">
      <div class="row justify-content-center">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
          <h4 class="text-info">Informacion por horas de los ultimos {{selectedDays}} de {{ firstUserName }}</h4>
          <vue-good-table
            :columns="columns"
            :rows="rowsFirstUser"
            max-height="400px"
            :fixed-header="true">
          </vue-good-table>
        </div>
        <div class="col-sm-1"> </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg">
          <h4 class="text-danger">Informacion por horas de los ultimos {{selectedDays}} de {{secondUserName}} </h4>
          <vue-good-table
            :columns="columns"
            :rows="rowsSecondUser"
            max-height="400px"
            :fixed-header="true">
          </vue-good-table>
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
      highestStepsFirstUser:[],
      highestDatesFirstUser:[],
      highestStepsSecondUser:[],
      highestDatesSecondUser:[],
      lowerFinallyThreeDatesFirstUser:[],
      lowerFinallyThreeStepsFirstUser:[],
      highestFirstThreeDatesFirstUser:[],
      highestFirstThreeStepsFirstUser:[],
      lowerFinallyThreeDatesSecondUser:[],
      lowerFinallyThreeStepsSecondUser:[],
      highestFirstThreeDatesSecondUser:[],
      highestFirstThreeStepsSecondUser:[],
      sortedMapWIthTotalStepsFirstUser : new Map(),
      sortedMapWIthTotalStepsSecondUser : new Map(),
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
      },
      horizontalOptions: {
        indexAxis: 'y',
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
              color: '##99ff33'
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
      },
      dataHighestStepsFirstUser: {
        labels: [],
        datasets: [
          {
            label: 'Pasos',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      },
      dataHighestStepsSecondUser: {
        labels: [],
        datasets: [
          {
            label: 'Pasos',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      },
      dataLowerStepsFirstUser: {
        labels: [],
        datasets: [
          {
            label: 'Pasos',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      },
      dataLowerStepsSecondUser: {
        labels: [],
        datasets: [
          {
            label: 'Pasos',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      },

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
       this.convertMapsToGraphicsMoreAndLessDays(s)
       this.putInformationWithTotalSteps();

       this.datesForCompareGraphic = [];
       this.stepsCompareGraphicFirstUser = [];
       this.stepsCompareGraphicSecondUser = [];

       for (const [i, value] of s.entries()) {
         let eachMapCOnvertedToList = Array.from(value);
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
    convertMapsToGraphicsMoreAndLessDays(s){
      var self = this;
      for (const [i, value] of s.entries()) {
        if(self.selectedDays == 3){
          if( i == 0){
            self.sortedMapWIthTotalStepsFirstUser.clear();
          }
          if( i == 1){
            self.sortedMapWIthTotalStepsSecondUser.clear();
          }
          let values = Array.from(value);
          if(values.length > 0){
            value.clear();
            value.set(values[29][0],values[29][1]);
            value.set(values[28][0],values[28][1]);
            value.set(values[27][0],values[27][1]);
            if( i == 0){
              self.sortedMapWIthTotalStepsFirstUser = new Map([...value.entries()].sort((a, b) => b[1] - a[1]));
            }
            if( i == 1){
              self.sortedMapWIthTotalStepsSecondUser = new Map([...value.entries()].sort((a, b) => b[1] - a[1]));
            }
          }
        }else if(self.selectedDays == 7){
          if( i == 0){
            self.sortedMapWIthTotalStepsFirstUser.clear();
          }
          if( i == 1){
            self.sortedMapWIthTotalStepsSecondUser.clear();
          }
          let values = Array.from(value);
          if(values.length > 0){
            value.clear();
            value.set(values[29][0],values[29][1]);
            value.set(values[28][0],values[28][1]);
            value.set(values[27][0],values[27][1]);
            value.set(values[26][0],values[26][1]);
            value.set(values[25][0],values[25][1]);
            value.set(values[24][0],values[24][1]);
            value.set(values[23][0],values[23][1]);
            if( i == 0){
              self.sortedMapWIthTotalStepsFirstUser = new Map([...value.entries()].sort((a, b) => b[1] - a[1]));
            }
            if( i == 1){
              self.sortedMapWIthTotalStepsSecondUser = new Map([...value.entries()].sort((a, b) => b[1] - a[1]));
            }
          }
        }else{
          // console.log('in other')
          if( i == 0){
            self.sortedMapWIthTotalStepsFirstUser.clear();
            self.sortedMapWIthTotalStepsFirstUser = new Map([...value.entries()].sort((a, b) => b[1] - a[1]));
          }
          if( i == 1){
            self.sortedMapWIthTotalStepsSecondUser.clear();
            self.sortedMapWIthTotalStepsSecondUser = new Map([...value.entries()].sort((a, b) => b[1] - a[1]));
          }
        }
      }
      console.log( self.sortedMapWIthTotalStepsFirstUser)
      console.log( self.sortedMapWIthTotalStepsSecondUser)

      self.highestStepsFirstUser=[];
      self.highestDatesFirstUser=[];
      self.highestStepsSecondUser=[];
      self.highestDatesSecondUser=[];

      // convierto maps ordenados de fechas y pasos de los ultimos x dias seleccionados en 2 listas (una de fechas y otra de pasos)
      self.sortedMapWIthTotalStepsFirstUser.forEach (function(value, key) {
        self.highestStepsFirstUser.push(value);
        self.highestDatesFirstUser.push(key);

      })
      //
      self.sortedMapWIthTotalStepsSecondUser.forEach (function(value, key) {
        self.highestStepsSecondUser.push(value);
        self.highestDatesSecondUser.push(key);
      })

      self.highestFirstThreeDatesFirstUser=[];
      self.highestFirstThreeStepsFirstUser=[];
      self.highestFirstThreeDatesFirstUser.push(self.highestStepsFirstUser[0]);
      self.highestFirstThreeDatesFirstUser.push(self.highestStepsFirstUser[1]);
      self.highestFirstThreeDatesFirstUser.push(self.highestStepsFirstUser[2]);
      self.highestFirstThreeStepsFirstUser.push(self.highestDatesFirstUser[0]);
      self.highestFirstThreeStepsFirstUser.push(self.highestDatesFirstUser[1]);
      self.highestFirstThreeStepsFirstUser.push(self.highestDatesFirstUser[2]);

      self.lowerFinallyThreeDatesFirstUser=[];
      self.lowerFinallyThreeStepsFirstUser=[];
      self.lowerFinallyThreeDatesFirstUser.push(self.highestDatesFirstUser[self.highestDatesFirstUser.length-2]);
      self.lowerFinallyThreeDatesFirstUser.push(self.highestDatesFirstUser[self.highestDatesFirstUser.length-3]);
      self.lowerFinallyThreeDatesFirstUser.push(self.highestDatesFirstUser[self.highestDatesFirstUser.length-4]);
      self.lowerFinallyThreeStepsFirstUser.push(self.highestStepsFirstUser[self.highestStepsFirstUser.length-2]);
      self.lowerFinallyThreeStepsFirstUser.push(self.highestStepsFirstUser[self.highestStepsFirstUser.length-3]);
      self.lowerFinallyThreeStepsFirstUser.push(self.highestStepsFirstUser[self.highestStepsFirstUser.length-4]);

      self.dataLowerStepsFirstUser.labels = [];
      self.dataLowerStepsFirstUser.datasets[0].data =[];
      self.dataLowerStepsFirstUser.labels =  self.lowerFinallyThreeDatesFirstUser;
      self.dataLowerStepsFirstUser.datasets[0].data = self.lowerFinallyThreeStepsFirstUser;

      self.dataHighestStepsFirstUser.labels = [];
      self.dataHighestStepsFirstUser.datasets[0].data =[];
      self.dataHighestStepsFirstUser.labels =  self.highestFirstThreeStepsFirstUser;
      self.dataHighestStepsFirstUser.datasets[0].data =  self.highestFirstThreeDatesFirstUser;



      //Segundo residente
      self.highestFirstThreeDatesSecondUser=[];
      self.highestFirstThreeStepsSecondUser=[];
      self.highestFirstThreeDatesSecondUser.push(self.highestStepsSecondUser[0]);
      self.highestFirstThreeDatesSecondUser.push(self.highestStepsSecondUser[1]);
      self.highestFirstThreeDatesSecondUser.push(self.highestStepsSecondUser[2]);
      self.highestFirstThreeStepsSecondUser.push(self.highestDatesSecondUser[0]);
      self.highestFirstThreeStepsSecondUser.push(self.highestDatesSecondUser[1]);
      self.highestFirstThreeStepsSecondUser.push(self.highestDatesSecondUser[2]);

      self.lowerFinallyThreeDatesSecondUser=[];
      self.lowerFinallyThreeStepsSecondUser=[];
      self.lowerFinallyThreeDatesSecondUser.push(self.highestDatesSecondUser[self.highestDatesSecondUser.length-2]);
      self.lowerFinallyThreeDatesSecondUser.push(self.highestDatesSecondUser[self.highestDatesSecondUser.length-3]);
      self.lowerFinallyThreeDatesSecondUser.push(self.highestDatesSecondUser[self.highestDatesSecondUser.length-4]);
      self.lowerFinallyThreeStepsSecondUser.push(self.highestStepsSecondUser[self.highestStepsSecondUser.length-2]);
      self.lowerFinallyThreeStepsSecondUser.push(self.highestStepsSecondUser[self.highestStepsSecondUser.length-3]);
      self.lowerFinallyThreeStepsSecondUser.push(self.highestStepsSecondUser[self.highestStepsSecondUser.length-4]);

      self.dataLowerStepsSecondUser.labels = [];
      self.dataLowerStepsSecondUser.datasets[0].data =[];
      self.dataLowerStepsSecondUser.labels =  self.lowerFinallyThreeDatesSecondUser;
      self.dataLowerStepsSecondUser.datasets[0].data = self.lowerFinallyThreeStepsSecondUser;

      self.dataHighestStepsSecondUser.labels = [];
      self.dataHighestStepsSecondUser.datasets[0].data =[];
      self.dataHighestStepsSecondUser.labels =  self.highestFirstThreeStepsSecondUser;
      self.dataHighestStepsSecondUser.datasets[0].data =  self.highestFirstThreeDatesSecondUser;

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
