<!--equipment.vue-->
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
                  <th class="border border-black py-1 px-2 font-bold">NÂ°</th>
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
                              'bg-blue-400':
                                planificationDates.has(
                                  equipment.number_equip
                                ) &&
                                planificationDates
                                  .get(equipment.number_equip)
                                  .includes(formattedDates[n].date),
                            }"
                            @click="
                              showRealizationModal(
                                equipment,
                                formattedDates[n],
                                design.designation,
                                groupe.number_group
                              )
                            "
                          >
                            {{ equipment.dates.planificationId }}
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

          <div
            v-if="isModalVisible"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div
              class="bg-white rounded-lg shadow-lg w-full max-w-4xl relative"
            >
              <span
                class="absolute top-6 right-8 text-gray-500 cursor-pointer font-bold text-2xl"
                @click="closeModal"
                v-if="!hasScrolled"
                >&times;</span
              >
              <div v-if="currentScreen === 'initial'">
                <h2 class="text-xl font-bold mb-4 px-6 pt-6">
                  Realization Details
                </h2>
                <div class="mb-2 px-6">
                  <strong>Control Design:</strong> {{ modalData.controlDesign }}
                </div>
                <div class="mb-2 px-6">
                  <strong>Group Number:</strong> {{ modalData.groupNumber }}
                </div>
                <div class="mb-2 px-6">
                  <strong>Equipment Number:</strong>
                  {{ modalData.equipmentNumber }}
                </div>

                <div class="mb-2 px-6">
                  <strong>Day:</strong> {{ modalData.plannedDay }}
                </div>
                <div class="mb-2 px-6">
                  <strong>Date:</strong> {{ modalData.plannedDate }}
                </div>
                <div class="mb-2 px-6">
                  <strong>Month:</strong> {{ modalData.currentMonth }}
                </div>
                <div class="mb-2 px-6">
                  <strong>Time:</strong> {{ modalData.currentTime }}
                </div>
                <div class="flex justify-end px-6 py-4">
                  <button
                    class="bg-orange-500 text-white px-4 py-2 rounded mr-2"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                  <button
                    class="bg-blue-500 text-white px-4 py-2 rounded"
                    @click="currentScreen = 'palier1'"
                  >
                    Next
                  </button>
                </div>
              </div>
              <div v-else-if="currentScreen.startsWith('palier')">
                <h2 class="text-xl font-bold mb-4 px-6 pt-6">
                  {{ currentScreen.toUpperCase() }}
                </h2>
                <table class="w-full border-collapse mx-0">
                  <thead>
                    <tr class="bg-gray-200">
                      <th class="border border-black py-1 px-2 font-bold">
                        Parameter
                      </th>
                      <th class="border border-black py-1 px-2 font-bold">
                        Value Horizontal
                      </th>
                      <th class="border border-black py-1 px-2 font-bold">
                        Value Axial
                      </th>
                      <th class="border border-black py-1 px-2 font-bold">
                        Value Vertical
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="parameter in parameters" :key="parameter.name">
                      <td
                        class="border border-black py-1 px-2"
                        :rowspan="parameter.name === 'deplacement' ? 3 : 1"
                      >
                        {{ parameter.label }}
                      </td>
                      <td
                        v-if="parameter.name !== 'deplacement'"
                        class="border border-black py-1 px-2"
                      >
                        <input
                          type="number"
                          required
                          class="border p-2 rounded w-full"
                          :id="`${currentScreen.valueOf}-${parameter.name}Horizontal-input`"
                          v-model="
                            modalData.palierValues[currentScreen][
                              `${parameter.name}Horizontal`
                            ]
                          "
                        />
                      </td>
                      <td v-else class="border border-black py-1 px-2">
                        <input
                          required
                          type="number"
                          class="border p-2 rounded w-full"
                          :id="`${currentScreen.valueOf}-deplacementHorizontal-input`"
                          v-model="
                            modalData.palierValues[currentScreen][
                              `deplacementHorizontal`
                            ]
                          "
                        />
                      </td>
                      <td
                        v-if="parameter.name !== 'deplacement'"
                        class="border border-black py-1 px-2"
                      >
                        <input
                          required
                          type="number"
                          class="border p-2 rounded w-full"
                          :id="`${currentScreen.valueOf}-${parameter.name}Axial-input`"
                          v-model="
                            modalData.palierValues[currentScreen][
                              `${parameter.name}Axial`
                            ]
                          "
                        />
                      </td>
                      <td v-else class="border border-black py-1 px-2">
                        <input
                          required
                          type="number"
                          class="border p-2 rounded w-full"
                          :id="`${currentScreen.valueOf}-deplacementAxial-input`"
                          v-model="
                            modalData.palierValues[currentScreen][
                              `deplacementAxial`
                            ]
                          "
                        />
                      </td>
                      <td
                        v-if="parameter.name !== 'deplacement'"
                        class="border border-black py-1 px-2"
                      >
                        <input
                          required
                          type="number"
                          class="border p-2 rounded w-full"
                          :id="`${currentScreen.valueOf}-${parameter.name}Vertical-input`"
                          v-model="
                            modalData.palierValues[currentScreen][
                              `${parameter.name}Vertical`
                            ]
                          "
                        />
                      </td>
                      <td v-else class="border border-black py-1 px-2">
                        <input
                          required
                          type="number"
                          class="border p-2 rounded w-full"
                          :id="`${currentScreen.valueOf}-deplacementVertical-input`"
                          v-model="
                            modalData.palierValues[currentScreen][
                              `deplacementVertical`
                            ]
                          "
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="flex justify-end px-6 py-4">
                  <button
                    v-if="fromReviewPage"
                    class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    @click="backToReview"
                  >
                    Review
                  </button>
                  <button
                    v-if="!fromReviewPage && currentScreen === 'palier1'"
                    class="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    @click="currentScreen = 'initial'"
                  >
                    Previous
                  </button>
                  <button
                    v-else-if="!fromReviewPage"
                    class="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    @click="navigatePalier('previous')"
                  >
                    Previous
                  </button>
                  <button
                    v-if="!fromReviewPage && currentScreen !== 'palier4'"
                    class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    @click="navigatePalier('next')"
                  >
                    Next
                  </button>
                  <button
                    v-if="!fromReviewPage && currentScreen === 'palier4'"
                    class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    @click="backToReview"
                  >
                    Review
                  </button>
                  <!-- 
                  <button
                    class="bg-orange-500 text-white px-4 py-2 rounded"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                  -->
                </div>
              </div>
              <div
                v-else-if="currentScreen === 'review'"
                class="h-[500px] overflow-y-scroll"
                @scroll="handleScroll"
              >
                <h2 class="text-xl font-bold mb-4 px-6 pt-6">
                  Review Palier Data
                </h2>
                <div
                  v-for="palier in Object.keys(modalData.palierValues)"
                  :key="palier"
                  class="px-6"
                >
                  <div class="flex items-center mb-2">
                    <h3 class="text-lg font-bold mb-2 mr-6">
                      {{ palier.toUpperCase() }}
                    </h3>

                    <table class="w-full border-collapse">
                      <thead>
                        <tr class="bg-gray-200">
                          <th class="border border-black py-1 px-2 font-bold">
                            Parameter
                          </th>
                          <th class="border border-black py-1 px-2 font-bold">
                            Value Horizontal
                          </th>
                          <th class="border border-black py-1 px-2 font-bold">
                            Value Axial
                          </th>
                          <th class="border border-black py-1 px-2font-bold">
                            Value Vertical
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="parameter in parameters"
                          :key="parameter.name"
                        >
                          <td class="border border-black py-1 px-2">
                            {{ parameter.label }}
                          </td>
                          <td class="border border-black py-1 px-2">
                            {{
                              modalData.palierValues[palier][
                                `${parameter.name}Horizontal`
                              ]
                            }}
                          </td>
                          <td class="border border-black py-1 px-2">
                            {{
                              modalData.palierValues[palier][
                                `${parameter.name}Axial`
                              ]
                            }}
                          </td>
                          <td class="border border-black py-1 px-2">
                            {{
                              modalData.palierValues[palier][
                                `${parameter.name}Vertical`
                              ]
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      class="text-blue px-2 py-1 rounded ml-2 mb-29"
                      @click="editPalier(palier)"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div class="flex justify-end px-6 py-4">
                  <button
                    class="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    @click="currentScreen = 'palier4'"
                  >
                    Back
                  </button>
                  <button
                    class="bg-blue-500 text-white px-4 py-2 rounded"
                    @click="submitRealizationData"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>

<script setup>
import { ref, watch, computed, reactive, nextTick } from "vue";

import axios from "axios";
import Dashboard from "@/views/Dashboard.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";

const pageTitle = "Realization ";
const planifications = ref([]);
const currentMonth = new Date().getMonth() + 7; // JavaScript months are 0-based
const currentYear = new Date().getFullYear();
const selectedMonth = ref(currentMonth); // Default to current month
const selectedYear = ref(currentYear); // Default to current year
import { useStore } from "vuex";
/*
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
*/
const selectedCategory = ref(null);
const selectedGroup = ref(null);
const selectedEquipment = ref(null);
const selectedDate = ref(null);
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
    console.log("response.data", response.data);
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
const isModalVisible = ref(false);
const currentScreen = ref("initial");
const hasScrolled = ref(false);
const handleScroll = (event) => {
  hasScrolled.value = event.target.scrollTop > 0;
};

const modalData = reactive({
  controlDesign: "",
  groupNumber: "",
  equipmentNumber: "",
  plannedDay: "",
  plannedDate: "",
  currentMonth: "",
  currentTime: "",
  planificationId: "", // Add planificationId here
  dateRealized: "",
  palierValues: {
    palier1: {
      speedHorizontal: "",
      speedAxial: "",
      speedVertical: "",
      AccelerationHorizontal: "",
      AccelerationAxial: "",
      AccelerationVertical: "",
      deplacementHorizontal: "",
      deplacementAxial: "",
      deplacementVertical: "",
    },
    palier2: {
      speedHorizontal: "",
      speedAxial: "",
      speedVertical: "",
      AccelerationHorizontal: "",
      AccelerationAxial: "",
      AccelerationVertical: "",
      deplacementHorizontal: "",
      deplacementAxial: "",
      deplacementVertical: "",
    },
    palier3: {
      speedHorizontal: "",
      speedAxial: "",
      speedVertical: "",
      AccelerationHorizontal: "",
      AccelerationAxial: "",
      AccelerationVertical: "",
      deplacementHorizontal: "",
      deplacementAxial: "",
      deplacementVertical: "",
    },
    palier4: {
      speedHorizontal: "",
      speedAxial: "",
      speedVertical: "",
      AccelerationHorizontal: "",
      AccelerationAxial: "",
      AccelerationVertical: "",
      deplacementHorizontal: "",
      deplacementAxial: "",
      deplacementVertical: "",
    },
  },
});
const parameters = [
  { name: "speed", label: "Speed" },
  { name: "Acceleration", label: "Acceleration" },
  { name: "deplacement", label: "Deplacement" },
];

const closeModal = () => {
  isModalVisible.value = false;
  currentScreen.value = "initial";
};
const fromReviewPage = ref(false);

const showRealizationModal = (equipment, date, controlDesign, groupNumber) => {
  const selectedDate = equipment.dates.find(
    (d) => new Date(d.date).toLocaleDateString() === date.date
  );
  const planificationId = selectedDate ? selectedDate.planificationId : null;
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  const formattedTime = currentDate.toLocaleTimeString();

  Object.assign(modalData, {
    controlDesign,
    groupNumber,
    equipmentNumber: equipment.number_equip,
    plannedDay: date.day,
    plannedDate: date.date,
    currentMonth: formattedDate, // Update with current date
    currentTime: formattedTime,
    planificationId,
  });
  isModalVisible.value = true;
};

const navigatePalier = (direction) => {
  const palierOrder = ["palier1", "palier2", "palier3", "palier4"];
  let currentIndex = palierOrder.indexOf(currentScreen.value);

  if (direction === "next") {
    if (currentIndex === palierOrder.length - 1) {
      backToReview();
    } else {
      currentScreen.value = palierOrder[currentIndex + 1];
    }
  } else if (direction === "previous") {
    if (currentIndex === 0) {
      currentScreen.value = "initial";
    } else {
      const previousPalier = palierOrder[currentIndex - 1];
      currentScreen.value = previousPalier;
    }
  }

  fromReviewPage.value = false;
};
const editPalier = (palier, parameter) => {
  fromReviewPage.value = true;
  currentScreen.value = palier;
  nextTick(() => {
    const input = document.querySelector(`#${palier}-${parameter}-input`);
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      input.focus();
    }
  });
};

const backToReview = () => {
  currentScreen.value = "review";
  fromReviewPage.value = false;
};
const store = useStore();

const submitRealizationData = async () => {
  try {
    const payload = {
      planification_id: modalData.planificationId,

      palier_values: [
        ...formatPalierValues(modalData.palierValues.palier1, "palier1"),
        ...formatPalierValues(modalData.palierValues.palier2, "palier2"),
        ...formatPalierValues(modalData.palierValues.palier3, "palier3"),
        ...formatPalierValues(modalData.palierValues.palier4, "palier4"),
      ],
    };
    console.log("Payload:", JSON.stringify(payload, null, 2)); // Log the payload for debugging

    await store.dispatch("addPalierParameter", payload);
    const datePayload = {
      date_realized: new Date(modalData.plannedDate)
        .toISOString()
        .split("T")[0],
    };

    await store.dispatch("updateDateRealized", {
      planificationId: modalData.planificationId,
      payload: datePayload,
    });

    console.log("Submission", datePayload);
    closeModal();
  } catch (error) {
    console.error("Submission Error:", error);
  }
};

const formatPalierValues = (palierValues, palierName) => {
  return [
    {
      palier_name: palierName,
      parameter_name: "speed",
      value_horizental: palierValues.speedHorizontal,
      value_axial: palierValues.speedAxial,
      value_vertical: palierValues.speedVertical,
    },
    {
      palier_name: palierName,
      parameter_name: "acceleration",
      value_horizental: palierValues.AccelerationHorizontal,
      value_axial: palierValues.AccelerationAxial,
      value_vertical: palierValues.AccelerationVertical,
    },
    {
      palier_name: palierName,
      parameter_name: "deplacement",
      value_horizental: palierValues.deplacementHorizontal,
      value_axial: palierValues.deplacementAxial,
      value_vertical: palierValues.deplacementVertical,
    },
  ];
};
watch([selectedMonth, selectedYear], updateWeekDays);
updateWeekDays();
fetchData();
</script>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

/*
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
}
.export-table th,
.export-table td {
  text-align: center;
}
  */
</style>
