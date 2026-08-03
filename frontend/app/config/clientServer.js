import axios from "axios";

const clientServer = axios.create({
    baseURL: "http://localhost:4040",
    withCredentials: true,
});

export default clientServer;