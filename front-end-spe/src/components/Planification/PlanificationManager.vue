<template>
    <div>
      <CategoryGroupSelection @next="handleNext" />
      <DateEquipmentSelection
        v-if="showDateEquipmentSelection"
        :availableEquipment="availableEquipment"
        @planification-added="handlePlanificationAdded"
      />
      <PlanificationList
        v-if="showPlanificationList"
        :planifications="planifications"
        @remove-planification="handlePlanificationRemoved"
        @export-planification="handleExportPlanification"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import CategoryGroupSelection from './CategoryGroupSelection.vue'
  import DateEquipmentSelection from './DateEquipmentSelection.vue'
  import PlanificationList from './PlanificationList.vue'
  
  const showDateEquipmentSelection = ref(false)
  const showPlanificationList = ref(false)
  const selectedCategory = ref(null)
  const selectedGroup = ref(null)
  const availableEquipment = ref([])
  const planifications = ref([])
  
  const handleNext = (category, group) => {
    selectedCategory.value = category
    selectedGroup.value = group
    showDateEquipmentSelection.value = true
  
    // Fetch available equipment based on selected category and group
    // and update the availableEquipment ref
  }
  
  const handlePlanificationAdded = (planification) => {
    planifications.value.push(planification)
    showPlanificationList.value = true
  }
  
  const handlePlanificationRemoved = (planification) => {
    // Remove the planification from the planifications array
  }
  
  const handleExportPlanification = () => {
    // Export the planification list as an Excel or PDF file
  }
  </script>