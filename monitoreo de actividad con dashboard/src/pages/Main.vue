<template>
  <div>
    <div class="row">
      <div class="card bg-dark ml-3" style="width: 18rem;">
        <div class="card-header display:inline display:block mx-auto">
          <img src="@/assets/img/add.png" class="rounded-circle" style="height: 10rem; width: 8rem">
        </div>
        <div class="card-body text-white text-center">
          <p class="card-text"></p>
          <p-button class="mt-3" type="warning"
                    round @click.native.prevent="changeToRegisterUser()">
            Añadir residente
          </p-button>
        </div>
      </div>

      <div class="card bg-dark ml-3" style="width: 18rem;" v-for="user in allUsers" :key="user.name">
        <div class="card-header display:inline display:block mx-auto">
          <img v-bind:src="'data:image/jpg;base64,'+user.base64encodedImage"  class="rounded-circle" style="height: 10rem; width: 8rem">
        </div>
        <div class="card-body text-white font-weight-bold text-center">
          <p class="card-text border">Nombre: {{user.firstName}}</p>
          <p class="card-text border">Edad: {{convertDateToAge(user.age)}}</p>
          <p class="card-text border">Pasos estimados: {{user.estimatedSteps}} </p>
          <p-button class="mt-2" type="warning"
                    round @click.native.prevent="changeToEditUser(user)">
            MODIFICAR RESIDENTE
          </p-button>
        </div>
      </div>
      </div>


  </div>
</template>
<script>
import { StatsCard } from "@/components/index";
import Card from 'primevue/card';
import moment from "moment";
const axios = require('axios').default;
export default {
  name:'Main',
  components: {
    StatsCard,
    Card
  },
  data() {
    return {
      allUsers:[],
      targetId :'',
      refreshToken : '',
    }
    },
  mounted() {
    this.getAllUsers();
  },
  methods:{
    getAllUsers(){
      var self=this;
      axios.get("http://localhost:5998/pasos/getUsers")
        .then(function (response) {
          self.allUsers= response.data;
          console.log('aaaaaaaaaaaaaa',self.allUsers)
        }).catch(error => {
        console.log(error)
      })
    },
    changeToEditUser: function(user) {
      this.putInformationInGLobalVariable(user)
      this.$router.push({name: 'registerUser', params: { calledFrom: 'edit' }});
    },
    changeToRegisterUser: function() {
      this.$router.push({name: 'registerUser', params: { calledFrom: 'register' }});
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
      this.$store.state.userInformation.base64encodedImage = user.base64encodedImage;
      this.$store.state.userInformation.imageName = user.imageName;
    },
    convertDateToAge(data){
        let date = moment(data).format('YYYY MM DD');
        let age =new Date(date)
        let month_diff = Date.now() - age.getTime();
        let age_dt = new Date(month_diff);
        let year = age_dt.getUTCFullYear();
      data = Math.abs(year - 1970);
        return data;
    },

  }
};
</script>
<style lang="scss" scoped>
p {
  line-height: 1.5;
  margin: 0;
}
</style>
