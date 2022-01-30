<template>
<div>
  <div class="mx-auto mt-5" style="width: 200px;">
    <div class="row">
        <stats-card @click.native="changeToRegisterUser()">
          <div class="icon-big text-center" slot="header">
            <i :class="'ti-plus'"></i>
          </div>
          <div class="numbers" slot="content">
            <p>ADD USER BAND</p>
          </div>
        </stats-card>
    </div>
  </div>
</div>
</template>

<script>
import { StatsCard } from "@/components/index";
export default {
  name: 'ExternLogin',
  components: {
    StatsCard,
  },
  methods:{
    changeToRegisterUser: function() {
      this.$router.push({name: 'registerUser'});
    },
  }
}
</script>

<style scoped>

</style>
