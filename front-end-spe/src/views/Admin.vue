<script setup>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

const chartData = {
  series: [
    {
      name: "Speed",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
    },
    {
      name: "Acceleration",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
    },
    {
      name: "Displacement",
      data: [20, 18, 28, 25, 32, 28, 40, 35, 50, 32, 35, 47],
    },
  ],
  labels: [
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
  ],
};

const chart = ref(null);

const apexOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE", "#4ADE80"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2, 2],
    curve: "smooth",
  },
  labels: {
    show: false,
    position: "top",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3C50E0", "#80CAEE", "#4ADE80"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: chartData.labels,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};

// Donut chart data
const donutChartData = {
  series: [65, 34, 45],
  labels: [
    "Equipment Realized",
    "Equipment Realized in Delay",
    "Equipment Not Realized",
  ],
};

const donutChartOptions = {
  chart: {
    type: "donut",
    width: 380,
  },
  colors: ["#3C50E0", "#80CAEE", "#4ADE80"],
  labels: donutChartData.labels,
  legend: {
    show: false,
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
};
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8"
  >
    <div
      class="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap"
    >
      <div class="flex w-full flex-wrap gap-3 sm:gap-5">
        <div class="flex min-w-47.5">
          <span
            class="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary"
          >
            <span
              class="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"
            ></span>
          </span>
          <div class="w-full">
            <p class="font-semibold text-primary">Parameters Chart</p>
            <p class="text-sm font-medium">Speed, Acceleration, Displacement</p>
          </div>
        </div>
      </div>
      <div class="flex w-full max-w-45 justify-end">
        <div
          class="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4"
        >
          <button
            class="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
          >
            Day
          </button>
          <button
            class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
          >
            Week
          </button>
          <button
            class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
          >
            Month
          </button>
        </div>
      </div>
    </div>
    <div>
      <div id="chartOne" class="-ml-5">
        <VueApexCharts
          type="area"
          height="350"
          :options="apexOptions"
          :series="chartData.series"
          ref="chart"
        />
      </div>
    </div>
  </div>

  <!-- Donut Chart -->
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4"
  >
    <div class="mb-3 justify-between gap-4 sm:flex">
      <h5 class="text-xl font-semibold text-black dark:text-white">
        Equipment Status
      </h5>
    </div>

    <div class="mb-2">
      <div id="chartThree" class="mx-auto flex justify-center">
        <VueApexCharts
          type="donut"
          height="350"
          :options="donutChartOptions"
          :series="donutChartData.series"
        />
      </div>
    </div>

    <div class="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
      <div class="w-full px-8 sm:w-1/2">
        <div class="flex w-full items-center">
          <span
            class="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"
          ></span>
          <p
            class="flex w-full justify-between text-sm font-medium text-black dark:text-white"
          >
            <span> Equipment Realized </span>
            <span> 65% </span>
          </p>
        </div>
      </div>
      <div class="w-full px-8 sm:w-1/2">
        <div class="flex w-full items-center">
          <span
            class="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#80CAEE]"
          ></span>
          <p
            class="flex w-full justify-between text-sm font-medium text-black dark:text-white"
          >
            <span> Equipment Realized in Delay </span>
            <span> 34% </span>
          </p>
        </div>
      </div>
      <div class="w-full px-8 sm:w-1/2">
        <div class="flex w-full items-center">
          <span
            class="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#4ADE80]"
          ></span>
          <p
            class="flex w-full justify-between text-sm font-medium text-black dark:text-white"
          >
            <span> Equipment Not Realized </span>
            <span> 45% </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
