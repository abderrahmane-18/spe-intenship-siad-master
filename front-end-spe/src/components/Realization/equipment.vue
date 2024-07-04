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
                              'bg-blue-200':
                                planificationDates.has(
                                  `${design.id_category}-${groupe.number_group}-${equipment.number_equip}`
                                ) &&
                                planificationDates
                                  .get(
                                    `${design.id_category}-${groupe.number_group}-${equipment.number_equip}`
                                  )
                                  .includes(date.date),
                            }"
                            @click="
                              showRealizationModal(
                                equipment,
                                formattedDates[n],
                                design.designation,
                                groupe.number_group,
                                design.id_category,
                                index_designation,
                                index_equipement,
                                index_group
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
                  <div v-if="isSpinnerVisible" class="spinner-overlay">
                    <div class="spinner"></div>
                  </div>
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
import { ref, watch, computed, reactive, nextTick, onMounted } from "vue";

import axios from "axios";
import Dashboard from "@/views/Dashboard.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";

const pageTitle = "Realization ";
const planifications = ref([]);
const currentMonth = new Date().getMonth() + 3; // JavaScript months are 0-based
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
        const controleId = `${design.id_category}-${groupe.number_group}-${equipment.number_equip}`;
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
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const dayOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].indexOf(weekday);
  const diff = dayOfWeek - firstDayOfMonth;
  return diff >= 0 ? diff + 1 : diff + 8;
}

const isModalVisible = ref(false);
const currentScreen = ref("initial");
const hasScrolled = ref(false);
const handleScroll = (event) => {
  hasScrolled.value = event.target.scrollTop > 0;
};
const isSpinnerVisible = ref(false);

const modalData = reactive({
  controlDesign: "",
  frequencyRpm: 0,
  groupNumber: "",
  index_equipement: "",
  index_group: "",
  id_category: "",
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
      index_designation: "",
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

const showRealizationModal = (
  equipment,
  date,
  controlDesign,
  groupNumber,
  id_category, // Store the id_category instead of frequency_rpm
  index_designation,
  index_equipement,
  index_group
) => {
  console.log("aa", store.state.allCategories);

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
    id_category, // Store the id_category instead of frequency_rpm
    index_designation,
    index_equipement,
    index_group,
    groupNumber,
    equipmentNumber: equipment.number_equip,
    plannedDay: date.day,
    plannedDate: date.date,
    currentMonth: formattedDate, // Update with current date
    currentTime: formattedTime,
    planificationId,
  });
  isModalVisible.value = true;
  console.log("sa frequencyRpm ", frequency_rpm.value); // Store the id_category instead of frequency_rpm
  const norms = getNorms(frequency_rpm.value);
  /*
  console.log("palier1 ", modalData.palierValues.palier1, norms);
  const results = {
    palier1: compareWithNorms(modalData.palierValues.palier1, norms),
    palier2: compareWithNorms(modalData.palierValues.palier2, norms),
    palier3: compareWithNorms(modalData.palierValues.palier3, norms),
    palier4: compareWithNorms(modalData.palierValues.palier4, norms),
  };

  // Calculate overall result
  const overallResult = calculateOverallResult(results);
  updateCellColor(overallResult);
  */
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
const getFrequencyRPM = (id_category) => {
  const allCategories = store.state.allCategories;
  const category = allCategories.find((cat) => cat.id === id_category);
  console.log("category", category.frequence_rpm);
  console.log("category", category.codification);
  return category.frequence_rpm;
};
const frequency_rpm = computed(() => {
  return getFrequencyRPM(modalData.id_category);
});
const showSpinner = () => {
  isSpinnerVisible.value = true;
  console.log("isSpinnerVisible", isSpinnerVisible.value);
  // 4 seconds spinner
};
const backToReview = () => {
  currentScreen.value = "review";
  fromReviewPage.value = false;
};
const store = useStore();

const submitRealizationData = async () => {
  showSpinner(); // Show spinner immediately when submit is clicked

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
      date_realized: modalData.plannedDate,
    };

    await store.dispatch("updateDateRealized", {
      planificationId: modalData.planificationId,
      payload: datePayload,
    });

    console.log("Submission", datePayload);

    const norms = getNorms(frequency_rpm.value);
    console.log("norms", norms);
    console.log(
      "palier1 ",
      JSON.stringify(modalData.palierValues.palier1, norms)
    );
    console.log(
      "palier2 ",
      JSON.stringify(modalData.palierValues.palier2, norms)
    );
    console.log(
      "palier3 ",
      JSON.stringify(modalData.palierValues.palier3, norms)
    );
    console.log("palier4 ", modalData.palierValues.palier4, norms);

    console.log(
      JSON.stringify(compareWithNorms(modalData.palierValues.palier1, norms))
    );
    console.log(
      JSON.stringify(compareWithNorms(modalData.palierValues.palier2, norms))
    );
    const results = {
      palier1: compareWithNorms(modalData.palierValues.palier1, norms),
      palier2: compareWithNorms(modalData.palierValues.palier2, norms),
      palier3: compareWithNorms(modalData.palierValues.palier3, norms),
      palier4: compareWithNorms(modalData.palierValues.palier4, norms),
    };
    console.log("results", results);
    // Calculate overall result
    const overallResult = calculateOverallResult(results);
    console.log(
      "results overall",
      JSON.stringify(calculateOverallResult(results))
    );
    console.log("overallResult", overallResult);
    console.log("frequency_rpm.value", frequency_rpm.value);
    // Update cell color based on overall result
    updateCellColor(overallResult);

    setTimeout(() => {
      hideSpinner();
      closeModal();
    }, 1000);
  } catch (error) {
    console.error("Submission Error:", error);
  }
};
const hideSpinner = () => {
  isSpinnerVisible.value = false;
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
const calculateOverallResult = (results) => {
  const resultValues = Object.values(results);
  if (resultValues.every((r) => r === "veryGood")) return "veryGood";
  if (resultValues.every((r) => r === "veryGood" || r === "good"))
    return "good";
  if (resultValues.includes("unacceptable")) return "unacceptable";
  if (resultValues.includes("eligible")) return "eligible";
  return "average";
};
const updateCellColor = (result) => {
  console.log("result", result);

  const cellId = `cell-${modalData.index_designation}-${modalData.index_group}-${modalData.index_equipement}`;
  console.log("cellId", cellId);
  const cell = document.getElementById(cellId);

  console.log("codification", cell);
  if (cell) {
    cell.classList.remove("bg-blue-400");
    switch (result) {
      case "veryGood":
        cell.classList.add("bg-green-500");
        break;
      case "good":
        cell.classList.add("bg-green-300");
        break;
      case "average":
        cell.classList.add("bg-yellow-300");
        break;
      case "eligible":
        cell.classList.add("bg-orange-300");
        break;
      case "unacceptable":
        cell.classList.add("bg-orange-500");
        break;
    }
  }
};
const compareWithNorms = (values, norms) => {
  const maxValues = {
    speed: Math.max(
      values.speedHorizontal,
      values.speedAxial,
      values.speedVertical
    ),
    acceleration: Math.max(
      values.AccelerationHorizontal,
      values.AccelerationAxial,
      values.AccelerationVertical
    ),
    deplacement: Math.max(
      values.deplacementHorizontal,
      values.deplacementAxial,
      values.deplacementVertical
    ),
  };
  console.log("norms.veryGood.speed", norms.veryGood.speed);
  console.log(" norms.veryGood.acceleration", norms.veryGood.acceleration);
  console.log("  norms.veryGood.deplacement", norms.veryGood.deplacement);

  if (
    maxValues.speed <= norms.veryGood.speed &&
    maxValues.acceleration <= norms.veryGood.acceleration &&
    maxValues.deplacement <= norms.veryGood.deplacement
  ) {
    return "veryGood";
  } else if (
    maxValues.speed <= norms.good.speed &&
    maxValues.acceleration <= norms.good.acceleration &&
    maxValues.deplacement <= norms.good.deplacement
  ) {
    return "good";
  } else if (
    maxValues.speed <= norms.average.speed &&
    maxValues.acceleration <= norms.average.acceleration &&
    maxValues.deplacement <= norms.average.deplacement
  ) {
    return "average";
  } else if (
    maxValues.speed <= norms.eligible.speed &&
    maxValues.acceleration <= norms.eligible.acceleration &&
    maxValues.deplacement <= norms.eligible.deplacement
  ) {
    return "eligible";
  } else {
    return "unacceptable";
  }
};
const getNorms = (freq) => {
  if (freq <= 100) {
    return {
      veryGood: { deplacement: 101.4, speed: 0.2, acceleration: 0.004 },
      good: { deplacement: 203, speed: 0.7, acceleration: 0.008 },
      average: { deplacement: 685, speed: 2.5, acceleration: 0.025 },
      eligible: { deplacement: 1727, speed: 6.3, acceleration: 0.06 },
      unacceptable: { deplacement: 3048, speed: 11.4, acceleration: 0.11 },
    };
  } else if (freq > 100 && freq <= 500) {
    return {
      veryGood: { deplacement: 35.5, speed: 0.5, acceleration: 0.033 },
      good: { deplacement: 55.8, speed: 1, acceleration: 0.053 },
      average: { deplacement: 180, speed: 3.3, acceleration: 0.7 },
      eligible: { deplacement: 431, speed: 8.42, acceleration: 0.43 },
      unacceptable: { deplacement: 838, speed: 15.2, acceleration: 1.09 },
    };
  } else if (freq > 500 && freq <= 1200) {
    return {
      veryGood: { deplacement: 14.4, speed: 0.5, acceleration: 0.078 },
      good: { deplacement: 30.4, speed: 1.27, acceleration: 0.16 },
      average: { deplacement: 86.3, speed: 3.8, acceleration: 0.48 },
      eligible: { deplacement: 203, speed: 8.8, acceleration: 1.1 },
      unacceptable: { deplacement: 381, speed: 16.5, acceleration: 2.08 },
    };
  } else if (freq > 1200 && freq <= 1800) {
    return {
      veryGood: { deplacement: 9.6, speed: 0.5, acceleration: 0.119 },
      good: { deplacement: 19.3, speed: 1.27, acceleration: 0.23 },
      average: { deplacement: 55.8, speed: 3.8, acceleration: 0.73 },
      eligible: { deplacement: 134, speed: 8.8, acceleration: 1.72 },
      unacceptable: { deplacement: 381, speed: 16.5, acceleration: 2.08 },
    };
  } else if (freq > 1800 && freq <= 3600) {
    return {
      veryGood: { deplacement: 4.8, speed: 0.5, acceleration: 0.32 },
      good: { deplacement: 9.6, speed: 1.27, acceleration: 0.66 },
      average: { deplacement: 27.9, speed: 3.8, acceleration: 1.4 },
      eligible: { deplacement: 66, speed: 8.8, acceleration: 3.3 },
      unacceptable: { deplacement: 124, speed: 16.5, acceleration: 6.09 },
    };
  } else if (freq > 3600 && freq <= 5000) {
    return {
      veryGood: { deplacement: 3.5, speed: 0.5, acceleration: 0.33 },
      good: { deplacement: 6.8, speed: 1.27, acceleration: 0.66 },
      average: { deplacement: 20.3, speed: 3.8, acceleration: 1.98 },
      eligible: { deplacement: 48, speed: 8.8, acceleration: 4.57 },
      unacceptable: { deplacement: 88, speed: 16.2, acceleration: 8.3 },
    };
  } else if (freq > 5000 && freq <= 10000) {
    return {
      veryGood: { deplacement: 1.2, speed: 0.5, acceleration: 0.53 },
      good: { deplacement: 2.7, speed: 1, acceleration: 1.06 },
      average: { deplacement: 9.3, speed: 3.5, acceleration: 3.8 },
      eligible: { deplacement: 21.8, speed: 8.8, acceleration: 3.8 },
      unacceptable: { deplacement: 40.6, speed: 14.9, acceleration: 15.74 },
    };
  }
};
watch([selectedMonth, selectedYear], updateWeekDays);
updateWeekDays();
fetchData();
onMounted(() => {
  store.dispatch("fetchAllCategories");
});
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
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
