<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Désignation du contrôle</th>
            <th>GR</th>
            <th v-for="column in tableData.columns" :key="column">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tableData.rows" :key="row.name">
            <td>{{ row.name }}</td>
            <td>{{ row.group }}</td>
            <td v-for="cell in row.cells" :key="cell.column">
              <div v-for="equipment in cell.equipment" :key="equipment.number">
                {{ equipment.number }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="$emit('export-table')">Export to Excel/PDF</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    tableData: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['export-table'])
  </script>