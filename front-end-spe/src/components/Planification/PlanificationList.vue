<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Equipment
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="planification in planifications"
                :key="planification.id"
                class="hover:bg-gray-100"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(planification.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ planification.equipment }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    class="inline-flex items-center px-3 py-2 ml-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    @click="removePlanification(planification)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="mt-4 flex justify-end">
      <button
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="exportPlanification"
      >
        Export to Excel/PDF
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
// Assuming you have fetched the "planifications" data from the server
const planifications = ref([
  { id: 1, date: "2023-06-01", equipment: 21 },
  { id: 2, date: "2023-06-15", equipment: 22 },
  // Add more planifications as needed
]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const removePlanification = (planification) => {
  // Remove the planification from the list
};

const exportPlanification = () => {
  const exportType = window.confirm("Export to Excel or PDF?")
    ? "excel"
    : "pdf";

  if (exportType === "excel") {
    exportToExcel();
  } else {
    exportToPDF();
  }
};
const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(planifications.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Planifications");
  XLSX.writeFile(workbook, "planifications.xlsx");
};

const exportToPDF = () => {
  const doc = new jsPDF();
  doc.autoTable({
    head: [["Date", "Equipment"]],
    body: planifications.value.map((planification) => [
      formatDate(planification.date),
      planification.equipment,
    ]),
  });
  doc.save("planifications.pdf");
};
</script>
