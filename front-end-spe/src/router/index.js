/* index.js route*/
import store from "@/stores/store";
import { createRouter, createWebHistory } from "vue-router";
import Permission from "@/views/Pages/Permission.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Unauthorized from "../views/Unauthorized.vue";
import SettingsView from "@/views/Pages/SettingsView.vue";
import createRole from "@/components/Roles/createRole.vue";
import addPermissionRole from "@/components/Roles/addPermissionRole.vue";
import Groupe from "@/components/Planification/Groupe.vue";
import Controle from "@/components/Planification/Controle.vue";
import Program from "@/components/Planification/Program.vue";
import Report from "@/components/Planification/Report.vue";
import equipment from "@/components/Realization/equipment.vue";

import EditPermission from "@/components/Permissions/EditPermission.vue";
import AddPermission from "@/components/Permissions/AddPermission.vue";

import ControleList from "@/views/ControleList.vue";
import addCategory from "@/components/Categories/addCategory.vue";
import editUser from "@/components/Users/editUser.vue";

import Role from "@/views/Pages/Role.vue"; // import Roles
import User from "@/views/Pages/User.vue"; // import Users

const routes = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },

  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/categories/add-category",
    name: "addCategory",
    component: addCategory,
    meta: { title: "addCategory" },
  },

  {
    path: "/Realization/equipment",
    name: "equipment",
    component: equipment,
    meta: { title: "equipment" },
  },
  {
    path: "/controle",
    name: "ControleList",
    component: ControleList,
    meta: { title: "ControleList" },
  },
  {
    path: "/planifications/groupe",
    name: "Groupe",
    component: Groupe,
    meta: { title: "Groupe" },
  },
  {
    path: "/planifications/controle",
    name: "Controle",
    component: Controle,
    meta: { title: "Controle" },
  },
  {
    path: "/planifications/program",
    name: "Program",
    component: Program,

    meta: {
      title: "Program",
      requiresAuth: true,
      permission: "view planification",
    },
  },

  {
    path: "/planifications/reports",
    name: "Report",
    component: Report,
    meta: { title: "Report" },
  },

  {
    path: "/profile/permissions/edit-permission/:id_permission",
    name: "EditPermission",
    component: EditPermission,
    meta: { title: "EditPermission" },
  },

  {
    path: "/profile/permissions/add-permission",
    name: "AddPermission",
    component: AddPermission,
    meta: { title: "AddPermission" },
  },

  {
    path: "/profile/permissions",
    name: "permission",
    component: Permission,
    meta: { title: "Permissions" },
  },

  {
    path: "/profile/roles",
    name: "roles",
    component: Role,
    meta: { title: "Role" },
  }, // Route for Roles component
  {
    path: "/profile/roles/create",
    name: "rolesCreate",
    component: createRole,
    meta: { title: "createRole" },
  }, // Route for Roles component
  {
    path: "/profile/roles/add-permission/:roleId",
    name: "addPermissionRole",
    component: addPermissionRole,
    meta: { title: "addPermissionRole" },
  }, // Route for Roles component
  {
    path: "/profile/roles/edit-user/:id_user",
    name: "editUser",
    component: editUser,
    meta: { title: "editUser" },
  }, // Route for Roles component
  {
    path: "/profile/users",
    name: "users",
    component: User,
    meta: {
      title: "User",
      // requiresAuth: true,
      //allowedRoles: ['super-admin'] // Only super-admin can access this route
    },
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
  },

  {
    path: "/profile/settings",
    name: "settings",
    component: SettingsView,
    meta: { title: "Settings" },
  },
];
//    const fetchedUsers = await store.dispatch("fetchUsers");

const router = createRouter({ history: createWebHistory(), routes });
/*
router.beforeEach((to, from, next) => {
  if (to.name === "Dashboard") {
    const isAuthenticated = localStorage.getItem("access_token");
    if (!isAuthenticated) {
      next("/");
    } else {
      console.log("ar");
      next();
    }
  } else {
    console.log("ae");
    next();
  }
});
*/
//const userPermissions = await store.dispatch("fetchPermissions");
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem("access_token");
  //permissions
  const userPermissions = JSON.parse(
    localStorage.getItem("permissions") || "[]"
  );
  // const userPermissions = store.getters.getUserPermissions;
  console.log("access token  ", isAuthenticated);
  console.log("userPermissions sfd  ", userPermissions);
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/"); // Redirect to the login page if not authenticated
  } else if (
    to.meta.permission &&
    !userPermissions.includes(to.meta.permission)
  ) {
    next("/unauthorized"); // Redirect to the unauthorized page if the user doesn't have the required permission
  } else {
    next();
  }
});
export default router;
