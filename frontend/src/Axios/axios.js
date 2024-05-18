import axios from "axios"
const instance = axios.create({
    // baseURL:"http://localhost:8000/api"
    baseURL:"http://thedailyhub.com/api"
})
export default instance