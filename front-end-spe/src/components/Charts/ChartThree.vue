<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5"
  >
    <div class="mb-3 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white">
          Visitors Analytics
        </h4>
      </div>
      <div>
        <div class="relative z-20 inline-block">
          <select
            name=""
            id=""
            class="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
          >
            <option value="">Monthly</option>
            <option value="">Yearly</option>
          </select>
          <span class="absolute top-1/2 right-3 z-10 -translate-y-1/2">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                fill="#637381"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="mb-2">
      <div id="chartThree" class="mx-auto flex justify-center">
        <VueApexCharts
          v-if="chartData && chartData.series && chartData.series.length"
          type="donut"
          width="340"
          :options="apexOptions"
          :series="chartData.series"
          ref="chart"
        />
        <div v-else class="text-center py-8">Loading chart data...</div>
      </div>
    </div>
    <div
      v-if="chartData && chartData.series && chartData.series.length"
      class="-mx-8 flex flex-wrap items-center justify-center gap-y-3"
    >
      <div
        v-for="(value, index) in chartData.series"
        :key="index"
        class="w-full px-8 sm:w-1/2"
      >
        <div class="flex w-full items-center">
          <span
            class="mr-2 block h-3 w-full max-w-3 rounded-full"
            :class="{
              'bg-[#00FF00]': index === 0,
              'bg-[#F59E0B]': index === 1,
              'bg-[#EF4444]': index === 2,
            }"
          ></span>
          <p
            class="flex w-full justify-between text-sm font-medium text-black dark:text-white"
          >
            <span>{{ chartData.labels[index] }}</span>
            <span
              >{{
                Math.round(
                  (value / chartData.series.reduce((a, b) => a + b, 0)) * 100
                )
              }}%</span
            >
          </p>
        </div>
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

const chartData = computed(() => store.state.chartData1);
console.log("Computed chart data:", store.state.chartData1); // Debugging line

const apexOptions = computed(() => ({
  chart: {
    type: "donut",
    width: 380,
  },
  colors: ["#00FF00", "#F59E0B", "#EF4444"],
  labels: chartData.value.labels || [],
  legend: {
    show: false,
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
}));

onMounted(() => {
  store.dispatch("fetchPlanificationsDelay");
});
</script>
