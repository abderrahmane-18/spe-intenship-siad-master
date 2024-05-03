import { createRouter, createWebHistory } from 'vue-router';
import Permission from '@/views/Pages/Permission.vue'
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import SettingsView from '@/views/Pages/SettingsView.vue'
import createRole from '@/components/Roles/createRole.vue';
import addPermissionRole from '@/components/Roles/addPermissionRole.vue';
import Role from '@/views/Pages/Role.vue'; // import Roles 
import User from '@/views/Pages/User.vue'; // import Users 

const routes = [ { path: '/', name: 'Login', component: Login, }, 
{ path: '/dashboard', name: 'Dashboard', component: Dashboard, }, 

{ path: '/admin', name: 'Admin', component: () => import('../views/Admin.vue'), },


{ path: '/profile/permission', name: 'permission', component: Permission, meta: { title: 'Permissions' }},
{ path: '/profile/roles', name: 'roles', component: Role, meta: { title: 'Role' } }, // Route for Roles component
{ path: '/profile/roles/create', name: 'rolesCreate', component: createRole, meta: { title: 'createRole' } }, // Route for Roles component
{ path: '/profile/roles/add-permission/:roleId', name: 'addPermissionRole', component: addPermissionRole, meta: { title: 'addPermissionRole' } }, // Route for Roles component

  { path: '/profile/users', name: 'users', component: User, meta: { title: 'User' } },
 { path: '/profile/settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } }, ]; 
 const router = createRouter({ history: createWebHistory(), routes, }); router.beforeEach((to, from, next) => { if (to.name === 'Dashboard') { const isAuthenticated = localStorage.getItem('access_token'); if (!isAuthenticated) { next('/'); } else { next(); } } else { next(); } }); export default router;