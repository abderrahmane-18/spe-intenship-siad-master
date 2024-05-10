/* index.js route*/
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
import ControleList from '@/views/ControleList.vue';
import addCategory from '@/components/Categories/addCategory.vue';
import editUser from '@/components/Users/editUser.vue';

import Role from '@/views/Pages/Role.vue'; // import Roles 
import User from '@/views/Pages/User.vue'; // import Users 

const routes = [ { path: '/', name: 'Login', component: Login, }, 
{ path: '/dashboard', name: 'Dashboard', component: Dashboard, }, 

{ path: '/admin', name: 'Admin', component: () => import('../views/Admin.vue'), },
{ path: '/categories/add-category', name: 'addCategory', component: addCategory, meta: { title: 'addCategory' }},

{ path: '/controle', name: 'ControleList', component: ControleList, meta: { title: 'ControleList' }},
{ path: '/planifications/groupe', name: 'Groupe', component: Groupe, meta: { title: 'Groupe' }},
{ path: '/planifications/controle', name: 'Controle', component: Controle, meta: { title: 'Controle' }},
{ path: '/planifications/program', name: 'Program', component: Program, meta: { title: 'Program' }},

{ path: '/profile/permission', name: 'permission', component: Permission, meta: { title: 'Permissions' }},
{ path: '/profile/roles', name: 'roles', component: Role, meta: { title: 'Role' } }, // Route for Roles component
{ path: '/profile/roles/create', name: 'rolesCreate', component: createRole, meta: { title: 'createRole' } }, // Route for Roles component
{ path: '/profile/roles/add-permission/:roleId', name: 'addPermissionRole', component: addPermissionRole, meta: { title: 'addPermissionRole' } }, // Route for Roles component
{ path: '/profile/roles/edit-user/:roleId', name: 'editUser', component: editUser, meta: { title: 'editUser' } }, // Route for Roles component

  { path: '/profile/users', name: 'users', component: User, meta: { title: 'User' } },
 { path: '/profile/settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } }, ]; 
 const router = createRouter({ history: createWebHistory(), routes, }); router.beforeEach((to, from, next) => { if (to.name === 'Dashboard') { const isAuthenticated = localStorage.getItem('access_token'); if (!isAuthenticated) { next('/'); } else { next(); } } else { next(); } }); export default router;