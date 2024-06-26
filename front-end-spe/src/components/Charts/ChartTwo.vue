<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4"
  >
    <div class="mb-4 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white">
          Group Realization Percentage
        </h4>
      </div>
    </div>

    <div>
      <div id="chartTwo" class="-ml-5 -mb-9">
        <VueApexCharts
          v-if="chartData.series && chartData.series.length"
          type="bar"
          height="335"
          :options="apexOptions"
          :series="chartData.series"
          ref="chart"
        />
        <div v-else class="text-center py-8">Loading chart data...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import VueApexCharts from "vue3-apexcharts";

const store = useStore();
const chart = ref(null);

const chartData = computed(() => {
  const data = store.state.groupRealizationData || [];
  console.log(
    "store.getters.getGroupRealizationData",
    store.state.groupRealizationData
  );
  return {
    series: [
      {
        name: "Realization Percentage",
        data: data.map((item) => item.realizationPercentage),
      },
    ],
    labels: data.map((item) => `Group ${item.group}`),
  };
});

const apexOptions = computed(() => ({
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: chartData.value.labels,
  },
  yaxis: {
    title: {
      text: "% Realization",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return `${val}%`;
      },
    },
  },
  colors: ["#34D399", "#FBBF24", "#EF4444"],
}));

onMounted(() => {
  store.dispatch("fetchGroupRealizationData");
});
</script>
