<script setup>
import { ref } from "vue";

const cardItems = ref([
  {
    icon: `<svg class="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16.25v3.75c0 .97-.78 1.75-1.75 1.75H2.75C1.78 21.75 1 20.97 1 20v-3.75c0-.41.34-.75.75-.75s.75.34.75.75V20c0 .14.11.25.25.25h16.5c.14 0 .25-.11.25-.25v-3.75c0-.41.34-.75.75-.75s.75.34.75.75z"/>
      <path d="M16.94 1.35L12.28 6l4.66 4.65c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22s-.38-.07-.53-.22l-4.66-4.65-4.66 4.65c-.15.15-.34.22-.53.22s-.38-.07-.53-.22a.754.754 0 010-1.06L10.16 6 5.5 1.35a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l4.66 4.65 4.66-4.65c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06z"/>
    </svg>`,
    title: "Total Equipment Monitored",
    total: "540",
    growthRate: 0, // Assuming this is a fixed number
  },
  {
    icon: `<svg class="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 2h-1V1c0-.55-.45-1-1-1s-1 .45-1 1v1H8V1c0-.55-.45-1-1-1S6 .45 6 1v1H5C3.35 2 2 3.35 2 5v14c0 1.65 1.35 3 3 3h12c1.65 0 3-1.35 3-3V5c0-1.65-1.35-3-3-3zm1 17c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8h14v11zm0-13H4V5c0-.55.45-1 1-1h1v1c0 .55.45 1 1 1s1-.45 1-1V4h6v1c0 .55.45 1 1 1s1-.45 1-1V4h1c.55 0 1 .45 1 1v1z"/>
    </svg>`,
    title: "Equipment Due for Testing",
    total: "48",
    growthRate: 4.2, // Positive indicates more equipment needs testing
  },
  {
    icon: `<svg class="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2.12v9.88c0 .55.45 1 1 1s1-.45 1-1V2.12c2.28.46 4 2.48 4 4.88 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-2.4 1.72-4.42 4-4.88zM11 0C6.03 0 2 4.03 2 9c0 3.97 2.58 7.34 6.16 8.54.33.11.67.17 1.02.21.15.02.3.04.45.05.12.01.24.02.37.02.13 0 .25-.01.37-.02.15-.01.3-.03.45-.05.35-.04.69-.1 1.02-.21C15.42 16.34 18 12.97 18 9c0-4.97-4.03-9-9-9z"/>
    </svg>`,
    title: "Equipment Outside Safe Range",
    total: "12",
    growthRate: -8.3, // Negative is good, fewer equipment outside safe range
  },
  {
    icon: `<svg class="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.92 15.62c-.15-.37-.51-.62-.92-.62h-2.14l-5.33-9.25c-.38-.67-1.08-1.08-1.85-1.08-.77 0-1.47.41-1.85 1.08L3.15 15H1c-.41 0-.77.25-.92.62-.15.37-.07.8.21 1.09l9.5 9.5c.19.19.45.29.71.29.26 0 .52-.1.71-.29l9.5-9.5c.27-.29.35-.72.21-1.09zM11 22.92L3.08 15H5c.41 0 .77-.25.92-.62l5.08-8.79 5.08 8.79c.15.37.51.62.92.62h1.92L11 22.92z"/>
    </svg>`,
    title: "Overall Plant Efficiency",
    total: "94.5%",
    growthRate: 1.8, // Positive indicates improved efficiency
  },
]);
</script>

<template>
  <!-- Card Item Start -->
  <div
    v-for="(item, index) in cardItems"
    :key="index"
    class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div
      class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"
      v-html="item.icon"
    ></div>

    <div class="mt-4 flex items-end justify-between">
      <div>
        <h4 class="text-title-md font-bold text-black dark:text-white">
          {{ item.total }}
        </h4>
        <span class="text-sm font-medium">{{ item.title }}</span>
      </div>

      <span
        class="flex items-center gap-1 text-sm font-medium"
        :class="{
          'text-meta-3': item.growthRate > 0,
          'text-meta-5': item.growthRate < 0,
        }"
      >
        {{ Math.abs(item.growthRate) }}%
        <svg
          v-if="item.growthRate !== 0"
          :class="item.growthRate > 0 ? 'fill-meta-3' : 'fill-meta-5'"
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :d="
              item.growthRate > 0
                ? 'M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z'
                : 'M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z'
            "
            fill=""
          />
        </svg>
      </span>
    </div>
  </div>
  <!-- Card Item End -->
</template>
