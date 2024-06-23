<template>
  <Dashboard>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <div class="mx-auto max-w-7xl">
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div>
          <!-- Date Filter Section -->
          <div class="mb-4 flex items-center">
            <label for="month" class="mr-2 font-bold">Select Month:</label>
            <select v-model="selectedMonth" id="month" class="border p-2 mr-4">
              <option
                v-for="month in months"
                :key="month.value"
                :value="month.value"
              >
                {{ month.name }}
              </option>
            </select>
            <label for="year" class="mr-2 font-bold">Select Year:</label>
            <input
              type="number"
              v-model="selectedYear"
              id="year"
              class="border p-2 mr-4"
              min="2000"
              :max="new Date().getFullYear()"
            />
            <button
              @click="fetchData"
              class="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Retrieve Data
            </button>
          </div>
          <!-- Table Section -->
          <table class="w-full border-collapse export-table">
            <thead>
              <tr class="bg-gray-200">
                <th class="border border-black py-1 px-2 font-bold">N°</th>
                <th class="border border-black py-1 px-2 font-bold">
                  Control design
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
                <th
                  v-for="({ day }, index) in formattedDates"
                  :key="index"
                  class="border border-black py-1 px-2 font-bold text-center"
                >
                  {{ day }}<br />
                </th>
              </tr>
            </thead>

            <tbody>
              <template
                v-for="(design, index_designation) in planifications"
                :key="index_designation"
              >
                <template
                  v-for="(groupe, index_group) in design.groupes"
                  :key="index_group"
                >
                  <template
                    v-for="(equipment, index_equipement) in groupe.equipments"
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
                          {{ design.id_category }}
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
                        {{ equipment.number_equip }}
                      </td>
                      <template v-for="(date, n) in formattedDates" :key="n">
                        <td
                          :id="`cell-${index_designation}-${index_group}-${index_equipement}`"
                          class="border border-black py-1 px-2 cursor-pointer"
                          :class="{
                            'bg-blue-200':
                              planificationDates.has(equipment.number_equip) &&
                              planificationDates
                                .get(equipment.number_equip)
                                .includes(formattedDates[n].date),
                          }"
                        >
                          <!-- Cell content if any -->

                          <!-- Cell content if any -->
                        </td>
                      </template>
                    </tr>
                  </template>
                </template>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Dashboard>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import axios from "axios";
import Dashboard from "@/views/Dashboard.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";

const planifications = ref([]);
const selectedMonth = ref("5"); // Default to May
const selectedYear = ref(new Date().getFullYear()); // Default to current year
const months = [
  { value: "1", name: "January" },
  { value: "2", name: "February" },
  { value: "3", name: "March" },
  { value: "4", name: "April" },
  { value: "5", name: "May" },
  { value: "6", name: "June" },
  { value: "7", name: "July" },
  { value: "8", name: "August" },
  { value: "9", name: "September" },
  { value: "10", name: "October" },
  { value: "11", name: "November" },
  { value: "12", name: "December" },
];

const planificationDates = computed(() => {
  const dates = new Map();
  planifications.value.forEach((design) => {
    design.groupes.forEach((groupe) => {
      groupe.equipments.forEach((equipment) => {
        const controleId = equipment.number_equip;
        if (!dates.has(controleId)) {
          dates.set(controleId, []);
        }
        equipment.dates.forEach((dateObj) => {
          dates
            .get(controleId)
            .push(new Date(dateObj.date).toLocaleDateString());
        });
      });
    });
  });
  return dates;
});

const fetchData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/planifications",
      {
        params: { month: selectedMonth.value, year: selectedYear.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    console.log("API Response:", response.data);
    planifications.value = response.data;
    console.log(
      "Planifications:",
      JSON.stringify(planifications.value, null, 2)
    );
  } catch (error) {
    console.error("API Error:", error);
  }
};
const pageTitle = "Report ";

function groupLength(design) {
  return design.groupes.reduce((acc, curr) => acc + curr.equipments.length, 0);
}

const calc_equi_for_each_group = (groupe) => {
  return groupe.equipments.length;
};

const weekDays = ref([]);

const updateWeekDays = () => {
  if (selectedMonth.value !== null && selectedYear.value !== null) {
    const firstDayOfMonth = new Date(
      selectedYear.value,
      selectedMonth.value - 1,
      1
    ).getDay();
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    let startIndex = firstDayOfMonth;
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

const formattedDates = computed(() => {
  const dates = [];
  const year = selectedYear.value;
  const month = selectedMonth.value - 1;
  if (month !== null && weekDays.value.length > 0) {
    for (let week = 0; week < 4; week++) {
      for (let i = 0; i < 5; i++) {
        const day = weekDays.value[i];
        const date = new Date(
          year,
          month,
          getDateForWeekday(day, month, year) + week * 7
        );
        dates.push({ day, date: date.toLocaleDateString() });
      }
    }
  }
  return dates;
});

function getDateForWeekday(weekday, month, year) {
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const weekdayIndex = dayNames.indexOf(weekday);
  const diff = (weekdayIndex + 7 - firstDayOfMonth) % 7;
  return diff + 1;
}

watch([selectedMonth, selectedYear], updateWeekDays);
updateWeekDays();
fetchData();
</script>

<style scoped>
.table {
  border-collapse: collapse;
  width: 100%;
}

.table th,
.table td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}

.bg-blue-200 {
  background-color: #bfdbfe;
}
</style>
