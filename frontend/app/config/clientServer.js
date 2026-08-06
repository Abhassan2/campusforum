import axios from "axios";

const clientServer = axios.create({
    baseURL: "https://campusforum.onrender.com",
    withCredentials: true,
});

export default clientServer;