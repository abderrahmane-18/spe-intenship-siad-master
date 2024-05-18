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
    <TablePreview
      v-if="showTablePreview"
      :tableData="tableData"
      @export-table="handleExportTable"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryGroupSelection from './CategoryGroupSelection.vue'
import DateEquipmentSelection from './DateEquipmentSelection.vue'
import PlanificationList from './PlanificationList.vue'
import TablePreview from './TablePreview.vue'

const showDateEquipmentSelection = ref(false)
const showPlanificationList = ref(false)
const showTablePreview = ref(false)
const selectedCategory = ref(null)
const selectedGroup = ref(null)
const availableEquipment = ref([])
const planifications = ref([])
const tableData = ref({
  columns: ['S1', 'S2', 'S3', 'S4'],
  rows: []
})

const handleNext = (category, group) => {
  selectedCategory.value = category
  selectedGroup.value = group
  showDateEquipmentSelection.value = true

  // Fetch available equipment based on selected category and group
  // and update the availableEquipment ref
  // Update the tableData.rows with the selected category and group
}

const handlePlanificationAdded = (planification) => {
  planifications.value.push(planification)
  showPlanificationList.value = true

  // Update the tableData.rows with the added planification
}

const handlePlanificationRemoved = (planification) => {
  // Remove the planification from the planifications array
  // Update the tableData.rows with the removed planification
}

const handleExportPlanification = () => {
  showTablePreview.value = true
  console.log('aa')
}

const handleExportTable = () => {
  // Export the tableData as an Excel or PDF file
}
</script>