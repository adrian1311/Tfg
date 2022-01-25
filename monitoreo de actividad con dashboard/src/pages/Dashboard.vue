<template>
  <div>

    <!--Stats cards-->
    <div class="row justify-content-center">
      <div class="col-sm-6 mb-3 text-center">
        <Dropdown v-model="$store.state.daysForSearch" v-on:change="seeSteps($store.state.userInformation.refreshToken)" :options="days" placeholder="Days" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            <p>{{totalSteps/$store.state.daysForSearch}}</p>
          </div>
        </stats-card>
      </div>
    </div>
    <Chart type="line" :data="basicData" />

    <!--Charts-->
    <div class="row">

    </div>

  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Dropdown from 'primevue/dropdown';
import moment from "moment";
const axios = require('axios').default;
import Chart from 'primevue/chart';

export default {
  components: {
    StatsCard,
    ChartCard,
    Dropdown,
    Chart
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      basicData: {
        labels: [],
        datasets: [
          {
            label: 'First Dataset',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      },
      exxx:true,
      datess:[],
      averageSteps:[],
      selectedCity: null,
      days: [
       1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
      ],
      dateWithSteps : {},
      refreshToken:'',
      userSteps :[],
      totalSteps:0,
      statsCards: [
        {
          type: "success",
          icon: "ti-server",
          title: "Average daily steps",
          value: "105GB",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Pasos",
          value: "$1,345",
          footerText: "Last day",
          footerIcon: "ti-calendar"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Errors",
          value: "23",
          footerText: "In the last hour",
          footerIcon: "ti-timer"
        },
        {
          type: "info",
          icon: "ti-twitter-alt",
          title: "Followers",
          value: "+45",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        }
      ],
    };
  },
  mounted() {

    if(this.$store.state.userInformation.refreshToken != ''){
      this.totalSteps = 0;
      this.seeSteps(this.$store.state.userInformation.refreshToken)
    }

  },
  methods:{
    seeSteps(token){
      var self=this;
      if(self.$store.state.userInformation.refreshToken !== ''){
        self.$store.state.userStepsWithDates = [];
        self.$store.state.exampleArray = [];
        self.basicData.labels = [];
        self.basicData.datasets[0].data = [];
        self.totalSteps = 0;
        self.$store.state.daysForSearch=self.$store.state.daysForSearch
      axios.get("http://localhost:5999/getInformation",{
        params:{
          userToken:token,
          daysForSearch: self.$store.state.daysForSearch
        }
      })
        .then(function (response) {
          self.$store.state.userStepsWithDates= response.data
          self.convertStepsAndDatesToApropiateFormat();
        }).catch(error => {
        console.log(error)
      })
      }
    },
    convertStepsAndDatesToApropiateFormat(){
      var self=this;
      for(var step of self.$store.state.userStepsWithDates ) {
        self.dateConverter(step);
      }
      self.convertArrayWithInformationToArraysWithDaysAndSteps();
    },
    dateConverter(step){
      var self=this;
      const date = step.endTimeMillis
      const date2 = new Date (+date)
      if(step.dataset[0].point.length > 0){
        self.dateWithSteps={ date : date2, steps : step.dataset[0].point[0].value[0].intVal}
        self.totalSteps +=step.dataset[0].point[0].value[0].intVal;
      }else {
        self.dateWithSteps={ date : date2, steps : 0}
        self.totalSteps += 0;
      }
      self.$store.state.exampleArray.push(self.dateWithSteps)
    },
    convertArrayWithInformationToArraysWithDaysAndSteps(){
      var self=this;
      var stepss = 0;
      self.datess = [];
      for(let info of self.$store.state.exampleArray){
         if(!self.datess.includes(moment(info.date).format('MM/DD/YYYY'))){
           self.averageSteps.push(stepss)
           stepss = 0;
           self.datess.push(moment(info.date).format('MM/DD/YYYY'));
           stepss+=info.steps;
         }else{
           stepss+=info.steps;
         }
      }
      self.basicData.labels = self.datess;
      self.basicData.datasets[0].data = self.averageSteps;
    }
  },
  computed:{
  },

};
</script>
<style>
</style>
