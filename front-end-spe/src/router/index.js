/* index.js route*/
import store from '@/stores/store';
import { createRouter, createWebHistory } from 'vue-router';
import Permission from '@/views/Pages/Permission.vue'
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import SettingsView from '@/views/Pages/SettingsView.vue'
import createRole from '@/components/Roles/createRole.vue';
import addPermissionRole from '@/components/Roles/addPermissionRole.vue';
import Groupe from '@/components/Planification/Groupe.vue';
import Controle from '@/components/Planification/Controle.vue';
import Program from '@/components/Planification/Program.vue';
import Report from '@/components/Planification/Report.vue';

import ControleList from '@/views/ControleList.vue';
import addCategory from '@/components/Categories/addCategory.vue';
import editUser from '@/components/Users/editUser.vue';

import Role from '@/views/Pages/Role.vue'; // import Roles 
import User from '@/views/Pages/User.vue'; // import Users 

const routes = [ { path: '/', name: 'Login', component: Login, }, 
{ path: '/dashboard', name: 'Dashboard', component: Dashboard, meta:{requiresAuth: true, permission: 'view role' }}, 

{ path: '/admin', name: 'Admin', component: () => import('../views/Admin.vue'), },
{ path: '/categories/add-category', name: 'addCategory', component: addCategory, meta: { title: 'addCategory' }},

{ path: '/controle', name: 'ControleList', component: ControleList, meta: { title: 'ControleList' }},
{ path: '/planifications/groupe', name: 'Groupe', component: Groupe, meta: { title: 'Groupe' }},
{ path: '/planifications/controle', name: 'Controle', component: Controle, meta: { title: 'Controle' }},
{ path: '/planifications/program', name: 'Program', component: Program, meta: { title: 'Program' }},

{ path: '/planifications/reports', name: 'Report', component: Report, meta: { title: 'Report' }},

{ path: '/profile/permission', name: 'permission', component: Permission, meta: { title: 'Permissions' }},
{ path: '/profile/roles', name: 'roles', component: Role, meta: { title: 'Role' } }, // Route for Roles component
{ path: '/profile/roles/create', name: 'rolesCreate', component: createRole, meta: { title: 'createRole' } }, // Route for Roles component
{ path: '/profile/roles/add-permission/:roleId', name: 'addPermissionRole', component: addPermissionRole, meta: { title: 'addPermissionRole' } }, // Route for Roles component
{ path: '/profile/roles/edit-user/:id_user', name: 'editUser', component: editUser, meta: { title: 'editUser' } }, // Route for Roles component
{
  path: '/profile/users',
  name: 'users',
  component: User,
  meta: {
    title: 'User',
   // requiresAuth: true,
    //allowedRoles: ['super-admin'] // Only super-admin can access this route
  }
},
{ path: '/unauthorized', name: 'Unauthorized', component: () => import('@/views/Unauthorized.vue') },
 { path: '/profile/settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } }, ]; 
 const router = createRouter({ history: createWebHistory(), routes, }); 
 
 router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token');
  const userPermissions = store.getters.getUserPermissions;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else if (to.meta.permission && !userPermissions.includes(to.meta.permission)) {
    next('/unauthorized');
  } else {
    next();
  }
});
export default router;
