<template>
  <Dashboard>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <div class="mx-auto max-w-7xl">
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div>
          <!-- Conditional Message for No Planifications -->
          <div v-if="planifications.length === 0" class="text-center py-4">
            No planifications available for this month.
          </div>

          <!-- Table Section -->
          <div v-else>
            <table class="w-full border-collapse export-table">
              <thead>
                <tr class="bg-gray-200">
                  <th class="border border-black py-1 px-2 font-bold">N°</th>
                  <th class="border border-black py-1 px-2 font-bold">
                    Control design
                  </th>
                  <th class="border border-black py-1 px-2 font-bold">GR</th>
                  <th class="border border-black py-1 px-2 font-bold">
                    Number
                  </th>
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
                                planificationDates.has(
                                  equipment.number_equip
                                ) &&
                                planificationDates
                                  .get(equipment.number_equip)
                                  .includes(formattedDates[n].date),
                            }"
                          >
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
    </div>
  </Dashboard>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import axios from "axios";
import Dashboard from "@/views/Dashboard.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";

const pageTitle = "Current Month Planifications";
const planifications = ref([]);
const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based
const currentYear = new Date().getFullYear();
const selectedMonth = ref(currentMonth); // Default to current month
const selectedYear = ref(currentYear); // Default to current year

const planificationDates = computed(() => {
  const dates = new Map();
  planifications.value.forEach((design) => {
    design.groupes.forEach((groupe) => {
      groupe.equipments.forEach((equipment) => {
        const controleId = equipment.number_equip;
        if (!dates.has(controleId)) {
          dates.set(controleId, []);
        }
        equipment.dates.forEach((date) => {
          dates.get(controleId).push(new Date(date).toLocaleDateString());
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

    planifications.value = response.data;
  } catch (error) {
    console.error("API Error:", error);
  }
};

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
    let weekCount = 0;
    while (weekCount < 4) {
      let count = 0;
      while (count < 5) {
        const day = daysOfWeek[startIndex % 7];
        if (day !== "Fr" && day !== "Sa") {
          weekDayList.push(day);
          count++;
        }
        startIndex++;
      }
      weekCount++;
    }
    weekDays.value = weekDayList;
  }
};

const formattedDates = computed(() => {
  const dates = [];
  const year = selectedYear.value;
  const month = selectedMonth.value - 1;
  if (month !== null && weekDays.value.length > 0) {
    let currentDate = new Date(year, month, 1);
    let weekIndex = 0;
    while (weekIndex < 4) {
      for (let i = 0; i < 5; i++) {
        const day = weekDays.value[i + weekIndex * 5];
        while (
          currentDate.getDay() !== ["Su", "Mo", "Tu", "We", "Th"].indexOf(day)
        ) {
          currentDate.setDate(currentDate.getDate() + 1);
        }
        dates.push({ day, date: currentDate.toLocaleDateString() });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weekIndex++;
    }
  }
  return dates;
});

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
