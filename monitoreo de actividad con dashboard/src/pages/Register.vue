<template>
<div>
  <div class="row justify-content-center mt-3 mb-3" v-if="firstName== '' || lastName== '' ||height== '' || weight== ''">
    <span style="font-size: large ;color: red">ALL THE INPUTS ARE MANDATORY FOR ENABLE THE BUTTON !</span>
  </div>
  <div class="row justify-content-center">
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
  </div>
  <div class="row justify-content-center">
    <div class="col-md-2">
      <fg-input type="text"
                label="Gender"
                placeholder="Gender"
                v-model="gender">
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
    <div class="col-md-2">
      <fg-input type="text"
                label="Age"
                placeholder="Age"
                v-model="age">
      </fg-input>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-md-4">
      <fg-input type="text"
                label="Daily estimated steps"
                placeholder="Daily estimated steps"
                v-model="estimetedSteps">
      </fg-input>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>About Me</label>
        <textarea rows="5" class="form-control border-input"
                  placeholder="Here can be your description"
                  v-model="notes">

              </textarea>
      </div>
    </div>
  </div>
  <div class="text-center">
    <p-button type="info" :disabled="firstName== '' || lastName== '' ||height== '' || weight== ''"
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
      age: '',
      gender:'',
      estimetedSteps:'',
      notes:'',
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
          personWeight: self.weight,
          age:self.age,
          gender:self.gender,
          estimetedSteps:self.estimetedSteps,
          notes:self.notes
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
