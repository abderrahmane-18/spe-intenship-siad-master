<script setup>
import DataStatsOne from "@/components/DataStats/DataStatsOne.vue";
import ChartOne from "@/components/Charts/ChartOne.vue";
import ChartThree from "@/components/Charts/ChartThree.vue";
import ChartTwo from "@/components/Charts/ChartTwo.vue";

import Dashboard from "@/views/Dashboard.vue";
</script>

<template>
  <Dashboard>
    <div
      class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"
    >
      <!-- ====== Chart One Start -->
      <ChartOne />
      <!-- ====== Chart One End -->

      <!-- ====== Chart Two Start -->
      <ChartTwo />
      <!-- ====== Chart Two End -->

      <!-- ====== Chart Three Start -->
      <ChartThree />
      <!-- ====== Chart Three End -->

      <!-- ====== Map One Start -->

      <!-- ====== Map One End -->

      <!-- ====== Table One Start -->

      <!-- ====== Table One End -->

      <!-- ====== Chat Card Start -->

      <!-- ====== Chat Card End -->
    </div>
  </Dashboard>
</template>
