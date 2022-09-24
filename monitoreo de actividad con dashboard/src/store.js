import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    userStepsWithDates: [],
    exampleArray:[],
    userInformation :{
      id:'',
      name:'',
      refresh_token:'',
      firstName:'',
      lastName:'',
      height:'',
      weight:'',
      refreshToken:'',
      age:'',
      notes:'',
      estimatedSteps:'',
      gender:'',
      sitUp:'',
      elbowFlexion:'',
      walks:'',
      march:'',
      trunkFlexion:'',
      shouldersFlexion:'',
      upWalkSit:''
    },
    daysForSearch:7,
    mapWithDatesAndSteps : new Map(),

    //new vsrisbles
    allUsersInformation : []
  }
});
