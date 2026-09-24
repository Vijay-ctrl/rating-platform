import axios from "axios";

const api = axios.create({
   baseURL: "https://rating-platform-05rv.onrender.com/api",
   headers: {
      "Content-Type": "application/json",
   },
});

export default api;