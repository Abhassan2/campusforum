import axios from "axios";

const clientServer = axios.create({
    // baseURL: "https://campusforum.onrender.com",
    baseURL: "https://campusforum-backend.vercel.app/",
    withCredentials: true,
});

export default clientServer;