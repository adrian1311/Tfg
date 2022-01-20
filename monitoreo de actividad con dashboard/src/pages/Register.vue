<template>
<div>
  <div class="row">
    <div class="col-md-5">
      <fg-input type="text"
                label="First name"
                placeholder="First name"
                v-model="firstName">
      </fg-input>
    </div>
    <div class="col-md-3">
      <fg-input type="text"
                label="Second name"
                placeholder="Second name"
                v-model="lastName">
      </fg-input>
    </div>
    <div class="col-md-2">
      <fg-input type="text"
                label="Height"
                placeholder="Height"
                v-model="height">
      </fg-input>
    </div>
    <div class="col-md-2">
      <fg-input type="text"
                label="Weight"
                placeholder="Weight"
                v-model="weight">
      </fg-input>
    </div>
  </div>
  <div class="text-center">
    <p-button type="info"
              round
              @click.native.prevent="addBand">
     Register Band
    </p-button>
  </div>
</div>
</template>

<script>
import {default as axios} from "axios";

export default {
  name: "Register",
  data() {
    return {
      urlForSteps: '',
      firstName : '',
      lastName : '',
      height : '',
      weight : '',
    }
  },
  methods:{
    addBand(){
      var self=this;
      console.log(self.firstName)
      axios.get("http://localhost:5999/",{
        params:{
          personName: self.firstName,
          personLastName: self.lastName,
          personHeight: self.height,
          personWeight: self.weight
        }
      }).then(function (response) {
          self.urlForSteps= response.data
          window.open(self.urlForSteps, "_blank");
        }).catch(error => {
        if (!error.response) {
          this.errorStatus = 'Error: Network Error';
        } else {
          this.errorStatus = error.response.data.message;
        }
      })
    },
  },
}
</script>

<style scoped>

</style>
