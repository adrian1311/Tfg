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
      <label class="text-dark">Primer residente</label>
      <Dropdown v-model="firstResident" :options="usersForDropdown" placeholder="Elija un residente" />
    </div>
    <div class="col-md-4 col-xl-3" >
      <label class="text-dark">Segundo residente</label>
      <Dropdown v-model="secondResident" :options="usersForDropdown" placeholder="Elija un residente" />
    </div>
    <div class="col-md-4 col-xl-3" >
      <label class="text-dark">Intervalo (días)</label>
      <Dropdown v-model="selectedDays" :options="daysForSearchOprions" optionLabel="name" optionValue="value" placeholder="Intervalo (días)" />
    </div>
  </div>

  <div class="text-center mt-3">
    <p-button type="success"
              round
              @click.native.prevent="getAllUsersInfo">
      MOSTRAR INFORMACIÓN
    </p-button>
  </div>

  <div class="row justify-content-center border border-info mt-5 " v-if="showShortWindow">
    <div class="col-sm-12 text-center bg-white">
      <h3 class="text-info font-weight-bold">INFORMACIÓN DE RESIDENTES</h3>
      <h3 class="text-info font-weight-bold">Por favor seleccione los residentes y el intervalo</h3>
    </div>
  </div>

  <div class="row justify-content-center mt-2" v-if="showInformationWindow">

    <div class="col-sm-12">
      <div class="row justify-content-center">
        <h4 class="text-dark">Información mostrada para los últimos {{selectedDays}} dias</h4>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-5 text-center">
          <h4 class="text-dark">Primer residente: {{firstUserName}}</h4>
        </div>
        <div class="col-sm-5 text-center">
          <h4 class="text-dark">Segundo residente: {{secondUserName}}</h4>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-6 text-center border border-info rounded-lg bg-dark">
          <div class="row">
            <div class="col-sm-2 mt-4">
              <img v-bind:src="'data:image/jpg;base64,'+firstUserPhoto"  class="rounded-circle" style="height: 10rem; width: 8rem">
            </div>
            <div class="col-sm-10">
              <div class="row justify-content-center m-2">
                <div class="col-sm-5 text-center border border-info rounded-lg m-1">
                  <h5 class="text-info font-weight-bold mt-2">Edad (años) : {{firstUserAge}} </h5>
                </div>
                <div class="col-sm-5 text-center border border-info rounded-lg m-1">
                  <h5 class="text-info font-weight-bold mt-2">Peso (kg) : {{firstUserWeight}}</h5>
                </div>
              </div>
              <div class="row justify-content-center m-2">
                <div class="col-sm-5 text-center border border-info m-1">
                  <h5 class="text-info font-weight-bold mt-3">Altura (cm) : {{firstUserHight}} </h5>
                </div>
                <div class="col-sm-5 text-center border border-info rounded-lg m-1">
                  <h5 class="text-info font-weight-bold">Objetívo de pasos diários : {{firstUserEstimatedSteps}}</h5>
                </div>
              </div>
              <div class="row justify-content-center m-2">
                <div class="col-sm-10 text-center border border-info  rounded-lg m-1">
                  <h5 class="text-info font-weight-bold mt-2">Notas sobre el usuario: </h5>
                </div>
              </div>

            </div>
          </div>
          <div class="row justify-content-center m-2">
            <div class="col-sm-12 text-center">
              <p-button type="warning"
                        round
                        @click.native.prevent="changeToEditUser(firstUser)">
                MODIFICAR RESIDENTE
              </p-button>
            </div>
          </div>

        </div>
        <div class="col-sm-6 text-center border border-info rounded-lg bg-dark">
          <div class="row">
            <div class="col-sm-2 mt-4">
              <img v-bind:src="'data:image/jpg;base64,'+secondUserPhoto"  class="rounded-circle" style="height: 10rem; width: 8rem">
            </div>
            <div class="col-sm-10">
              <div class="row justify-content-center m-2">
                <div class="col-sm-5 text-center border border-info rounded-lg m-1">
                  <h5 class="text-info font-weight-bold mt-2">Edad (años) : {{secondUserAge}} </h5>
                </div>
                <div class="col-sm-5 text-center border border-info rounded-lg m-1">
                  <h5 class="text-info font-weight-bold mt-2">Peso (kg) : {{secondUserWeight}}</h5>
                </div>
              </div>
              <div class="row justify-content-center m-2">
                <div class="col-sm-5 text-center border border-info m-1">
                  <h5 class="text-info font-weight-bold mt-3">Altura (cm) : {{secondUserHight}} </h5>
                </div>
                <div class="col-sm-5 text-center border border-info rounded-lg m-1">
                  <h5 class="text-info font-weight-bold">Objetívo de pasos diários : {{secondUserEstimatedSteps}}</h5>
                </div>
              </div>
              <div class="row justify-content-center m-2">
                <div class="col-sm-10 text-center border border-info  rounded-lg m-1">
                  <h5 class="text-info font-weight-bold mt-2">Notas sobre el usuario: </h5>
                </div>
              </div>
            </div>

          </div>
          <div class="row justify-content-center m-2">
            <div class="col-sm-12 text-center">
              <p-button type="warning"
                        round
                        @click.native.prevent="changeToEditUser(secondUser)">
                MODIFICAR RESIDENTE
              </p-button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="col-sm-12 mt-2">
      <div class="row justify-content-center">
        <div class="col-sm-2 mt-5 text-center ">
        <stats-card class="bg-dark">
          <div class="icon-big text-center" :class="`icon-info`" slot="header">
            <i :class="'ti-user'"></i>
          </div>
          <div class="numbers" slot="content">
            <p class="text-white">Pasos totales</p>
            <p class="text-white">{{firstUserTotalSteps}}</p>
          </div>
        </stats-card>
          <stats-card class="bg-dark">
            <div class="icon-big text-center" :class="`icon-info`" slot="header">
              <i :class="'ti-user'"></i>
            </div>
            <div class="numbers" slot="content">
              <p class="text-white">Pasos médios</p>
              <p class="text-white">{{firstUserAveragueSteps}}</p>
            </div>
          </stats-card>
          <h5 class="mt-3">Objetivo cumplido en los ultimos {{selectedDays}} días</h5>
          <Knob v-model="valueGoalFirstUser"  readonly :max="selectedDays"/>
          <h5 class="mt-3 mt-1">días</h5>
        </div>
        <div class="col-sm-7 text-center border border-danger m-1 bg-white rounded-lg">
          <Chart type="bar" :data="chartData" :options="chartOptions" />
        </div>
        <div class="col-sm-2 mt-5 text-center">
          <stats-card class="bg-dark">
            <div class="icon-big text-center" :class="`icon-danger`" slot="header">
              <i :class="'ti-user'"></i>
            </div>
            <div class="numbers" slot="content">
              <p class="text-white">Pasos totales</p>
              <p class="text-white">{{secondUserTotalSteps}}</p>
            </div>
          </stats-card>
          <stats-card class="bg-dark">
            <div class="icon-big text-center" :class="`icon-danger`" slot="header">
              <i :class="'ti-user'"></i>
            </div>
            <div class="numbers" slot="content">
              <p class="text-white">Pasos médios</p>
              <p class="text-white">{{secondUserAveragueSteps}}</p>
            </div>
          </stats-card>
          <h5 class="mt-3">Objetivo cumplido en los ultimos {{selectedDays}} días</h5>
          <Knob v-model="valueGoalSecondUser" readonly :max="selectedDays" />
          <h5 class="mt-3 mt-1">días</h5>
        </div>
      </div>
      <div class="row justify-content-center">
      </div>
    </div>

    <div class="col-sm-12 mt-2">
      <div class="row justify-content-center">
        <h3 class="text-dark font-weight-bold" :class="`ti-arrow-up`">  3 DÍAS CON MAYOR ACTIVIDAD EN LOS ÚLTIMOS {{selectedDays}}</h3>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <Chart type="bar" :data="dataHighestStepsFirstUser" :options="horizontalOptions" />
        </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <Chart type="bar" :data="dataHighestStepsSecondUser" :options="horizontalOptions" />
        </div>
      </div>
    </div>

    <div class="col-sm-12 mt-2">
      <div class="row justify-content-center">
        <h3 class="text-dark font-weight-bold" :class="`ti-arrow-down`">  3 DÍAS CON MENOR ACTIVIDAD EN LOS ÚLTIMOS {{selectedDays}}</h3>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <Chart type="bar" :data="dataLowerStepsFirstUser" :options="horizontalOptions" />
        </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <Chart type="bar" :data="dataLowerStepsSecondUser" :options="horizontalOptions" />
        </div>
      </div>
    </div>

    <div class="col-sm-12 mt-2">
      <div class="row justify-content-center">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <h4 class="text-info">Información por horas de los últimos {{selectedDays}} de : {{ firstUserName }}</h4>
          <vue-good-table
            :columns="columns"
            :rows="rowsFirstUser"
            max-height="400px"
            :fixed-header="true">
          </vue-good-table>
        </div>
        <div class="col-sm-1"> </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <h4 class="text-danger">Información por horas de los últimos {{selectedDays}} de : {{secondUserName}} </h4>
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
      valueGoalSecondUser: 0,
      valueGoalFirstUser:0,
      stepsCompareGraphicFirstUser : [],
      stepsCompareGraphicSecondUser : [],
      datesForCompareGraphic : [],
      sortedMapWIthTotalSteps:new Map(),
      firstUserAveragueSteps: '',
      secondUserAveragueSteps: '',
      firstUserTotalSteps: '',
      secondUserTotalSteps: '',
      list :[],
      firstUser:{},
      secondUser:{},
      firstUserName:'',
      secondUserName:'',
      firstUserPhoto:'',
      secondUserPhoto:'',
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
      arrayWithSelectedUsers:[],
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
            backgroundColor: '#6c9f6e',
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
            backgroundColor: '#6c9f6e',
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
            backgroundColor: '#cb446c',
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
            backgroundColor: '#cb446c',
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

    //Cojo todos los usuarios de la base de datos
    getAllUsers() {
      let self = this;
      self.isLoading = true;
      axios.get("http://localhost:5998/pasos/getUsers")
        .then(function (response) {
          self.allUsers = response.data;
          self.pushUsersInDropDown();
          self.isLoading = false;
        }).catch(error => {
        console.log(error)
      })
    },
    pushUsersInDropDown(){
      this.usersForDropdown = [];
      for(let user of this.allUsers){
        this.usersForDropdown.push(user.firstName + ' ' +user.lastName)
      }
    },
    getSelectedUsersInfo(){
      for(let user of this.allUsers){
        if(user.firstName + ' ' +user.lastName === this.firstResident || user.firstName + ' ' +user.lastName === this.secondResident){
         this.arrayWithSelectedUsers.push(user);
        }
      }
    },
    //Cojo toda la informacion de los pasos de todos los usuarios
    getAllUsersInfo() {
      let self = this;
      self.isLoading = true;
      self.getSelectedUsersInfo();
      axios.post('http://localhost:5998/pasos/getAllUsersSteps', {
        users: self.arrayWithSelectedUsers,
        days: 30
      }).then(function (response) {
        self.$store.state.allUsersInformation =[]
        self.$store.state.allUsersInformation = self.convertDateToAge(response.data);
        self.transformInformation();
        self.isLoading = false;

      }).catch(error => {
        console.log(error)
      })
    },

    changeToEditUser: function(user) {
      this.putInformationInGLobalVariable(user)
      this.$router.push({name: 'registerUser', params: { calledFrom: 'edit' }});
    },
    putInformationInGLobalVariable(user){
      this.$store.state.userInformation.name = user.name;
      this.$store.state.userInformation.refresh_token = user.refresh_token;
      this.$store.state.userInformation.id = user.id;
      this.$store.state.userInformation.firstName = user.firstName;
      this.$store.state.userInformation.lastName = user.lastName;
      this.$store.state.userInformation.weight = user.weight;
      this.$store.state.userInformation.height = user.height;
      this.$store.state.userInformation.refreshToken = user.refresh_token;
      this.$store.state.userInformation.age = user.age;
      this.$store.state.userInformation.estimatedSteps = user.estimatedSteps;
      this.$store.state.userInformation.gender = user.gender;
      this.$store.state.userInformation.notes = user.notes;
    },

    // Convierto todas las fechas de nacimiento en edades
    convertDateToAge(data){
      for (let user of data){
        let date = moment(user.age).format('YYYY MM DD');
        let age =new Date(date)
        let month_diff = Date.now() - age.getTime();
        let age_dt = new Date(month_diff);
        let year = age_dt.getUTCFullYear();
        user.age = Math.abs(year - 1970);
      }
      return data;
    },

     transformInformation() {
       this.chartData.datasets[0].label = [];
       this.chartData.datasets[1].label = [];
      this.firstUser = {}
       this.secondUser = {}
      this.showInformationWindow = true;
      this.showShortWindow = false;
       let s = [];
       let listWithHours = [];
       for (let userInfo of this.$store.state.allUsersInformation) {
         //Cojo solo los usuarios que he elejido el el dropdown
         //Creo 2 map: Primero con los 2 usuarios y pasos, Segundo con los 2 usuarios y pasos con horas. Los meto en una lista
          if(userInfo.firstName + ' ' +userInfo.lastName === this.firstResident){
            this.firstUser = userInfo;
            this.chartData.datasets[0].label = userInfo.firstName;
            let map = new Map(Object.entries(userInfo.stepsWithDatesMap));
            let mapWithHours = new Map(Object.entries(userInfo.stepsWithDatesMapWithTime));
            s.push(map)
            listWithHours.push(mapWithHours)
            //Coloco informacion en los cuadros
            this.putInformationInFirstBoxInfo(userInfo)
          }
         if(userInfo.firstName + ' ' +userInfo.lastName  === this.secondResident){
           this.secondUser = userInfo;
           this.chartData.datasets[1].label = userInfo.firstName;
           let map = new Map(Object.entries(userInfo.stepsWithDatesMap));
           let mapWithHours = new Map(Object.entries(userInfo.stepsWithDatesMapWithTime));
           listWithHours.push(mapWithHours)
           s.push(map)
           //Coloco informacion en los cuadros
           this.putInformationInSecondBoxInfo(userInfo)
         }
       }
       //Creo unformacion para las tablas finales de fecha, hora y pasos de cada usuario
       this.createInfoForTables(listWithHours);

       this.list = this.createTotalSteps(s);
       //Creo graficas de mas y menos pasos de ambos usuarios y retorno un map con los 3,7 o 30 valores
       this.convertMapsToGraphicsMoreAndLessDays(s)
       //Coloco la informacion en las variables para que se muestren en los cuadros de pasos totales
       this.putInformationWithTotalSteps();

       this.datesForCompareGraphic = [];
       this.stepsCompareGraphicFirstUser = [];
       this.stepsCompareGraphicSecondUser = [];

       //Creo la grafica principal de ambos usuarios y sus pasos
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
         this.chartData.labels = this.datesForCompareGraphic.reverse()
         this.chartData.datasets[0].data =  this.stepsCompareGraphicFirstUser.reverse()
         this.chartData.datasets[1].data =  this.stepsCompareGraphicSecondUser.reverse()
       }else{
         this.chartData.labels = this.datesForCompareGraphic
         this.chartData.datasets[0].data =  this.stepsCompareGraphicFirstUser
         this.chartData.datasets[1].data =  this.stepsCompareGraphicSecondUser
       }
       this.calculateCompletedGoalGraphics();
     },

    calculateCompletedGoalGraphics(){
      this.valueGoalFirstUser= 0;
      this.valueGoalSecondUser= 0;
      for( let stepsFirstUser of this.stepsCompareGraphicFirstUser){
        if(stepsFirstUser >= this.firstUserEstimatedSteps){
          this.valueGoalFirstUser++;
        }
      }
      for( let stepsSecondUser of this.stepsCompareGraphicSecondUser){
        if(stepsSecondUser >= this.secondUserEstimatedSteps){
          this.valueGoalSecondUser++;
        }
      }
    },
    convertMapsToGraphicsMoreAndLessDays(s){
      let self = this;
      for (const [i, value] of s.entries()) {
        // Para 3 dias
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
            console.log('values',values)
            value.set(values[29][0],values[29][1]);
            value.set(values[28][0],values[28][1]);
            value.set(values[27][0],values[27][1]);
            console.log('final value',value)
            if( i == 0){
              self.sortedMapWIthTotalStepsFirstUser = new Map([...value.entries()].sort((a, b) => b[1] - a[1]));
            }
            if( i == 1){
              self.sortedMapWIthTotalStepsSecondUser = new Map([...value.entries()].sort((a, b) => b[1] - a[1]));
            }
          }
          // Para 7 dias
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
          // Para 30 dias
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

      //Primer residente
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
      self.lowerFinallyThreeDatesFirstUser.push(self.highestDatesFirstUser[self.highestDatesFirstUser.length-1]);
      self.lowerFinallyThreeDatesFirstUser.push(self.highestDatesFirstUser[self.highestDatesFirstUser.length-2]);
      self.lowerFinallyThreeDatesFirstUser.push(self.highestDatesFirstUser[self.highestDatesFirstUser.length-3]);
      self.lowerFinallyThreeStepsFirstUser.push(self.highestStepsFirstUser[self.highestStepsFirstUser.length-1]);
      self.lowerFinallyThreeStepsFirstUser.push(self.highestStepsFirstUser[self.highestStepsFirstUser.length-2]);
      self.lowerFinallyThreeStepsFirstUser.push(self.highestStepsFirstUser[self.highestStepsFirstUser.length-3]);

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
      self.lowerFinallyThreeDatesSecondUser.push(self.highestDatesSecondUser[self.highestDatesSecondUser.length-1]);
      self.lowerFinallyThreeDatesSecondUser.push(self.highestDatesSecondUser[self.highestDatesSecondUser.length-2]);
      self.lowerFinallyThreeDatesSecondUser.push(self.highestDatesSecondUser[self.highestDatesSecondUser.length-3]);
      self.lowerFinallyThreeStepsSecondUser.push(self.highestStepsSecondUser[self.highestStepsSecondUser.length-1]);
      self.lowerFinallyThreeStepsSecondUser.push(self.highestStepsSecondUser[self.highestStepsSecondUser.length-2]);
      self.lowerFinallyThreeStepsSecondUser.push(self.highestStepsSecondUser[self.highestStepsSecondUser.length-3]);

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
      this.firstUserAveragueSteps = Math.trunc(this.list[0].medios);
      this.firstUserTotalSteps =  this.list[0].mensuales;
      this.secondUserAveragueSteps = Math.trunc(this.list[1].medios);
      this.secondUserTotalSteps = this.list[1].mensuales;
    },
    putInformationInFirstBoxInfo(userInfo){
        this.firstUserName = userInfo.firstName;
        this.firstUserAge = userInfo.age;
        this.firstUserHight = userInfo.height;
        this.firstUserEstimatedSteps = userInfo.estimatedSteps;
        this.firstUserWeight = userInfo.weight
        this.firstUserPhoto = userInfo.base64encodedImage

    },
    putInformationInSecondBoxInfo(userInfo){
        this.secondUserName = userInfo.firstName;
        this.secondUserAge = userInfo.age;
        this.secondUserHight = userInfo.height;
        this.secondUserEstimatedSteps = userInfo.estimatedSteps;
        this.secondUserWeight = userInfo.weight
      this.secondUserPhoto = userInfo.base64encodedImage
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
