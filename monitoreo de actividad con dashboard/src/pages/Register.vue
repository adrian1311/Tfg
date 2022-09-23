<template>
<div>
  <div class="row">
    <div class="col-sm-11 border border-success m-4 rounded-lg bg-dark">
      <div class="row justify-content-center mt-3 mb-3">
        <span style="font-size: large ;color: orange">Todos los campos son obligatorios para registrar nuevo residente !</span>
      </div>
      <div class="row justify-content-center ">
        <div class="col-sm-4">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Nombre</span>
            <input type="text" v-model="firstName"  class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Apellido</span>
            <input type="text" v-model="lastName"  class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Genero</span>
            <select class="form-control" v-model="gender" >
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-4">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Altura (cm)</span>
            <input type="text" v-model="height"   class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Peso (kg)</span>
            <input type="text" v-model="weight"  class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Fecha de nacimiento</span>
            <input type="date" v-model="age"  class="form-control">
          </div>
        </div>

      </div>
      <div class="row justify-content-center">
        <div class="col-sm-4">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Pasos diários estimados</span>
            <input type="text"  v-model="estimetedSteps"  class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Necesita ayuda ?</span>
            <select class="form-control" v-model="needHelp" >
              <option value="no">No</option>
              <option value="yes">Si</option>
            </select>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Toma medicamentos ?</span>
            <select class="form-control" v-model="medicines" >
              <option value="no">No</option>
              <option value="yes">Si</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-10 text-center">
          <div class="form-group">
            <span class="input-group-text" style="text-align: center">Información adicional sobre el residente</span>
            <textarea class="form-control" v-model="notes"  rows="3"></textarea>
          </div>
        </div>
      </div>

      <div class="text-center mb-2">
        <p-button type="success" v-if="showAddButton"
                  round
                  @click.native.prevent="addBand">
          AÑADIR RESIDENTE
        </p-button>
        <p-button type="warning" v-if="showEditButton"
                  round
                  @click.native.prevent="modifyConfirmation">
          MODIFICAR RESIDENTE
        </p-button>
        <p-button type="danger" v-if="showEditButton"
                  round
                  @click.native.prevent="deleteConfirmation">
          BORRAR RESIDENTE
        </p-button>
      </div>
    </div>

    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="templating">
      <template #message="slotProps">
        <div class="flex p-4">
          <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
          <p class="pl-2">{{slotProps.message.message}}</p>
        </div>
      </template>
    </ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>
    <!--div class="col-sm-2 px-0">
      <img src="@/assets/img/imagen2.png" class="img-fluid">
    </div-->
  </div>

</div>
</template>

<script>
import {default as axios} from "axios";
import moment from "moment";
import Calendar from 'primevue/calendar';
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  name: "Register",
  components: {
    Calendar,
    ConfirmDialog
  },
  data() {
    return {
      calendarDate:'',
      id:'',
      refresh_token:'',
      name: '',
      showEditButton: false,
      showAddButton: false,
      urlForSteps: '',
      firstName : '',
      lastName : '',
      height : '',
      weight : '',
      age: '',
      gender:'female',
      estimetedSteps:'',
      notes:'',
      needHelp:'no',
      medicines:'no'
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
      this.id = this.$store.state.userInformation.id;
      this.name = this.$store.state.userInformation.name;
        this.refresh_token =this.$store.state.userInformation.refresh_token;
      this.firstName = this.$store.state.userInformation.firstName;
      this.lastName = this.$store.state.userInformation.lastName;
      this.weight = this.$store.state.userInformation.weight;
      this.height = this.$store.state.userInformation.height;
      this.age = moment(this.$store.state.userInformation.age).format('YYYY-MM-DD');
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

    modifyBand(){
      let self=this;
      axios.post("http://localhost:5998/pasos/modifyInfo",{

          id: self.id,
        refresh_token:self.refresh_token,
        name:self.name,
        firstName: self.firstName,
        lastName: self.lastName,
        height: self.height,
        weight: self.weight,
        age:self.age,
        gender:self.gender,
        estimatedSteps:self.estimetedSteps,
        notes:self.notes
      }).then(function (response) {
     console.log(response)

      }).catch(error => {
        if (!error.response) {
          this.errorStatus = 'Error: Network Error';
        } else {
          this.errorStatus = error.response.data.message;
        }
      })
    },

    deleteBand(){
      let self=this;
      console.log('SEND DELETE')
      axios.post("http://localhost:5998/pasos/deleteUser",{
        id: self.id
      }).then(function (response) {
        console.log('myresponse',response)
        if(response.status == 200){
          console.log('llamando a la pestaña de usuarios')
          self.moveToMainPage();
        }


      })
    },

    deleteConfirmation() {
      let self=this;
      self.$confirm.require({
        message: '¿ Seguro que desea borrar este residente ?',
        header: 'Borrar residente',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
         self.deleteBand()
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
        onHide: () => {
          //Callback to execute when dialog is hidden
        }
      });
    },

    modifyConfirmation() {
      let self=this;
      self.$confirm.require({
        message: '¿ Seguro que desea modificar la información personal de este residente ?',
        header: 'Modificar residente',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          self.modifyBand()
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
        onHide: () => {
          //Callback to execute when dialog is hidden
        }
      });
    },


    moveToMainPage(){
      console.log('moviendo a la pestaña de usuarios')
      this.$router.push({name: 'main'});
    }


  },
}
</script>

<style scoped>

</style>
