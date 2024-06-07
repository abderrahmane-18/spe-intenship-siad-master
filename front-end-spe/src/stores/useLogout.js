// useLogout.js
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export function useLogout() {
  const router = useRouter();
  const isLoading = ref(false);

  const logout = async () => {
    isLoading.value = true; // Set loading state to true

    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      // Remove access_token and user data from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      localStorage.removeItem("permissions");

      // Redirect to the login page
      router.push({ name: "Login" });
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false; // Set loading state to false
    }
  };

  return {
    logout,
    isLoading,
  };
}
