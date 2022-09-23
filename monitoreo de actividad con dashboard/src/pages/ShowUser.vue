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
      <label class="text-dark">Elejir residente</label>
      <Dropdown v-model="firstResident" :options="usersForDropdown" placeholder="Elija un residente" />
    </div>
    <div class="col-md-4 col-xl-3" >
      <label class="text-dark">Intervalo</label>
      <Dropdown v-model="selectedDays" :options="daysForSearchOprions" optionLabel="name" optionValue="value" placeholder="Intervalo" />
    </div>
    <div class="col-md-4 col-xl-3 mt-4" >
      <p-button type="success"
                round
                @click.native.prevent="transformInformation">
        MOSTRAR INFORMACIÓN
      </p-button>
    </div>
  </div>

  <div class="row justify-content-center border border-info mt-5 " v-if="showShortWindow">
    <div class="col-sm-12 text-center bg-white">
      <h3 class="text-info font-weight-bold">INFORMACIÓN DE RESIDENTES</h3>
      <h3 class="text-info font-weight-bold">Por favor seleccione el residente y el intervalo</h3>
    </div>
  </div>

  <div class="row justify-content-center border border-info mt-2" v-if="showInformationWindow">
    <div class="col-sm-12 text-center bg-white">
      <div class="row justify-content-center">
    <div class="col-sm-5 text-center border border-info rounded-lg m-1 bg-dark">
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
      <div class="row justify-content-center m-2">
        <div class="col-sm-10 text-center">
          <p-button type="warning"
                    round
                    @click.native.prevent="changeToEditUser(firstUser)">
            MODIFICAR RESIDENTE
          </p-button>
        </div>
      </div>
    </div>
    <div class="col-sm-3 mt-5 text-center">
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
    </div>
        <div class="col-sm-3 mt-5 text-center">
        <h5 class="mt-3">Pasos diarios cumplidos en {{selectedDays}} días</h5>
        <Knob v-model="valueGoalFirstUser"  readonly :max="selectedDays"/>
        </div>
      </div>

      <div class="row justify-content-center">
      <div class="col-sm-10 text-center border border-danger m-1 bg-white rounded-lg">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
      </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <Chart type="bar" :data="dataHighestStepsFirstUser" :options="horizontalOptions" />
        </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <Chart type="bar" :data="dataLowerStepsFirstUser" :options="horizontalOptions" />
        </div>
      </div>
      <div class="row justify-content-center border border-info mt-2">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <h4 class="text-info">Información por horas de los últimos {{selectedDays}} de : {{ firstUserName }}</h4>
          <vue-good-table
            :columns="columns"
            :rows="rowsFirstUser"
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


import Dialog from "primevue/dialog";

const axios = require('axios').default;
import Dropdown from "primevue/dropdown";
import { StatsCard } from "@/components/index";
import Chart from 'primevue/chart';
import Knob from 'primevue/knob';
import { VueGoodTable } from 'vue-good-table';
import moment from "moment";

export default {
  name: "ShowUser",
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
      valueGoalFirstUser:0,
      allUsers:[],
      isLoading:false,
      usersForDropdown:[],
      firstResident:'',
      selectedDays : 30,
      showInformationWindow :false,
      showShortWindow : true,
      firstUserName :'',
      firstUserAge :'',
      firstUserHight :'',
      firstUserEstimatedSteps :'',
      firstUserWeight :'',
      rowsFirstUser : [],
      rowsSecondUser : [],
      firstUserTotalSteps:'',
      firstUserAveragueSteps:'',
      sortedMapWIthTotalStepsFirstUser : new Map(),
      lowerFinallyThreeDatesFirstUser:[],
      lowerFinallyThreeStepsFirstUser:[],
      highestFirstThreeDatesFirstUser:[],
      highestFirstThreeStepsFirstUser:[],
      highestStepsFirstUser:[],
      highestDatesFirstUser:[],
      datesss:[],
      averageSteps:[],



      dataHighestStepsFirstUser: {
        labels: [],
        datasets: [
          {
            label: 'Pasos',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            backgroundColor: '#0c7511',
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
            backgroundColor: '#750c1c',
            tension: .4
          }
        ]
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
      chartData: {
        labels: [],
        datasets: [{
          type: 'line',
          label: 'Primer residente',
          borderColor: '#42A5F5',
          borderWidth: 2,
          fill: false,
          data: []
        },
          {
            type: 'line',
            label: 'Media de todos los residentes',
            borderColor: '#f5d142',
            borderWidth: 2,
            fill: false,
            data: []
          },
        ]
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
          console.log( self.allUsers)
          self.getAllUsersInfo()
        }).catch(error => {
        console.log(error)
      })
    },
    getAllUsersInfo() {
      let self = this;
      axios.post('http://localhost:5998/pasos/getAllUsersSteps', {
        users: self.allUsers,
        days: 30
      }).then(function (response) {
        self.$store.state.allUsersInformation =[]
        self.$store.state.allUsersInformation = self.convertDateToAge(response.data);
        self.isLoading = false;
        self.pushUsersInDropDown();
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
      let self=this;
      self.firstUser = {}
      self.showInformationWindow = true;
      self.showShortWindow = false;
      let listWithTotalSteps = [];
      let mapWIthTotalSteps = new Map();
      self.averageSteps = [];
      let s = [];
      let listWithHours = [];
      self.datess = [];
      for (let userInfo of self.$store.state.allUsersInformation) {
        let mapWithUserSteps = new Map(Object.entries(userInfo.stepsWithDatesMap));
        listWithTotalSteps.push(mapWithUserSteps)
        //Cojo solo el usuario que he elejido el el dropdown
        if(userInfo.firstName === self.firstResident){
          self.firstUser = userInfo;
          let map = new Map(Object.entries(userInfo.stepsWithDatesMap));
          let mapWithHours = new Map(Object.entries(userInfo.stepsWithDatesMapWithTime));
          s.push(map)
          listWithHours.push(mapWithHours)
          //Coloco informacion en los cuadros
          self.putInformationInFirstBoxInfo(userInfo)
        }
      }
      console.log('listWithTotalSteps',listWithTotalSteps)
      for (let map of listWithTotalSteps){
        for (const [key, value] of map) {
          if(mapWIthTotalSteps.has(key)){
            let steps = mapWIthTotalSteps.get(key);
            mapWIthTotalSteps.set(key,steps+value)
          }else {
            mapWIthTotalSteps.set(key,value)
          }
        }
      }

      console.log('mapWIthTotalSteps',mapWIthTotalSteps)
      //Recorro map para crear los array para la primera gráfica
      mapWIthTotalSteps.forEach (function(value, key) {
          self.datess.push(key)
        if(value !== 0){
          self.averageSteps.push(value/listWithTotalSteps.length)
        }else {
          self.averageSteps.push(value)
        }
      })

      console.log('dates and',self.datess)
      console.log(' self.averageSteps', self.averageSteps)

      //Si los dias seleccionados son 30, se coge el array entero, si son 3 o 7 me quedo solo con los ultimos x elementos
      if(self.selectedDays !== 30){
        self.datess.splice(0,30-self.selectedDays)
        self.averageSteps.splice(0,30-self.selectedDays)
      }

      self.chartData.labels = self.datess;
      self.chartData.datasets[1].data = self.averageSteps;

      //Creo unformacion para las tablas finales de fecha, hora y pasos de cada usuario
      self.createInfoForTables(listWithHours);

      self.list = this.createTotalSteps(s);
      //Creo graficas de mas y menos pasos de ambos usuarios y retorno un map con los 3,7 o 30 valores
      self.convertMapsToGraphicsMoreAndLessDays(s)
      //Coloco la informacion en las variables para que se muestren en los cuadros de pasos totales
      self.putInformationWithTotalSteps();

      self.datesForCompareGraphic = [];
      self.stepsCompareGraphicFirstUser = [];

      //Creo la grafica principal de ambos usuarios y sus pasos
      for (const [i, value] of s.entries()) {
        let eachMapCOnvertedToList = Array.from(value);
        for (let datesWithSteps in eachMapCOnvertedToList){
          for(let paramsInArray in eachMapCOnvertedToList[datesWithSteps]){
            if(i === 0 && paramsInArray == 0 ){
              self.datesForCompareGraphic.push(eachMapCOnvertedToList[datesWithSteps][0]);
              self.stepsCompareGraphicFirstUser.push(eachMapCOnvertedToList[datesWithSteps][1])
            }
          }
        }
      }

      self.chartData.labels = [];
      self.chartData.datasets[0].data = [];


      if(self.selectedDays != 30){
        self.chartData.labels = self.datesForCompareGraphic.reverse()
        self.chartData.datasets[0].data =  self.stepsCompareGraphicFirstUser.reverse()
      }else{
        self.chartData.labels = self.datesForCompareGraphic
        self.chartData.datasets[0].data =  self.stepsCompareGraphicFirstUser
      }
      self.calculateCompletedGoalGraphics();
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

    putInformationInFirstBoxInfo(userInfo){
      this.firstUserName = userInfo.firstName;
      this.firstUserAge = userInfo.age;
      this.firstUserHight = userInfo.height;
      this.firstUserEstimatedSteps = userInfo.estimatedSteps;
      this.firstUserWeight = userInfo.weight
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

    calculateCompletedGoalGraphics(){
      this.valueGoalFirstUser= 0;
      for( let stepsFirstUser of this.stepsCompareGraphicFirstUser){
        if(stepsFirstUser >= this.firstUserEstimatedSteps){
          this.valueGoalFirstUser++;
        }
      }
    },

    putInformationWithTotalSteps(){
      this.firstUserAveragueSteps = Math.trunc(this.list[0].medios);
      this.firstUserTotalSteps =  this.list[0].mensuales;
    },

    convertMapsToGraphicsMoreAndLessDays(s){
      let self = this;
      for (const [i, value] of s.entries()) {
        // Para 3 dias
        if(self.selectedDays == 3){
          if( i == 0){
            self.sortedMapWIthTotalStepsFirstUser.clear();
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
          }
          // Para 7 dias
        }else if(self.selectedDays == 7){
          if( i == 0){
            self.sortedMapWIthTotalStepsFirstUser.clear();
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
          }
        }else{
          // Para 30 dias
          if( i == 0){
            self.sortedMapWIthTotalStepsFirstUser.clear();
            self.sortedMapWIthTotalStepsFirstUser = new Map([...value.entries()].sort((a, b) => b[1] - a[1]));
          }
        }
      }

      self.highestStepsFirstUser=[];
      self.highestDatesFirstUser=[];

      // convierto maps ordenados de fechas y pasos de los ultimos x dias seleccionados en 2 listas (una de fechas y otra de pasos)
      self.sortedMapWIthTotalStepsFirstUser.forEach (function(value, key) {
        self.highestStepsFirstUser.push(value);
        self.highestDatesFirstUser.push(key);

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

    },


  }

}
</script>

<style scoped>

</style>
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
