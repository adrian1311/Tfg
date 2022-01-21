import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    userStepsWithDates: [],
    exampleArray:[],
    userInformation :{
      firstName:'',
      lastName:'',
      height:'',
      weight:'',
    }
  }
});
