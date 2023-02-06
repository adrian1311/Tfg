//import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import Main from "@/pages/Main.vue"
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Register from "../pages/Register";
import ExternLogin from "../pages/ExternLogin";
import GenericInfo from "../pages/GenericInfo";
import CompareUsers from "../pages/CompareUsers";
import FrontPage from "../pages/FrontPage";
import ShowUser from "../pages/ShowUser";
const routes = [
  // {
  //   path: "/externLogin",
  //   name: "main",
  //   component: ExternLogin,
  //   props: true
  // } ,
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
        path: "frontPage",
        name: "AAAAA",
        component: FrontPage
      },
      {
        path: "main",
        name: "main",
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
      },
      {
        path: "showUser",
        name: "UN RESIDENTE",
        component: ShowUser
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
