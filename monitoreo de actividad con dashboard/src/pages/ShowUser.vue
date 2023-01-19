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
      <label class="text-dark">Intervalo (días)</label>
      <Dropdown v-model="selectedDays" :options="daysForSearchOprions" optionLabel="name" optionValue="value" placeholder="Intervalo (días)" />
    </div>
    <div class="col-md-4 col-xl-3 mt-4" >
      <p-button type="success"
                round
                @click.native.prevent="getAllUsersInfo">
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
    <div class="col-sm-6 text-center border border-info rounded-lg m-1 bg-dark">
      <div class="row justify-content-center">
        <div class="col-sm-2 mt-5">
          <img v-bind:src="'data:image/jpg;base64,'+firstUserPhoto"  class="rounded-circle" style="height: 10rem; width: 8rem">
        </div>
        <div class="col-sm-10">
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
              <h5 class="text-info font-weight-bold">Objetívo de pasos diários : {{firstUserEstimatedSteps}}</h5>
            </div>
          </div>
          <div class="row justify-content-center m-2">
            <div class="col-sm-10 text-center border border-info  rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Notas sobre el usuario: </h5>
            </div>
          </div>
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
    <div class="col-sm-2 mt-5 text-center">
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
        <div class="col-sm-3 mt-1 text-center bg-dark">
        <h5 class="mt-3 text-white mt-5">Objetivo cumplido en los ultimos {{selectedDays}} días</h5>
        <Knob v-model="valueGoalFirstUser"  readonly :max="selectedDays"/>
          <h5 class="mt-3 text-white mt-1">días</h5>
        </div>
      </div>

      <div class="row justify-content-center">
      <div class="col-sm-10 text-center border border-danger m-1 bg-white rounded-lg">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
      </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <h3 class="text-dark font-weight-bold font-weight-bold" :class="`ti-arrow-up`"> Días de mayor actividad</h3>
          <Chart type="bar" :data="dataHighestStepsFirstUser" :options="horizontalOptions" />
        </div>
        <div class="col-sm-5 mt-2 text-center border border-info m-1 rounded-lg bg-white">
          <h3 class="text-dark font-weight-bold" :class="`ti-arrow-down`"> Días de menor actividad</h3>
          <Chart type="bar" :data="dataLowerStepsFirstUser" :options="horizontalOptions" />
        </div>
      </div>
      <div class="row justify-content-center mt-2">
        <div class="col-sm-10 mt-2 text-center bg-white">
          <h4 class="text-info">Información por horas de los últimos {{selectedDays}} de : {{ firstUserName }}</h4>
          <vue-good-table
            :columns="columns"
            :rows="rowsFirstUser"
            max-height="400px"
            :fixed-header="true">
          </vue-good-table>
        </div>
      </div>

      <div class="row justify-content-center mt-3">
        <div class="col-sm-11 text-center border border-info rounded-lg m-1 bg-dark">
          <div class="row justify-content-center mt-2">
            <label class="font-weight-bold text-white">APTITUD FÍSICA DEL RESIDENTE : {{firstUser.firstName}} de {{firstUser.age}} años </label>
          </div>
      <div class="row justify-content-center mt-2">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Sentarse/levantarse (segundos)
                         <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="Sentarse y levantarse de una silla durante 30 s. Propósito: valorar la fuerza-resistencia de los músculos extensores de las rodillas y las caderas, responsables de fallos al andar y de las caídas. Valoración: número de levantadas completas que pueden realizar con los brazos cruzados por delante del pecho durante 30 s. El sujeto parte desde la posición de sentado. Zona de riesgo: menos de 8 levantadas completas (varones y mujeres)" style="height: 2rem; width: 2rem">
            </span>
            <input type="text" disabled v-model="firstUser.sitUp"  class="form-control">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Flexiones codos (nº de repeticiones)
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="
Flexión y extensión de codos con mancuernas durante 30 s en posición de sentado en una silla. Propósito: valorar la fuerza-resistencia de la musculatura del brazo y el hombro, tan necesaria para desarrollar tareas cotidianas que involucran levantamientos, transportes,mantenimiento de pesos, etc. Valoración: número de flexiones y extensiones de codos que pueden ser completadas en 30 s, movilizando una mancuerna de 2,30 kg para mujeres y de 4 kg para varones.Se valoran los 2 miembros.– Zona de riesgo: menos de 11 flexiones/extensiones completas (varones y mujeres)." style="height: 2rem; width: 2rem">
            </span>
            <input type="text" disabled v-model="firstUser.elbowFlexion"  class="form-control">
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Caminata (metros recorridos)
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title=" Marcha durante 6 min. Propósito: evaluar la capacidad aeróbica, que es un factor muy importante para caminar, subir escaleras, ir de compras, hacer turismo, etc. Valoración: número de metros que pueden ser realizados en 6 min alrededor de una pista. Zona de riesgo: menos de 320 m para varones y mujeres" style="height: 2rem; width: 2rem">
            </span>
            <input type="text" disabled v-model="firstUser.walks"   class="form-control">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Marcha estacionaria (nº de pasos)
 <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="  Step-test durante 2 min. Propósito: evaluar la capacidad aeróbica. Alternativa al test aeróbico de marcha de 6 min, cuando limitaciones de espacio o tiempo impidan realizarlo. Valoración: número de pasos completos realizados durante 2 min, llegando cada rodilla a un punto intermedio entre la rótula y la espina ilíaca anterosuperior. Se puntúa el número de veces que la rodilla derecha alcanza la altura requerida. Zona de riesgo: menos de 60 pasos para varones y mujeres." style="height: 2rem; width: 2rem">
            </span>
            <input type="text" disabled v-model="firstUser.march"  class="form-control">
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Flexión del tronco (cm, +/–)
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="Flexibilidad de la cadera. Propósito: valorar la flexibilidad de la musculatura posterior de las piernas y del tronco, zonas muy importantes para un adecuado patrón de la deambulación y para diferentes tareas de movilidad, tales como entrar y salir de la bañera, de un coche, subir al autobús, etc. Valoración: desde la posición de sentado en la parte delantera de una silla y con una pierna extendida, tratar de alcanzar con los dedos de la mano los dedos del pie. Se evalúa la distancia alcanzada por el dedo medio en centímetros. Zona de riesgo: mujeres a partir de 5 cm y varones a partir de 10 cm." style="height: 2rem; width: 2rem">
            </span>
            <input type="text" disabled v-model="firstUser.trunkFlexion"  class="form-control">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Flexibilidad hombros (cm, +/–)
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="Alcanzar las manos tras la espalda. Propósito: valorar la flexibilidad del hombro, tan importante en tareas como peinarse, vestirse, alcanzar objetos, asearse, etc. Valoración: pasando una mano por encima del hombro y la otra por la espalda, medir la distancia que hay entre los dedos medios extendidos. Valorar los dos miembros.Zona de riesgo: mujeres a partir de 5 cm y varones a partir de 10 cm" style="height: 2rem; width: 2rem">
            </span>
            <input type="text" disabled v-model="firstUser.shouldersFlexion"  class="form-control">
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Levantarse, caminar y sentarse (segundos)
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="Levantarse, caminar y sentarse. Propósito: evaluar el equilibrio dinámico y la destreza, que son factores importantes en tareas que requieren maniobras rápidas tales como bajarse del autobús o levantarse para atender algo, etc. Valoración: número de segundos empleados para levantarse desde una posición de sentado, caminar 2,50 m, girar alrededor de una señal y regresar hasta sentarse de nuevo. Zona de riesgo: más de 9 s para varones y mujeres." style="height: 2rem; width: 2rem">
            </span>
            <input type="text" disabled v-model="firstUser.upWalkSit"  class="form-control">
          </div>
        </div>
      </div>


        </div>
      </div>
      <div class="row justify-content-center ">
        <h4 class="text-info">Valores recomendados</h4>
      </div>
      <div class="row justify-content-center" v-if="firstUser.gender === 'male'">
        <div class="col-sm-11 mt-2 text-center bg-white mb-3">
          <h4 class="text-info"></h4>
          <vue-good-table
            :columns="columnsMeasure"
            :rows="rowsMeasureMens"
            max-height="400px"
            :fixed-header="true">
          </vue-good-table>
        </div>
      </div>
      <div class="row justify-content-center " v-if="firstUser.gender === 'female'">
        <div class="col-sm-11 mt-2 text-center bg-white mb-3">
          <h4 class="text-info"></h4>
          <vue-good-table
            :columns="columnsMeasure"
            :rows="rowsMeasureWomans"
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
      columnsMeasure: [
        {
          label: 'Pruebas',
          field: 'test',
        },
        {
          label: '60-64',
          field: 'firstMiddleSix',
        },
        {
          label: '65-69',
          field: 'secondMiddleSix',
        },
        {
          label: '70-74',
          field: 'firstMiddleSeven',
        },
        {
          label: '75-79',
          field: 'secondMiddleSeven',
        },
        {
          label: '80-84',
          field: 'firstMiddleEight',
        },
        {
          label: '85-89',
          field: 'secondMiddleEight',
        },
        {
          label: '90-94',
          field: 'firstMiddleNine',
        }
      ],
      rowsMeasureMens: [
        { test:"Sentarse/levantarse (segundos) ", firstMiddleSix:"14-19", secondMiddleSix: "12-18", firstMiddleSeven: "12-17",secondMiddleSeven: "11-17", firstMiddleEight:"10-15", secondMiddleEight: "8-14", firstMiddleNine: "7-12" },
        { test:"Flexiones codos (nº de repeticiones)", firstMiddleSix:" 16-22", secondMiddleSix:"15-21", firstMiddleSeven: "14-21", secondMiddleSeven: "13-19", firstMiddleEight: "13-19", secondMiddleEight: "11-17", firstMiddleNine: "10-14"},
        { test:"Caminata (metros recorridos) ", firstMiddleSix:"560-672", secondMiddleSix: " 512-640", firstMiddleSeven: "498-622", secondMiddleSeven: "430-585", firstMiddleEight: "407-553", secondMiddleEight: "347-521", firstMiddleNine: "279-457" },
        { test:"Marcha estacionaria (nº de pasos)", firstMiddleSix:"87-115", secondMiddleSix: "86-116", firstMiddleSeven: "80-110", secondMiddleSeven: "73-109", firstMiddleEight: "71-103", secondMiddleEight: "59-91", firstMiddleNine: "52-86" },
        { test:"Flexión del tronco (cm, +/–)", firstMiddleSix:"–7/+10", secondMiddleSix: "–8 /+7", firstMiddleSeven: "–9 /+6", secondMiddleSeven: "–10/+5", firstMiddleEight: "–14/+4", secondMiddleEight: "–14/+2", firstMiddleNine: "–17/+2" },
        { test:"Flexibilidad hombros (cm, +/–)", firstMiddleSix:"–17/0", secondMiddleSix: "–19/–3", firstMiddleSeven: "–20/–3", secondMiddleSeven: "–23/–5", firstMiddleEight: "–24/–5", secondMiddleEight: "–26/–8", firstMiddleNine: "–26/–10" },
        { test:"Levantarse, caminar y sentarse (segundos)", firstMiddleSix:"5,6-3,8", secondMiddleSix: "5,7-4,3", firstMiddleSeven: "6,0-4,2", secondMiddleSeven: "7,2-4,6", firstMiddleEight: "7,6-5,2", secondMiddleEight: "8,9-5,3", firstMiddleNine: " 10,0-6,2" },
      ],
      rowsMeasureWomans: [
        { test:"Sentarse/levantarse (segundos) ", firstMiddleSix:"12-17", secondMiddleSix: "11-16", firstMiddleSeven: "10-15",secondMiddleSeven: "10-15", firstMiddleEight:"9-14", secondMiddleEight: "8-13", firstMiddleNine: "4-11" },
        { test:"Flexiones codos (nº de repeticiones)", firstMiddleSix:" 13-19", secondMiddleSix:"12-18", firstMiddleSeven: "12-17", secondMiddleSeven: "11-17", firstMiddleEight: "10-16", secondMiddleEight: "10-15", firstMiddleNine: "8-13"},
        { test:"Caminata (metros recorridos) ", firstMiddleSix:"498-603", secondMiddleSix: " 457-580", firstMiddleSeven: "439-662", secondMiddleSeven: "393-535", firstMiddleEight: "352-494", secondMiddleEight: "311-466", firstMiddleNine: "251-402" },
        { test:"Marcha estacionaria (nº de pasos)", firstMiddleSix:"75-107", secondMiddleSix: "73-107", firstMiddleSeven: "68-110", secondMiddleSeven: "68-100", firstMiddleEight: "60-91", secondMiddleEight: "55-85", firstMiddleNine: "44-72" },
        { test:"Flexión del tronco (cm, +/–)", firstMiddleSix:"–2/+12", secondMiddleSix: "–2/+11", firstMiddleSeven: "–3/+10", secondMiddleSeven: "–4/+9", firstMiddleEight: "–5/+7", secondMiddleEight: "–7/+6", firstMiddleNine: "–12/+3" },
        { test:"Flexibilidad hombros (cm, +/–)", firstMiddleSix:"–8/+4", secondMiddleSix: "–9/+4", firstMiddleSeven: "–10/+3", secondMiddleSeven: "–12/+12", firstMiddleEight: "–14/0", secondMiddleEight: "–18/–3", firstMiddleNine: "–20/–3" },
        { test:"Levantarse, caminar y sentarse (segundos)", firstMiddleSix:"6,0-4,4", secondMiddleSix: "6,4-4,8", firstMiddleSeven: "7,1-4,9", secondMiddleSeven: "7,4-4,6", firstMiddleEight: "8,7-5,7", secondMiddleEight: "9,6-6,2", firstMiddleNine: " 11,5-7,3" },
      ],
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
      firstUserPhoto :'',
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
      firstUser : {},
      arrayWithSelectedUsers:[],

      dataHighestStepsFirstUser: {
        labels: [],
        datasets: [
          {
            label: 'Número de pasos',
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
            label: 'Número de pasos',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            backgroundColor: '#cb446c',
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
          self.pushUsersInDropDown();
          self.isLoading = false;
        }).catch(error => {
        console.log(error)
      })
    },
    getSelectedUsersInfo(){
      for(let user of this.allUsers){
        if(user.firstName + ' ' +user.lastName === this.firstResident || user.firstName + ' ' +user.lastName === this.secondResident){
          this.arrayWithSelectedUsers.push(user);
        }
      }
    },
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
    pushUsersInDropDown(){
      this.usersForDropdown = [];
      for(let user of this.allUsers){
        this.usersForDropdown.push(user.firstName + ' ' +user.lastName)
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
      this.$store.state.userInformation.sitUp = user.sitUp;
      this.$store.state.userInformation.elbowFlexion = user.elbowFlexion;
      this.$store.state.userInformation.walks = user.walks;
      this.$store.state.userInformation.trunkFlexion = user.trunkFlexion;
      this.$store.state.userInformation.shouldersFlexion = user.shouldersFlexion;
      this.$store.state.userInformation.upWalkSit = user.upWalkSit;
      this.$store.state.userInformation.march = user.march;
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
        if(userInfo.firstName + ' ' +userInfo.lastName === self.firstResident){
          self.firstUser = userInfo;
          console.log('my firstUser',self.firstUser)
          let map = new Map(Object.entries(userInfo.stepsWithDatesMap));
          let mapWithHours = new Map(Object.entries(userInfo.stepsWithDatesMapWithTime));
          s.push(map)
          listWithHours.push(mapWithHours)
          //Coloco informacion en los cuadros
          self.putInformationInFirstBoxInfo(userInfo)
        }
      }

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

      //Recorro map para crear los array para la primera gráfica
      mapWIthTotalSteps.forEach (function(value, key) {
          self.datess.push(key)
        if(value !== 0){
          self.averageSteps.push(value/listWithTotalSteps.length)
        }else {
          self.averageSteps.push(value)
        }
      })


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
      this.firstUserPhoto = userInfo.base64encodedImage
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
