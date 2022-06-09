<template>
<div>
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
              @click.native.prevent="addBand">
      MOSTRAR INFORMACION
    </p-button>
  </div>
  <div class="row justify-content-center border border-info mt-5" v-if="false">
    <div class="col-sm-12 text-center">
      <h3 class="text-info font-weight-bold">Por favor seleccione los residentes y el intervalo</h3>
    </div>
  </div>
  <div class="row justify-content-center border border-info mt-5">
    <div class="col-sm-12">
      <div class="row justify-content-center">
        <div class="col-sm-5 text-center border border-info rounded-lg m-1">
          <div class="row justify-content-center border border-info  rounded-lg m-2">
            <div class="col-sm-5 text-center border border-info rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Edad: </h5>
            </div>
            <div class="col-sm-5 text-center border border-info rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Peso: </h5>
            </div>
          </div>
          <div class="row justify-content-center border border-info rounded-lg m-2">
            <div class="col-sm-5 text-center border border-info m-1">
              <h5 class="text-info font-weight-bold">Altura: </h5>
            </div>
            <div class="col-sm-5 text-center border border-info rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Pasos estimados : </h5>
            </div>
          </div>
          <div class="row justify-content-center border border-info rounded-lg m-2">
            <div class="col-sm-10 text-center border border-info  rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Notas: </h5>
            </div>
          </div>
        </div>
        <div class="col-sm-5 text-center border border-info rounded-lg m-1">
          <div class="row justify-content-center border border-info border rounded-lg m-2">
            <div class="col-sm-5 text-center border border-info  rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Edad: </h5>
            </div>
            <div class="col-sm-5 text-center border border-info rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Peso: </h5>
            </div>
          </div>
          <div class="row justify-content-center border border-info rounded-lg m-2">
            <div class="col-sm-5 text-center border border-info  rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Altura: </h5>
            </div>
            <div class="col-sm-5 text-center border border-info  rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Pasos estimados : </h5>
            </div>
          </div>
          <div class="row justify-content-center border border-info rounded-lg m-2">
            <div class="col-sm-10 text-center border border-info  rounded-lg m-1">
              <h5 class="text-info font-weight-bold">Notas: </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12 mt-2">
      <div class="row justify-content-center">
        <div class="col-sm-4">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-info`" slot="header">
            <i :class="'ti-user'"></i>
          </div>
          <div class="numbers" slot="content">
            <p>Pasos totales</p>
            <p>{{numberOfMens}}</p>
          </div>
        </stats-card>
        </div>
        <div class="col-sm-4">
          <stats-card>
            <div class="icon-big text-center" :class="`icon-info`" slot="header">
              <i :class="'ti-user'"></i>
            </div>
            <div class="numbers" slot="content">
              <p>Pasos totales</p>
              <p>{{numberOfMens}}</p>
            </div>
          </stats-card>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-sm-4 text-center">
          <stats-card>
            <div class="icon-big text-center" :class="`icon-info`" slot="header">
              <i :class="'ti-user'"></i>
            </div>
            <div class="numbers" slot="content">
              <p>Pasos medios</p>
              <p>{{numberOfMens}}</p>
            </div>
          </stats-card>
        </div>
        <div class="col-sm-4 text-center">
          <stats-card>
            <div class="icon-big text-center" :class="`icon-info`" slot="header">
              <i :class="'ti-user'"></i>
            </div>
            <div class="numbers" slot="content">
              <p>Pasos medios</p>
              <p>{{numberOfMens}}</p>
            </div>
          </stats-card>
        </div>
      </div>
    </div>








  </div>
</div>
</template>

<script>
const axios = require('axios').default;
import Dropdown from "primevue/dropdown";
import { StatsCard } from "@/components/index";

export default {
  name: "CompareUsers",
  components: {
    Dropdown,
    StatsCard,
  },
  data() {
    return {
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

    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods:{
    getAllUsers() {
      let self = this;
      axios.get("http://localhost:5998/pasos/getUsers")
        .then(function (response) {
          self.allUsers = response.data;
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
    }
  }
}
</script>

<style scoped>

</style>
