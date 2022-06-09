//import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import Main from "@/pages/Main.vue"
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Register from "../pages/Register";
import ExternLogin from "../pages/ExternLogin";
import GenericInfo from "../pages/GenericInfo";
import CompareUsers from "../pages/CompareUsers";

const routes = [
  {
    path: "/externLogin",
    name: "main",
    component: ExternLogin,
    props: true
  } ,
  // {
  //   path: "registerUser",
  //   name: "registerUser",
  //   component: Register
  // },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "main",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        props: true
      },
      {
        path: "stats",
        name: "USER PROFILE",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "TABLE WITH STEPS FOR LAST WEEK",
        component: TableList
      },
      {
        path: "main",
        name: "All users bands",
        component: Main
      }
      ,
      {
        path: "registerUser",
        name: "registerUser",
        component: Register
      },
      {
        path: "genericInfo",
        name: "INFORMACION GENERAL",
        component: GenericInfo
      },
      {
        path: "compareUsers",
        name: "COMPARAR RESIDENTES",
        component: CompareUsers
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
