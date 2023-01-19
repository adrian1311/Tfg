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

<div class="row justify-content-center mb-2 bg-dark text-center border border-primary rounded-lg">
  <div class="col-md-10 col-xl-10 ">
    <img class="mr-2 text-warning" src="@/assets/img/people.png" width="50" /><label class="font-weight-bold font-weight-bold h4 text-white">Número total de residentes : {{allUsers.length}}</label>
  </div>
</div>
    <div class="row justify-content-center">
      <div class="col-md-4 col-xl-4">
        <div class="row justify-content-center">
          <div class="col-md-6 col-xl-6">
            <stats-card class="bg-dark">
              <div class="icon-big text-center" :class="`icon-info`" slot="header">
                <i :class="'ti-user'"></i>
              </div>
              <div class="numbers" slot="content">
                <p class="text-white">HOMBRE</p>
                <p class="text-white">{{numberOfMens}}</p>
              </div>
            </stats-card>
            <stats-card class="bg-dark">
              <div class="icon-big text-center" :class="`icon-info`" slot="header">
                <i :class="'ti-user'"></i>
              </div>
              <div class="numbers" slot="content">
                <p class="text-white">MUJERES</p>
                <p class="text-white">{{numberOfWomans}}</p>
              </div>
            </stats-card>
          </div>
          <div class="col-md-6 col-xl-6  bg-white text-center border border-primary bg-white rounded-lg mb-2">
            <Chart type="pie"  @click.native.prevent="showResidentsList" :data="residentsNumberData" :options="residentsNumberData" />
          </div>
        </div>
      </div>
      <div class="col-md-4 col-xl-4">
        <div class="row justify-content-center">
          <div class="col-md-6 col-xl-6">
            <stats-card class="bg-dark">
              <div class="icon-big text-center" :class="`icon-success`" slot="header">
                <i :class="'ti-angle-double-up'"></i>
              </div>
              <div class="numbers" slot="content">
                <h6 class="text-white">ENCIMA DE SU MÉDIA</h6>
                <p class="text-white">{{moreThanAverageSteps}}</p>
              </div>
            </stats-card>
            <stats-card class="bg-dark">
              <div class="icon-big text-center" :class="`icon-danger`" slot="header">
                <i :class="'ti-angle-double-down'"></i>
              </div>
              <div class="numbers" slot="content">
                <h6 class="text-white">DEBAJO DE SU MÉDIA</h6>
                <p class="text-white">{{underAverageSteps}}</p>
              </div>
            </stats-card>
          </div>
          <div class="col-md-6 col-xl-6  bg-white  border border-primary bg-white rounded-lg mb-2">
            <Chart type="pie" :data="residentsEstimatedData" :options="residentsEstimatedData" />
          </div>
        </div>
      </div>
      <div class="col-md-4 col-xl-4">
        <div class="row justify-content-center">
          <div class="col-md-7  bg-white  border border-primary bg-white rounded-lg mb-2">
            <Chart class="w-100 h-75 d-inline-block" type="pie" :data="residentsAgeData" :options="residentsAgeDataOptions" />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center  mt-2">
      <h5 class="text-dark font-weight-bold">CRITERIOS</h5>
    </div>
      <div class="row justify-content-center ">
        <div class="col-sm-4 mt-2">
          <div class="input-group input-group">
            <span class="input-group-text font-weight-bold">Intervalo (días)</span>
            <select class="form-control-lg" v-model="selectedDays" v-on:change="processInformation">
              <option value="3">3</option>
              <option value="7">7</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
        <div class="col-sm-4 mt-2">
          <div class="input-group input-group">
            <span class="input-group-text font-weight-bold">Género</span>
            <select class="form-control-lg " v-model="selectedGender" v-on:change="processInformation">
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
              <option value="both">Ambos</option>
            </select>
          </div>
        </div>
        <div class="col-sm-4 mt-2">
          <div class="input-group input-group">
            <span class="input-group-text font-weight-bold">Edad</span>
            <select class="form-control-lg" v-model="selectedAge" v-on:change="processInformation">
              <option value="six">60-69</option>
              <option value="seven">70-79</option>
              <option value="eight">80-89</option>
              <option value="nine">90-99</option>
              <option value="ten">100 +</option>
              <option value="all">Todas las edades</option>
            </select>
          </div>
        </div>
      </div>

    <div class="row">
      <div class="col-12 text-center">
        <h3 class="font-weight-bold text-dark">Información mostrada para los últimos {{selectedDays}} días</h3>
      </div>
    </div>
    <div class="row mt-1 bg-white rounded-lg">
      <div class="col-12 text-center border border-primary">
        <vue-good-table
          :columns="columns"
          :rows="rows"
          :search-options="{
    enabled: true
  }"
          @>
          <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field == 'medios' && (props.row.estimados > props.row.medios)">
      <span style="font-weight: bold; color: red;">{{props.row.medios}}</span>
    </span>
            <span v-else>
      {{props.formattedRow[props.column.field]}}
    </span>
          </template>
        </vue-good-table>
      </div>
    </div>

    <div class="row justify-content-center mt-2">
      <div class="col-sm-12 text-center border border-primary bg-white rounded-lg">
        <div class="row justify-content-center">
          <div class="col-sm-12 text-center bg-white">
            <h3 class="text-dark font-weight-bold" >Promedio de pasos en los últimos {{selectedDays}} dias</h3>
            <Chart type="line" :data="basicData" />
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-2 justify-content-center">
      <div class="col-sm-3 text-center border border-primary m-1 bg-white rounded-lg">
        <label class="text-dark font-weight-bold mt-5">Seleccione fecha para ver los usuarios y sus pasos</label>
        <Dropdown v-model="selectedDate" :options="allDates" placeholder="Seleccione fecha" v-on:change="createInfoForSecondGraphic2"/>
      </div>
      <div class="col-sm-7 text-center border border-primary m-1 bg-white rounded-lg">
        <h3 class="text-dark font-weight-bold"> Residentes y pasos del día seleccionado</h3>
        <!--Chart type="bar" :data="dataForSeparateDays" :options="horizontalOptions" /-->
        <vue-good-table
          max-height="300px"
          :columns="columnsSeparatedDays"
          :rows="rowsSeparatedDays"
          :search-options="{
    enabled: true
  }"
          @>
          <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field == 'medios' && (props.row.estimados > props.row.medios)">
      <span style="font-weight: bold; color: red;">{{props.row.medios}}</span>
    </span>
            <span v-else>
      {{props.formattedRow[props.column.field]}}
    </span>
          </template>
        </vue-good-table>

      </div>
    </div>

    <div class="row mt-3 justify-content-center">
      <div class="col-sm-5 text-center border border-success m-1 bg-white rounded-lg">
        <h3 class="text-dark font-weight-bold font-weight-bold" :class="`ti-arrow-up`"> Días de mayor actividad</h3>
        <Chart type="bar" :data="dataHighestSteps" :options="horizontalOptions" />
      </div>
      <div class="col-sm-5 text-center border border-danger m-1 bg-white rounded-lg">
        <h3 class="text-dark font-weight-bold" :class="`ti-arrow-down`"> Días de menor actividad</h3>
        <Chart type="bar" :data="dataLowerSteps" :options="horizontalOptions" />
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-sm-5 text-center border border-success m-1 bg-white rounded-lg">
        <h3 class="text-dark font-weight-bold" >Usuarios más activos en los ultimos {{selectedDays}} dias</h3>
        <Chart type="bar" :data="moreActiveUsers" :options="horizontalOptions" />
      </div>
      <div class="col-sm-5 text-center border border-danger m-1 bg-white rounded-lg">
      <h3 class="text-dark font-weight-bold">Usuarios menos activos en los últimos {{selectedDays}} días</h3>
      <Chart type="bar" :data="lessActiveUsers" :options="horizontalOptions" />
    </div>
    </div>




  </div>
</template>

<script>
import { StatsCard } from "@/components/index";
const axios = require('axios').default;
import Dropdown from 'primevue/dropdown';
import { PaperTable } from "@/components";
const tableColumns = ["nombre", "medios", "mensuales", "estimados", "ayuda"];
import Chart from 'primevue/chart';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import moment from "moment";


export default {
  components: {
    StatsCard,
    Dropdown,
    Chart,
    PaperTable,
    VueGoodTable,

  },
  data() {
    return {
      columns: [
        {
          label: 'Nombre del residente',
          field: 'nombre',
        },
        {
          label: 'Pasos medios',
          field: 'medios',
        },
        {
          label: 'Pasos totales',
          field: 'mensuales',
        },
        {
          label: 'Objetívo de pasos diários',
          field: 'estimados',
        },
      ],
      columnsSeparatedDays: [
        {
          label: 'Nombre del residente',
          field: 'name',
        },
        {
          label: 'Pasos en el día',
          field: 'daySteps',
        },
      ],
      selectedDate:'',
      allDates:[],
      rows: [],
      rowsSeparatedDays: [],
      isLoading:false,
      threeMoreActiveUsersSteps :[],
      threeMoreActiveUsersNames :[],
      estimatedStepsArray : [],
      list :[],
      names : [],
      lowerFinallyThreeDates:[],
      lowerFinallyThreeSteps:[],
      highestSteps:[],
      highestDates:[],
      highestFirstThreeSteps:[],
      highestFirstThreeDates:[],
      sortedMapWIthTotalSteps:new Map(),
      datess:[],
      averageSteps:[],
      selectedAge:'all',
      selectedGender: 'both',
      selectedDays : 30,
      totalStepsByDates : new Map(),
     mapWithDateWIthUserAndSteps: [],
      mapWithNameAndStepsFOrEachDay: [],
      genders:["Hombre","Mujer","Hombres y Mujeres"],
      daysForSearch:[3,7,30],
      numberOfMens:0,
      numberOfWomans:0,
      allUsers:[],
      sixRange:0,
      sevenRange:0,
      eightRange:0,
      nineRange:0,
      tenRange:0,
      underAverageSteps:0,
      moreThanAverageSteps:0,

      threeLessActiveUsersSteps:  [],
      threeLessActiveUsersNames: [],

      statsCards: [
        {
          type: "success",
          icon: "ti-server",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
      ],
      dataForSeparateDays:{
        labels: [],
        datasets: [
          {
            label: 'Pasos de los usuarios en el día seleccionado',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      },
      basicData: {
        labels: [],
        datasets: [
          {
            label: 'Promedio de pasos',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      },
      dataLowerSteps: {
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
      moreActiveUsers: {
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
      lessActiveUsers: {
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
      dataHighestSteps: {
        labels: [],
        datasets: [
          {
            label: 'Pasos',
            data: [],
            fill: true,
            //borderColor: '#850428',
            borderWidth: 2,
            backgroundColor: '#6c9f6e',
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

      residentsNumberData: {
        labels: ['HOMBRES','MUJERES'],
        datasets: [
          {
            data: [],
            backgroundColor: ["#42A5F5","#C78189FF"],
            hoverBackgroundColor: ["#64B5F6","#C78189FF"]
          }
        ]
      },
      residentsNumberDataOptions: {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        }
      },

      residentsEstimatedData: {
        labels: ['Mayor media','Menor media'],
        datasets: [
          {
            data: [],
            backgroundColor: ["#42A5F5","#C78189FF"],
            hoverBackgroundColor: ["#64B5F6","#C78189FF"]
          }
        ]
      },
      residentsEstimatedDataOptions: {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        }
      },

      //variable for number of residents on each age
      residentsAgeData: {
        labels: ['60-69','70-79',"80-89","90-99","100 +"],
        datasets: [
          {
            data: [],
            backgroundColor: ["#42A5F5","rgba(61,25,29,0.39)","#81C79DFF","#bec781","#BE81C7FF"],
            hoverBackgroundColor: ["#64B5F6","rgba(61,25,29,0.39)","#81C79DFF","#bec781","#BE81C7FF"]
          }
        ]
      },
      residentsAgeDataOptions: {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        }
      }

    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    showResidentsList(){
      console.log('test')
    },

    //metodo para recuperar todos los usuarios de la BD
    getAllUsers() {
      let self = this;
      self.isLoading = true;
      axios.get("http://localhost:5998/pasos/getUsers")
        .then(function (response) {
          self.allUsers = response.data;
          self.getAllUsersInfo();
        }).catch(error => {
        console.log(error)
      })
    },

    //Para todos los usuarios cojo los pasos con sus respectivas fechas
    getAllUsersInfo() {
      let self = this;
      axios.post('http://localhost:5998/pasos/getAllUsersSteps', {
        users: self.allUsers,
        days: 30
      }).then(function (response) {
        self.$store.state.allUsersInformation = self.convertDateToAge(response.data);
        self.isLoading = false;
        self.processInformation();
      }).catch(error => {
        console.log(error)
      })
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


    //Metodo para procesar toda la informacion
    processInformation() {
      this.genderCounter();
      this.transformInformationToMaps();
    },
    //Metodo para los contadores de hombres y mujeres
    genderCounter() {
      let self = this;
      self.numberOfWomans = 0;
      self.numberOfMens = 0;
      for (let user of self.$store.state.allUsersInformation) {
        if (user.gender === "male") {
          self.numberOfMens++;
        } else if (user.gender === "female") {
          self.numberOfWomans++;
        }
      }
      self.numbers = [self.numberOfMens,self.numberOfWomans]
      self.residentsNumberData.datasets[0].data = self.numbers;
    },
    //Metodo para recopilar todos los pasos en un solo map con el total de pasos
    transformInformationToMaps() {
      let self=this;
      self.mapWithDateWIthUserAndSteps = [];
      self.$store.state.exampleArray = [];
      self.datess = [];
      self.averageSteps = [];
      self.rowsSeparatedDays= [];
      self.selectedDate=''
      self.names= [];
      let s = [];
      let mapWIthTotalSteps = new Map();
      self.sixRange= 0; self.sevenRange= 0; self.eightRange= 0; self.eightRange= 0; self.tenRange = 0;
      //Creo una lista de maps con los maps de todos los usuarion.
      for (let userInfo of self.$store.state.allUsersInformation) {
       self.createAgeRangeGraphic(userInfo);
       let list = self.selectGender(userInfo)
        if(list !== null && list !== undefined){
          let map1 = new Map(Object.entries(list));
          let splitName = userInfo.firstName + ' ' +userInfo.lastName;
          //Le paso el nombre junto con las fechas y pasos de cada usuario en cada iteracion del bucle
          self.createListWithDateNameSteps(splitName,map1)
          s.push(map1)
          self.names.push(userInfo.firstName + ' ' +userInfo.lastName)
          self.estimatedStepsArray.push(userInfo.estimatedSteps)
        }
      }
      self.agesRanges = [self.sixRange,self.sevenRange,self.eightRange,self.nineRange,self.tenRange]
      self.residentsAgeData.datasets[0].data = self.agesRanges;
      //self.createInfoForSecondGraphic();
      self.list = []
      //crear tabla con información
      self.list = self.createMoreActiveUsers(s);
      for (let usr in self.list){
        self.list[usr].nombre = (self.names[usr])
        self.list[usr].estimados = (self.estimatedStepsArray[usr])
      }


      self.rows = self.list;
      self.showMoreActiveUsers(self.list);
      self.showLessActiveUsers(self.list);
      self.createUnderAverageGraphic(self.list);
      //self.table1.data = self.list;

      //S es el la lista formada por todos los usuarios. Contiene un map con fecha y pasos de ese dia
      //Los recorro . SI la fecha no esta en el map la añado con los pasos, si esta solo sumo los pasos
      for (let map of s){
        for (const [key, value] of map) {
          if(mapWIthTotalSteps.has(key)){
            let steps = mapWIthTotalSteps.get(key);
            mapWIthTotalSteps.set(key,steps+value)
          }else {
            mapWIthTotalSteps.set(key,value)
          }
        }
      }

      //Recorro map para crear los array para la primera gráfica con fecha y numero de pasos. Divido los pasos entre los usuarios para que me de la mitad
      mapWIthTotalSteps.forEach (function(value, key) {
        self.datess.push(key)
        if(value !== 0){
          self.averageSteps.push(value/s.length)
        }else {
          self.averageSteps.push(value)
        }
      })


      //Si los dias seleccionados son 30, se coge el array entero, si son 3 o 7 me quedo solo con los ultimos x elementos
      if(self.selectedDays !== 30){
        self.datess.splice(0,30-self.selectedDays)
        self.averageSteps.splice(0,30-self.selectedDays)
      }

      //Creo listas para poder coger los ultimos dias antes de ordenar el map por fechas
      if(self.selectedDays == 3){
        self.sortedMapWIthTotalSteps.clear();
        let values = Array.from(mapWIthTotalSteps);
        if(values.length > 0){
          mapWIthTotalSteps.clear();
          mapWIthTotalSteps.set(values[29][0],values[29][1]);
          mapWIthTotalSteps.set(values[28][0],values[28][1]);
          mapWIthTotalSteps.set(values[27][0],values[27][1]);
          self.sortedMapWIthTotalSteps = new Map([...mapWIthTotalSteps.entries()].sort((a, b) => b[1] - a[1]));
        }
      }else if(self.selectedDays == 7){
        self.sortedMapWIthTotalSteps.clear();
        let values = Array.from(mapWIthTotalSteps);
        if(values.length > 0){
          mapWIthTotalSteps.clear();
          mapWIthTotalSteps.set(values[29][0],values[29][1]);
          mapWIthTotalSteps.set(values[28][0],values[28][1]);
          mapWIthTotalSteps.set(values[27][0],values[27][1]);
          mapWIthTotalSteps.set(values[26][0],values[26][1]);
          mapWIthTotalSteps.set(values[25][0],values[25][1]);
          mapWIthTotalSteps.set(values[24][0],values[24][1]);
          mapWIthTotalSteps.set(values[23][0],values[23][1]);
          self.sortedMapWIthTotalSteps = new Map([...mapWIthTotalSteps.entries()].sort((a, b) => b[1] - a[1]));
        }
      }else{
        self.sortedMapWIthTotalSteps.clear();
        self.sortedMapWIthTotalSteps = new Map([...mapWIthTotalSteps.entries()].sort((a, b) => b[1] - a[1]));
      }

      self.highestSteps=[];
      self.highestDates=[];
      self.sortedMapWIthTotalSteps.forEach (function(value, key) {
        self.highestSteps.push(value/s.length);
        self.highestDates.push(key);
      })

      self.highestFirstThreeDates=[];
      self.highestFirstThreeSteps=[];
      self.highestFirstThreeDates.push(self.highestDates[0]);
      self.highestFirstThreeDates.push(self.highestDates[1]);
      self.highestFirstThreeDates.push(self.highestDates[2]);
      self.highestFirstThreeSteps.push(self.highestSteps[0]);
      self.highestFirstThreeSteps.push(self.highestSteps[1]);
      self.highestFirstThreeSteps.push(self.highestSteps[2]);

      self.lowerFinallyThreeDates=[];
      self.lowerFinallyThreeSteps=[];
      self.lowerFinallyThreeDates.push(self.highestDates[self.highestDates.length-2]);
      self.lowerFinallyThreeDates.push(self.highestDates[self.highestDates.length-3]);
      self.lowerFinallyThreeDates.push(self.highestDates[self.highestDates.length-4]);
      self.lowerFinallyThreeSteps.push(self.highestSteps[self.highestSteps.length-2]);
      self.lowerFinallyThreeSteps.push(self.highestSteps[self.highestSteps.length-3]);
      self.lowerFinallyThreeSteps.push(self.highestSteps[self.highestSteps.length-4]);

      self.dataLowerSteps.labels = [];
      self.dataLowerSteps.datasets[0].data =[];
      self.dataLowerSteps.labels =  self.lowerFinallyThreeDates;
      self.dataLowerSteps.datasets[0].data = self.lowerFinallyThreeSteps;

      self.dataHighestSteps.labels = [];
      self.dataHighestSteps.datasets[0].data =[];
      self.dataHighestSteps.labels =  self.highestFirstThreeDates;
      self.dataHighestSteps.datasets[0].data =  self.highestFirstThreeSteps;

      self.basicData.labels = self.datess;
      self.allDates = self.datess;
      self.basicData.datasets[0].data = self.averageSteps;
    },
    createListWithDateNameSteps(splitName,map1){
      let self=this;
      //Itero el map con fecha y pasos para crear lista con fecha, nombre y pasos de todos {1-12,Adrian,1400} de todos los usuarios
      map1.forEach (function(value, key) {
        self.mapWithDateWIthUserAndSteps.push({date:key,name:splitName,steps:value});
      })
    },

    createInfoForSecondGraphic(){
      let self=this;
      self.dataForSeparateDays.datasets[0].data = []
      self.dataForSeparateDays.labels = []
      for ( let dayWithUserAndSteps of self.mapWithDateWIthUserAndSteps){
        if(self.selectedDate == dayWithUserAndSteps.date){
          self.dataForSeparateDays.datasets[0].data.push(dayWithUserAndSteps.steps)
          self.dataForSeparateDays.labels.push(dayWithUserAndSteps.name)
        }
      }
    },
    createInfoForSecondGraphic2(){
      let self=this;
      self.dataForSeparateDays.datasets[0].data = []
      self.dataForSeparateDays.labels = []
      self.rowsSeparatedDays= []
      for ( let dayWithUserAndSteps of self.mapWithDateWIthUserAndSteps){
        if(self.selectedDate == dayWithUserAndSteps.date){
          self.dataForSeparateDays.datasets[0].data.push(dayWithUserAndSteps.steps)
          self.dataForSeparateDays.labels.push(dayWithUserAndSteps.name)
          self.rowsSeparatedDays.push({name:dayWithUserAndSteps.name,daySteps:dayWithUserAndSteps.steps})
        }
      }
    },
    createUnderAverageGraphic(list){
      this.underAverageSteps=0;
      this.moreThanAverageSteps=0;

      for( let user of list ){
        if( user.medios <= user.estimados ){
          this.underAverageSteps++;
        } else {
          this.moreThanAverageSteps++;
        }
      }
      let residents = [  this.moreThanAverageSteps,this.underAverageSteps]
      this.residentsEstimatedData.datasets[0].data = residents;
    },

    createAgeRangeGraphic(userInfo){
      if(userInfo.age >= 60 && userInfo.age <= 69){
        this.sixRange++;
      }
      if(userInfo.age >= 70 && userInfo.age <= 79){
        this.sevenRange++;
      }
      if(userInfo.age >= 80 && userInfo.age <= 89){
        this.eightRange++;
      }
      if(userInfo.age >= 90 && userInfo.age <= 99){
        this.nineRange++;
      }
      if(userInfo.age > 100){
        this.tenRange++;
      }
    },

    showMoreActiveUsers(list){
      console.log('this is my list before',list)
      this.moreActiveUsers.labels = [];
      this.moreActiveUsers.datasets[0].data =  [];
      this.threeMoreActiveUsersSteps=  [];
      this.threeMoreActiveUsersNames=  [];
      let orderedUsersByAvergeSteps = list.sort((a, b) => {
        return b.medios - a.medios;
      });
      if(orderedUsersByAvergeSteps.length > 0){
        if(orderedUsersByAvergeSteps.length >= 1){
          this.threeMoreActiveUsersSteps.push(orderedUsersByAvergeSteps[0].medios)
          this.threeMoreActiveUsersNames.push(orderedUsersByAvergeSteps[0].nombre)
        }
        if(orderedUsersByAvergeSteps.length >= 2){
          this.threeMoreActiveUsersSteps.push(orderedUsersByAvergeSteps[1].medios)
          this.threeMoreActiveUsersNames.push(orderedUsersByAvergeSteps[1].nombre)
        }
        if(orderedUsersByAvergeSteps.length >= 3){
          this.threeMoreActiveUsersSteps.push(orderedUsersByAvergeSteps[2].medios)
          this.threeMoreActiveUsersNames.push(orderedUsersByAvergeSteps[2].nombre)
        }

        this.moreActiveUsers.labels =  this.threeMoreActiveUsersNames;
        this.moreActiveUsers.datasets[0].data =  this.threeMoreActiveUsersSteps;
      }
    },

    showLessActiveUsers(list){
      this.lessActiveUsers.labels = [];
      this.lessActiveUsers.datasets[0].data =  [];
      this.threeLessActiveUsersSteps=  [];
      this.threeLessActiveUsersNames=  [];
      let orderedUsersByAvergeSteps = list.sort((a, b) => {
        return a.medios - b.medios;
      });
      if(orderedUsersByAvergeSteps.length > 0){
        if(orderedUsersByAvergeSteps.length >= 1){
          this.threeLessActiveUsersSteps.push(orderedUsersByAvergeSteps[0].medios)
          this.threeLessActiveUsersNames.push(orderedUsersByAvergeSteps[0].nombre)
        }
        if(orderedUsersByAvergeSteps.length >= 2){
          this.threeLessActiveUsersSteps.push(orderedUsersByAvergeSteps[1].medios)
          this.threeLessActiveUsersNames.push(orderedUsersByAvergeSteps[1].nombre)
        }
        if(orderedUsersByAvergeSteps.length >= 3){
          this.threeLessActiveUsersSteps.push(orderedUsersByAvergeSteps[2].medios)
          this.threeLessActiveUsersNames.push(orderedUsersByAvergeSteps[2].nombre)
        }

        this.lessActiveUsers.labels =  this.threeLessActiveUsersNames;
        this.lessActiveUsers.datasets[0].data =  this.threeLessActiveUsersSteps;
      }
    },

    createMoreActiveUsers(s){
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
            medios:Math.trunc(totalStepsCounter/this.selectedDays)
        }
        );
      }
      return arrayWithTotalAndAvergueSteps ;
    },

  selectGender(userInfo) {
    if (this.selectedGender === 'male' && userInfo.gender === 'male') {
      console.log('en el male')
      let a =this.selectAgeRange(userInfo);
      return a
    }
      if (this.selectedGender === 'female' && userInfo.gender === 'female') {
        console.log('en el female')
        let a =this.selectAgeRange(userInfo);
        return a
      }
      if (this.selectedGender === 'both') {
        console.log('en el both')
        let a =this.selectAgeRange(userInfo);
        return a
      }

    },
    selectAgeRange(userInfo){
      switch (this.selectedAge) {
        case 'all':
            let obj = JSON.parse(JSON.stringify(userInfo.stepsWithDatesMap));
            return obj;
          break;
        case 'six':
          if (userInfo.age >= 60 && userInfo.age <= 69) {
            let obj = JSON.parse(JSON.stringify(userInfo.stepsWithDatesMap));
            return obj;
          }
          break;
        case 'seven':
          if (userInfo.age >= 70 && userInfo.age <= 79) {
            let obj = JSON.parse(JSON.stringify(userInfo.stepsWithDatesMap));
            return obj;
          }
          break;
        case 'eight':
          if (userInfo.age >= 80 && userInfo.age <= 89) {
            let obj = JSON.parse(JSON.stringify(userInfo.stepsWithDatesMap));
            return obj;
          }
          break;
        case 'nine':
          if (userInfo.age >= 90 && userInfo.age <= 99) {
            let obj = JSON.parse(JSON.stringify(userInfo.stepsWithDatesMap));
            return obj;
          }
          break;
        case 'ten':
          if (userInfo.age > 100) {
            let obj = JSON.parse(JSON.stringify(userInfo.stepsWithDatesMap));
            return obj;
          }
          break;
        default:
      }

  }
  },
};

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
