<template>
  <div>

    <!--Stats cards-->
    <div class="row justify-content-center">
      <div class="col-sm-6 mb-3 text-center">
        <Dropdown v-model="$store.state.daysForSearch" v-on:change="seeSteps($store.state.userInformation.refreshToken)" :options="days" placeholder="Days" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            <p>{{stats.value}}</p>
          </div>
        </stats-card>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <h3 class="text-success font-weight-bold">Steps for the last {{$store.state.daysForSearch}} days</h3>
        <Chart type="line" :data="basicData" />
      </div>

    </div>
    <div class="row mt-3">
      <div class="col-sm-6">
        <h3 class="text-success font-weight-bold">Days with the highest number of steps</h3>
        <Chart type="bar" :data="dataHighestSteps" :options="horizontalOptions" />
      </div>
      <div class="col-sm-6">
        <h3 class="text-danger font-weight-bold">Days with fewer steps</h3>
        <Chart type="bar" :data="dataLowerSteps" :options="horizontalOptions" />
      </div>
    </div>

  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Dropdown from 'primevue/dropdown';
import moment from "moment";
const axios = require('axios').default;
import Chart from 'primevue/chart';
import Knob from 'primevue/knob';

export default {
  components: {
    StatsCard,
    ChartCard,
    Dropdown,
    Chart,
    Knob
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      lowerFinallyThreeDates:[],
      lowerFinallyThreeSteps:[],
      highestSteps:[],
      highestDates:[],
      highestFirstThreeSteps:[],
      highestFirstThreeDates:[],
      sortedMapBySteps: new Map(),
      value1:10,
      value2:20,
      value3:30,
      dataLowerSteps: {
        labels: [],
        datasets: [
          {
            label: 'Steps',
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
            label: 'Steps',
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
            label: 'Steps',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      },
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
      valuesInstatsCards:[],
      statsCards: [
        {
          type: "success",
          icon: "ti-server",
          title: "Average daily steps",
          value: "",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Estimeted daily steps",
          value: "",
          footerText: "Last day",
          footerIcon: "ti-calendar"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Calories",
          value: "",
          footerText: "In the last hour",
          footerIcon: "ti-timer"
        },
      ],
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
      let self=this;
      if(self.$store.state.userInformation.refreshToken !== ''){
        self.$store.state.userStepsWithDates = [];
        self.$store.state.exampleArray = [];
        self.basicData.labels = [];
        self.basicData.datasets[0].data = [];
        self.totalSteps = 0;
        self.$store.state.mapWithDatesAndSteps.clear();
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
      let self=this;
      for(let stepWithOutFormat of self.$store.state.userStepsWithDates ) {
        self.convertOriginalResponseToArrayWithImportantInfo(stepWithOutFormat);
      }
      self.convertArrayWithInformationToArraysWithDaysAndSteps();
    },

    convertOriginalResponseToArrayWithImportantInfo(step){
      let self=this;
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
      let self=this;
      self.datess = [];
      for(let info of self.$store.state.exampleArray){
        let date = moment(info.date).format('DD/MM/YYYY')
        let stepsCounter = 0;
        stepsCounter = info.steps;
        if(!self.$store.state.mapWithDatesAndSteps.has(date)){
          console.log('DAY',date)
          self.$store.state.mapWithDatesAndSteps.set(date,stepsCounter)
        }else{
          let sumSteps = self.$store.state.mapWithDatesAndSteps.get(date) + info.steps;
          self.$store.state.mapWithDatesAndSteps.set(date,sumSteps)
        }
      }

      self.$store.state.mapWithDatesAndSteps.forEach (function(value, key) {
        self.datess.push(key)
        self.averageSteps.push(value)
      })
      self.sortedMapBySteps.clear();
      self.sortedMapBySteps = new Map([...self.$store.state.mapWithDatesAndSteps.entries()].sort((a, b) => b[1] - a[1]));
      self.highestSteps=[];
      self.highestDates=[];
      self.sortedMapBySteps.forEach (function(value, key) {
        self.highestSteps.push(value);
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
      self.informationInTiles();
      self.putInformationInTiles();
    },

    putInformationInTiles(){
      for(let i=0;i<this.statsCards.length; i++){
        this.statsCards[i].value=this.valuesInstatsCards[i];
      }
    },

    informationInTiles(){
      this.valuesInstatsCards[0]=parseInt(this.totalSteps/this.$store.state.daysForSearch);
      this.valuesInstatsCards[1]=this.$store.state.userInformation.estimatedSteps;
      this.valuesInstatsCards[2]=0;

    }
  },

};
</script>
<style>
</style>
