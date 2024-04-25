import axios from "axios";

// Include cookies in all requests
axios.defaults.withCredentials = true;

// Set the base URL for Axios
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.headers.common['Authorization']="Bearer"+localStorage.getItem('token');

// Add a request interceptor to include the CSRF token in POST requests
