<template>
<div>
  <div class="row justify-content-center mt-3 mb-3">
    <span style="font-size: large ;color: orange">Todos los campos son obligatorios para registrar nuevo residente !</span>
  </div>
  <div class="row justify-content-center">
    <div class="col-sm-3">
      <div class="input-group input-group-lg">
        <span class="input-group-text">Nombre</span>
        <input type="text" v-model="firstName"  class="form-control">
      </div>
    </div>
    <div class="col-sm-3">
      <div class="input-group input-group-lg">
        <span class="input-group-text">Apellido</span>
        <input type="text" v-model="lastName"  class="form-control">
      </div>
    </div>
    <div class="col-sm-3">
      <div class="input-group input-group-lg">
        <span class="input-group-text">Genero</span>
        <select class="form-control" v-model="gender" >
          <option selected>Choose...</option>
          <option value="male">Hombre</option>
          <option value="female">Mujer</option>
        </select>
      </div>
    </div>
  </div>

  <div class="row justify-content-center">
    <div class="col-sm-3">
      <div class="input-group input-group-lg">
        <span class="input-group-text">Altura</span>
        <input type="text" v-model="height"   class="form-control">
      </div>
    </div>
    <div class="col-sm-3">
      <div class="input-group input-group-lg">
        <span class="input-group-text">Peso</span>
        <input type="text" v-model="weight"  class="form-control">
      </div>
    </div>
    <div class="col-sm-3">
      <div class="input-group input-group-lg">
        <span class="input-group-text">Edad</span>
        <input type="text" v-model="age"  class="form-control">
      </div>
    </div>
  </div>

  <div class="row justify-content-center">
    <div class="col-sm-5">
      <div class="input-group input-group-lg">
        <span class="input-group-text">Pasos diarios estimados</span>
        <input type="text"  v-model="estimetedSteps"  class="form-control">
      </div>
    </div>
  </div>

  <div class="row justify-content-center">
    <div class="col-sm-10">
      <div class="form-group">
        <span class="input-group-text" style="text-align: center">Informacion adicional sobre el residente</span>
        <textarea class="form-control" v-model="notes"  rows="3"></textarea>
      </div>
    </div>
  </div>

  <div class="text-center">
    <p-button type="success" v-if="showAddButton"
              round
              @click.native.prevent="addBand">
     AÑADIR RESIDENTE
    </p-button>
    <p-button type="success" v-if="showEditButton"
              round
              @click.native.prevent="addBand">
      MODIFICAR RESIDENTE
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
      showEditButton: false,
      showAddButton: false,
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
  mounted() {
    let self = this;
    if(self.$route.params.calledFrom === 'edit'){
      self.showEditButton = true;
      self.completeFieldsWithExistingInfo();
    }else if (self.$route.params.calledFrom === 'register'){
      self.showAddButton = true;
    }
  },
  methods:{
    completeFieldsWithExistingInfo(){
      this.firstName = this.$store.state.userInformation.firstName;
      this.lastName = this.$store.state.userInformation.lastName;
      this.weight = this.$store.state.userInformation.weight;
      this.height = this.$store.state.userInformation.height;
      this.age = this.$store.state.userInformation.age;
      this.estimetedSteps = this.$store.state.userInformation.estimatedSteps;
      this.gender = this.$store.state.userInformation.gender;
      this.notes =this.$store.state.userInformation.notes;
    },
    addBand(){
      let self=this;
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
