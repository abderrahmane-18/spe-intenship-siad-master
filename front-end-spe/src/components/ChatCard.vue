<script setup>
import { ref } from "vue";
import axios from "axios";
import Pusher from "pusher-js";

const pusher = new Pusher("your-pusher-app-key", {
  cluster: "your-pusher-app-cluster",
  forceTLS: true,
});
const channel = pusher.subscribe("chat");

channel.bind("new-message", (data) => {
  // Handle the new message event
  console.log(data.message);
});

channel.bind("typing-event", (data) => {
  // Handle the typing event
  console.log(`${data.user} is typing...`);
});
const message = ref("");
const isTyping = ref(false);

const sendMessage = async () => {
  try {
    await axios.post("/api/send-message", { message: message.value });
    message.value = "";
  } catch (error) {
    console.error(error);
  }
};

const handleTyping = () => {
  isTyping.value = true;
  // Trigger a Pusher event to notify other users that you're typing
  // ...

  setTimeout(() => {
    isTyping.value = false;
    // Trigger a Pusher event to notify other users that you've stopped typing
    // ...
  }, 3000); // Adjust the timeout as needed
};
</script>

<template>
  <div>
    <div v-if="isTyping">Someone is typing...</div>
    <!-- Display received messages here -->

    <input
      v-model="message"
      @input="handleTyping"
      placeholder="Type your message..."
    />
    <button @click="sendMessage">Send</button>
  </div>
</template>
