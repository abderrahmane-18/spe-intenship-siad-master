<script setup >
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import SettingsCard from '@/components/SettingsCard.vue'
import createRole from '@/components/Roles/createRole.vue'
import Dashboard from '@/views/Dashboard.vue'

const pageTitle = ref('Settings Page')
</script>

<template>
  <Dashboard>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <SettingsCard />
    </div>
  </Dashboard>
</template>
