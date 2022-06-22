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

<div class="row justify-content-center mb-3">
    <label class="font-weight-bold font-weight-bold h4 text-success">Número total de residentes : {{allUsers.length}}</label>
</div>
  <div class="row justify-content-center">
    <div class="col-md-3 col-xl-3" >
      <stats-card>
        <div class="icon-big text-center" :class="`icon-info`" slot="header">
          <i :class="'ti-user'"></i>
        </div>
        <div class="numbers" slot="content">
          <p>HOMBRES</p>
          <p>{{numberOfMens}}</p>
        </div>
      </stats-card>
    </div>
    <div class="col-md-3 col-xl-3" >
      <stats-card>
        <div class="icon-big text-center" :class="`icon-info`" slot="header">
          <i :class="'ti-user'"></i>
        </div>
        <div class="numbers" slot="content">
          <p>MUJERES</p>
          <p>{{numberOfWomans}}</p>
        </div>
      </stats-card>
    </div>
      <div class="col-md-3 col-xl-3" >
        <stats-card>
          <div class="icon-big text-center" :class="`icon-danger`" slot="header">
            <i :class="'ti-angle-double-down'"></i>
          </div>
          <div class="numbers" slot="content">
            <p>Debajo de la media</p>
            <p>{{numberOfMens}}</p>
          </div>
        </stats-card>
      </div>
      <div class="col-md-3 col-xl-3" >
        <stats-card>
          <div class="icon-big text-center" :class="`icon-success`" slot="header">
            <i :class="'ti-angle-double-up'"></i>
          </div>
          <div class="numbers" slot="content">
            <p>Encima de la media</p>
            <p>{{numberOfWomans}}</p>
          </div>
        </stats-card>
      </div>
  </div>
    <div class="row justify-content-center">
      <div class="col-sm-8 bg-white  border border-primary bg-white rounded-lg mb-2">
        <div class="row justify-content-center">
          <h4>Seleccione los criterios para filtrar la informacion</h4>
        </div>
        <div class="row justify-content-md-center">
          <div class="col-sm-4">
            <div class="input-group input-group-lg">
              <span class="input-group-text font-weight-bold">Intervalo (dias)</span>
              <select class="form-control" v-model="selectedDays" v-on:change="processInformation">
                <option value="3">3</option>
                <option value="7">7</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="input-group input-group-lg">
              <span class="input-group-text font-weight-bold">Genero</span>
              <select class="form-control" v-model="selectedGender" v-on:change="processInformation">
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
                <option value="both">Hombre y Mujer</option>
              </select>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="input-group input-group-lg ">
              <span class="input-group-text font-weight-bold">Edad</span>
              <select class="form-control" v-model="selectedAge" v-on:change="processInformation">
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
      </div>




    </div>
    <div class="row justify-content-center">
      <div class="col-sm-10 text-center border border-primary bg-white rounded-lg">
        <h3 class="text-info font-weight-bold" >Pasos medios en los ultimos {{selectedDays}} dias</h3>
        <Chart type="line" :data="basicData" />
      </div>

    </div>

    <div class="row mt-3 justify-content-center">
      <div class="col-sm-5 text-center border border-success m-1 bg-white rounded-lg">
        <h3 class="text-success font-weight-bold" :class="`ti-arrow-up`">Top 3 de dias con mayor actividad en los ultimos {{selectedDays}}</h3>
        <Chart type="bar" :data="dataHighestSteps" :options="horizontalOptions" />
      </div>
      <div class="col-sm-5 text-center border border-danger m-1 bg-white rounded-lg">
        <h3 class="text-danger font-weight-bold" :class="`ti-arrow-down`">Dias de menor actividad</h3>
        <Chart type="bar" :data="dataLowerSteps" :options="horizontalOptions" />
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-sm-5 text-center border border-success m-1 bg-white rounded-lg">
        <h3 class="text-success font-weight-bold" :class="`ti-bar-chart-alt`" >Usuarios mas activos en los ultimos {{selectedDays}} dias</h3>

        <Chart type="bar" :data="moreActiveUsers" :options="horizontalOptions" />
      </div>
      <div class="col-sm-5 text-center border border-danger m-1 bg-white rounded-lg">
      <h3 class="text-danger font-weight-bold" :class="`ti-bar-chart`">Usuarios menos activos en los ultimos {{selectedDays}} dias</h3>
      <Chart type="bar" :data="lessActiveUsers" :options="horizontalOptions" />
    </div>
    </div>

<!--    <div class="row mt-4 bg-white rounded-lg">-->
<!--      <div class="col-12 text-center border border-primary">-->
<!--        <card :title="table1.title" :subTitle="table1.subTitle">-->
<!--          <div slot="raw-content" class="table-responsive">-->
<!--            <paper-table :data="table1.data" :columns="table1.columns"></paper-table>-->
<!--          </div>-->
<!--        </card>-->
<!--      </div>-->
<!--    </div>-->
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="font-weight-bold text-info">Informacion mostrada para los ultimos {{selectedDays}} dias</h3>
      </div>
    </div>
    <div class="row mt-4 bg-white rounded-lg">
      <div class="col-12 text-center border border-primary">
        <vue-good-table
          :columns="columns"
          :rows="rows">
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
import Button from 'primevue/button';


export default {
  components: {
    StatsCard,
    Dropdown,
    Chart,
    PaperTable,
    VueGoodTable,
    Button
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
          label: 'Mensuales',
          field: 'mensuales',
        },
        {
          label: 'Estimados',
          field: 'estimados',
        },
      ],
      rows: [],
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
      genders:["Hombre","Mujer","Hombres y Mujeres"],
      daysForSearch:[3,7,30],
      numberOfMens:0,
      numberOfWomans:0,
      allUsers:[],

      statsCards: [
        {
          type: "success",
          icon: "ti-server",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
      ],
      basicData: {
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
      dataLowerSteps: {
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
      moreActiveUsers: {
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
      lessActiveUsers: {
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
      dataHighestSteps: {
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

      table1: {
        title: "INFORMACION DE PASOS TOTALES Y MEDIA DE PASOS DE LOS RESIDENTES",
        subTitle: "",
        columns: [...tableColumns],
        data: this.list,
      },

    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
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
        self.$store.state.allUsersInformation = response.data;
        self.isLoading = false;
        self.processInformation();
      }).catch(error => {
        console.log(error)
      })
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
    },
    //Metodo para recopilar todos los pasos en un solo map con el total de pasos
    transformInformationToMaps() {
      let self=this;
      self.$store.state.exampleArray = [];
      self.datess = [];
      self.averageSteps = [];
      self.names= [];
      let s = [];
      let mapWIthTotalSteps = new Map();
      //Creo una lista de maps con los maps de todos los usuarion.
      for (let userInfo of self.$store.state.allUsersInformation) {
        console.log(userInfo)
       let list = self.selectGender(userInfo)
        if(list !== null && list !== undefined){
          let map1 = new Map(Object.entries(list));
          s.push(map1)
          self.names.push(userInfo.name)
          self.estimatedStepsArray.push(userInfo.estimatedSteps)
        }

      }
      self.list = []
      //crear tabla con informacion
      self.list = self.createMoreActiveUsers(s);
      for (let usr in self.list){
        self.list[usr].nombre = (self.names[usr])
        self.list[usr].estimados = (self.estimatedStepsArray[usr])
      }

      console.log('my list',self.list)
      self.rows = self.list;
      self.showMoreActiveUsers(self.list);
      self.table1.data = self.list;


      //Recorro la lista y creo map con el total
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

      //REcorro map para crear los array para la primera grafica
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
      console.log('SELECTED DAYS',self.selectedDays)
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
       // console.log('in other')
        self.sortedMapWIthTotalSteps.clear();
        self.sortedMapWIthTotalSteps = new Map([...mapWIthTotalSteps.entries()].sort((a, b) => b[1] - a[1]));
      }

      self.highestSteps=[];
      self.highestDates=[];
      //console.log('sortedMap',self.sortedMapWIthTotalSteps)
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
      self.basicData.datasets[0].data = self.averageSteps;
    },

    showMoreActiveUsers(list){
      this.moreActiveUsers.labels = [];
      this.moreActiveUsers.datasets[0].data =  [];
      this.threeMoreActiveUsersSteps=  [];
      this.threeMoreActiveUsersNames=  [];
      let orderedUsersByAvergeSteps = list.sort((a, b) => {
        return a.age - b.age;
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
            medios:totalStepsCounter/this.selectedDays
        }
        );
      }
      return arrayWithTotalAndAvergueSteps ;
    },

  selectGender(userInfo) {
    if (this.selectedGender === 'male' && userInfo.gender === 'male') {
      let a =this.selectAgeRange(userInfo);
      return a
    }
      if (this.selectedGender === 'female' && userInfo.gender === 'female') {
        let a =this.selectAgeRange(userInfo);
        return a
      }
      if (this.selectedGender === 'both') {
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
          if (userInfo.age >= 60 && userInfo.age < 69) {
            let obj = JSON.parse(JSON.stringify(userInfo.stepsWithDatesMap));
            return obj;
          }
          break;
        case 'seven':
          if (userInfo.age >= 70 && userInfo.age < 79) {
            let obj = JSON.parse(JSON.stringify(userInfo.stepsWithDatesMap));
            return obj;
          }
          break;
        case 'eight':
          if (userInfo.age >= 80 && userInfo.age < 89) {
            let obj = JSON.parse(JSON.stringify(userInfo.stepsWithDatesMap));
            return obj;
          }
          break;
        case 'nine':
          if (userInfo.age >= 90 && userInfo.age < 99) {
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
