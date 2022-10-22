<template>
<div>
  <div class="row">
    <div class="col-sm-11 border border-success m-4 rounded-lg bg-dark">
      <div class="row justify-content-center mt-2">
        <label class="font-weight-bold text-white">INFORMACIÓN BÁSICA DEL RESIDENTE</label>
      </div>
      <div class="row justify-content-center mt-2">
        <div class="col-sm-2 text-center">
          <img v-bind:src="'data:image/jpg;base64,'+base64encodedImage" class="mt-3 ml-2" style="height: 12rem; width: 10rem">
        </div>
        <div class="col-sm-10">
          <div class="row justify-content-center mt-2">
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text">Nombre</span>
                <input type="text" v-model="firstName"  class="form-control text-dark">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text">Apellido</span>
                <input type="text" v-model="lastName"  class="form-control text-dark">
              </div>
            </div>

          </div>
          <div class="row justify-content-center mt-2">
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text">Género</span>
                <select class="form-control text-dark" v-model="gender" >
                  <option value="male">Hombre</option>
                  <option value="female">Mujer</option>
                </select>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text">Altura (cm)</span>
                <input type="text" v-model="height"   class="form-control text-dark">
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-6">
              <div class="input-group input-group-">
                <span class="input-group-text">Peso (kg)</span>
                <input type="text" v-model="weight"  class="form-control text-dark">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text">Fecha de nacimiento</span>
                <input type="date" v-model="age"  class="form-control text-dark">
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text">Pasos diários estimados</span>
                <input type="text"  v-model="estimetedSteps"  class="form-control text-dark">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text">Necesita ayuda ?</span>
                <select class="form-control text-dark" v-model="needHelp" >
                  <option value="no">No</option>
                  <option value="yes">Si</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div class="row justify-content-center">
        <img style="" :src="image" alt="">
        <input @change="handleImage" class="custom-input" type="file" accept="image/*">
      </div>

      <div class="row justify-content-center mt-2">
        <div class="col-sm-12 text-center">
          <div class="form-group">
            <span class="input-group-text" style="text-align: center">Información adicional sobre el residente</span>
            <textarea class="form-control text-dark" v-model="notes"  rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-11 border border-success m-4 rounded-lg bg-dark">
      <div class="row justify-content-center mt-2">
        <label class="font-weight-bold text-white">APTITUD FÍSICA DEL RESIDENTE</label>
      </div>
      <div class="row justify-content-center mt-2">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Sentarse/levantarse (segundos)</span>
            <input type="text" v-model="sitUp"  class="form-control">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Flexiones codos (nº de repeticiones)</span>
            <input type="text" v-model="elbowFlexion"  class="form-control">
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Caminata (metros recorridos)</span>
            <input type="text" v-model="walks"   class="form-control">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Marcha estacionaria (nº de pasos</span>
            <input type="text" v-model="march"  class="form-control">
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Flexión del tronco (cm, +/–)</span>
            <input type="text"  v-model="trunkFlexion"  class="form-control">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Flexibilidad hombros (cm, +/–)</span>
            <input type="text"  v-model="shouldersFlexion"  class="form-control">
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Levantarse, caminar y sentarse (segundos)</span>
            <input type="text"  v-model="upWalkSit"  class="form-control">
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
      image:'',
      remoteUrl: '',
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
      sitUp:0,
      elbowFlexion:0,
      walks:0,
      march:0,
      trunkFlexion:0,
      shouldersFlexion:0,
      upWalkSit:0.0,
      base64encodedImage:'',
      imageName:'',
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
    handleImage(e){
      let self = this;
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      let rawImg;
      reader.onloadend = () => {

        rawImg = reader.result;
        const words = rawImg.split(',');
        self.base64encodedImage = words[1]
      }
      self.imageName = selectedImage.name
      reader.readAsDataURL(selectedImage);
    },

    completeFieldsWithExistingInfo(){
      console.log(this.$store.state.userInformation)
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
      this.sitUp =this.$store.state.userInformation.sitUp;
      this.elbowFlexion =this.$store.state.userInformation.elbowFlexion;
      this.walks =this.$store.state.userInformation.walks;
      this.march =this.$store.state.userInformation.march;
      this.trunkFlexion =this.$store.state.userInformation.trunkFlexion;
      this.shouldersFlexion =this.$store.state.userInformation.shouldersFlexion;
      this.upWalkSit =this.$store.state.userInformation.upWalkSit;
      this.base64encodedImage=this.$store.state.userInformation.base64encodedImage;
      this.imageName=this.$store.state.userInformation.imageName;

    },
    addBand(){
      let self=this;
      axios.post("http://localhost:5999/initial",{
          personName: self.firstName,
          personLastName: self.lastName,
          personHeight: self.height,
          personWeight: self.weight,
          age:self.age,
          gender:self.gender,
          estimetedSteps:self.estimetedSteps,
          notes:self.notes,
          sitUp:self.sitUp,
          elbowFlexion:self.elbowFlexion,
          walks:self.walks,
          march:self.march,
          trunkFlexion:self.trunkFlexion,
          shouldersFlexion:self.shouldersFlexion,
          upWalkSit:self.upWalkSit,
          base64encodedImage:self.base64encodedImage,
          imageName:self.imageName
      }).then(function (response) {
        console.log(response.data)
          self.urlForSteps= response.data
        console.log(self.urlForSteps)
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
        notes:self.notes,
        sitUp:self.sitUp,
        elbowFlexion:self.elbowFlexion,
        walks:self.walks,
        march:self.march,
        trunkFlexion:self.trunkFlexion,
        shouldersFlexion:self.shouldersFlexion,
        upWalkSit:self.upWalkSit,
        base64encodedImage:self.base64encodedImage,
        imageName:self.imageName
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
