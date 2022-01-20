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

        <stats-card @click.native="changeToDashboard(user.refresh_token)">
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
      // statsCards: [
      //   {
      //     type: "warning",
      //     icon: "ti-user",
      //     title: "Calorias",
      //     value: "105GB",
      //     footerText: "Updated now",
      //     footerIcon: "ti-reload"
      //   }
      // ],
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
          self.allUsers= response.data
          console.log(self.allUsers)
        }).catch(error => {
        console.log(error)
      })
    },
    changeToDashboard: function(refreshToken) {
      this.$router.push({name: 'dashboard', params: { refToken: refreshToken}});
    },
    changeToRegisterUser: function() {
      this.$router.push({name: 'registerUser'});
    }

  }
};
</script>
<style>
</style>
