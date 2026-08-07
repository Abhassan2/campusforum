import axios from "axios";

const clientServer = axios.create({  
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4040",
    withCredentials: true,
});

export default clientServer;