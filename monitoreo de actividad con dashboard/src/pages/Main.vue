<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3">

        <stats-card @click.native="changeToRegisterUser()">
          <div class="icon-big text-center" slot="header">
            <img src="@/assets/img/contact.png" width="60" />
          </div>
          <div class="numbers" slot="content">
            <p>АÑADIR NUEVO RESIDENTE</p>
          </div>
        </stats-card>
      </div>
    </div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="user in allUsers" :key="user.name">

        <stats-card @click.native="changeToEditUser(user)">
          <div class="icon-big text-center" slot="header">
            <img src="@/assets/img/user.png" width="60" />
          </div>
          <div class="numbers" slot="content">
            <p>{{user.firstName}} -> ( {{user.name}} )</p>
          </div>
        </stats-card>
      </div>
    </div>


  </div>
</template>
<script>
import { StatsCard } from "@/components/index";
const axios = require('axios').default;
export default {
  name:'Main',
  components: {
    StatsCard,
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

    }

  }
};
</script>
<style>
</style>
