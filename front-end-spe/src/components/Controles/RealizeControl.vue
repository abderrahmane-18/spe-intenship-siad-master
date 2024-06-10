<template>
  <div class="container mx-auto p-4">
    <input type="file" @change="handleFileUpload" class="mb-4" />
    <button @click="processPdf" :disabled="!filePath" class="btn btn-primary">
      Process PDF
    </button>

    <table v-if="sheetData.length" class="table-auto w-full text-left mt-4">
      <thead>
        <tr>
          <th
            v-for="(header, index) in sheetData[0]"
            :key="index"
            class="border px-4 py-2"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in sheetData.slice(1)" :key="rowIndex">
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="border px-4 py-2"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>

    <a v-if="fileUrl" :href="fileUrl" download class="btn btn-secondary mt-4"
      >Download Excel</a
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const filePath = ref("");
const sheetData = ref([]);
const fileUrl = ref("");

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      filePath.value = response.data.file_path;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
};

const processPdf = async () => {
  try {
    const response = await axios.post("/api/process", {
      file_path: filePath.value,
    });
    const data = response.data;

    // Fetch Excel file and update sheetData for display
    const responseSheet = await axios.get(data.file_url, {
      responseType: "arraybuffer",
    });
    const workbook = XLSX.read(responseSheet.data, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    sheetData.value = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Set file URL for download
    fileUrl.value = data.file_url;
  } catch (error) {
    console.error("Error processing PDF:", error);
  }
};
</script>

<style scoped>
/* Your styles here */
</style>
