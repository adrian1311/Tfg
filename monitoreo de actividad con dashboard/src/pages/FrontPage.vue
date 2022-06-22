<template>
<div>
  <div class="row justify-content-center">
    <h3 class="text-center font-weight-bold">Plataforma de control de niveles de sedentarismo y actividad física en adultos mayores institucionalizados  </h3>
  </div>
  <div class="row px-0 justify-content-center">
    <img src="@/assets/img/imagen3.jpeg" class="img-fluid rounded-lg">
  </div>
  <div class="row mt-2 mb-2 border bg-dark">

    <div class="col-md-3 col-xl-3 mt-3">
      <stats-card @click.native="changeToPath('genericInfo')">
        <div class="icon-big text-center" slot="header">
          <img src="@/assets/img/gen_info.png" width="60" />
        </div>
        <div class="numbers" slot="content">
          <p>INFORMACION GENERAL</p>
        </div>
      </stats-card>
    </div>

    <div class="col-md-3 col-xl-3 mt-3">
      <stats-card @click.native="changeToPath('')">
        <div class="icon-big text-center" slot="header">
          <img src="@/assets/img/user.png" width="60" />
        </div>
        <div class="numbers" slot="content">
          <p>UN SOLO RESIDENTE</p>
        </div>
      </stats-card>
    </div>

    <div class="col-md-3 col-xl-3 mt-3">
      <stats-card @click.native="changeToPath('compareUsers')">
        <div class="icon-big text-center" slot="header">
          <img src="@/assets/img/compare.png" width="60" />
        </div>
        <div class="numbers" slot="content">
          <p>COMPARAR RESIDENTES</p>
        </div>
      </stats-card>
    </div>

    <div class="col-md-3 col-xl-3 mt-3">
      <stats-card @click.native="changeToPath('main')">
        <div class="icon-big text-center" slot="header">
          <img src="@/assets/img/people.png" width="60" />
        </div>
        <div class="numbers" slot="content">
          <p>VER RESIDENTES</p>
        </div>
      </stats-card>
    </div>

  </div>
</div>
</template>

<script>
import { StatsCard, ChartCard } from "@/components/index";

export default {
  name: "FrontPage",
  components: {
    StatsCard,
  },
  methods:{
    changeToPath: function(selectedPath) {
      this.$router.push({path: selectedPath});
    },
  }
}
</script>

<style scoped>

</style>
