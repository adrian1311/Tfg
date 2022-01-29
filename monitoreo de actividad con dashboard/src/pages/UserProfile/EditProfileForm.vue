<template>
  <card class="card" title="Edit Profile">
    <div>
      <form>
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="First Name"
                      placeholder="First Name"
                      v-model="user.firstName">
            </fg-input>
          </div>
          <div class="col-md-5">
            <fg-input type="text"
                      label="Last Name"
                      placeholder="Paper dashboard"
                      v-model="user.lastName">
            </fg-input>
          </div>
          <div class="col-md-2">
            <fg-input type="text"
                      label="Height"
                      placeholder="Height"
                      v-model="user.age">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <fg-input type="text"
                      label="Height"
                      placeholder="Height"
                      v-model="user.height">
            </fg-input>
          </div>
          <div class="col-md-2">
            <fg-input type="text"
                      label="Weight"
                      placeholder="Weight"
                      v-model="user.weight">
            </fg-input>
          </div>
          <div class="col-md-2">
            <fg-input type="text"
                      label="Gender"
                      placeholder="Gender"
                      v-model="user.gender">
            </fg-input>
          </div>
          <div class="col-md-2">
            <fg-input type="text"
                      label="Estimated steps"
                      placeholder="Estimated steps"
                      v-model="user.dailyEstimatedSteps">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>About Me</label>
              <textarea rows="5" class="form-control border-input"
                        placeholder="Here can be your description"
                        v-model="user.notes">

              </textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <p-button type="info"
                    round
                    v-on:click="updateProfile">
            Update Profile
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user:{
        firstName : '',
        lastName : '',
        weight : '',
        height : '',
        age:'',
        gender:'',
        dailyEstimatedSteps:'',
        notes:'',
      }

    };
  },
  methods: {
    updateProfile() {

    },
    loadInformationForUser(){
      this.user.firstName = this.$store.state.userInformation.firstName;
      this.user.lastName = this.$store.state.userInformation.lastName;
      this.user.height = this.$store.state.userInformation.height;
      this.user.weight = this.$store.state.userInformation.weight;
      this.user.age = this.$store.state.userInformation.age;
      this.user.gender = this.$store.state.userInformation.gender;
      this.user.dailyEstimatedSteps = this.$store.state.userInformation.estimatedSteps;
      this.user.notes = this.$store.state.userInformation.notes;

    }
  },
  mounted() {
    this.loadInformationForUser();
  }
};
</script>
<style>
</style>
