<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <!--sidebar-link to="/frontPage"><img class="mr-2 text-warning" src="@/assets/img/home1.png" width="30" /><span class="text-white font-weight-bold small">HOME!</span></sidebar-link-->
        <sidebar-link to="/genericInfo"><img class="mr-2 text-warning" src="@/assets/img/gen_info.png" width="30" /><span class="text-white font-weight-bold small">INFORMACION GENERAL</span></sidebar-link>
        <sidebar-link to="/compareUsers"><img class="mr-2 text-warning" src="@/assets/img/compare.png" width="30" /><span class="text-white font-weight-bold small">COMPARAR RESIDENTES</span></sidebar-link>
        <sidebar-link to="/showUser"><img class="mr-2 text-warning" src="@/assets/img/compare.png" width="30" /><span class="text-white font-weight-bold small">UN RESIDENTE</span></sidebar-link>
        <sidebar-link to="/main"><img class="mr-2 text-warning" src="@/assets/img/people.png" width="30" /><span class="text-white font-weight-bold small">VER RESIDENTES</span></sidebar-link>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
