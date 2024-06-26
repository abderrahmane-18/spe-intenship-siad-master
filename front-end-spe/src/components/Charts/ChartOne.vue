<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import VueApexCharts from "vue3-apexcharts";

const store = useStore();

const allChartData = computed(() => store.state.chartData || {});
const selectedPlanificationId = ref(null);
const loading = ref(false);
const error = ref(null);

const chartData = computed(() => {
  if (
    !selectedPlanificationId.value ||
    !allChartData.value[selectedPlanificationId.value]
  ) {
    return { series: [], labels: [] };
  }

  const planificationData =
    allChartData.value[selectedPlanificationId.value]?.parameters || {};
  return {
    series: [
      {
        name: "Deplacement",
        data: Object.values(planificationData.deplacement || {}).map(
          (d) => d.value_horizental
        ),
      },
      {
        name: "Acceleration",
        data: Object.values(planificationData.acceleration || {}).map(
          (d) => d.value_horizental
        ),
      },
      {
        name: "Speed",
        data: Object.values(planificationData.speed || {}).map(
          (d) => d.value_horizental
        ),
      },
    ],
    labels: Object.keys(planificationData.deplacement || {}),
  };
});

const planificationIds = computed(() => Object.keys(allChartData.value || {}));

const selectedPlanificationDates = computed(() => {
  if (
    !selectedPlanificationId.value ||
    !allChartData.value[selectedPlanificationId.value]
  ) {
    return { planified: "", realized: "" };
  }
  const data = allChartData.value[selectedPlanificationId.value];
  return {
    planified: data.date_planified || "",
    realized: data.date_realized || "",
  };
});

const chart = ref(null);

const apexOptions = computed(() => ({
  // ... (keep the existing options)
  yaxis: {
    title: {
      text: "Value",
    },
    min: 0,
    max:
      chartData.value.series.length > 0
        ? Math.max(
            ...chartData.value.series
              .flatMap((s) => s.data)
              .filter((v) => v !== undefined)
          ) + 10
        : 100,
  },
  // ... (other options)
}));

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    await store.dispatch("fetchChartData");
    const ids = Object.keys(store.state.chartData || {});
    if (ids.length > 0 && !selectedPlanificationId.value) {
      selectedPlanificationId.value = ids[0];
    }
  } catch (e) {
    error.value = "Failed to fetch chart data";
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8"
  >
    <div
      class="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap mb-4"
    >
      <h2 class="text-xl font-semibold">Palier Parameters</h2>
      <div class="flex items-center gap-3">
        <select
          v-model="selectedPlanificationId"
          class="px-4 py-2 border rounded"
        >
          <option value="">Select Planification ID</option>
          <option v-for="id in planificationIds" :key="id" :value="id">
            Planification {{ id }}
          </option>
        </select>
        <button
          @click="fetchData"
          :disabled="loading"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          Refresh Data
        </button>
      </div>
    </div>
    <div v-if="selectedPlanificationId" class="mb-4">
      <p>Planified Date: {{ selectedPlanificationDates.planified }}</p>
      <p>Realized Date: {{ selectedPlanificationDates.realized }}</p>
    </div>
    <div v-if="loading" class="text-center py-4">Loading...</div>
    <div v-else-if="error" class="text-center py-4 text-red-500">
      {{ error }}
    </div>
    <div v-else-if="!selectedPlanificationId" class="text-center py-4">
      Please select a Planification ID
    </div>
    <div v-else>
      <VueApexCharts
        type="line"
        height="350"
        :options="apexOptions"
        :series="chartData.series"
        ref="chart"
      />
    </div>
  </div>
</template>
