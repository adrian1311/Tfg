<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3">

        <stats-card @click.native="changeToRegisterUser()">
          <div class="icon-big text-center" slot="header">
            <i :class="'ti-plus'"></i>
          </div>
          <div class="numbers" slot="content">
            <p>ADD USER BAND</p>
          </div>
        </stats-card>
      </div>
    </div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="user in allUsers" :key="user.name">

        <stats-card @click.native="changeToDashboard(user)">
          <div class="icon-big text-center" slot="header">
            <i :class="'ti-user'"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{user.name}}</p>
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
          console.log(self.allUsers)
        }).catch(error => {
        console.log(error)
      })
    },
    changeToDashboard: function(user) {
      this.putInformationInGLobalVariable(user)
      console.log('USER',user)
      this.refreshToken = user.refresh_token
      console.log('',this.refreshToken)
      this.$router.push({name: 'dashboard', params: { refToken: this.refreshToken}});
    },
    changeToRegisterUser: function() {
      this.$router.push({name: 'registerUser'});
    },
    putInformationInGLobalVariable(user){
      this.$store.state.userInformation.firstName = user.firstName;
      this.$store.state.userInformation.lastName = user.lastName;
      this.$store.state.userInformation.weight = user.weight;
      this.$store.state.userInformation.height = user.height;
    }

  }
};
</script>
<style>
</style>
