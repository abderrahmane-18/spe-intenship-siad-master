<template>
  <Dashboard>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->

      <div class="mx-auto max-w-7xl">
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="container mx-auto py-8">
          <div>
            <div class="mb-4">
              <label
                for="control-design"
                class="block text-gray-700 font-bold mb-2"
                >Control Design</label
              >
              <select
                id="control-design"
                v-model="selectedControlDesign"
                class="border border-gray-400 p-2 w-full"
                @change="updateGroupOptions"
              >
                <option value="" disabled>Select a Control Design</option>
                <option
                  v-for="category in controlData"
                  :key="category.id"
                  :value="category"
                >
                  {{ category.designation }}
                </option>
              </select>
            </div>

            <div v-if="selectedControlDesign" class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">Groups</label>
              <div class="flex flex-wrap">
                <div
                  v-for="group in selectedControlDesign.groupes"
                  :key="group.number_group"
                  class="mr-4"
                >
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      v-model="selectedGroups"
                      :value="group"
                      class="form-checkbox"
                      @change="updateEquipmentOptions"
                    />
                    <span class="ml-2">{{ group.number_group }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div
              v-for="group in selectedGroups"
              :key="group.number_group"
              class="mb-4"
            >
              <label class="block text-gray-700 font-bold mb-2">
                Equipments for {{ group.number_group }}
              </label>
              <div class="flex flex-wrap">
                <div
                  v-for="equipment in group.equipments"
                  :key="equipment"
                  class="mr-4"
                >
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      v-model="selectedEquipments[group.number_group]"
                      :value="equipment"
                      class="form-checkbox"
                    />
                    <span class="ml-2">{{ equipment }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <!-- Month Selection -->
              <div class="mb-4">
                <label
                  for="month-select"
                  class="block text-gray-700 font-bold mb-2"
                >
                  Select Month
                </label>
                <select
                  id="month-select"
                  v-model="selectedMonth"
                  class="border border-gray-400 p-2 w-full"
                >
                  <option value="" disabled>Select a Month</option>
                  <option
                    v-for="(month, index) in months"
                    :key="index"
                    :value="index"
                  >
                    {{ month }}
                  </option>
                </select>
              </div>
              <!-- Year Selection -->
              <div class="mb-4">
                <label
                  for="year-select"
                  class="block text-gray-700 font-bold mb-2"
                >
                  Select Year
                </label>
                <select
                  id="year-select"
                  v-model="selectedYear"
                  class="border border-gray-400 p-2 w-full"
                >
                  <option value="" disabled>Select a Year</option>
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-4 flex justify-between">
              <button
                class="bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="getSelectedData"
                :disabled="!selectedMonth"
              >
                Add Data
              </button>
              <button
                class="bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                @click="resetData"
              >
                Reset Data
              </button>
            </div>
          </div>
          <table class="w-full border-collapse">
            <!-- Table header -->
            <thead>
              <tr class="bg-gray-200">
                <th class="border border-black py-1 px-2 font-bold">N°</th>
                <th class="border border-black py-1 px-2 font-bold">
                  Désignation du contrôle
                </th>
                <th class="border border-black py-1 px-2 font-bold">GR</th>
                <th class="border border-black py-1 px-2 font-bold">Number</th>
                <th
                  colspan="5"
                  class="border border-black py-1 px-2 font-bold text-center"
                >
                  S1
                </th>
                <th
                  colspan="5"
                  class="border border-black py-1 px-2 font-bold text-center"
                >
                  S2
                </th>
                <th
                  colspan="5"
                  class="border border-black py-1 px-2 font-bold text-center"
                >
                  S3
                </th>
                <th
                  colspan="5"
                  class="border border-black py-1 px-2 font-bold text-center"
                >
                  S4
                </th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>

                <!-- <th
                  v-for="(day, index) in days"
                  :key="index"
                  class="border border-black py-1 px-2 font-bold text-center"
                >
                  {{ day }}
                </th> -->
                <th
                  v-for="(day, index) in weekDays"
                  :key="index"
                  class="border border-black py-1 px-2 font-bold text-center"
                >
                  {{ day }}
                </th>
              </tr>
            </thead>

            <tbody>
              <template
                v-for="(design, index_designation) in addedData"
                :key="index_designation"
              >
                <template
                  v-for="(groupe, index_group) in design.groupes"
                  :key="index_group"
                >
                  <template
                    v-for="(equipement, index_equipement) in groupe.equipments"
                    :key="index_equipement"
                  >
                    <tr>
                      <template
                        v-if="index_equipement == 0 && index_group == 0"
                      >
                        <td
                          :rowspan="groupLength(design)"
                          class="border border-black py-1 px-2"
                        >
                          {{ design.id }}
                        </td>
                        <td
                          :rowspan="groupLength(design)"
                          class="border border-black py-1 px-2"
                        >
                          {{ design.designation }}
                        </td>
                      </template>

                      <td
                        v-if="index_equipement == 0"
                        :rowspan="calc_equi_for_each_group(groupe)"
                        class="border border-black py-1 px-2"
                      >
                        {{ groupe.number_group }}
                      </td>
                      <td class="border border-black py-1 px-2">
                        {{ equipement }}
                      </td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                      <td class="border border-black py-1 px-2"></td>
                    </tr>
                  </template>
                </template>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <br />
    </div>
  </Dashboard>
</template>
<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import Dashboard from "@/views/Dashboard.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const store = useStore();
const controlData = ref([]);
const selectedControlDesignId = ref(null);
function groupLength(design) {
  return design.groupes.reduce((acc, curr) => acc + curr.equipments.length, 0);
}
const newControlDesignation = ref("");
function calc_equi_for_each_group(groupe) {
  return groupe.equipments.length;
}

const selectedControlDesign = ref(null);
const selectedGroup = ref(null);
const selectedEquipment = ref([]);
const groupOptions = ref([]);
const equipmentOptions = ref([]);
const selectedEquipments = ref({});
const selectedGroups = ref([]);

const fetchControlData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/controle/data",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    controlData.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateGroupOptions = () => {
  if (selectedControlDesign.value) {
    selectedGroups.value = [];
    selectedEquipments.value = {};
  }
};

const updateEquipmentOptions = () => {
  selectedEquipments.value = {};
  selectedGroups.value.forEach((group) => {
    selectedEquipments.value[group.number_group] = [];
  });
};
const selectedData = ref([]);
const addedData = ref([]); // New reactive variable to store added data
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const selectedMonth = ref(null);
const weekDays = ref([]);
const sendData = () => {
  if (selectedControlDesign.value) {
    const selectedControlDesignData = {
      id: selectedControlDesign.value.id,
      designation: selectedControlDesign.value.designation,
      groupes: selectedGroups.value.map((group) => ({
        number_group: group.number_group,
        equipments: selectedEquipments.value[group.number_group],
      })),
    };
    selectedData.value = [selectedControlDesignData];
  } else {
    selectedData.value = [];
  }
};

const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]; // Add more years as needed
const days = [
  "Di",
  "Lu",
  "Ma",
  "Me",
  "Jeu",
  "Di",
  "Lu",
  "Ma",
  "Me",
  "Jeu",
  "Di",
  "Lu",
  "Ma",
  "Me",
  "Jeu",
  "Di",
  "Lu",
  "Ma",
  "Me",
  "Jeu",
];

const selectedYear = ref(new Date().getFullYear());
const getSelectedData = () => {
  sendData(); // Populate selectedData
  addSelectedData();
  // updateWeekDays();
  console.log("Selected Data:", selectedData.value);
  // Here, you can send the selectedData.value to the server or perform any desired action
};
const addSelectedData = () => {
  if (selectedData.value.length > 0) {
    const existingDesign = addedData.value.find(
      (design) => design.id === selectedData.value[0].id
    );
    if (existingDesign) {
      toast.warning("This control design has already been added.", {
        position: "top-center",
      });
    } else {
      addedData.value = [...addedData.value, ...selectedData.value];
      localStorage.setItem("addedData", JSON.stringify(addedData.value));
      clearSelectedData();
    }
  }
};

// const updateWeekDays = () => {
//   if (selectedMonth.value !== null && selectedYear.value !== null) {
//     const firstDayOfMonth = new Date(
//       selectedYear.value,
//       selectedMonth.value,
//       1
//     ).getDay();
//     const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
//     let startIndex =
//       firstDayOfMonth === 5 ? 0 : firstDayOfMonth === 6 ? 1 : firstDayOfMonth;

//     weekDays.value = [];
//     for (let week = 0; week < 4; week++) {
//       for (let day = 0; day < 5; day++) {
//         weekDays.value.push(daysOfWeek[(startIndex + day) % 7]);
//       }
//     }
//   }
// };
const updateWeekDays = () => {
  if (selectedMonth.value !== null && selectedYear.value !== null) {
    const firstDayOfMonth = new Date(
      selectedYear.value,
      selectedMonth.value,
      1
    ).getDay();
    console.log("firstDayOfMonth", firstDayOfMonth);
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    let startIndex = firstDayOfMonth;

    // Remove Fridays and Saturdays
    let weekDayList = [];
    for (let week = 0; week < 4; week++) {
      let count = 0;
      while (count < 5) {
        if (
          daysOfWeek[startIndex % 7] !== "Fr" &&
          daysOfWeek[startIndex % 7] !== "Sa"
        ) {
          weekDayList.push(daysOfWeek[startIndex % 7]);
          count++;
        }
        startIndex++;
      }
    }

    weekDays.value = weekDayList;
  }
};

const resetData = () => {
  addedData.value = [];
  localStorage.removeItem("addedData");
  selectedMonth.value = null;
};

const clearSelectedData = () => {
  selectedControlDesign.value = null;
  selectedGroups.value = [];
  selectedEquipments.value = {};
  selectedData.value = [];
};
watch(selectedMonth, updateWeekDays);

onMounted(() => {
  fetchControlData();
  const storedData = localStorage.getItem("addedData");
  if (storedData) {
    addedData.value = JSON.parse(storedData);
  }
});
</script>
