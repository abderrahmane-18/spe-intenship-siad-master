<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    id="my-modal"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
    >
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Equipment Analysis
        </h3>
        <div class="mt-2 px-7 py-3">
          <div class="text-sm text-gray-500">
            <p class="font-bold">
              Equipment Number: {{ equipment.number_equip }}
            </p>
            <p>Frequency RPM: {{ equipment.frequence_rpm }}</p>
            <p>Codification: {{ equipment.codification }}</p>
          </div>

          <div class="mt-4">
            <h4 class="text-md font-semibold mb-2">Analysis Results</h4>
            <div
              v-for="(result, param) in analysis.results"
              :key="param"
              class="mb-4"
            >
              <h5 class="font-semibold">{{ param }}</h5>
              <div class="grid grid-cols-3 gap-2 text-sm">
                <div
                  v-for="(value, direction) in result"
                  :key="direction"
                  class="p-2 rounded"
                  :class="getStatusClass(value.status)"
                >
                  <p class="font-medium">{{ direction }}</p>
                  <p>Value: {{ value.value }}</p>
                  <p>Status: {{ value.status }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <h4 class="text-md font-semibold mb-2">Overall Status</h4>
            <p
              class="text-lg font-bold"
              :class="getStatusClass(analysis.overallStatus)"
            >
              {{ analysis.overallStatus }}
            </p>
          </div>
        </div>
        <div class="items-center px-4 py-3">
          <button
            id="ok-btn"
            @click="$emit('close')"
            class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  equipment: {
    type: Object,
    required: true,
  },
  analysis: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "very good":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "average":
      return "bg-yellow-100 text-yellow-800";
    case "eligible":
      return "bg-orange-100 text-orange-800";
    case "unacceptable":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>
