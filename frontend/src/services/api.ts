import axios from "axios";

const baseURLLocal = process.env.API_URL

const api = axios.create({
    baseURL: baseURLLocal
})

export { api, baseURLLocal }
